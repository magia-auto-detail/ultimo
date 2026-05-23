import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  inquiries: defineTable({
    name: v.string(),
    phone: v.string(),
    package: v.string(),
    vehicle: v.string(),
    notes: v.string(),
    status: v.string(), // "pending", "contacted", "completed"
  }),
});
