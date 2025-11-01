import z from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE"]);

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  gender: GenderEnum,
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
export type GenderEnumType = z.infer<typeof GenderEnum>;
