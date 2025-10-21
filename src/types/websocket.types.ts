// WebSocket event types
export enum WebSocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ERROR = 'error',
  RECONNECT_ATTEMPT = 'reconnect_attempt',
  RECONNECT = 'reconnect',
  RECONNECT_ERROR = 'reconnect_error',
  RECONNECT_FAILED = 'reconnect_failed',
}

// WebSocket connection states
export enum ConnectionState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  RECONNECTING = 'reconnecting',
}

// Message types
export enum MessageType {
  CHAT = 'chat',
  NOTIFICATION = 'notification',
  SYSTEM = 'system',
  TYPING = 'typing',
  PRESENCE = 'presence',
}

// Base message interface
export interface WebSocketMessage {
  type: MessageType;
  id?: string;
  timestamp: number;
}

// Chat message interface
export interface ChatMessage extends WebSocketMessage {
  type: MessageType.CHAT;
  content: string;
  senderId: string;
  receiverId: string | string[]; // Can be user ID or group ID
  conversationId: string;
  attachments?: Array<{
    url: string;
    type: string;
    name: string;
    size: number;
  }>;
}

// Notification message interface
export interface NotificationMessage extends WebSocketMessage {
  type: MessageType.NOTIFICATION;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  priority?: 'high' | 'normal' | 'low';
}

// System message interface
export interface SystemMessage extends WebSocketMessage {
  type: MessageType.SYSTEM;
  code: string;
  message: string;
}

// Generic message data interface for all WebSocket messages
export interface WebSocketEventData {
  state?: ConnectionState;
  event?: Event | CloseEvent;
  [key: string]: unknown;
}

// WebSocket config interface
export interface WebSocketConfig {
  url: string;
  autoConnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  pingInterval?: number;
  pingTimeout?: number;
  protocols?: string | string[];
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (data: WebSocketEventData) => void;
  onError?: (event: Event) => void;
}

// Event listener type
export type EventListener = (data: WebSocketEventData) => void;
