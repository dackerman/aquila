/**
 * Agent runtime package
 * Entry point for agent runtime, model adapters, and execution environment.
 */
export interface User {
  id: string;
  username: string;
}

export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'busy' | 'error';
  role: string;
}

export interface AgentRuntime {
  registerAgent(agent: Agent): void;
  unregisterAgent(agentId: string): void;
  getAgent(agentId: string): Agent | undefined;
  getAgents(): Agent[];
}

/**
 * Basic agent runtime implementation
 */
class BasicAgentRuntime implements AgentRuntime {
  private agents: Map<string, Agent> = new Map();
  
  /**
   * Register a new agent
   */
  public registerAgent(agent: Agent): void {
    if (this.agents.has(agent.id)) {
      throw new Error(`Agent with ID ${agent.id} already exists`);
    }
    
    this.agents.set(agent.id, agent);
    
    // In a real implementation, we would emit an event or notify subscribers
    // eslint-disable-next-line no-console
    console.log(`Agent ${agent.name} (${agent.id}) registered`);
  }
  
  /**
   * Unregister an agent
   */
  public unregisterAgent(agentId: string): void {
    const agent = this.agents.get(agentId);
    
    if (agent) {
      this.agents.delete(agentId);
      
      // In a real implementation, we would emit an event or notify subscribers
      // eslint-disable-next-line no-console
      console.log(`Agent ${agent.name} (${agentId}) unregistered`);
    }
  }
  
  /**
   * Get an agent by ID
   */
  public getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }
  
  /**
   * Get all registered agents
   */
  public getAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
  
  /**
   * Initialize the runtime with default agents
   */
  public initialize(): void {
    // In a real implementation, we would load agents from storage or config
    // eslint-disable-next-line no-console
    console.log('Initializing agent runtime...');
    
    // Register some default agents
    this.registerAgent({
      id: 'architect',
      name: 'Architect',
      status: 'idle',
      role: 'system'
    });
    
    this.registerAgent({
      id: 'coder',
      name: 'Coder',
      status: 'idle',
      role: 'system'
    });
    
    this.registerAgent({
      id: 'reviewer',
      name: 'Reviewer',
      status: 'idle',
      role: 'system'
    });
  }
}

// Singleton instance
export const agentRuntime = new BasicAgentRuntime();
