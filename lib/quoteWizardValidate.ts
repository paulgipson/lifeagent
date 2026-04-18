import type { ContactDobFields } from "@/lib/quoteWizardTypes";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(s: string): boolean {
  return EMAIL.test(s.trim());
}

export function digitsOnlyPhone(s: string): string {
  return s.replace(/\D/g, "");
}

export function isValidUsPhone(s: string): boolean {
  const d = digitsOnlyPhone(s);
  if (d.length === 10) return true;
  if (d.length === 11 && d.startsWith("1")) return true;
  return false;
}

export function formatPhoneDisplay(raw: string): string {
  let d = digitsOnlyPhone(raw);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length === 10) {
    return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  const t = raw.trim();
  return t.length > 0 ? t : "(your phone)";
}

export function isValidDob(month: string, day: string, year: string): boolean {
  const mi = parseInt(month, 10);
  const di = parseInt(day, 10);
  const yi = parseInt(year, 10);
  if (!Number.isFinite(mi) || !Number.isFinite(di) || !Number.isFinite(yi)) return false;
  if (year.length !== 4) return false;
  if (mi < 1 || mi > 12 || di < 1 || di > 31) return false;
  const date = new Date(yi, mi - 1, di);
  if (date.getFullYear() !== yi || date.getMonth() !== mi - 1 || date.getDate() !== di) return false;
  const now = new Date();
  let age = now.getFullYear() - yi;
  const mo = now.getMonth() - (mi - 1);
  if (mo < 0 || (mo === 0 && now.getDate() < di)) age--;
  return age >= 18 && age <= 100;
}

export function validateDob(month: string, day: string, year: string): string | null {
  if (!isValidDob(month, day, year)) {
    return "Please enter a valid date of birth (you must be between 18 and 100).";
  }
  return null;
}

export function validateContact(
  v: Pick<ContactDobFields, "firstName" | "lastName" | "email" | "phone" | "state" | "consentCalls">,
): string | null {
  if (!v.firstName.trim() || !v.lastName.trim()) return "Please enter your first and last name.";
  if (!isValidEmail(v.email)) return "Please enter a valid email address.";
  if (!isValidUsPhone(v.phone)) return "Please enter a valid U.S. phone number.";
  if (!v.state) return "Please select your state.";
  if (!v.consentCalls) return "Please confirm consent to be contacted by phone or text about your request.";
  return null;
}

/** Full profile check (e.g. API submit). */
export function validateContactDob(v: ContactDobFields): string | null {
  const c = validateContact(v);
  if (c) return c;
  return validateDob(v.birthMonth, v.birthDay, v.birthYear);
}
