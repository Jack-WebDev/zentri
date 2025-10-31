import z from "zod";

//#region src/index.d.ts
declare const ItemTypeEnum: z.ZodEnum<{
  NOTE: "NOTE";
  TODO: "TODO";
}>;
declare const ItemPriorityEnum: z.ZodEnum<{
  LOW: "LOW";
  MEDIUM: "MEDIUM";
  HIGH: "HIGH";
}>;
declare const TimerModeEnum: z.ZodEnum<{
  POMODORO: "POMODORO";
  SHORT_BREAK: "SHORT_BREAK";
  LONG_BREAK: "LONG_BREAK";
  CUSTOM: "CUSTOM";
}>;
declare const LayoutModeEnum: z.ZodEnum<{
  FORCE: "FORCE";
  CIRCULAR: "CIRCULAR";
  CLUSTER: "CLUSTER";
}>;
declare const TimeFilterEnum: z.ZodEnum<{
  ALL: "ALL";
  TODAY: "TODAY";
  WEEK: "WEEK";
  MONTH: "MONTH";
}>;
declare const StackSchema: z.ZodObject<{
  id: z.ZodString;
  name: z.ZodString;
  color: z.ZodString;
  description: z.ZodOptional<z.ZodString>;
  createdAt: z.ZodDate;
}, z.core.$strip>;
declare const TagSchema: z.ZodObject<{
  id: z.ZodString;
  name: z.ZodString;
  color: z.ZodString;
}, z.core.$strip>;
declare const ItemSchema: z.ZodObject<{
  id: z.ZodString;
  type: z.ZodEnum<{
    NOTE: "NOTE";
    TODO: "TODO";
  }>;
  title: z.ZodString;
  content: z.ZodString;
  completed: z.ZodBoolean;
  priority: z.ZodEnum<{
    LOW: "LOW";
    MEDIUM: "MEDIUM";
    HIGH: "HIGH";
  }>;
  tags: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    color: z.ZodString;
  }, z.core.$strip>>;
  pinned: z.ZodBoolean;
  dueDate: z.ZodOptional<z.ZodDate>;
  stackId: z.ZodOptional<z.ZodString>;
  createdAt: z.ZodDate;
  updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const TimeGroupSchema: z.ZodObject<{
  id: z.ZodString;
  label: z.ZodString;
  items: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
      NOTE: "NOTE";
      TODO: "TODO";
    }>;
    title: z.ZodString;
    content: z.ZodString;
    completed: z.ZodBoolean;
    priority: z.ZodEnum<{
      LOW: "LOW";
      MEDIUM: "MEDIUM";
      HIGH: "HIGH";
    }>;
    tags: z.ZodArray<z.ZodObject<{
      id: z.ZodString;
      name: z.ZodString;
      color: z.ZodString;
    }, z.core.$strip>>;
    pinned: z.ZodBoolean;
    dueDate: z.ZodOptional<z.ZodDate>;
    stackId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
  }, z.core.$strip>>;
}, z.core.$strip>;
declare const FocusSessionSchema: z.ZodObject<{
  id: z.ZodString;
  itemId: z.ZodString;
  startTime: z.ZodNumber;
  endTime: z.ZodOptional<z.ZodNumber>;
  completed: z.ZodBoolean;
  notes: z.ZodString;
}, z.core.$strip>;
declare const BrainMapNodeSchema: z.ZodObject<{
  id: z.ZodString;
  x: z.ZodNumber;
  y: z.ZodNumber;
  vx: z.ZodNumber;
  vy: z.ZodNumber;
  item: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
      NOTE: "NOTE";
      TODO: "TODO";
    }>;
    title: z.ZodString;
    content: z.ZodString;
    completed: z.ZodBoolean;
    priority: z.ZodEnum<{
      LOW: "LOW";
      MEDIUM: "MEDIUM";
      HIGH: "HIGH";
    }>;
    tags: z.ZodArray<z.ZodObject<{
      id: z.ZodString;
      name: z.ZodString;
      color: z.ZodString;
    }, z.core.$strip>>;
    pinned: z.ZodBoolean;
    dueDate: z.ZodOptional<z.ZodDate>;
    stackId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
  }, z.core.$strip>;
  radius: z.ZodNumber;
  connections: z.ZodNumber;
  isDragging: z.ZodBoolean;
  fixed: z.ZodBoolean;
}, z.core.$strip>;
declare const BrainMapLinkSchema: z.ZodObject<{
  source: z.ZodString;
  target: z.ZodString;
  strength: z.ZodNumber;
  sharedTags: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
type ItemSchemaType = z.infer<typeof ItemSchema>;
type StackSchemaType = z.infer<typeof StackSchema>;
type TagSchemaType = z.infer<typeof TagSchema>;
type ItemTypeEnumType = z.infer<typeof ItemTypeEnum>;
type ItemPriorityEnumType = z.infer<typeof ItemPriorityEnum>;
type TimeGroupSchemaType = z.infer<typeof TimeGroupSchema>;
type FocusSessionSchemaType = z.infer<typeof FocusSessionSchema>;
type BrainMapNodeSchemaType = z.infer<typeof BrainMapNodeSchema>;
type BrainMapLinkSchemaType = z.infer<typeof BrainMapLinkSchema>;
//#endregion
export { BrainMapLinkSchema, BrainMapLinkSchemaType, BrainMapNodeSchema, BrainMapNodeSchemaType, FocusSessionSchema, FocusSessionSchemaType, ItemPriorityEnum, ItemPriorityEnumType, ItemSchema, ItemSchemaType, ItemTypeEnum, ItemTypeEnumType, LayoutModeEnum, StackSchema, StackSchemaType, TagSchema, TagSchemaType, TimeFilterEnum, TimeGroupSchema, TimeGroupSchemaType, TimerModeEnum };
//# sourceMappingURL=index.d.mts.map