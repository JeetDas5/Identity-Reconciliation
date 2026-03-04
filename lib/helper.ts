import { Contact } from "@/types/contact.types";

export function buildResponse(contacts: Contact[]) {
  const primaryContact = contacts.find(
    (contact) => contact.linkPrecedence === "primary",
  )!;

  const emails = [
    ...new Set(contacts.map((contact) => contact.email).filter(Boolean)),
  ];
  const phoneNumbers = [
    ...new Set(contacts.map((contact) => contact.phoneNumber).filter(Boolean)),
  ];

  const secondaryContactIds = contacts
    .filter((contact) => contact.linkPrecedence === "secondary")
    .map((contact) => contact.id);

  return {
    contact: {
      primaryContactId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds,
    },
  };
}
