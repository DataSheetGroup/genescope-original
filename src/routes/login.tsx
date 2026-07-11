import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

import logo from "@/assets/genescope-logo.png";
import microscope from "@/assets/stickers/microscope.png";
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
    <div className="h-screen w-full overflow-hidden" style={{ background: "var(--green-deep)" }}>
      <div className="h-full w-full grid lg:grid-cols-2">
        {/* LEFT — hero-green editorial slab */}
        <aside
          className="hidden lg:flex relative flex-col justify-between p-12 xl:p-16 text-cream overflow-hidden"
        >
          {/* stickers */}
          <img
            src={microscope}
            alt=""
            aria-hidden
            className="absolute top-10 right-10 w-24 opacity-90 animate-float"
            style={{ ["--rot" as never]: "-8deg" }}
          />
          <img
            src={molecule}
            alt=""
            aria-hidden
            className="absolute bottom-10 right-16 w-20 opacity-90 animate-drift"
            style={{ ["--rot" as never]: "10deg" }}
          />

          <Link to="/" className="inline-flex items-center gap-3 w-fit relative z-10">
            <img src={logo} alt="GeneScope" className="h-9 w-9 object-contain" />
            <span className="font-brand text-2xl">GeneScope</span>
          </Link>

          <div className="relative z-10">
            <div className="font-display text-sm md:text-base mb-4">
              A confident clinical decision
            </div>
            <h1 className="display-lg uppercase leading-[0.95]">
              Decisions
              <br />
              <span className="hl">without</span>
              <br />
              the guesswork.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/80">
              Sign in to access the restricted workspace for authorized partner
              clinicians and developers.
            </p>
          </div>

          <div className="relative z-10 text-xs text-cream/60">
            © 2026 Data Sheet Group · RA 10173-aligned
          </div>
        </aside>

        {/* RIGHT — cream slab with white card */}
        <section
          className="relative flex items-center justify-center px-6 py-8 sm:px-10 h-screen overflow-y-auto lg:overflow-hidden slab-cream"
          style={{
            borderTopLeftRadius: "2.5rem",
            borderBottomLeftRadius: "2.5rem",
          }}
        >
          <div
            className="w-full max-w-sm rounded-[2rem] bg-white p-8 md:p-10"
            style={{ boxShadow: "0 20px 60px -30px rgba(15,61,46,0.35)" }}
          >
            {/* mobile brand */}
            <Link to="/" className="lg:hidden mb-6 inline-flex items-center gap-2">
              <img src={logo} alt="GeneScope" className="h-8 w-8 object-contain" />
              <span className="font-brand text-xl" style={{ color: "var(--green-deep)" }}>GeneScope</span>
            </Link>

            <div className="eyebrow" style={{ color: "var(--green-deep)", opacity: 0.65 }}>
              Sign in
            </div>
            <h2
              className="mt-2 font-display text-3xl md:text-4xl uppercase leading-tight"
              style={{ color: "var(--green-deep)" }}
            >
              Welcome <span className="hl">back</span>.
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--green-deep)", opacity: 0.7 }}>
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--green-deep)", opacity: 0.75 }}
                >
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
                  className="w-full rounded-xl bg-[var(--cream)] px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--green-deep)] disabled:opacity-60"
                  style={{
                    color: "var(--green-deep)",
                    border: "1.5px solid color-mix(in oklab, var(--green-deep) 15%, transparent)",
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--green-deep)", opacity: 0.75 }}
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold hover:underline underline-offset-4"
                    style={{ color: "var(--coral)" }}
                  >
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
                    className="w-full rounded-xl bg-[var(--cream)] px-4 py-3 pr-11 outline-none transition focus:ring-2 focus:ring-[var(--green-deep)] disabled:opacity-60"
                    style={{
                      color: "var(--green-deep)",
                      border: "1.5px solid color-mix(in oklab, var(--green-deep) 15%, transparent)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "color-mix(in oklab, var(--green-deep) 55%, transparent)" }}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label
                className="flex items-center gap-2 text-sm cursor-pointer select-none"
                style={{ color: "var(--green-deep)", opacity: 0.78 }}
              >
                <input type="checkbox" className="h-4 w-4 rounded accent-[var(--green-deep)]" />
                Keep me signed in
              </label>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
                  style={{
                    background: "color-mix(in oklab, var(--destructive) 10%, transparent)",
                    color: "var(--destructive)",
                    border: "1px solid color-mix(in oklab, var(--destructive) 30%, transparent)",
                  }}
                >
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
                  style={{
                    background: "color-mix(in oklab, var(--teal) 15%, transparent)",
                    color: "var(--teal-deep)",
                    border: "1px solid color-mix(in oklab, var(--teal) 30%, transparent)",
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Signed in. Redirecting…</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || success}
                className="pill pill-coral w-full justify-center !py-3.5"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Signing in…" : success ? "Success" : "Sign in"}
              </button>

              <div className="text-center text-sm" style={{ color: "var(--green-deep)", opacity: 0.7 }}>
                No account?{" "}
                <Link
                  to="/register"
                  className="font-semibold underline underline-offset-4"
                  style={{ color: "var(--green-deep)" }}
                >
                  Request access
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
