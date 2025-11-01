import deburr from "lodash/deburr";

//#region src/arrays/index.ts
const reorder = (list, start, end) => {
	const copy = list.slice();
	const [removed] = copy.splice(start, 1);
	copy.splice(end, 0, removed);
	return copy;
};
const withoutNulls = (arr) => {
	return arr.filter((x) => x != null);
};

//#endregion
//#region src/dates/index.ts
const isOverdue = (due, now = /* @__PURE__ */ new Date()) => !!due && due.getTime() < now.getTime();
const isDueSoon = (due, { withinHours = 48 } = {}, now = /* @__PURE__ */ new Date()) => !!due && !isOverdue(due, now) && due.getTime() - now.getTime() <= withinHours * 36e5;
const compareNullableDates = (a, b) => {
	if (!a && !b) return 0;
	if (!a) return 1;
	if (!b) return -1;
	return a.getTime() - b.getTime();
};
const formatDate = (date) => {
	if (!date) return "";
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
};
const formatDateTime = (date) => {
	if (!date) return "";
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric"
	});
};

//#endregion
//#region src/strings/index.ts
const normalizeText = (s) => {
	return deburr(s).trim().replace(/\s+/g, " ").toLowerCase();
};
const slugify = (s) => {
	return deburr(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};
const truncateMiddle = (s, max = 60) => {
	return s.length <= max ? s : s.slice(0, Math.ceil((max - 3) / 2)) + "..." + s.slice(s.length - Math.floor((max - 3) / 2));
};
const toCapitalize = (s) => {
	if (!s) return "";
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};
const getInitials = (name) => {
	if (!name) return "";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 0) return "";
	return `${parts[0]?.charAt(0).toUpperCase() ?? ""}${parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : ""}`;
};

//#endregion
export { compareNullableDates, formatDate, formatDateTime, getInitials, isDueSoon, isOverdue, normalizeText, reorder, slugify, toCapitalize, truncateMiddle, withoutNulls };