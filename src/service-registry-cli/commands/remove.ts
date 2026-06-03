import {Args} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class Remove extends BaseCommand {
  static description = "Delete a service from the registry.";

  static args = {
    name: Args.string({description: "Service name.", required: true}),
  };

  static flags = {
    ...BaseCommand.baseFlags,
  };

  async run(): Promise<void> {
    const {args} = await this.parse(Remove);

    this.log(`TODO: remove service "${args.name}"`);
  }
}
