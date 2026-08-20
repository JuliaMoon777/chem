import React, { useState } from 'react';
import { X, Send, CheckCircle, Phone, Mail } from 'lucide-react';
import { Language, translations } from '../types';
import { ChemorozruchLogo } from './ChemorozruchLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialSubject,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: initialSubject ? `Zapytanie dotyczące: ${initialSubject}\n` : '',
  });

  React.useEffect(() => {
    if (initialSubject && isOpen) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message.trim() === '' ? `Zapytanie dotyczące: ${initialSubject}\n` : prev.message,
      }));
    }
  }, [initialSubject, isOpen]);

  if (!isOpen) return null;

  const t = translations[currentLang].inquiryModal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="contact-modal-dialog"
        className="relative w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 flex-shrink-0">
            <ChemorozruchLogo className="w-full h-full" iconOnly={true} />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-xl text-slate-900 tracking-tight">
              {t.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h4 className="font-poppins font-bold text-lg text-slate-900">
              {t.successMsg}
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1 font-mono">
                {t.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jan Kowalski / Firma"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1 font-mono">
                  {t.emailLabel} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="kontakt@firma.pl"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1 font-mono">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+48 123 456 789"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1 font-mono">
                {t.messageLabel} *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Zakres rurociągów, instalacji, montażu aparatury..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white font-poppins font-bold text-sm uppercase tracking-wider shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {t.sendBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
