import { NextResponse } from 'next/server';

/**
 * Forwards enquiries to a Make webhook. The request goes through this route
 * rather than straight from the browser so the webhook URL stays server-side —
 * a NEXT_PUBLIC_ url would ship in the client bundle for anyone to spam.
 */
const WEBHOOK = process.env.MAKE_WEBHOOK_URL;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 100, email: 200, message: 4000, choice: 100 };

interface Payload {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  /** Honeypot — real people never see this field. */
  company?: string;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bot filled the hidden field: accept so it gets no signal, then drop it.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const projectType = body.projectType?.trim() ?? '';
  const budget = body.budget?.trim() ?? '';

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and message are required.' },
      { status: 400 }
    );
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: 'That email address does not look right.' },
      { status: 400 }
    );
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message ||
    projectType.length > MAX.choice ||
    budget.length > MAX.choice
  ) {
    return NextResponse.json({ error: 'That is too long.' }, { status: 400 });
  }

  if (!WEBHOOK) {
    console.error('MAKE_WEBHOOK_URL is not set — cannot forward enquiry.');
    return NextResponse.json(
      { error: 'The form is not configured yet. Please email instead.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        projectType,
        budget,
        message,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(`Make responded ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to forward enquiry to Make:', error);
    return NextResponse.json(
      { error: 'Could not send that. Please email instead.' },
      { status: 502 }
    );
  }
}
