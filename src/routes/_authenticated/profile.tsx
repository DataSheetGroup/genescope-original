import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Save, KeyRound, Pencil, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import heartPulse from "@/assets/illustrations/heart-pulse.png";
import fireFlask from "@/assets/illustrations/fire-flask.png";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profile — GeneScope" },
      { name: "description", content: "Manage your GeneScope account details and preferences." },
    ],
  }),
});

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:items-center gap-2 md:gap-6 py-4 border-b border-card-foreground/10 last:border-b-0">
      <dt className="eyebrow text-card-foreground/60">{k}</dt>
      <dd className="text-sm leading-relaxed min-w-0">{v}</dd>
    </div>
  );
}

function ProfilePage() {
  const { user, updateProfile, changePassword, logout, refresh } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwStatus, setPwStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    setFullName(user.full_name ?? "");
    setPhone(user.phone ?? "");
    setOrganization(user.organization ?? "");
    setBio(user.bio ?? "");
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSaving(true);
    try {
      await updateProfile({
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        organization: organization.trim() || null,
        bio: bio.trim() || null,
      });
      setStatus({ kind: "ok", msg: "Profile updated." });
      setEditing(false);
    } catch (err) {
      setStatus({ kind: "err", msg: err instanceof Error ? err.message : "Could not save." });
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    if (!user) return;
    setFullName(user.full_name ?? "");
    setPhone(user.phone ?? "");
    setOrganization(user.organization ?? "");
    setBio(user.bio ?? "");
    setStatus(null);
    setEditing(false);
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwStatus(null);
    if (newPw.length < 8) {
      setPwStatus({ kind: "err", msg: "New password must be at least 8 characters." });
      return;
    }
    if (newPw !== confirmPw) {
      setPwStatus({ kind: "err", msg: "Passwords do not match." });
      return;
    }
    setPwSaving(true);
    try {
      await changePassword(currentPw, newPw);
      setPwStatus({ kind: "ok", msg: "Password updated." });
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err) {
      setPwStatus({ kind: "err", msg: err instanceof Error ? err.message : "Could not update password." });
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center text-foreground/70">
        Loading your profile…
      </div>
    );
  }

  const displayName = user.full_name?.trim() || user.email.split("@")[0];

  const inputCls =
    "w-full rounded-2xl bg-cream-dim px-4 py-3 text-sm text-card-foreground placeholder:text-card-foreground/40 focus:outline-none focus:ring-2 focus:ring-coral disabled:opacity-70";
  const staticCls = "text-sm text-card-foreground/90 py-3";

  return (
    <div className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-16 space-y-10 z-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="eyebrow text-coral mb-4">Account</div>
          <h1 className="display-lg">
            Your profile,
            <br />
            <span className="hl">yours to shape.</span>
          </h1>
        </div>

        {/* Identity card */}
        <div className="rounded-3xl bg-card text-card-foreground p-8 md:p-10 relative overflow-hidden">
          <img src={fireFlask} alt="" className="hidden md:block absolute right-6 top-6 w-20 object-contain opacity-90" />
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="eyebrow text-coral mb-2">Identity</div>
              <h2 className="font-display text-3xl">
                Signed in as <span className="hl">{displayName}</span>
              </h2>
            </div>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-wider transition hover:opacity-90 shrink-0"
                style={{ background: "var(--coral)", color: "var(--nav-bg)" }}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
            )}
          </div>
          <form onSubmit={handleSave}>
            <dl>
              <Row k="Email" v={<div className={staticCls}>{user.email}</div>} />
              <Row k="Role" v={<div className={`${staticCls} capitalize`}>{user.role}</div>} />
              <Row
                k="Full name"
                v={
                  editing ? (
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Dela Cruz" className={inputCls} />
                  ) : (
                    <div className={staticCls}>{fullName || <span className="text-card-foreground/40">Not set</span>}</div>
                  )
                }
              />
              <Row
                k="Phone"
                v={
                  editing ? (
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 900 000 0000" className={inputCls} />
                  ) : (
                    <div className={staticCls}>{phone || <span className="text-card-foreground/40">Not set</span>}</div>
                  )
                }
              />
              <Row
                k="Organization"
                v={
                  editing ? (
                    <input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="FEU Institute of Technology" className={inputCls} />
                  ) : (
                    <div className={staticCls}>{organization || <span className="text-card-foreground/40">Not set</span>}</div>
                  )
                }
              />
              <Row
                k="Bio"
                v={
                  editing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      placeholder="A short description of your role or research focus."
                      className={`${inputCls} resize-none`}
                    />
                  ) : (
                    <div className={staticCls}>{bio || <span className="text-card-foreground/40">Not set</span>}</div>
                  )
                }
              />
            </dl>
            {editing && (
              <div className="mt-6 flex items-center gap-3 min-h-[44px]">
                <div className="flex-1 min-h-[20px]">
                  {status && (
                    <span className={`text-xs ${status.kind === "ok" ? "text-emerald-600" : "text-coral"}`}>
                      {status.msg}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition hover:opacity-90 border border-card-foreground/20"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider disabled:opacity-50 transition hover:opacity-90"
                  style={{ background: "var(--coral)", color: "var(--nav-bg)" }}
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            )}
            {!editing && status?.kind === "ok" && (
              <div className="mt-4 text-xs text-emerald-600">{status.msg}</div>
            )}
          </form>
        </div>

        {/* Security card */}
        <div className="rounded-3xl bg-card text-card-foreground p-8 md:p-10 relative overflow-hidden">
          <img src={heartPulse} alt="" className="hidden md:block absolute right-6 top-6 w-20 object-contain opacity-90" />
          <div className="eyebrow text-coral mb-2">Security</div>
          <h2 className="font-display text-3xl mb-6">Change your <span className="hl">password</span></h2>
          <form onSubmit={handlePassword} className="space-y-4 max-w-xl">
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="Current password"
              className={inputCls}
            />
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="New password"
              className={inputCls}
            />
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Confirm new password"
              className={inputCls}
            />
            <div className="flex items-center gap-4 min-h-[44px] pt-2">
              <div className="flex-1 min-h-[20px]">
                {pwStatus && (
                  <span className={`text-xs ${pwStatus.kind === "ok" ? "text-emerald-600" : "text-coral"}`}>
                    {pwStatus.msg}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={pwSaving || !currentPw || !newPw}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider disabled:opacity-50 transition hover:opacity-90"
                style={{ background: "var(--coral)", color: "var(--nav-bg)" }}
              >
                <KeyRound className="h-4 w-4" />
                {pwSaving ? "Updating…" : "Update password"}
              </button>
            </div>
          </form>
        </div>

        {/* Sign out */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition hover:opacity-90"
            style={{ background: "var(--surface-strong)", color: "var(--nav-bg)" }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
