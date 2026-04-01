"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ─── Validation Schema ───
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum([
    "General Inquiry",
    "Recycling Consultation",
    "Partnership Opportunity",
    "Educational Resources",
    "Speaking Engagement",
  ]),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

const inquiryTypes = [
  "General Inquiry",
  "Recycling Consultation",
  "Partnership Opportunity",
  "Educational Resources",
  "Speaking Engagement",
] as const;

interface ContactFormProps {
  condensed?: boolean;
  className?: string;
}

export function ContactForm({ condensed = false, className }: ContactFormProps) {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    inquiryType: "General Inquiry",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate
    const schema = condensed
      ? contactFormSchema.pick({ name: true, email: true, message: true })
      : contactFormSchema;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryType: formData.inquiryType || "General Inquiry",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
      setFormData({ inquiryType: "General Inquiry" });
      toast.success("Message sent successfully! We'll be in touch soon.");
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("glass rounded-xl p-8 text-center", className)}
      >
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your message has been received. Our team will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={cn("glass rounded-xl p-6 md:p-8 space-y-5", className)}
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium mb-1.5"
        >
          Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Your full name"
          value={formData.name || ""}
          onChange={handleChange}
          className={cn(errors.name && "border-destructive")}
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium mb-1.5"
        >
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={formData.email || ""}
          onChange={handleChange}
          className={cn(errors.email && "border-destructive")}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* Company & Phone  -  full form only */}
      {!condensed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-company"
              className="block text-sm font-medium mb-1.5"
            >
              Company
            </label>
            <Input
              id="contact-company"
              name="company"
              placeholder="Your organization"
              value={formData.company || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium mb-1.5"
            >
              Phone
            </label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {/* Inquiry Type  -  full form only */}
      {!condensed && (
        <div>
          <label
            htmlFor="contact-inquiry"
            className="block text-sm font-medium mb-1.5"
          >
            Inquiry Type <span className="text-destructive">*</span>
          </label>
          <select
            id="contact-inquiry"
            name="inquiryType"
            value={formData.inquiryType || "General Inquiry"}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium mb-1.5"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={condensed ? 3 : 5}
          placeholder={
            condensed
              ? "How can we help?"
              : "Tell us about your recycling needs, partnership ideas, or questions..."
          }
          value={formData.message || ""}
          onChange={handleChange}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none",
            errors.message && "border-destructive"
          )}
        />
        {errors.message && (
          <p className="text-xs text-destructive mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {condensed ? "Send Message" : "Submit Inquiry"}
          </>
        )}
      </Button>

      {/* Footer */}
      <p className="text-xs text-muted-foreground/60 text-center pt-1">
        Powered by PolyRecycle
      </p>
    </motion.form>
  );
}
