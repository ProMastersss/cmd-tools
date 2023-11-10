export interface ICommandExecutor {
  command: string,
  options: string[]
}

export interface ICommandName {
  getCommand(): string;
}
