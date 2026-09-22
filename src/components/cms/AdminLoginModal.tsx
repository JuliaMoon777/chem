import React, { useState } from 'react';
import { Lock, X, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { AuthSession } from '../../types/cms';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: AuthSession) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      setError('Zbyt wiele nieudanych prób logowania. Odczekaj chwilę.');
      return;
    }

    if (!password.trim()) {
      setError('Wprowadź hasło dostępowe.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await cmsService.login(password);
      if (result.success && result.session) {
        setPassword('');
        setError(null);
        setFailedAttempts(0);
        onLoginSuccess(result.session);
        onClose();
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setIsLocked(true);
          setError('Konto tymczasowo zablokowane z powodu 5 błędnych prób logowania.');
          setTimeout(() => {
            setIsLocked(false);
            setFailedAttempts(0);
          }, 30000); // 30s lockout in client fallback
        } else {
          setError(result.error || 'Nieprawidłowe hasło dostępowe.');
        }
      }
    } catch {
      setError('Błąd połączenia z serwerem autoryzacji.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                CHEMOROZRUCH
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Panel redakcyjny
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Podaj hasło administratora, aby zarządzać aktualnościami oraz ofertami pracy.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Hasło dostępowe
            </label>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || isLocked}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/15 focus:outline-hidden bg-slate-50/50 focus:bg-white transition-all"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 text-xs text-red-700 bg-red-50 rounded-xl border border-red-200 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Weryfikacja...</span>
                </>
              ) : (
                <>
                  <span>Zaloguj do panelu</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Bezpieczne połączenie z serwerem</span>
          </div>
        </form>
      </div>
    </div>
  );
};
