import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    onSubmit?: (event: React.FormEvent<T>) => void;
  }
}
