import inquirer from "inquirer";
import config from "../../config/config.js";
import { PromptType } from "./prompt.types.js";

export class PromptService {
  public async input<T>(message: string, type: PromptType) {
    const { response } = await inquirer.prompt<{ response: T }>([{
      type,
      name: 'response',
      message
    }]);

    return response;
  }

  public async select() {
    const { response } = await inquirer.prompt<{ response: string }>([{
      type: 'list',
      name: 'response',
      message: 'Выберите команду:',
      choices: Object.keys(config)
    }]);

    if (!config['12']) {
      throw new Error(`Команда '${response}' не найдена`);
    }

    return config[response];
  }
}
