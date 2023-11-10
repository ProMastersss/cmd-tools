import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor.js";
import { FileService } from "../../core/file/file.service.js";
import { ILogger } from "../../core/handlers/logger.interface.js";
import { StreamHandler } from "../../core/handlers/stream.handler.js";
import { PromptService } from "../../core/prompt/prompt.service.js";
import { FFMpegBuilder } from "./ffmpeg.builder.js";
import { FFMpegAudioCodec, FFMpegBitrate, FFMpegChannel, FFMpegRate, IFFMpegCommandExecutor, IFFMpegExecutor } from "./ffmpeg.types.js";

export class FFMpegEcecutor extends CommandExecutor<IFFMpegExecutor> {
  private fileService = new FileService();
  private promptService = new PromptService();

  constructor(logger: ILogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFFMpegExecutor> {
    const path = await this.promptService.input<string>(
      `Путь до файла:`,
      'input'
    );

    const name = await this.promptService.input<string>(
      `Имя файла:`,
      'input'
    );

    const codec = await this.promptService.input<FFMpegAudioCodec>(
      `Кодек [${Object.values(FFMpegAudioCodec).join('|')}]:`,
      'input'
    );

    const bitrate = await this.promptService.input<FFMpegBitrate>(
      `Битрейт [${Object.values(FFMpegBitrate).join('|')}]:`,
      'input'
    );

    const channel = await this.promptService.input<FFMpegChannel>(
      `Каналов [${Object.values(FFMpegChannel).join('|')}]:`,
      'input'
    );

    const rate = await this.promptService.input<FFMpegRate>(
      `Частота [${Object.values(FFMpegRate).join('|')}]:`,
      'input'
    );

    return { codec, bitrate, channel, rate, path, name };
  }

  protected build({ codec, bitrate, channel, rate, path, name }: IFFMpegExecutor): IFFMpegCommandExecutor {
    const output = this.fileService.getFilePath(path, name, this.getExt(codec));
    const builder = new FFMpegBuilder(path, output);
    const options = builder
      .setCodec(codec)
      .setBitrate(bitrate)
      .setChannel(channel)
      .setRate(rate)
      .build();

    return { command: FFMpegBuilder.getCommand(), options, output };
  }

  protected spawn({ command, options, output }: IFFMpegCommandExecutor): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExist(output);
    return spawn(command, options);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: ILogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }

  private getExt(codec: FFMpegAudioCodec): string {
    switch (codec) {
      case FFMpegAudioCodec.MP3:
        return 'mp3';
      
      case FFMpegAudioCodec.WAV16B:
      case FFMpegAudioCodec.WAV8B:
        return 'wav';
      
      default:
        return '';
    }
  }
}
