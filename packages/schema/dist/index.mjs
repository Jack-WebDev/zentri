import z from "zod";

//#region src/index.ts
const ItemTypeEnum = z.enum(["NOTE", "TODO"]);
const ItemPriorityEnum = z.enum([
	"LOW",
	"MEDIUM",
	"HIGH"
]);
const TimerModeEnum = z.enum([
	"POMODORO",
	"SHORT_BREAK",
	"LONG_BREAK",
	"CUSTOM"
]);
const LayoutModeEnum = z.enum([
	"FORCE",
	"CIRCULAR",
	"CLUSTER"
]);
const TimeFilterEnum = z.enum([
	"ALL",
	"TODAY",
	"WEEK",
	"MONTH"
]);
const StackSchema = z.object({
	id: z.string(),
	name: z.string(),
	color: z.string(),
	description: z.string().optional(),
	createdAt: z.date()
});
const TagSchema = z.object({
	id: z.string(),
	name: z.string(),
	color: z.string()
});
const ItemSchema = z.object({
	id: z.string(),
	type: ItemTypeEnum,
	title: z.string(),
	content: z.string(),
	completed: z.boolean(),
	priority: ItemPriorityEnum,
	tags: z.array(TagSchema),
	pinned: z.boolean(),
	dueDate: z.date().optional(),
	stackId: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date()
});
const TimeGroupSchema = z.object({
	id: z.string(),
	label: z.string(),
	items: z.array(ItemSchema)
});
const FocusSessionSchema = z.object({
	id: z.string(),
	itemId: z.string(),
	startTime: z.number(),
	endTime: z.number().optional(),
	completed: z.boolean(),
	notes: z.string()
});
const BrainMapNodeSchema = z.object({
	id: z.string(),
	x: z.number(),
	y: z.number(),
	vx: z.number(),
	vy: z.number(),
	item: ItemSchema,
	radius: z.number(),
	connections: z.number(),
	isDragging: z.boolean(),
	fixed: z.boolean()
});
const BrainMapLinkSchema = z.object({
	source: z.string(),
	target: z.string(),
	strength: z.number(),
	sharedTags: z.array(z.string())
});

//#endregion
export { BrainMapLinkSchema, BrainMapNodeSchema, FocusSessionSchema, ItemPriorityEnum, ItemSchema, ItemTypeEnum, LayoutModeEnum, StackSchema, TagSchema, TimeFilterEnum, TimeGroupSchema, TimerModeEnum };
//# sourceMappingURL=index.mjs.map