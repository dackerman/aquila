/**
 * Orchestrator package
 * Entry point for the task orchestrator and schedulers.
 */
import { EventType, eventBus } from '@aquila/core';
import { Agent, agentRuntime } from '@aquila/agent-runtime';

/**
 * Task interface representing a unit of work to be processed by an agent
 */
export interface Task {
  id: string;
  agentId: string;
  priority: number;
  data: unknown;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
}

/**
 * Task scheduler interface
 */
export interface TaskScheduler {
  scheduleTask(task: Task): void;
  cancelTask(taskId: string): boolean;
  pauseProcessing(): void;
  resumeProcessing(): void;
}

/**
 * Basic priority-based scheduler implementation
 */
export class PriorityTaskScheduler implements TaskScheduler {
  private tasks: Map<string, Task> = new Map();
  private queue: string[] = [];
  private processing = false;
  private paused = false;
  
  constructor(private maxConcurrentTasks = 5) {
    // Listen for agent events to adjust scheduling
    eventBus.onEvent<Record<string, unknown>>(EventType.SYSTEM, (event: { payload: Record<string, unknown> }) => {
      const payload = event.payload;
      if (payload['action'] === 'agent_unregistered' && typeof payload['agentId'] === 'string') {
        this.handleAgentRemoval(payload['agentId']);
      }
    });
  }
  
  /**
   * Schedule a new task
   */
  public scheduleTask(task: Task): void {
    if (this.tasks.has(task.id)) {
      throw new Error(`Task with ID ${task.id} already exists`);
    }
    
    // Store the task
    this.tasks.set(task.id, { ...task, status: 'pending' });
    
    // Add to queue
    this.insertTaskInQueue(task.id);
    
    // Try to process next tasks
    this.processNextTasks();
    
    // Emit event
    eventBus.emit(EventType.SYSTEM, {
      action: 'task_scheduled',
      taskId: task.id,
      agentId: task.agentId
    });
  }
  
  /**
   * Cancel a scheduled task
   */
  public cancelTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;
    
