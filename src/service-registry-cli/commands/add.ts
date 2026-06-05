import {Flags} from "@oclif/core";
import {promises as fs} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {BaseCommand} from "../lib/base-command.js";
import {
  ServiceRegistry,
  validateServiceInput,
  validateServiceUrl,
  type ServiceInput,
} from "../models/index.js";
import {createRegistryFromJson} from "../registry-json.js";

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

    const input: ServiceInput = {
      name: flags.name,
      url: flags.url,
      environment: flags.environment,
      owner: flags.owner,
      tags: flags.tag ?? [],
    };

    if (flags.description !== undefined) {
      input.description = flags.description;
    }

    if (flags["health-url"] !== undefined) {
      input.healthUrl = flags["health-url"];
    }

    const issues = [
      ...validateServiceInput(input).issues,
      ...validateServiceUrl("url", input.url),
      ...(input.healthUrl === undefined ? [] : validateServiceUrl("healthUrl", input.healthUrl)),
    ];

    if (issues.length > 0) {
      this.error(issues.map((issue) => `${issue.field}: ${issue.message}`).join("\n"), {exit: 1});
    }

    const registryPath = resolveRegistryPath(flags.registry);
    const registry = await readRegistry(registryPath);

    if (registry.has(input.name)) {
      this.error(`Service with name "${input.name}" already exists`, {exit: 1});
    }

    const service = registry.add(input);
    await writeRegistry(registryPath, registry);

    if (flags.json) {
      this.log(JSON.stringify(service.toJSON(), null, 2));
      return;
    }

    this.log(`Registered service "${service.name}".`);
  }
}

async function readRegistry(registryPath: string): Promise<ServiceRegistry> {
  try {
    const json = await fs.readFile(registryPath, "utf8");
    return createRegistryFromJson(json);
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return ServiceRegistry.empty();
    }

    throw error;
  }
}

async function writeRegistry(registryPath: string, registry: ServiceRegistry): Promise<void> {
  const directory = path.dirname(registryPath);
  const tempPath = path.join(directory, `.${path.basename(registryPath)}.${process.pid}.tmp`);
  const json = `${JSON.stringify(registry.toJSON(), null, 2)}\n`;

  await fs.mkdir(directory, {recursive: true});
  await fs.writeFile(tempPath, json, "utf8");
  await fs.rename(tempPath, registryPath);
}

function resolveRegistryPath(registryPath: string | undefined): string {
  return path.resolve(registryPath ?? defaultRegistryPath());
}

function defaultRegistryPath(): string {
  const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.basename(path.dirname(moduleDirectory)) === "dist"
    ? path.dirname(path.dirname(moduleDirectory))
    : path.dirname(moduleDirectory);

  return path.join(packageRoot, "data", "dummy-registry.json");
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
