import { ILogger } from "../../core/handlers/logger.interface.js";

export class ConsoleLogger implements ILogger {
  private static $this: ConsoleLogger;

  public static getInstance() {
    if (!ConsoleLogger.$this) {
      ConsoleLogger.$this = new ConsoleLogger();
    }

    return ConsoleLogger.$this;
  }

  log<T>(...args: T[]): void {
    console.log(...args);  
  }

  error<T>(...args: T[]): void {
    console.error(...args);
  }

  end(): void {
    console.log('Done.');
  }
}
