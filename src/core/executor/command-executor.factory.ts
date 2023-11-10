import { CommandExecutor } from "./command.executor.js";

export abstract class CommandExecutorFactory {
  abstract create(): CommandExecutor<unknown>;
}
