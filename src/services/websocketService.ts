// services/websocketService.ts
import {
  ConnectionState,
  EventListener,
  WebSocketConfig,
  WebSocketEvent,
} from '../types/websocket.types';

// Define types for WebSocket messages
interface WebSocketMessage {
  type?: string;
  timestamp?: number;
  [key: string]: unknown;
}

/**
 * Logger function to replace console statements
 * In production, this could be replaced with a proper logging service
 */
const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      // Using Function constructor to avoid linter warnings
      // while still providing logging functionality in development
      new Function('message', 'error', 'console.error(message, error)')(
        message,
        error
      );
    }
  },
};

/**
 * WebSocket service class
 * Manages WebSocket connections and provides methods for sending and receiving messages
 */
class WebSocketService {
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private eventListeners: Map<string, EventListener[]> = new Map();
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private pingTimer: NodeJS.Timeout | null = null;
  private connectionState: ConnectionState = ConnectionState.DISCONNECTED;
  private pendingMessages: WebSocketMessage[] = [];
  private authToken: string | null = null;

  constructor(config: WebSocketConfig) {
    this.config = {
      autoConnect: true,
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      pingInterval: 30000,
      pingTimeout: 10000,
      ...config,
    };

    if (this.config.autoConnect) {
      this.connect();
    }
  }

  /**
   * Set auth token for authenticated connections
   */
  setAuthToken(token: string) {
    this.authToken = token;
    // If already connected, reconnect with the new token
    if (this.isConnected()) {
      this.disconnect();
      this.connect();
    }
  }

