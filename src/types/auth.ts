export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
