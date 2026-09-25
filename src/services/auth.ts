import { Admin } from '../types';
import { dbService } from './db';

const SESSION_KEY = 'christ_world_admin_session_v1';

export interface AdminSession {
  token: string;
  admin: Admin;
  loginAt: string;
}

// Client-side SHA-256 password hashing utility using standard Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

class AuthService {
  private currentSession: AdminSession | null = null;
  private listeners: (() => void)[] = [];

  constructor() {
    this.restoreSession();
  }

  private restoreSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        this.currentSession = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to restore admin session:', e);
      this.currentSession = null;
    }
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getCurrentSession(): AdminSession | null {
    return this.currentSession;
  }

  public isAuthenticated(): boolean {
    return this.currentSession !== null;
  }

  public getCurrentAdmin(): Admin | null {
    return this.currentSession?.admin || null;
  }

  public async login(identifier: string, passwordPlain: string): Promise<{ success: boolean; error?: string }> {
    const hashed = await hashPassword(passwordPlain);
    const db = dbService.getSnapshot();

    const cleanId = identifier.trim().toLowerCase();
    const admin = db.admins.find(
      a => (a.email.toLowerCase() === cleanId || a.username.toLowerCase() === cleanId)
    );

    if (!admin) {
      return { success: false, error: 'Invalid administrator credentials. Please check your username or email.' };
    }

    if (admin.password_hash !== hashed) {
      return { success: false, error: 'Incorrect password. Try again or consult the demo credentials.' };
    }

    // Update last login
    admin.last_login = new Date().toISOString();

    const session: AdminSession = {
      token: `cw_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      admin,
      loginAt: new Date().toISOString()
    };

    this.currentSession = session;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this.notify();
    return { success: true };
  }

  public logout(): void {
    this.currentSession = null;
    localStorage.removeItem(SESSION_KEY);
    this.notify();
  }

  public hasRole(...roles: ('Super Admin' | 'Pastor' | 'Content Editor')[]): boolean {
    if (!this.currentSession) return false;
    return roles.includes(this.currentSession.admin.role);
  }
}

export const authService = new AuthService();
