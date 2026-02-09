"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  UserIcon,
  HomeIcon,
  BoltIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  homeAge: string;
  isHomeowner: string;
  concerns: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  homeAge: "",
  isHomeowner: "",
  concerns: "",
};

const steps = [
  { label: "Your Home", icon: HomeIcon },
  { label: "Energy", icon: BoltIcon },
  { label: "Contact", icon: UserIcon },
];

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateStep = (s: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (s === 0) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.isHomeowner)
        newErrors.isHomeowner = "Please select an option";
    }

    if (s === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or call us at (404) 446-6668."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputStyles =
    "w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-charcoal placeholder-gray-400 transition-all duration-200 focus:border-orange focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange/20";
  const labelStyles = "block text-sm font-semibold text-charcoal mb-2";
  const errorStyles = "text-xs text-red-500 mt-1.5 font-medium";

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange to-amber"
        >
          <CheckIcon className="h-10 w-10 text-white" strokeWidth={3} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-charcoal">You&apos;re All Set!</h3>
          <p className="mt-3 text-gray-500 leading-relaxed">
            We&apos;ll be in touch within 1 business day to discuss your eligibility.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-charcoal">
          Check Your Eligibility
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isComplete = i < step;
          return (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isComplete
                    ? "bg-orange text-white"
                    : isActive
                    ? "bg-orange/10 text-orange ring-2 ring-orange"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isComplete ? (
                  <CheckIcon className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    isComplete ? "bg-orange" : "bg-gray-100"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="address" className={labelStyles}>
                    Home Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, Macon, GA 31201"
                    className={inputStyles}
                    autoFocus
                  />
                  {errors.address && (
                    <p className={errorStyles}>{errors.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="homeAge" className={labelStyles}>
                    Approximate Home Age
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "0-10", label: "0–10 yrs" },
                      { value: "10-20", label: "10–20 yrs" },
                      { value: "20-30", label: "20–30 yrs" },
                      { value: "30+", label: "30+ yrs" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, homeAge: opt.value }))
                        }
                        className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          formData.homeAge === opt.value
                            ? "border-orange bg-orange/5 text-orange"
                            : "border-gray-100 bg-gray-50/50 text-gray-600 hover:border-gray-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelStyles}>
                    Are you the homeowner?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            isHomeowner: opt.value,
                          }))
                        }
                        className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          formData.isHomeowner === opt.value
                            ? "border-orange bg-orange/5 text-orange"
                            : "border-gray-100 bg-gray-50/50 text-gray-600 hover:border-gray-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.isHomeowner && (
                    <p className={errorStyles}>{errors.isHomeowner}</p>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="concerns" className={labelStyles}>
                    Any energy concerns? <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="concerns"
                    name="concerns"
                    value={formData.concerns}
                    onChange={handleChange}
                    rows={5}
                    placeholder="High energy bills, drafty rooms, uncomfortable temperatures..."
                    className={inputStyles}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className={labelStyles}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={inputStyles}
                    autoFocus
                  />
                  {errors.name && <p className={errorStyles}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelStyles}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputStyles}
                  />
                  {errors.email && (
                    <p className={errorStyles}>{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className={labelStyles}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(404) 555-1234"
                    className={inputStyles}
                  />
                  {errors.phone && (
                    <p className={errorStyles}>{errors.phone}</p>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-red-500 rounded-xl bg-red-50 p-3 font-medium">
                    {submitError}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-charcoal"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        )}

        <div className="flex-1" />

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-2 rounded-xl bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-amber hover:shadow-xl hover:shadow-amber/25"
          >
            Continue
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`flex items-center gap-2 rounded-xl bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-amber hover:shadow-xl hover:shadow-amber/25 ${
              submitting ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {submitting ? "Submitting..." : "Submit"}
            {!submitting && <CheckIcon className="h-4 w-4" strokeWidth={3} />}
          </button>
        )}
      </div>
    </div>
  );
}
