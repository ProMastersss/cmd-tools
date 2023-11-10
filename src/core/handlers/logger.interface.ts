export interface ILogger {
  log<T>(...args: T[]): void;
  error<T>(...args: T[]): void;
  end(): void;
}
