export const isOverdue = (due?: Date | null, now = new Date()) =>
  !!due && due.getTime() < now.getTime();

export const isDueSoon = (
  due?: Date | null,
  { withinHours = 48 } = {},
  now = new Date(),
) =>
  !!due &&
  !isOverdue(due, now) &&
  due.getTime() - now.getTime() <= withinHours * 3600_000;

export const compareNullableDates = (a?: Date | null, b?: Date | null) => {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return a.getTime() - b.getTime();
};

export const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date: Date | null) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
