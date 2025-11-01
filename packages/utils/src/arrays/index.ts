export const reorder = <T>(list: T[], start: number, end: number) => {
  const copy = list.slice();
  const [removed] = copy.splice(start, 1);
  copy.splice(end, 0, removed);
  return copy;
};

export const withoutNulls = <T>(arr: (T | null | undefined)[]): T[] => {
  return arr.filter((x): x is T => x != null);
};
