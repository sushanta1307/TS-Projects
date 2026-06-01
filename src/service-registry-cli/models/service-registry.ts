import { Service, type ServiceInput, type SerializedService } from "./service.js";

export interface SerializedServiceRegistry {
  services: SerializedService[];
}

export interface ServiceFilter {
  environment?: string;
  owner?: string;
  tag?: string;
}

export class ServiceRegistry {
  private readonly servicesByName: Map<string, Service>;

  constructor(services: Service[] = []) {
    this.servicesByName = new Map(services.map((service) => [service.name, service]));
  }

  static empty(): ServiceRegistry {
    throw new Error("Not implemented");
  }

  static fromSerialized(registry: SerializedServiceRegistry): ServiceRegistry {
    const services = registry.services.map((service) => {
      return new Service({
        ...service,
        tags: service.tags ?? [],
        metadata: service.metadata ?? {},
      });
    });

    return new ServiceRegistry(services);
  }

  add(input: ServiceInput): Service {
    throw new Error("Not implemented");
  }

  get(name: string): Service | undefined {
    throw new Error("Not implemented");
  }

  list(filter?: ServiceFilter): Service[] {
    throw new Error("Not implemented");
  }

  update(name: string, updates: Partial<ServiceInput>): Service {
    throw new Error("Not implemented");
  }

  remove(name: string): Service {
    throw new Error("Not implemented");
  }

  has(name: string): boolean {
    throw new Error("Not implemented");
  }

  toJSON(): SerializedServiceRegistry {
    throw new Error("Not implemented");
  }
}
