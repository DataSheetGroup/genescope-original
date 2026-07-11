import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

import logo from "@/assets/genescope-logo.png";
import microscope from "@/assets/stickers/microscope.png";
import flask from "@/assets/stickers/flask-purple.png";
import molecule from "@/assets/stickers/molecule.png";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · GeneScope" },
      { name: "description", content: "Sign in to GeneScope — restricted clinical decision-support workspace." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (typeof window !== "undefined" && isAuthenticated()) {
      throw redirect({ to: (search as Search).redirect ?? "/" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      setSuccess(true);
      const target = search.redirect ?? "/";
      setTimeout(() => navigate({ to: target }), 400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--cream)] text-[var(--ink)]">
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-[1.05fr_1fr] min-h-screen">
        {/* LEFT — editorial brand panel */}
        <aside
          className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 xl:p-16 text-[var(--cream)]"
          style={{ background: "var(--ink)" }}
        >
          {/* soft brand gradient wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 45% at 15% 10%, color-mix(in oklab, var(--teal) 55%, transparent), transparent 70%), radial-gradient(55% 45% at 90% 95%, color-mix(in oklab, var(--purple) 65%, transparent), transparent 72%)",
            }}
          />
          {/* floating stickers */}
          <img src={microscope} alt="" aria-hidden className="absolute top-16 right-14 w-24 animate-float" style={{ ["--rot" as never]: "-6deg" }} />
          <img src={flask} alt="" aria-hidden className="absolute bottom-40 left-10 w-20 animate-drift" style={{ ["--rot" as never]: "8deg" }} />
          <img src={molecule} alt="" aria-hidden className="absolute top-1/2 right-24 w-16 animate-float" style={{ ["--rot" as never]: "12deg" }} />

          {/* brand mark */}
          <div className="relative flex items-center gap-3">
            <img src={logo} alt="GeneScope" className="h-11 w-11 object-contain" />
            <span className="font-brand text-3xl tracking-wide">GeneScope</span>
          </div>

          {/* editorial headline */}
          <div className="relative">
            <div className="eyebrow mb-6 opacity-80">Clinical decision-support · Restricted</div>
            <h1 className="display-xl leading-[0.95]">
              A calibrated
              <br />
              <span className="hl">second opinion</span>
              <br />
              for genetic
              <br />
              testing.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[color-mix(in_oklab,var(--cream)_82%,transparent)]">
              Six structured inputs. One probability you can defend. A knowledge card the team
              actually reads — locally hosted, RA 10173-aligned.
            </p>
          </div>

          {/* footer badges */}
          <div className="relative flex flex-wrap items-center gap-3 text-xs">
            <span className="pill pill-outline !py-2 !px-4 !text-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              Authorized access only
            </span>
            <span className="pill pill-outline !py-2 !px-4 !text-xs">
              <Lock className="h-3.5 w-3.5" />
              Data Sheet Group · 2026
            </span>
          </div>
        </aside>

        {/* RIGHT — form */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            {/* mobile brand */}
            <Link to="/" className="lg:hidden mb-10 inline-flex items-center gap-2">
              <img src={logo} alt="GeneScope" className="h-9 w-9 object-contain" />
              <span className="font-brand text-2xl">GeneScope</span>
            </Link>

            <div className="eyebrow text-[color-mix(in_oklab,var(--ink)_65%,transparent)]">
              Sign in
            </div>
            <h2 className="mt-3 display-lg">
              Welcome <span className="hl">back</span>.
            </h2>
            <p className="mt-4 text-sm text-[color-mix(in_oklab,var(--ink)_70%,transparent)]">
              Enter your credentials to continue to the workspace.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[color-mix(in_oklab,var(--ink)_75%,transparent)] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={submitting || success}
                  placeholder="you@clinic.org"
                  className="w-full rounded-2xl border-2 border-[color-mix(in_oklab,var(--ink)_15%,transparent)] bg-white px-5 py-3.5 text-[var(--ink)] placeholder:text-[color-mix(in_oklab,var(--ink)_35%,transparent)] outline-none transition focus:border-[var(--purple)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--purple)_18%,transparent)] disabled:opacity-60"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[color-mix(in_oklab,var(--ink)_75%,transparent)]">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-[var(--purple)] hover:underline underline-offset-4">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={submitting || success}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border-2 border-[color-mix(in_oklab,var(--ink)_15%,transparent)] bg-white px-5 py-3.5 pr-12 text-[var(--ink)] placeholder:text-[color-mix(in_oklab,var(--ink)_35%,transparent)] outline-none transition focus:border-[var(--purple)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--purple)_18%,transparent)] disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[color-mix(in_oklab,var(--ink)_55%,transparent)] hover:text-[var(--ink)]"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[color-mix(in_oklab,var(--ink)_78%,transparent)] cursor-pointer select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-[var(--ink)]/30 accent-[var(--purple)]" />
                Keep me signed in on this device
              </label>

              {error && (
                <div role="alert" className="flex items-start gap-2 rounded-2xl border-2 border-[var(--destructive)]/40 bg-[var(--destructive)]/10 px-4 py-3 text-sm text-[var(--destructive)]">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div role="status" className="flex items-start gap-2 rounded-2xl border-2 border-[var(--teal)]/40 bg-[var(--teal)]/10 px-4 py-3 text-sm text-[var(--teal-deep)]">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Signed in. Redirecting…</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || success}
                className="group relative w-full rounded-full py-4 font-display uppercase tracking-wider text-base text-[var(--cream)] transition hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "var(--gradient-brand)" }}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Signing in…" : success ? "Success" : "Sign in"}
                {!submitting && !success && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </button>

              <div className="pt-2 text-center text-sm text-[color-mix(in_oklab,var(--ink)_65%,transparent)]">
                No account?{" "}
                <Link to="/register" className="font-semibold text-[var(--purple)] underline underline-offset-4">
                  Request access
                </Link>
              </div>

              <p className="text-center text-[11px] leading-relaxed text-[color-mix(in_oklab,var(--ink)_50%,transparent)]">
                Restricted system. Access limited to authorized partner clinicians and developers.
                All activity is logged for compliance.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
