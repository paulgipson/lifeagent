/**
 * Appointment booking (Cal.com).
 *
 * Set NEXT_PUBLIC_CAL_LINK to the Cal.com event path, e.g. "paul-gipson/15min".
 * When unset, booking UI falls back to click-to-call / text so the page still converts.
 */

export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

export const bookingEnabled = CAL_LINK.length > 0;

export type BookingPrefill = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

/** Full Cal.com URL with prefilled booker fields (for links / fallback iframe). */
export function bookingUrl(prefill: BookingPrefill = {}): string {
  if (!bookingEnabled) return "";
  const url = new URL(`https://cal.com/${CAL_LINK}`);
  if (prefill.name) url.searchParams.set("name", prefill.name);
  if (prefill.email) url.searchParams.set("email", prefill.email);
  if (prefill.phone) url.searchParams.set("attendeePhoneNumber", prefill.phone);
  if (prefill.notes) url.searchParams.set("notes", prefill.notes);
  return url.toString();
}

export const bookingCopy = {
  heading: "Pick a time that works for you",
  sub: "Grab a 15-minute slot and I'll call you then — no waiting around for a callback.",
  durationLabel: "15 minutes · Phone call · Free",
} as const;
