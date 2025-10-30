import z from "zod";

export const ItemTypeEnum = z.enum(["NOTE", "TODO"]);
export const ItemPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const TimerModeEnum = z.enum([
  "POMODORO",
  "SHORT_BREAK",
  "LONG_BREAK",
  "CUSTOM",
]);
export const LayoutModeEnum = z.enum(["FORCE", "CIRCULAR", "CLUSTER"]);
export const TimeFilterEnum = z.enum(["ALL", "TODAY", "WEEK", "MONTH"]);

export const StackSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
});

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const ItemSchema = z.object({
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
  updatedAt: z.date(),
});

export const TimeGroupSchema = z.object({
  id: z.string(),
  label: z.string(),
  items: z.array(ItemSchema),
});

export const FocusSessionSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  startTime: z.number(),
  endTime: z.number().optional(),
  completed: z.boolean(),
  notes: z.string(),
});

export const BrainMapNodeSchema = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  vx: z.number(),
  vy: z.number(),
  item: ItemSchema,
  radius: z.number(),
  connections: z.number(),
  isDragging: z.boolean(),
  fixed: z.boolean(),
});

export const BrainMapLinkSchema = z.object({
  source: z.string(),
  target: z.string(),
  strength: z.number(),
  sharedTags: z.array(z.string()),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;
export type StackSchemaType = z.infer<typeof StackSchema>;
export type TagSchemaType = z.infer<typeof TagSchema>;
export type ItemTypeEnumType = z.infer<typeof ItemTypeEnum>;
export type ItemPriorityEnumType = z.infer<typeof ItemPriorityEnum>;
export type TimeGroupSchemaType = z.infer<typeof TimeGroupSchema>;
export type FocusSessionSchemaType = z.infer<typeof FocusSessionSchema>;
export type BrainMapNodeSchemaType = z.infer<typeof BrainMapNodeSchema>;
export type BrainMapLinkSchemaType = z.infer<typeof BrainMapLinkSchema>;
