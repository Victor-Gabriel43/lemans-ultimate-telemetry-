import { authMode } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function Login() {
  const mode = authMode();
  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <h1 className="display text-4xl">Curator sign-in</h1>
      {mode === "locked" ? (
        <p className="mt-4 text-sm text-soft">The dashboard is locked. Set the <code className="font-mono">ADMIN_PASSWORD</code> environment variable to enable it.</p>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
