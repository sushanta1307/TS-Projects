export type ServiceEnvironment = "local" | "dev" | "staging" | "prod" | string;

export type ServiceMetadata = Record<string, string | number | boolean | null>;

export interface ServiceInput {
  name: string;
  url: string;
  environment: ServiceEnvironment;
  owner: string;
  description?: string;
  healthUrl?: string;
  tags?: string[];
  metadata?: ServiceMetadata;
}

export interface SerializedService {
  name: string;
  url: string;
  environment: ServiceEnvironment;
  owner: string;
  description?: string;
  healthUrl?: string;
  tags: string[];
  metadata: ServiceMetadata;
}

export interface ServiceValidationIssue {
  field: keyof ServiceInput;
  message: string;
}

export interface ServiceValidationResult {
  valid: boolean;
  issues: ServiceValidationIssue[];
}

export class Service {
  readonly name: string;
  readonly url: string;
  readonly environment: ServiceEnvironment;
  readonly owner: string;
  readonly description: string | undefined;
  readonly healthUrl: string | undefined;
  readonly tags: string[];
  readonly metadata: ServiceMetadata;

  constructor(input: ServiceInput) {
    this.name = input.name;
    this.url = input.url;
    this.environment = input.environment;
    this.owner = input.owner;
    this.description = input.description;
    this.healthUrl = input.healthUrl;
    this.tags = input.tags ?? [];
    this.metadata = input.metadata ?? {};
  }

  static from(input: ServiceInput): Service {
    throw new Error("Not implemented");
  }

  static fromSerialized(service: SerializedService): Service {
    throw new Error("Not implemented");
  }

  toJSON(): SerializedService {
    throw new Error("Not implemented");
  }

  withUpdates(updates: Partial<ServiceInput>): Service {
    throw new Error("Not implemented");
  }

  getHealthCheckUrl(): string {
    throw new Error("Not implemented");
  }
}

export function validateServiceInput(input: ServiceInput): ServiceValidationResult {
  throw new Error("Not implemented");
}

export function validateServiceUrl(field: keyof ServiceInput, value: string): ServiceValidationIssue[] {
  throw new Error("Not implemented");
}
