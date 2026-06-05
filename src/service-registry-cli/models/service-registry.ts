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
    return new ServiceRegistry();
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
    if (this.has(input.name)) {
      throw new Error(`Service with name "${input.name}" already exists`);
    }

    const service = new Service(input);
    this.servicesByName.set(service.name, service);
    return service;
  }

  get(name: string): Service | undefined {
    return this.servicesByName.get(name);
  }

  list(filter?: ServiceFilter): Service[] {
    throw new Error("Not implemented");
  }

  update(name: string, updates: Partial<ServiceInput>): Service {
    throw new Error("Not implemented");
  }

  remove(name: string): Service {
    if(!this.has(name)) {
      throw new Error(`Service with name "${name}" does not exist`);
    }
    const service = this.servicesByName.get(name);
    this.servicesByName.delete(name);
    return service!;
  }

  has(name: string): boolean {
    return this.servicesByName.has(name);
  }

  toJSON(): SerializedServiceRegistry {
    return {
      services: Array.from(this.servicesByName.values()).map((service) => service.toJSON()),
    };
  }
}
