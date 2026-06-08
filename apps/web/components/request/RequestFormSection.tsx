"use client";

import { useState } from "react";
import type { RequestPageContent } from "@/lib/content/types";
import styles from "./RequestFormSection.module.css";

interface Props {
  content: RequestPageContent["form"];
  pricingContent: RequestPageContent["pricing"];
}

type FormData = Record<string, string | string[]>;

function FormField({
  field,
  value,
  onChange,
}: {
  field: RequestPageContent["form"]["steps"][number]["fields"][number];
  value: string | string[];
  onChange: (val: string | string[]) => void;
}) {
  if (field.type === "textarea") {
    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={field.id}>
          {field.label}
          {field.required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
        <textarea
          id={field.id}
          className={styles.textarea}
          placeholder={field.placeholder}
          required={field.required}
          rows={4}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={field.id}>
          {field.label}
          {field.required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
        <div className={styles.selectWrapper}>
          <select
            id={field.id}
            className={styles.select}
            required={field.required}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select an option</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className={styles.selectArrow} aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (field.type === "checkbox-group") {
    const checked = Array.isArray(value) ? value : [];
    return (
      <div className={styles.field}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.fieldLabel}>
            {field.label}
          </legend>
          <div className={styles.checkboxGrid}>
            {field.options?.map((opt) => (
              <label key={opt} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  value={opt}
                  checked={checked.includes(opt)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...checked, opt]
                      : checked.filter((v) => v !== opt);
                    onChange(next);
                  }}
                />
                <span className={styles.checkboxCustom} aria-hidden="true" />
                <span className={styles.checkboxText}>{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={field.id}>
        {field.label}
        {field.required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <input
        id={field.id}
        type={field.type}
        className={styles.input}
        placeholder={field.placeholder}
        required={field.required}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function RequestFormSection({ content, pricingContent }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = content.steps.length;
  const step = content.steps[currentStep];

  function handleFieldChange(id: string, value: string | string[]) {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function getFieldValue(id: string): string | string[] {
    return formData[id] ?? "";
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Audit enquiry submitted:", formData);
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.success}>
            <div className={styles.successIcon} aria-hidden="true" />
            <h2 className={styles.successHeading}>{content.successHeading}</h2>
            <p className={styles.successBody}>{content.successBody}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Progress */}
        <div className={styles.progress} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={totalSteps}>
          <div className={styles.progressSteps}>
            {content.steps.map((s, i) => (
              <div
                key={s.id}
                className={`${styles.progressStep} ${
                  i < currentStep
                    ? styles.progressStepDone
                    : i === currentStep
                    ? styles.progressStepActive
                    : styles.progressStepFuture
                }`}
              >
                <span className={styles.progressStepNum}>{i + 1}</span>
                <span className={styles.progressStepLabel}>{s.heading}</span>
              </div>
            ))}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formStep}>
            <h2 className={styles.stepHeading}>{step.heading}</h2>
            <div className={styles.fields}>
              {step.fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={getFieldValue(field.id)}
                  onChange={(val) => handleFieldChange(field.id, val)}
                />
              ))}
            </div>
          </div>

          <div className={styles.navigation}>
            {currentStep > 0 && (
              <button type="button" onClick={handleBack} className={styles.backBtn}>
                Back
              </button>
            )}
            <div className={styles.navRight}>
              {currentStep < totalSteps - 1 ? (
                <button type="button" onClick={handleNext} className={styles.nextBtn}>
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? content.submittingLabel : content.submitLabel}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Pricing note */}
        <aside className={styles.pricingNote}>
          <span className={styles.pricingLabel}>{pricingContent.label}</span>
          <p className={styles.pricingBody}>{pricingContent.body}</p>
        </aside>
      </div>
    </section>
  );
}
