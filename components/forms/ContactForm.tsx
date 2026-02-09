"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "@/components/ui/Button";

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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.isHomeowner)
      newErrors.isHomeowner = "Please select an option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong submitting your information. Please try again or call us at (404) 446-6668."
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

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
          <svg
            className="h-8 w-8 text-orange"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-charcoal">Thank You!</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ve received your information and will be in touch within 1
          business day to discuss your eligibility.
        </p>
      </div>
    );
  }

  const inputStyles =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-charcoal placeholder-gray-400 transition-colors focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange";
  const labelStyles = "block text-sm font-medium text-charcoal mb-1.5";
  const errorStyles = "text-sm text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-md">
      <h3 className="text-2xl font-bold text-charcoal mb-2">
        Check Your Eligibility
      </h3>
      <p className="text-gray-600 mb-8">
        See if your home qualifies for FREE energy upgrades through Georgia&apos;s
        rebate program.
      </p>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelStyles}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className={inputStyles}
          />
          {errors.name && <p className={errorStyles}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email Address *
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
          {errors.email && <p className={errorStyles}>{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelStyles}>
            Phone Number *
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
          {errors.phone && <p className={errorStyles}>{errors.phone}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className={labelStyles}>
            Home Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Macon, GA 31201"
            className={inputStyles}
          />
          {errors.address && <p className={errorStyles}>{errors.address}</p>}
        </div>

        {/* Home Age */}
        <div>
          <label htmlFor="homeAge" className={labelStyles}>
            Approximate Home Age
          </label>
          <select
            id="homeAge"
            name="homeAge"
            value={formData.homeAge}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="">Select...</option>
            <option value="0-10">0–10 years</option>
            <option value="10-20">10–20 years</option>
            <option value="20-30">20–30 years</option>
            <option value="30+">30+ years</option>
          </select>
        </div>

        {/* Homeowner */}
        <div>
          <label htmlFor="isHomeowner" className={labelStyles}>
            Are you the homeowner? *
          </label>
          <select
            id="isHomeowner"
            name="isHomeowner"
            value={formData.isHomeowner}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.isHomeowner && (
            <p className={errorStyles}>{errors.isHomeowner}</p>
          )}
        </div>

        {/* Concerns */}
        <div>
          <label htmlFor="concerns" className={labelStyles}>
            Current Energy Concerns
          </label>
          <textarea
            id="concerns"
            name="concerns"
            value={formData.concerns}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about any issues — high energy bills, drafty rooms, uncomfortable temperatures..."
            className={inputStyles}
          />
        </div>

        {submitError && (
          <p className="text-sm text-red-500 rounded-lg bg-red-50 p-3">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={`w-full ${submitting ? "opacity-70 pointer-events-none" : ""}`}
        >
          {submitting ? "Submitting..." : "Submit for Eligibility Review"}
        </Button>
      </div>
    </form>
  );
}
