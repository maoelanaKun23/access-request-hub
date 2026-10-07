export const idFormatter = (id: string): string => {
  if (!id) return "ID_";

  let value = id
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2");

  value = value.replace(/[\s-]+/g, "_").replace(/[^A-Za-z0-9_]+/g, "");

  value = value.replace(/_+/g, "_").replace(/^_+|_+$/g, "");

  return `${value.toUpperCase()}`;
};
