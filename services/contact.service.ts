import { eq, or } from "drizzle-orm";

import db from "@/db";
import { contacts } from "@/db/schema";
import { buildResponse } from "@/lib/helper";

interface Props {
  email?: string | null;
  phoneNumber?: string | null;
}

export async function identifyContact({ email, phoneNumber }: Props) {
  const existingContact = await db
    .select()
    .from(contacts)
    .where(
      or(
        email ? eq(contacts.email, email) : undefined,
        phoneNumber ? eq(contacts.phoneNumber, phoneNumber) : undefined,
      ),
    );

  if (existingContact.length === 0) {
    const [newContact] = await db
      .insert(contacts)
      .values({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      })
      .returning();

    return buildResponse([newContact]);
  }

  const contactIds = existingContact.map((contact) => contact.id);
  const linkedIds = existingContact
    .filter((contact) => contact.linkedId)
    .map((contact) => contact.linkedId!);

  const allIds = [...new Set([...contactIds, ...linkedIds])];

  const relatedContacts = await db
    .select()
    .from(contacts)
    .where(
      or(
        ...allIds.map((id) => eq(contacts.id, id)),
        ...allIds.map((id) => eq(contacts.linkedId, id)),
      ),
    );

  const primaryContact = relatedContacts
    .filter((contact) => contact.linkPrecedence === "primary")
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

  const otherPrimaryContacts = relatedContacts.filter(
    (contact) =>
      contact.linkPrecedence === "primary" && contact.id !== primaryContact.id,
  );

  for (const contact of otherPrimaryContacts) {
    await db
      .update(contacts)
      .set({ linkPrecedence: "secondary", linkedId: primaryContact.id })
      .where(eq(contacts.id, contact.id));
  }

  const isNewEmail = email && !relatedContacts.some((c) => c.email === email);

  const isNewPhone =
    phoneNumber && !relatedContacts.some((c) => c.phoneNumber === phoneNumber);

  if (isNewEmail || isNewPhone) {
    const [newContact] = await db
      .insert(contacts)
      .values({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: "secondary",
      })
      .returning();

    relatedContacts.push(newContact);
  }

  const finalContacts = await db
    .select()
    .from(contacts)
    .where(
      or(
        eq(contacts.id, primaryContact.id),
        eq(contacts.linkedId, primaryContact.id),
      ),
    );

  return buildResponse(finalContacts);
}
