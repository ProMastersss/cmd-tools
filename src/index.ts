import { PromptService } from "./core/prompt/prompt.service.js";

class App {
  async run() {
    const promptService = new PromptService();
    const command = await promptService.select();
    const factory = new command.classFactory();
    factory.create().execute();
  }
}

const app = new App();
app.run();
