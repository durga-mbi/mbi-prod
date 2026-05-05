import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  apiGet,
  apiPost,
  hasStoredAuthToken,
  storeAuthToken,
  type AuthProfile,
  type AuthUser,
  type ApiResponse,
} from '../api/api';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthState | null>(null);

type LoginResponse = ApiResponse<AuthUser> & { token?: string };

function normalizeAuthUserResponse(payload: LoginResponse | AuthUser): AuthUser {
  const candidate =
    'data' in payload
      ? {
        ...payload.data,
        token: payload.data?.token ?? payload.token,
      }
      : payload;

  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Login response did not include valid user data.');
  }

  return candidate;
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    storeAuthToken(null);
    setUser(null);
  }, []);

  const persistUser = useCallback((userData: AuthUser) => {
    setUser(userData);
    if (userData.token) {
      storeAuthToken(userData.token);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      if (!hasStoredAuthToken()) {
        if (isMounted) {
          clearAuth();
          setIsLoading(false);
        }
        return;
      }

      try {
        const profileRes = await apiGet<ApiResponse<AuthProfile>>('/me');

        persistUser({
          ...profileRes.data,
          token: localStorage.getItem('mindbrain_auth_token') ?? undefined,
        });
      } catch {
        if (isMounted) {
          clearAuth();
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [clearAuth, persistUser]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiPost<LoginResponse | AuthUser>('/users/login', { email, password });
    const authenticatedUser = normalizeAuthUserResponse(res);
    persistUser(authenticatedUser);
    return authenticatedUser;
  }, [persistUser]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await apiPost<ApiResponse<AuthUser>>('/users/register', { name, email, password });
  }, []);

  const logout = useCallback(() => {
    return apiPost<ApiResponse<null>>('/users/logout', null)
      .catch(() => undefined)
      .finally(() => {
        clearAuth();
      })
      .then(() => undefined);
  }, [clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
