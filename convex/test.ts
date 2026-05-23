import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

export const testResendKey = action({
  args: { apiKey: v.string() },
  returns: v.any(),
  handler: async (_ctx, args) => {
    try {
      const resend = new Resend(args.apiKey);
      const { data, error } = await resend.emails.send({
        from: "Magia Auto Detail <onboarding@resend.dev>",
        to: ["magiaautodetailllc@gmail.com"],
        subject: "Test Email from Magia Auto Detail",
        html: "<h1>It works!</h1><p>The Resend API key is valid.</p>",
      });

      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
});
