import {Flags} from "@oclif/core";

import {BaseCommand} from "../lib/base-command.js";

export default class Add extends BaseCommand {
  static description = "Register a new service.";

  static flags = {
    ...BaseCommand.baseFlags,
    name: Flags.string({description: "Unique service name.", required: true}),
    url: Flags.string({description: "Base service URL.", required: true}),
    environment: Flags.string({char: "e", description: "Service environment.", required: true}),
    owner: Flags.string({char: "o", description: "Service owner.", required: true}),
    description: Flags.string({description: "Short service description."}),
    "health-url": Flags.string({description: "Health check URL."}),
    tag: Flags.string({char: "t", description: "Service tag.", multiple: true}),
  };

  async run(): Promise<void> {
    const {flags} = await this.parse(Add);

    this.log(`TODO: add service "${flags.name}"`);
  }
}
