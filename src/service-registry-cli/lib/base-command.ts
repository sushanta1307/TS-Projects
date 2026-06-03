import {Command, Flags} from "@oclif/core";

export abstract class BaseCommand extends Command {
  static baseFlags = {
    registry: Flags.string({
      char: "r",
      description: "Path to the registry JSON file.",
      env: "SERVICE_REGISTRY_PATH",
    }),
    json: Flags.boolean({
      description: "Print machine-readable JSON.",
    }),
  };
}
