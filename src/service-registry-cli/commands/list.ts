import {Flags} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class List extends BaseCommand {
  static description = "Show registered services.";

  static flags = {
    ...BaseCommand.baseFlags,
    environment: Flags.string({char: "e", description: "Filter services by environment."}),
    owner: Flags.string({char: "o", description: "Filter services by owner."}),
    tag: Flags.string({char: "t", description: "Filter services by tag."}),
  };

  async run(): Promise<void> {
    await this.parse(List);

    this.log("TODO: list services");
  }
}
