import { FFMpegAudioCodec, FFMpegBitrate, FFMpegChannel, FFMpegRate } from "./ffmpeg.types.js";

export class FFMpegBuilder {
  private static COMMAND_NAME = 'ffmpeg';
  private options: Map<string, string> = new Map();

  constructor(private inputPath: string, private outputPath: string) { }

  static getCommand(): string {
    return this.COMMAND_NAME;
  }

  setBitrate(bitrate: FFMpegBitrate): FFMpegBuilder {
    this.options.set('-b:a', String(bitrate));
    return this;
  }

  setCodec(codec: FFMpegAudioCodec): FFMpegBuilder {
    this.options.set('-acodec', String(codec));
    return this;
  }

  setRate(rate: FFMpegRate): FFMpegBuilder {
    this.options.set('-ar', String(rate));
    return this;
  }

  setChannel(channel: FFMpegChannel ): FFMpegBuilder {
    this.options.set('-ac', String(channel));
    return this;
  }
  
  build(): string[] {
    return ['-i', this.inputPath, ...this.getOptions(), this.outputPath];
  }

  private getOptions(): string[] {
    const optionsArray: string[] = []
    this.options.forEach((value, key) => {
      optionsArray.push(key);
      optionsArray.push(value);
    });
    return optionsArray;
  }
}
