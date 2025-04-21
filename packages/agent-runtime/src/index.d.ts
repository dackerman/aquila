/**
 * Agent Runtime package
 * Entry point for the agent runtime functionality.
 */
import { ChatMessage, AgentConfig } from '@aquila/core';
export interface Agent {
    id: string;
    name: string;
    config: AgentConfig;
    init(): Promise<void>;
    process(message: ChatMessage): Promise<ChatMessage>;
    shutdown(): Promise<void>;
}
export declare class AgentRuntime {
    private agents;
    /**
     * Register a new agent
     */
    registerAgent(agent: Agent): void;
    /**
     * Unregister an agent
     */
    unregisterAgent(agentId: string): boolean;
    /**
     * Get an agent by ID
     */
    getAgent(agentId: string): Agent | undefined;
    /**
     * Get all registered agents
     */
    getAllAgents(): Agent[];
    /**
     * Initialize all agents
     */
    initializeAll(): Promise<void>;
    /**
     * Shutdown all agents
     */
    shutdownAll(): Promise<void>;
}
export declare const agentRuntime: AgentRuntime;
