import { ICommandExecutor } from "../../core/executor/command.types.js";

export enum FFMpegAudioCodec {
  MP3 = 'libmp3lame',
  WAV16B = 'pcm_s16le',
  WAV8B = 'pcm_u8'
};

export enum FFMpegBitrate {
  '256BT' = '256',
  '128BT' = '128',
  '64BT' = '64'
};

export enum FFMpegChannel {
  MONO = '1',
  STEREO = '2'
};

export enum FFMpegRate {
  '16HZ' = '16000',
  '8HZ' = '8000'
};

export interface IFFMpegExecutor {
  name: string;
  path: string;
  codec: FFMpegAudioCodec;
  bitrate: FFMpegBitrate;
  channel: FFMpegChannel;
  rate: FFMpegRate;
}

export interface IFFMpegCommandExecutor extends ICommandExecutor {
  output: string;
}
