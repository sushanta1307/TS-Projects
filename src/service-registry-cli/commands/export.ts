import {Flags} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class Export extends BaseCommand {
  static description = "Write the registry to JSON for other tools.";

  static flags = {
    ...BaseCommand.baseFlags,
    output: Flags.string({char: "o", description: "Optional file path for exported JSON."}),
  };

  async run(): Promise<void> {
    await this.parse(Export);

    this.log("TODO: export registry");
  }
}
