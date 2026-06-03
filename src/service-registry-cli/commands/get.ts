import {Args} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class Get extends BaseCommand {
  static description = "Show one service by name.";

  static args = {
    name: Args.string({description: "Service name.", required: true}),
  };

  static flags = {
    ...BaseCommand.baseFlags,
  };

  async run(): Promise<void> {
    const {args} = await this.parse(Get);

    this.log(`TODO: get service "${args.name}"`);
  }
}
