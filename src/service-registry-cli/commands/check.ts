import {Args} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class Check extends BaseCommand {
  static description = "Run health checks for one or more registered services.";

  static args = {
    name: Args.string({description: "Optional service name to check.", required: false}),
  };

  static flags = {
    ...BaseCommand.baseFlags,
  };

  async run(): Promise<void> {
    const {args} = await this.parse(Check);

    this.log(args.name === undefined ? "TODO: check services" : `TODO: check service "${args.name}"`);
  }
}
