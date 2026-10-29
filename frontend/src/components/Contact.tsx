import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

type ContactFormData = { name: string; email: string; message: string };

export default function Contact() {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to send message");
      }
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="px-6 max-w-2xl mx-auto py-24">
      <h2 className="font-display font-bold text-accent text-sm tracking-widest uppercase mb-4">Contact</h2>
      <p className="text-muted mb-8">Have a project in mind? Let's talk.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: true })} placeholder="Name" className="w-full bg-surface text-fg placeholder-muted rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
        <input {...register("email", { required: true })} type="email" placeholder="Email" className="w-full bg-surface text-fg placeholder-muted rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
        <textarea {...register("message", { required: true })} placeholder="Message" rows={5} className="w-full bg-surface text-fg placeholder-muted rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          className="bg-accent text-bg font-medium px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
        <AnimatePresence mode="wait">
          {isSubmitSuccessful && !error && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-accent text-sm"
            >
              Thanks — I'll get back to you soon.
            </motion.p>
          )}
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </section>
  );
}
