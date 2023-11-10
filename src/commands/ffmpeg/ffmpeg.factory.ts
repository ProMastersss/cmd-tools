import { CommandExecutorFactory } from "../../core/executor/command-executor.factory.js";
import { ConsoleLogger } from "../../output/console-logger/console-logger.js";
import { FFMpegEcecutor } from "./ffmpeg.executor.js";

export class FFMpegExecutorFactory extends CommandExecutorFactory {
  create(): FFMpegEcecutor {
    return new FFMpegEcecutor(ConsoleLogger.getInstance());
  }
}
