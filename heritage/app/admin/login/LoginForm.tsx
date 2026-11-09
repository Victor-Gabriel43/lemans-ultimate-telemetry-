"use client";

import { useActionState } from "react";
import { login } from "@/lib/admin-actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="mt-8 space-y-4">
      <label htmlFor="pw" className="text-sm text-fog block">Password</label>
      <input id="pw" name="password" type="password" required autoComplete="current-password" className="w-full border rule bg-pit px-3 py-2 focus:border-fog focus:outline-none" />
      {state.error ? <p role="alert" className="text-sm text-flag">{state.error}</p> : null}
      <button disabled={pending} className="rounded-full bg-paper px-6 py-2.5 text-sm text-ink">Sign in</button>
    </form>
  );
}
