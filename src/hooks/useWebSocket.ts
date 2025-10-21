import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getWebSocketService,
  initializeWebSocket,
} from '@/services/websocketService';

import {
  ConnectionState,
  WebSocketConfig,
  WebSocketEvent,
  WebSocketEventData,
} from '@/types/websocket.types';

// Define EventListener type with proper typing
type EventListener = (data: WebSocketEventData) => void;

/**
 * React hook for using WebSocket in components
 *
 * @param config Optional WebSocket configuration
 * @returns WebSocket utility methods and state
 */
export const useWebSocket = (config?: Partial<WebSocketConfig>) => {
  const websocketInstance = getWebSocketService();
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    websocketInstance?.getConnectionState() || ConnectionState.DISCONNECTED
  );

  const listenerRefs = useRef<Map<string, EventListener>>(new Map());

  // Initialize or get WebSocket service
  useEffect(() => {
    if (!websocketInstance && config) {
      initializeWebSocket({
        url: config.url!,
        ...config,
      });
    }

    // Capture the reference to listeners at the start of the effect
    const listeners = listenerRefs.current;

    return () => {
      // Clean up listeners when component unmounts - using the captured variable
      if (websocketInstance && listeners.size > 0) {
        listeners.forEach((listener, event) => {
          websocketInstance.off(event, listener);
        });
      }
    };
  }, [config, websocketInstance]);

  // Set up connection state listener
  useEffect(() => {
    if (!websocketInstance) return;

    const handleConnect = (data: WebSocketEventData) => {
      setConnectionState(data.state || ConnectionState.CONNECTED);
    };

    const handleDisconnect = (data: WebSocketEventData) => {
      setConnectionState(data.state || ConnectionState.DISCONNECTED);
    };

    const handleReconnectAttempt = () => {
      setConnectionState(ConnectionState.RECONNECTING);
    };

    websocketInstance.on(WebSocketEvent.CONNECT, handleConnect);
    websocketInstance.on(WebSocketEvent.DISCONNECT, handleDisconnect);
    websocketInstance.on(
      WebSocketEvent.RECONNECT_ATTEMPT,
      handleReconnectAttempt
    );

    // Store listeners for cleanup
    listenerRefs.current.set(WebSocketEvent.CONNECT, handleConnect);
    listenerRefs.current.set(WebSocketEvent.DISCONNECT, handleDisconnect);
    listenerRefs.current.set(
      WebSocketEvent.RECONNECT_ATTEMPT,
      handleReconnectAttempt
    );

    // Initialize with current state
    setConnectionState(websocketInstance.getConnectionState());

    return () => {
      if (websocketInstance) {
        websocketInstance.off(WebSocketEvent.CONNECT, handleConnect);
        websocketInstance.off(WebSocketEvent.DISCONNECT, handleDisconnect);
        websocketInstance.off(
          WebSocketEvent.RECONNECT_ATTEMPT,
          handleReconnectAttempt
        );
      }
    };
  }, [websocketInstance]);

  // Subscribe to events
  const subscribe = useCallback(
    (event: string, listener: EventListener) => {
      if (!websocketInstance) return () => {};

      websocketInstance.on(event, listener);

      // Store for cleanup
      listenerRefs.current.set(event, listener);

      return () => {
        websocketInstance?.off(event, listener);
        listenerRefs.current.delete(event);
      };
    },
    [websocketInstance]
  );

  // Send message
  const sendMessage = useCallback(
    (data: WebSocketEventData) => {
      if (!websocketInstance) return false;
      return websocketInstance.send(data);
    },
    [websocketInstance]
  );

  // Connect manually
  const connect = useCallback(() => {
    websocketInstance?.connect();
  }, [websocketInstance]);

  // Disconnect manually
  const disconnect = useCallback(() => {
    websocketInstance?.disconnect();
  }, [websocketInstance]);

  return {
    connectionState,
    isConnected: websocketInstance?.isConnected() || false,
    subscribe,
    sendMessage,
    connect,
    disconnect,
  };
};
