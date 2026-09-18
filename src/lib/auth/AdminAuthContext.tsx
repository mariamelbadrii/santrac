import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AdminAuthContextValue {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  roleError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roleError, setRoleError] = useState<string | null>(null);
  // Tracks which user's admin role has already been resolved, so `loading`
  // never flips to false between a session becoming available and its role
  // check completing (that gap is what let AdminGuard redirect too early).
  const checkedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const applySession = async (nextSession: Session | null) => {
      setSession(nextSession);

      if (!nextSession) {
        checkedUserId.current = null;
        setIsAdmin(false);
        setRoleError(null);
        setLoading(false);
        return;
      }

      if (checkedUserId.current === nextSession.user.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: nextSession.user.id,
        _role: "admin",
      });
      if (cancelled) return;
      checkedUserId.current = nextSession.user.id;
      setIsAdmin(Boolean(data) && !error);
      setRoleError(error?.message ?? null);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        applySession(nextSession);
      },
    );

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn: AdminAuthContextValue["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AdminAuthContext.Provider
      value={{ session, isAdmin, loading, roleError, signIn, signOut }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
