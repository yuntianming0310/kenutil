import { useState, useCallback, FormEvent, ChangeEvent } from "react";

/**
 * Validation errors for form fields
 */
type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Options for useForm hook
 */
interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => FormErrors<T>;
}

/**
 * Return type of useForm hook
 */
interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  resetForm: () => void;
}

/**
 * A lightweight, elegant form management hook
 *
 * @param options - Form configuration
 * @returns Form state and handlers
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors: any = {};
 *     if (!values.email) errors.email = 'Required';
 *     if (!values.password) errors.password = 'Required';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await login(values);
 *   }
 * });
 *
 * <form onSubmit={form.handleSubmit}>
 *   <input name="email" value={form.values.email} onChange={form.handleChange} />
 *   {form.errors.email && <span>{form.errors.email}</span>}
 * </form>
 * ```
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setValues((prev) => ({ ...prev, [name]: newValue }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate
      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      // Submit
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  };
}
