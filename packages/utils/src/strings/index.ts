import deburr from "lodash/deburr";

export const normalizeText = (s: string) => {
  return deburr(s).trim().replace(/\s+/g, " ").toLowerCase();
};

export const slugify = (s: string) => {
  return deburr(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const truncateMiddle = (s: string, max = 60) => {
  return s.length <= max
    ? s
    : s.slice(0, Math.ceil((max - 3) / 2)) +
        "..." +
        s.slice(s.length - Math.floor((max - 3) / 2));
};

export const toCapitalize = (s?: string | null): string => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const getInitials = (name?: string | null): string => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  const first = parts[0]?.charAt(0).toUpperCase() ?? "";
  const last =
    parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : "";
  return `${first}${last}`;
};
