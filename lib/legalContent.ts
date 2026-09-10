/**
 * Legal / compliance copy — have your attorney review before relying on it for filings or disputes.
 * Edit license identifiers and state list to match your appointments.
 */

import { paul, site } from "@/lib/content";
import { licensedStateNameSentence } from "@/lib/licenses";

export const legalMeta = {
  lastUpdatedLabel: "Last updated: April 16, 2026",
} as const;

/** Short footer blurb (column 1) — licensing & relationship disclosure */
export const footerBrandDisclaimer = `${site.tagline} Insurance products are offered through ${paul.displayName}, a licensed insurance producer. ${site.name} is not an insurance carrier.`;

/** Footer bar — regulatory / product disclaimer */
export const footerRegulatoryDisclaimer = `${paul.displayName} is licensed as a life insurance producer in ${licensedStateNameSentence}. Products, features, and rates are subject to carrier approval and availability; not all products are available in all states. This site is for marketing and general information; it is not legal, tax, or investment advice. Testimonials, when shown, are from real clients and are not paid.`;

/** National Producer Number (NAIC) — https://nipr.com */
export const nationalProducerNumber = "21670586";

/** Optional: California Department of Insurance producer license # (separate from NPN) */
export const californiaProducerLicenseNumber: string | null = null;

/** Licensing lines for the footer — NPN always; state license when set */
export function footerLicenseLines(): readonly string[] {
  const lines: string[] = [`National Producer Number (NPN): ${nationalProducerNumber}.`];
  if (californiaProducerLicenseNumber) {
    lines.push(`California Department of Insurance producer license no. ${californiaProducerLicenseNumber}.`);
  }
  return lines;
}

/** TCPA / contact consent — calls (required for lead forms) */
export const tcpaConsentCallsText = `I consent to receive calls and text messages (including automated or prerecorded calls and texts) from or on behalf of ${paul.displayName} and ${site.name} at the phone number I provided, regarding my quote request and related insurance information. I understand consent is not required to purchase a policy, message and data rates may apply, and I can opt out of marketing texts as described in our policies.`;

/** Optional SMS / recurring marketing — only surface if you send promotional SMS */
export const tcpaConsentSmsText = `I agree to receive recurring promotional and informational text messages from ${site.name} at the number provided. Message frequency varies. Reply STOP to opt out; HELP for help.`;

export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

export const privacyPolicySections: readonly LegalSection[] = [
  {
    heading: "Introduction",
    paragraphs: [
      `${site.name} (“we,” “us,” or “our”) respects your privacy. This Privacy Policy describes how we collect, use, and share information when you visit ${site.url} (the “Site”) or submit a quote request or other form.`,
      "This policy is provided for transparency. Have your legal counsel review it alongside your marketing and data practices.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "Contact and identity information you provide (such as name, email address, phone number, and state of residence).",
      "Quote-related details you submit (such as coverage interests, budget range, health-related selections you choose to provide, and similar questionnaire responses).",
      "Technical data automatically collected when you use the Site (such as IP address, browser type, device type, and pages viewed), including through cookies and similar technologies where applicable.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "To respond to your inquiries, provide quotes, and deliver insurance-related services.",
      "To communicate with you by phone, email, or text as permitted by law and consistent with the consent you provide.",
      "To operate, maintain, and improve the Site; analyze usage; and protect security and integrity.",
      "To comply with legal obligations and enforce our terms.",
    ],
  },
  {
    heading: "Sharing",
    paragraphs: [
      "We may share information with insurance carriers, underwriters, and service providers who assist in quoting, enrollment, or technology hosting, subject to contractual safeguards appropriate to the relationship.",
      "We may disclose information if required by law, subpoena, or to protect our rights and the safety of users.",
      "We do not sell your personal information for monetary consideration. If we use analytics or advertising tools, we configure them to align with our privacy commitments and applicable law.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "We may use cookies and similar technologies for Site functionality, preferences, and aggregated analytics. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You may opt out of marketing emails by using the unsubscribe link in those messages where available.",
      "For text messages, reply STOP to cancel marketing texts as instructed in the message, or contact us using the information below.",
      "Residents of certain states may have additional privacy rights under state law. We will honor applicable requests as required.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "We retain information for as long as needed to provide services, meet legal and regulatory requirements, and resolve disputes.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The Site is not directed to children under 16, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the “Last updated” date.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions about this policy: ${site.email} or ${site.phone}.`,
    ],
  },
];

export const termsOfServiceSections: readonly LegalSection[] = [
  {
    heading: "Agreement",
    paragraphs: [
      `By accessing ${site.url} or submitting information through the Site, you agree to these Terms of Service. If you do not agree, do not use the Site.`,
    ],
  },
  {
    heading: "Not an offer or binder",
    paragraphs: [
      "Information on the Site is for general marketing and educational purposes. It is not an offer to sell insurance, a guarantee of coverage, or a binder of insurance. Any policy is subject to underwriting approval, carrier issue, and complete contract terms.",
    ],
  },
  {
    heading: "No professional advice",
    paragraphs: [
      `${site.name} does not provide legal, tax, or investment advice. You should consult qualified professionals regarding your specific situation.`,
    ],
  },
  {
    heading: "Eligibility and state availability",
    paragraphs: [
      "Insurance products vary by state and carrier. Not all products discussed on the Site are available in every jurisdiction. Licensing and appointments determine what can be offered where you live.",
    ],
  },
  {
    heading: "Communications and consent",
    paragraphs: [
      "When you provide a phone number or email, you agree we may contact you regarding your request in accordance with applicable law and any consent you provide (including TCPA and CAN-SPAM where applicable).",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      `To the fullest extent permitted by law, ${site.name} and ${paul.displayName} disclaim liability for indirect, incidental, special, consequential, or punitive damages arising from your use of the Site. Total liability for any claim related to the Site shall not exceed the greater of one hundred U.S. dollars ($100) or the amounts you paid to us for services directly tied to the claim in the twelve (12) months before the claim.`,
      "Some jurisdictions do not allow certain limitations; in those jurisdictions, our liability is limited to the maximum permitted by law.",
    ],
  },
  {
    heading: "Indemnity",
    paragraphs: [
      `You agree to indemnify and hold harmless ${site.name} and ${paul.displayName} from claims arising out of your misuse of the Site or violation of these Terms.`,
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "The Site may link to third-party websites. We are not responsible for their content or privacy practices.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may modify these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions: ${site.email} or ${site.phone}.`,
    ],
  },
];
