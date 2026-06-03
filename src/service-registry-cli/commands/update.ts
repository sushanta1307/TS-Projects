import {Args, Flags} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class Update extends BaseCommand {
  static description = "Modify an existing service.";

  static args = {
    name: Args.string({description: "Service name.", required: true}),
  };

  static flags = {
    ...BaseCommand.baseFlags,
    url: Flags.string({description: "Updated base service URL."}),
    environment: Flags.string({char: "e", description: "Updated environment."}),
    owner: Flags.string({char: "o", description: "Updated owner."}),
    description: Flags.string({description: "Updated description."}),
    "health-url": Flags.string({description: "Updated health check URL."}),
    tag: Flags.string({char: "t", description: "Updated service tag.", multiple: true}),
  };

  async run(): Promise<void> {
    const {args} = await this.parse(Update);

    this.log(`TODO: update service "${args.name}"`);
  }
}
