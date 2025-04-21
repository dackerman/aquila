/**
 * Agent Runtime package
 * Entry point for the agent runtime functionality.
 */
import { User, ChatMessage, AgentConfig, EventType, eventBus } from '@aquila/core';

// Agent interface
export interface Agent {
  id: string;
  name: string;
  config: AgentConfig;
  init(): Promise<void>;
  process(message: ChatMessage): Promise<ChatMessage>;
  shutdown(): Promise<void>;
}

// Basic agent runtime implementation
export class AgentRuntime {
  private agents: Map<string, Agent> = new Map();
  
  /**
   * Register a new agent
   */
  public registerAgent(agent: Agent): void {
    if (this.agents.has(agent.id)) {
      throw new Error(`Agent with ID ${agent.id} is already registered`);
    }
    
    this.agents.set(agent.id, agent);
    
    // Announce new agent
    eventBus.emit(EventType.SYSTEM, {
      action: 'agent_registered',
      agentId: agent.id,
      agentName: agent.name
    });
  }
  
  /**
   * Unregister an agent
   */
  public unregisterAgent(agentId: string): boolean {
    const agent = this.agents.get(agentId);
    if (!agent) return false;
    
    agent.shutdown().catch(err => {
      console.error(`Error shutting down agent ${agentId}:`, err);
    });
    
    this.agents.delete(agentId);
    
    // Announce agent removal
    eventBus.emit(EventType.SYSTEM, {
      action: 'agent_unregistered',
      agentId
    });
    
    return true;
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
  public getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
  
  /**
   * Initialize all agents
   */
  public async initializeAll(): Promise<void> {
    const initPromises = Array.from(this.agents.values()).map(agent => 
      agent.init().catch(err => {
        console.error(`Failed to initialize agent ${agent.id}:`, err);
        throw err;
      })
    );
    
    await Promise.all(initPromises);
  }
  
  /**
   * Shutdown all agents
   */
  public async shutdownAll(): Promise<void> {
    const shutdownPromises = Array.from(this.agents.values()).map(agent => 
      agent.shutdown().catch(err => {
        console.error(`Failed to shutdown agent ${agent.id}:`, err);
      })
    );
    
    await Promise.all(shutdownPromises);
    this.agents.clear();
  }
}

// Singleton instance
export const agentRuntime = new AgentRuntime();