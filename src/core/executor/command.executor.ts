import { ChildProcessWithoutNullStreams } from "child_process";
import { ILogger } from "../handlers/logger.interface.js";
import { ICommandExecutor } from "./command.types.js";

export abstract class CommandExecutor<Input> {
  constructor(private logger: ILogger) {}

  public async execute(): Promise<void> {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);

    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommandExecutor;
  protected abstract spawn(command: ICommandExecutor): ChildProcessWithoutNullStreams;
  protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: ILogger): void; 
}
