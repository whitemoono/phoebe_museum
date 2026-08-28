"use client";

import { createContext, useContext, useCallback, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  show: (opts: ToastOptions) => void;
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (opts: ToastOptions) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...opts, id }]);
      if (opts.duration !== 0) {
        setTimeout(() => {
          setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, removing: true } as ToastItem & { removing?: boolean } : t))
          );
          setTimeout(() => remove(id), 300);
        }, opts.duration || 3000);
      }
    },
    [remove]
  );

  const success = (title: string, message?: string, duration?: number) =>
    show({ type: "success", title, message, duration });
  const error = (title: string, message?: string, duration?: number) =>
    show({ type: "error", title, message, duration });
  const warning = (title: string, message?: string, duration?: number) =>
    show({ type: "warning", title, message, duration });
  const info = (title: string, message?: string, duration?: number) =>
    show({ type: "info", title, message, duration });

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => {
          const type = toast.type || "info";
          const removing = (toast as ToastItem & { removing?: boolean }).removing;
          return (
            <div
              key={toast.id}
              className={`toast ${type}${removing ? " removing" : ""}`}
            >
              <span className="toast-icon">{icons[type]}</span>
              <div className="toast-content">
                <div className="toast-title">{toast.title}</div>
                {toast.message && <div className="toast-message">{toast.message}</div>}
              </div>
              <button className="toast-close" onClick={() => remove(toast.id)}>
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
