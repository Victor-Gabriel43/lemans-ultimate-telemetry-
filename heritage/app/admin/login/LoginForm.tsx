"use client";

import { useActionState } from "react";
import { login } from "@/lib/admin-actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="mt-8 space-y-4">
      <label htmlFor="pw" className="eyebrow block">Password</label>
      <input id="pw" name="password" type="password" required autoComplete="current-password" className="w-full border hairline bg-carbon px-3 py-2 focus:border-mute focus:outline-none" />
      {state.error ? <p role="alert" className="text-sm text-signal">{state.error}</p> : null}
      <button disabled={pending} className="rounded-full bg-paper px-6 py-2.5 text-sm text-ink">Sign in</button>
    </form>
  );
}
