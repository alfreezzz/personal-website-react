import { useState, useRef, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import VariableProximity from "../components/VariableProximity";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ContactErrors {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type FormField = keyof ContactForm;

interface SocialLink {
  key: string;
  href: string;
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  icon: React.ReactNode;
}

export default function Contact() {
  const containerRef = useRef(null);

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateName = (value: string): string =>
    value.trim().length < 5 ? "Name must be at least 5 characters long" : "";


  const validateEmail = (value: string): string =>
    !emailRegex.test(value) ? "Please enter a valid email address" : "";

  const validateMessage = (value: string): string =>
    value.trim().length < 10
      ? "Message must be at least 10 characters long"
      : "";

  const isFormValid: boolean =
    form.name.trim().length >= 5 &&
    emailRegex.test(form.email) &&
    form.message.trim().length >= 10;

  const handleChange =
    (field: FormField) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleBlur =
    (field: FormField, validator: (value: string) => string) =>
    (_e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setErrors((prev) => ({ ...prev, [field]: validator(form[field]) }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const messageError = validateMessage(form.message);
    setErrors({ name: nameError, email: emailError, message: messageError });

    if (nameError || emailError || messageError) return;

    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mzdldzvg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const arrowIcon = (
    <svg
      className="w-4 h-4 lg:w-5 lg:h-5 ml-1 group-hover:translate-x-1.5 transition group-hover:-translate-y-0.5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#C7EEFF"
    >
      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
  );

  const socialLinks: SocialLink[] = [
    {
      key: "github",
      href: "https://github.com/alfreezzz",
      label: "GitHub",
      title: "Discover my GitHub projects",
      description: "Explore my repositories and see what I've been working on.",
      ctaLabel: "Visit my GitHub profile",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>GitHub</title>
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="#FF69B4"
          />
        </svg>
      ),
    },
    {
      key: "linkedin",
      href: "https://www.linkedin.com/in/alfriza-akhmad-rahadi",
      label: "LinkedIn",
      title: "Connect with me on LinkedIn",
      description: "Let's collaborate and grow our professional network together.",
      ctaLabel: "Check out my LinkedIn profile",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>LinkedIn</title>
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.327-.025-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.35V9h3.413v1.561h.049c.475-.899 1.637-1.852 3.372-1.852 3.605 0 4.269 2.372 4.269 5.455v6.288zM5.337 7.433c-1.144 0-2.072-.93-2.072-2.075 0-1.144.928-2.073 2.072-2.073 1.145 0 2.073.929 2.073 2.073 0 1.145-.928 2.075-2.073 2.075zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
            fill="#0A66C2"
          />
        </svg>
      ),
    },
    {
      key: "instagram",
      href: "https://www.instagram.com/alfreezzz_/",
      label: "Instagram",
      title: "Or follow me on Instagram",
      description: "Stay connected and see more of my journey.",
      ctaLabel: "Follow me on Instagram",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Instagram</title>
          <path
            d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
            fill="#FF0069"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      id="contact"
      className="px-3 mt-32 xl:px-32 lg:px-5 sm:px-5 mb-20 lg:mb-32"
    >
      <div
        ref={containerRef}
        style={{ position: "relative" }}
        className="flex items-center justify-center w-full"
      >
        <VariableProximity
          label={"Contact Me!"}
          className="text-center lg:text-7xl sm:text-6xl mobile-m:text-5xl text-4xl lg:py-3 pb-5 sm:pb-4 bg-gradient-to-b from-[#0077C0] via-[#0077C0] to-[#C7EEFF] bg-clip-text text-transparent"
          fromFontVariationSettings="'wght' 300, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={700}
          falloff="linear"
        />
      </div>
      <h2 className="mb-3 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm max-lg:-mt-3">
        Feel free to <span className="font-semibold">reach out</span> and{" "}
        <span className="font-semibold">get in touch</span>.
      </h2>

      <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#0077C0] to-transparent" />

      <div className="flex items-center gap-16 mt-12 max-lg:flex-col lg:mt-16">
        {/* Contact form styled as a tablet / handheld device */}
        <div className="relative lg:w-[50%] w-full max-w-sm mx-auto lg:max-w-none">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[#0077C0]/10 blur-3xl" />

          <div className="relative rounded-[2.5rem] bg-neutral-900 p-3 sm:p-4 ring-1 ring-white/10 shadow-2xl shadow-black/60">
            {/* decorative side buttons */}
            <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-full bg-white/10" />
            <span className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-full bg-white/10" />
            <span className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-full bg-white/10" />

            <div className="rounded-[1.75rem] bg-black px-5 py-7 sm:px-8 sm:py-8 ring-1 ring-white/5">
              {/* notch */}
              <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-white/10" />

              <h2 className="mb-5 text-xl font-bold text-center sm:text-3xl lg:text-2xl">
                Contact Form
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 lg:gap-1"
                action="https://formspree.io/f/mzdldzvg"
                method="POST"
              >
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name", validateName)}
                    placeholder="Phantom thieves"
                    className="w-full px-3 py-2 transition border rounded-xl border-white/10 bg-white/5 focus:border-[#0077C0]/60 focus:outline-none focus:ring-2 focus:ring-[#0077C0]"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">{errors.name}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email", validateEmail)}
                    placeholder="phantom@metaverse.jp"
                    className="w-full px-3 py-2 transition border rounded-xl border-white/10 bg-white/5 focus:border-[#0077C0]/60 focus:outline-none focus:ring-2 focus:ring-[#0077C0]"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message", validateMessage)}
                    placeholder="Take your time... and leave a message."
                    className="w-full h-32 px-3 py-2 transition border resize-none rounded-xl border-white/10 bg-white/5 focus:border-[#0077C0]/60 focus:outline-none focus:ring-2 focus:ring-[#0077C0]"
                  ></textarea>
                  {errors.message && (
                    <span className="text-sm text-red-500">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || status === "sending"}
                  className={`relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none ${
                    !isFormValid || status === "sending"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                  <span className="inline-flex items-center justify-center w-full h-full gap-2 text-sm font-medium text-white rounded-lg cursor-pointer bg-slate-950 px-7 backdrop-blur-3xl">
                    {status === "sending" ? "Sending..." : "Send your message"}
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
                    </svg>
                  </span>
                </button>

                {status === "sent" && (
                  <p className="mt-2 text-sm text-center text-green-400">
                    Message sent! Thanks for reaching out.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-2 text-sm text-center text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>

              <p className="mt-8 text-sm font-light tracking-wider text-center">
                Or send me mail by{" "}
                <a
                  href="mailto:alfrizaakhmadr@gmail.com"
                  className="inline-flex items-center justify-center font-bold text-gray-300 underline transition group hover:text-gray-400"
                >
                  <span>mailto: instead</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out lg:w-5 lg:h-5 rotate-12 group-hover:animate-bounce"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#C7EEFF"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                </a>
              </p>

              {/* home indicator */}
              <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* Social links as individual cards */}
        <div className="flex flex-col w-full gap-4 lg:w-[50%]">
          {socialLinks.map((social) => (
            <div
              key={social.key}
              className="flex gap-4 p-5 transition duration-300 border group rounded-2xl border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-[#C7EEFF]/40 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-black/30"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 p-2 border shrink-0 rounded-xl border-white/10 bg-white/5"
                aria-label={social.label}
              >
                {social.icon}
              </a>
              <div className="min-w-0 leading-normal">
                <h3 className="text-base font-bold tracking-wide lg:text-2xl sm:text-xl">
                  {social.title}
                </h3>
                <p className="text-sm tracking-wide font-extralight text-gray-400 sm:text-base max-sm:my-1">
                  {social.description}
                </p>
                <a
                  href={social.href}
                  className="inline-flex items-center justify-center font-medium tracking-wider transition group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm sm:text-base text-[#C7EEFF] group-hover/link:underline">
                    {social.ctaLabel}
                  </span>
                  {arrowIcon}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}