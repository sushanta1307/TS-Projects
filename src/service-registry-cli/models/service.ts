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
    return new Service(input);
  }

  static fromSerialized(service: SerializedService): Service {
    return new Service(service);
  }

  toJSON(): SerializedService {
    const service: SerializedService = {
      name: this.name,
      url: this.url,
      environment: this.environment,
      owner: this.owner,
      tags: [...this.tags],
      metadata: { ...this.metadata },
    };

    if (this.description !== undefined) {
      service.description = this.description;
    }

    if (this.healthUrl !== undefined) {
      service.healthUrl = this.healthUrl;
    }

    return service;
  }

  withUpdates(updates: Partial<ServiceInput>): Service {
    return new Service({
      ...this.toJSON(),
      ...updates,
      tags: updates.tags ?? this.tags,
      metadata: updates.metadata ?? this.metadata,
    });
  }

  getHealthCheckUrl(): string {
    return this.healthUrl ?? "";
  }
}

export function validateServiceInput(input: ServiceInput): ServiceValidationResult {
  throw new Error("Not implemented");
}

export function validateServiceUrl(field: keyof ServiceInput, value: string): ServiceValidationIssue[] {
  throw new Error("Not implemented");
}
