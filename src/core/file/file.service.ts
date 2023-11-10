import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";
import { fileURLToPath } from "url";

export class FileService {
  getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      path = join(__dirname + '/' + path);
    }
    return join(dirname(path) + '/' + name + '.' + ext);
  }

  async deleteFileIfExist(path: string): Promise<void> {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
  }

  private async isExist(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}
