import {
  ServiceRegistry,
  type SerializedService,
  type SerializedServiceRegistry,
} from "./models/index.js";

export function parseRegistryJson(json: string): SerializedServiceRegistry {
  const parsed: unknown = JSON.parse(json);

  if (!isSerializedServiceRegistry(parsed)) {
    throw new Error("Invalid registry JSON structure");
  }

  return parsed;
}

export function createRegistryFromJson(json: string): ServiceRegistry {
  const registry = parseRegistryJson(json);
  return ServiceRegistry.fromSerialized(registry);
}

function isSerializedServiceRegistry(value: unknown): value is SerializedServiceRegistry {
  if (!isObject(value)) {
    return false;
  }

  if (!Array.isArray(value.services)) {
    return false;
  }

  return value.services.every(isSerializedService);
}

function isSerializedService(value: unknown): value is SerializedService {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.name === "string" &&
    typeof value.url === "string" &&
    typeof value.environment === "string" &&
    typeof value.owner === "string" &&
    isOptionalString(value.description) &&
    isOptionalString(value.healthUrl) &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string") &&
    isMetadata(value.metadata)
  );
}

function isMetadata(value: unknown): value is SerializedService["metadata"] {
  if (!isObject(value)) {
    return false;
  }

  return Object.values(value).every((metadataValue) => {
    return (
      typeof metadataValue === "string" ||
      typeof metadataValue === "number" ||
      typeof metadataValue === "boolean" ||
      metadataValue === null
    );
  });
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
