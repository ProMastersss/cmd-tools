import { FFMpegBuilder } from "../commands/ffmpeg/ffmpeg.builder.js";
import { FFMpegExecutorFactory } from "../commands/ffmpeg/ffmpeg.factory.js";
import { CommandExecutorFactory } from "../core/executor/command-executor.factory.js";

type Command = {
  command: string;
  classFactory: new () => CommandExecutorFactory;
};

type Config = { [K: string]: Command };

const config: Config = {
  'FFMpeg': { command: FFMpegBuilder.getCommand(), classFactory: FFMpegExecutorFactory }
};

export default config;