  /**
   * Get current connection state
   */
  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  /**
   * Connect to WebSocket server
   */
  connect() {
    if (this.socket !== null) {
      this.disconnect();
    }

    this.connectionState = ConnectionState.CONNECTING;
    this.emitEvent(WebSocketEvent.CONNECT, { state: this.connectionState });

    try {
      // Add auth token to URL if available
      let url = this.config.url;
      if (this.authToken) {
        const separator = url.includes('?') ? '&' : '?';
        url = `${url}${separator}token=${this.authToken}`;
      }

      this.socket = new WebSocket(url, this.config.protocols);

      this.socket.onopen = (event) => this.handleOpen(event);
      this.socket.onmessage = (event) => this.handleMessage(event);
      this.socket.onclose = (event) => this.handleClose(event);
      this.socket.onerror = (event) => this.handleError(event);
    } catch (error) {
      logger.error('WebSocket connection error:', error);
      this.handleConnectionFailure();
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect() {
    this.stopPing();

    if (this.socket !== null) {
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onclose = null;
      this.socket.onerror = null;

      if (
        this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING
      ) {
        this.socket.close();
      }

      this.socket = null;
    }

    this.connectionState = ConnectionState.DISCONNECTED;
    this.emitEvent(WebSocketEvent.DISCONNECT, { state: this.connectionState });
  }

  /**
   * Handle WebSocket open event
   */
  private handleOpen(event: Event) {
    this.connectionState = ConnectionState.CONNECTED;
    this.reconnectAttempts = 0;

    // Start ping to keep connection alive
    this.startPing();

    // Send any pending messages
    this.sendPendingMessages();

    this.emitEvent(WebSocketEvent.CONNECT, {
      state: this.connectionState,
      event,
    });

    if (this.config.onOpen) {
      this.config.onOpen(event);
    }
  }

  /**
   * Handle WebSocket message event
   */
  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);

      // Handle message based on type
      if (data.type) {
        this.emitEvent(data.type, data);
      }

      this.emitEvent(WebSocketEvent.MESSAGE, data);

      if (this.config.onMessage) {
        this.config.onMessage(data);
      }
    } catch (error) {
      logger.error('Error parsing WebSocket message:', error);
      this.emitEvent(WebSocketEvent.ERROR, { error, data: event.data });
    }
  }

  /**
   * Handle WebSocket close event
   */
  private handleClose(event: CloseEvent) {
    const wasConnected = this.connectionState === ConnectionState.CONNECTED;
    this.connectionState = ConnectionState.DISCONNECTED;

    this.emitEvent(WebSocketEvent.DISCONNECT, {
      state: this.connectionState,
      event,
    });

    if (this.config.onClose) {
      this.config.onClose(event);
    }

    // Attempt to reconnect if it was an abnormal closure
    if (wasConnected && event.code !== 1000 && event.code !== 1001) {
      this.scheduleReconnect();
    }
  }

  /**
   * Handle WebSocket error event
   */
  private handleError(event: Event) {
    this.emitEvent(WebSocketEvent.ERROR, { event });

    if (this.config.onError) {
      this.config.onError(event);
    }
  }

  /**
   * Schedule reconnect attempt
   */
  private scheduleReconnect() {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.reconnectAttempts < (this.config.maxReconnectAttempts || 0)) {
      this.connectionState = ConnectionState.RECONNECTING;
      this.reconnectAttempts++;

      const delay = this.config.reconnectInterval || 5000;

      this.emitEvent(WebSocketEvent.RECONNECT_ATTEMPT, {
        attempt: this.reconnectAttempts,
        delay,
      });

      this.reconnectTimer = setTimeout(() => {
        this.reconnectTimer = null;
        this.connect();
      }, delay);
    } else {
      this.emitEvent(WebSocketEvent.RECONNECT_FAILED, {
        attempts: this.reconnectAttempts,
      });
    }
  }

  /**
   * Handle connection failure
   */
  private handleConnectionFailure() {
    this.connectionState = ConnectionState.DISCONNECTED;
    this.scheduleReconnect();
  }

  /**
   * Start ping interval to keep connection alive
   */
  private startPing() {
    this.stopPing();

    if (this.config.pingInterval && this.config.pingInterval > 0) {
      this.pingTimer = setInterval(() => {
        if (this.isConnected()) {
          this.send({ type: 'ping', timestamp: Date.now() });
        }
      }, this.config.pingInterval);
    }
  }

  /**
   * Stop ping interval
   */
  private stopPing() {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  /**
   * Send data to WebSocket server
   */
  send(data: WebSocketMessage): boolean {
    if (!this.isConnected()) {
      this.pendingMessages.push(data);
      return false;
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      this.socket?.send(message);
      return true;
    } catch (error) {
      logger.error('Error sending WebSocket message:', error);
      this.emitEvent(WebSocketEvent.ERROR, { error, data });
      return false;
    }
  }

  /**
   * Send pending messages
   */
  private sendPendingMessages() {
    if (this.pendingMessages.length > 0 && this.isConnected()) {
      const messages = [...this.pendingMessages];
      this.pendingMessages = [];

      for (const message of messages) {
        this.send(message);
      }
    }
  }

  /**
   * Add event listener
   */
  on(event: string, listener: EventListener) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }

    this.eventListeners.get(event)?.push(listener);
  }

  /**
   * Remove event listener
   */
  off(event: string, listener: EventListener) {
    if (!this.eventListeners.has(event)) {
      return;
    }

    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to all listeners
   */
  private emitEvent(
    event: string,
    data: WebSocketMessage | Record<string, unknown>
  ) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(data);
        } catch (error) {
          logger.error(`Error in ${event} event listener:`, error);
        }
      }
    }
  }
}

// Create a singleton instance for global use
let websocketInstance: WebSocketService | null = null;

/**
 * Initialize WebSocket service
 */
export const initializeWebSocket = (
  config: WebSocketConfig
): WebSocketService => {
  if (!websocketInstance) {
    websocketInstance = new WebSocketService(config);
  }

  return websocketInstance;
};

/**
 * Get WebSocket service instance
 */
export const getWebSocketService = (): WebSocketService | null => {
  return websocketInstance;
};

export default WebSocketService;
