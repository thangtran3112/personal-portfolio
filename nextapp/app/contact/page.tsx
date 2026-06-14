"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { User2, MailIcon, HomeIcon, PhoneCall, MoveRight } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Enter a valid email").max(200),
  subject: z.string().min(1, "Subject is required").max(150),
  message: z.string().min(1, "Message is required").max(5000),
});

type ContactForm = z.infer<typeof contactSchema>;

// Inlined at build time. Points at the GCP contact Cloud Function. When unset
// (e.g. a build without the env var), the form degrades to "email me directly".
const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL;

const page = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactForm) => {
    if (!CONTACT_API_URL) return;
    setStatus("idle");
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="max-padd-container py-16 xl:py-24 bg-[#fdf3fb] dark:bg-transparent">
      {!CONTACT_API_URL && (
        <div className="text-muted-foreground mb-4 text-center">
          The contact form isn&apos;t wired up in this build. Please email me
          directly. Thank you!
        </div>
      )}
      <div className="flex flex-col xl:flex-row gap-12">
        {/* title */}
        <div className="flex flex-col flex-1 ">
          <span className="text-primary uppercase font-bold">Get in touch</span>
          <h3 className="h3 font-extrabold">Contact Me</h3>
          <p>
            Whether you have a project in mind, need some advice, or just want
            to chat about the latest in tech, I'd love to connect. I'm always
            excited to collaborate and explore new opportunities. Let's build
            something amazing together!
          </p>
          <div className="flex flex-col gap-y-5 mt-6 medium-15">
            <div className="flex gap-x-3">
              <span>
                <User2 size={20} />
              </span>
              :<span>Toby (Thang) Tran</span>
            </div>
            <div className="flex gap-x-3">
              <span>
                <PhoneCall size={20} />
              </span>
              :<span>+1 (425) 390-2078</span>
            </div>
            <div className="flex gap-x-3">
              <span>
                <MailIcon size={20} />
              </span>
              :<span>thangtran3112@gmail.com</span>
            </div>
            <div className="flex gap-x-3">
              <span>
                <HomeIcon size={20} />
              </span>
              :<span>21417, 120 Ave SE, Kent, WA, 98031</span>
            </div>
          </div>
        </div>
        {/* container */}
        <div className="flex-[1.5]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4 w-full mx-auto max-w-[33rem]"
          >
            <div className="flex gap-2 w-full">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none w-full"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="regular-14 text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="regular-14 text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter You Subject"
              className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none"
              {...register("subject")}
            />
            {errors.subject && (
              <p className="regular-14 text-red-500 -mt-2">
                {errors.subject.message}
              </p>
            )}
            <textarea
              cols={10}
              rows={8}
              placeholder="Enter You Message"
              className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none resize-none "
              {...register("message")}
            ></textarea>
            {errors.message && (
              <p className="regular-14 text-red-500 -mt-2">
                {errors.message.message}
              </p>
            )}
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting || !CONTACT_API_URL}
                className="gap-x-2 shadow-xl"
              >
                {isSubmitting ? "Sending..." : "Contact me"}
                <MoveRight size={20} />
              </Button>
              {status === "success" && (
                <span className="regular-14 text-green-600">
                  Thanks! Your message has been sent.
                </span>
              )}
              {status === "error" && (
                <span className="regular-14 text-red-500">
                  Something went wrong. Please email me directly.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
