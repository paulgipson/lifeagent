/** Shared field types for `/get-quote` wizard. */

export type ContactDobFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  /** TCPA-style consent for calls/texts about the quote */
  consentCalls: boolean;
  /** Optional recurring marketing SMS — only use if you send promotional SMS */
  consentSms: boolean;
  sex: "" | "male" | "female";
};
