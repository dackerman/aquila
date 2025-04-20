import { Server as HttpServer } from 'http';
import { WebSocketServer } from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { AppRouter } from '@aquila/api-contract';

interface CreateWsServerOptions {
  server: HttpServer;
  router: AppRouter;
}

export function createWsServer({ server, router }: CreateWsServerOptions) {
  const wss = new WebSocketServer({
    server,
    path: '/trpc',
  });

  const handler = applyWSSHandler({
    wss,
    router,
    createContext: () => ({
      // TODO: Implement WS auth
      user: undefined,
    }),
  });

  console.log('WebSocket server created');
  
  wss.on('connection', socket => {
    console.log('Client connected via WebSocket');
    
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });

  // Cleanup function
  const cleanup = () => {
    handler.broadcastReconnectNotification();
    wss.close();
  };

  return { wss, cleanup };
}