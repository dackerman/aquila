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
declare class BasicAgentRuntime implements AgentRuntime {
    private agents;
    /**
     * Register a new agent
     */
    registerAgent(agent: Agent): void;
    /**
     * Unregister an agent
     */
    unregisterAgent(agentId: string): void;
    /**
     * Get an agent by ID
     */
    getAgent(agentId: string): Agent | undefined;
    /**
     * Get all registered agents
     */
    getAgents(): Agent[];
    /**
     * Initialize the runtime with default agents
     */
    initialize(): void;
}
export declare const agentRuntime: BasicAgentRuntime;
export {};
