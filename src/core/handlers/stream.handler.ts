import { ChildProcessWithoutNullStreams } from "child_process";
import { ILogger } from "./logger.interface.js";

export class StreamHandler {
  constructor(private logger: ILogger) { }
  
  processOutput(stream: ChildProcessWithoutNullStreams): void {
    stream.stdout.on('data', (data) => {
      this.logger.log(data.toString());
    });

    stream.stderr.on('data', (error) => {
      this.logger.error(error.toString());
    });

    stream.on('close', () => this.logger.end());
  }
}