    // Only cancel if not already completed
    if (task.status !== 'completed' && task.status !== 'failed') {
      // Remove from queue if pending
      if (task.status === 'pending') {
        const index = this.queue.indexOf(taskId);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
      }
      
      // Update status
      this.tasks.set(taskId, { 
        ...task, 
        status: 'failed',
        error: 'Task cancelled',
        completedAt: Date.now()
      });
      
      // Emit event
      eventBus.emit(EventType.SYSTEM, {
        action: 'task_cancelled',
        taskId
      });
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Pause task processing
   */
  public pauseProcessing(): void {
    this.paused = true;
    
    eventBus.emit(EventType.SYSTEM, {
      action: 'scheduler_paused'
    });
  }
  
  /**
   * Resume task processing
   */
  public resumeProcessing(): void {
    this.paused = false;
    
    // Try to process next tasks
    this.processNextTasks();
    
    eventBus.emit(EventType.SYSTEM, {
      action: 'scheduler_resumed'
    });
  }
  
  /**
   * Insert task in priority order
   */
  private insertTaskInQueue(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (!task) return;
    
    // Find insertion point based on priority
    let insertIndex = this.queue.length;
    for (let i = 0; i < this.queue.length; i++) {
      const queuedTaskId = this.queue[i];
      if (!queuedTaskId) continue;
      
      const queuedTask = this.tasks.get(queuedTaskId);
      if (queuedTask && task.priority > queuedTask.priority) {
        insertIndex = i;
        break;
      }
    }
    
    // Insert at the right position
    this.queue.splice(insertIndex, 0, taskId);
  }
  
  /**
   * Process next tasks in queue
   */
  private async processNextTasks(): Promise<void> {
    if (this.processing || this.paused) return;
    this.processing = true;
    
    try {
      // Count running tasks
      const runningCount = Array.from(this.tasks.values())
        .filter(t => t.status === 'running')
        .length;
      
      // Process until max concurrent or queue empty
      while (runningCount < this.maxConcurrentTasks && this.queue.length > 0 && !this.paused) {
        const taskId = this.queue.shift();
        if (!taskId) break;
        
        const task = this.tasks.get(taskId);
        if (!task) continue;
        
        // Get the agent
        const agent = agentRuntime.getAgent(task.agentId);
        if (!agent) {
          this.failTask(taskId, `Agent ${task.agentId} not found`);
          continue;
        }
        
        // Update task status
        this.tasks.set(taskId, {
          ...task,
          status: 'running',
          startedAt: Date.now()
        });
        
        // Process task (do not await here to allow concurrent processing)
        this.executeTask(taskId, agent, task);
      }
    } finally {
      this.processing = false;
      
      // If there are still tasks and capacity, process more
      if (this.queue.length > 0) {
        this.processNextTasks();
      }
    }
  }
  
  /**
   * Execute a task with an agent
   */
  private async executeTask(taskId: string, agent: Agent, task: Task): Promise<void> {
    try {
      // Emit event for task start
      eventBus.emit(EventType.SYSTEM, {
        action: 'task_started',
        taskId,
        agentId: task.agentId
      });
      
      // Process the task
      // This is a placeholder - in a real implementation, we would use the agent.process()
      // method with the appropriate data format
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulating processing
      
      // Mark as completed
      this.completeTask(taskId, { result: 'success' });
    } catch (error) {
      // Mark as failed
      this.failTask(taskId, error instanceof Error ? error.message : String(error));
    }
  }
  
  /**
   * Mark a task as completed
   */
  private completeTask(taskId: string, result: unknown): void {
    const task = this.tasks.get(taskId);
    if (!task) return;
    
    this.tasks.set(taskId, {
      ...task,
      status: 'completed',
      completedAt: Date.now(),
      result
    });
    
    // Emit event
    eventBus.emit(EventType.SYSTEM, {
      action: 'task_completed',
      taskId,
      result
    });
    
    // Process next tasks
    this.processNextTasks();
  }
  
  /**
   * Mark a task as failed
   */
  private failTask(taskId: string, error: string): void {
    const task = this.tasks.get(taskId);
    if (!task) return;
    
    this.tasks.set(taskId, {
      ...task,
      status: 'failed',
      completedAt: Date.now(),
      error
    });
    
    // Emit event
    eventBus.emit(EventType.SYSTEM, {
      action: 'task_failed',
      taskId,
      error
    });
    
    // Process next tasks
    this.processNextTasks();
  }
  
  /**
   * Handle agent removal by failing related tasks
   */
  private handleAgentRemoval(agentId: string): void {
    // Find all tasks for this agent
    Array.from(this.tasks.entries())
      .filter(([_, task]) => task.agentId === agentId && 
              (task.status === 'pending' || task.status === 'running'))
      .forEach(([taskId]) => {
        this.failTask(taskId, `Agent ${agentId} was removed`);
      });
    
    // Remove pending tasks from queue
    this.queue = this.queue.filter(taskId => {
      const task = this.tasks.get(taskId);
      if (!task) return true; // Keep tasks we can't find (shouldn't happen)
      return task.agentId !== agentId;
    });
  }
}

/**
 * Orchestrator manages the coordination between agents, tasks, and schedulers
 */
export class Orchestrator {
  private scheduler: TaskScheduler;
  
  constructor(scheduler?: TaskScheduler) {
    this.scheduler = scheduler || new PriorityTaskScheduler();
    
    // Listen for system events
    eventBus.onEvent<Record<string, unknown>>(EventType.SYSTEM, (event: { subject: string; payload: unknown }) => {
      // eslint-disable-next-line no-console
      console.log('Orchestrator received system event:', event.subject, event.payload);
    });
  }
  
  /**
   * Create a new task for an agent
   */
  public createTask(agentId: string, data: unknown, priority = 1): string {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const task: Task = {
      id: taskId,
      agentId,
      priority,
      data,
      createdAt: Date.now(),
      status: 'pending'
    };
    
    this.scheduler.scheduleTask(task);
    return taskId;
  }
  
  /**
   * Cancel an existing task
   */
  public cancelTask(taskId: string): boolean {
    return this.scheduler.cancelTask(taskId);
  }
  
  /**
   * Pause the orchestrator
   */
  public pause(): void {
    this.scheduler.pauseProcessing();
  }
  
  /**
   * Resume the orchestrator
   */
  public resume(): void {
    this.scheduler.resumeProcessing();
  }
}

// Singleton instance
export const orchestrator = new Orchestrator();