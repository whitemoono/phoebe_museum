"use client";

import { useEffect, useState, useRef } from "react";
import { useToast } from "./Toast";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";
type Tab = "login" | "register";

const emailSuffixes = [
  "@gmail.com", "@qq.com", "@163.com", "@126.com",
  "@outlook.com", "@hotmail.com", "@yahoo.com",
  "@foxmail.com", "@icloud.com", "@139.com",
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateCode(code: string) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(code);
}
function getPasswordStrength(pwd: string) {
  if (!pwd) return 0;
  let s = 0;
  if (pwd.length >= 6) s++;
  if (pwd.length >= 10) s++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s++;
  if (/\d/.test(pwd)) s++;
  if (/[^a-zA-Z0-9]/.test(pwd)) s++;
  return Math.min(s, 3);
}

export default function AuthModal({ lang, open, onClose }: {
  lang: Lang;
  open: boolean;
  onClose: () => void;
}) {
  const toast = useToast();
  const [tab, setTab] = useState<Tab>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCode, setRegCode] = useState("");
  const [regPwd, setRegPwd] = useState("");
  const [regSlogan, setRegSlogan] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleEmailInput = (value: string, setter: (v: string) => void) => {
    setter(value);
    const atIndex = value.indexOf("@");
    if (atIndex === -1) {
      setShowSuggestions(false);
      return;
    }
    const prefix = value.substring(0, atIndex);
    const typedSuffix = value.substring(atIndex);
    const matches = emailSuffixes.filter((s) =>
      s.toLowerCase().startsWith(typedSuffix.toLowerCase())
    );
    if (matches.length === 0 || typedSuffix.length === 0) {
      setShowSuggestions(false);
      return;
    }
    setEmailSuggestions(matches.map((s) => prefix + s));
    setShowSuggestions(true);
  };

  const pickSuggestion = (email: string) => {
    if (tab === "login") setLoginEmail(email);
    else setRegEmail(email);
    setShowSuggestions(false);
    emailRef.current?.focus();
  };

  const handleLogin = () => {
    const errs: Record<string, boolean> = {};
    if (!validateEmail(loginEmail)) errs.loginEmail = true;
    if (!loginPwd) errs.loginPwd = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(
        t("登录失败", "Login failed", "ログイン失敗", lang),
        t("请检查邮箱和密码", "Please check email and password", "メールとパスワードを確認してください", lang)
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("phoebe-auth", "true");
      localStorage.setItem("phoebe-user", JSON.stringify({ email: loginEmail, code: loginEmail.split("@")[0] }));
      toast.success(
        t("登录成功", "Login successful", "ログイン成功", lang),
        t("欢迎回到菲比博物馆", "Welcome back to Phoebe Museum", "フィービー博物館へお帰りなさい", lang)
      );
      setSuccess(true);
    }, 800);
  };

  const handleRegister = () => {
    const errs: Record<string, boolean> = {};
    if (!validateEmail(regEmail)) errs.regEmail = true;
    if (!validateCode(regCode)) errs.regCode = true;
    if (regPwd.length < 6) errs.regPwd = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(
        t("注册失败", "Registration failed", "登録失敗", lang),
        t("请检查填写的信息", "Please check your information", "入力情報を確認してください", lang)
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("phoebe-auth", "true");
      localStorage.setItem("phoebe-user", JSON.stringify({ email: regEmail, code: regCode }));
      toast.success(
        t("注册成功", "Registration successful", "登録成功", lang),
        t("欢迎加入菲比博物馆", "Welcome to Phoebe Museum", "フィービー博物館へようこそ", lang)
      );
      setSuccess(true);
    }, 1000);
  };

  const reset = () => {
    setLoginEmail(""); setLoginPwd(""); setRegEmail(""); setRegCode(""); setRegPwd(""); setRegSlogan("");
    setErrors({}); setSuccess(false); setShowSuggestions(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const strength = getPasswordStrength(regPwd);
  const strengthText = strength === 0 ? "" : strength === 1 ? t("弱", "Weak", "弱い", lang) : strength === 2 ? t("中", "Medium", "中", lang) : t("强", "Strong", "強い", lang);

  if (!open) return null;

  return (
    <div className="auth-overlay active" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={handleClose}>✕</button>
        <div className="auth-header">
          <div className="logo">
            PHOEBE MUSEUM
            <em>{t("菲比博物馆", "Phoebe Museum", "フィービー博物館", lang)}</em>
          </div>
          <div className="auth-tabs">
            <button className={tab === "login" ? "active" : ""} onClick={() => { setTab("login"); setSuccess(false); setShowSuggestions(false); }}>
              {t("登录", "SIGN IN", "ログイン", lang)}
            </button>
            <button className={tab === "register" ? "active" : ""} onClick={() => { setTab("register"); setSuccess(false); setShowSuggestions(false); }}>
              {t("注册", "SIGN UP", "新規登録", lang)}
            </button>
            <div className="indicator" data-tab={tab} />
          </div>
        </div>
        <div className="auth-body">
          {/* 登录表单 */}
          <div className={`auth-form${tab === "login" && !success ? " active" : ""}`}>
            <div className={`field${errors.loginEmail ? " error" : ""}`}>
              <label>{t("邮箱", "EMAIL", "メール", lang)}</label>
              <div className="email-input-wrapper">
                <input
                  ref={emailRef}
                  type="email"
                  value={loginEmail}
                  placeholder="phoebe@phoebemuseum.art"
                  autoComplete="email"
                  onChange={(e) => handleEmailInput(e.target.value, setLoginEmail)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && tab === "login" && (
                  <div className="email-suggestions active">
                    {emailSuggestions.map((email) => (
                      <div key={email} className="email-suggestion-item" onMouseDown={(e) => { e.preventDefault(); pickSuggestion(email); }}>
                        <span className="prefix">{email.split("@")[0]}</span>
                        <span className="suffix">@{email.split("@")[1]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="error-msg">{t("请输入有效的邮箱地址", "Please enter a valid email", "有効なメールアドレスを入力してください", lang)}</div>
            </div>
            <div className={`field${errors.loginPwd ? " error" : ""}`}>
              <label>{t("密码", "PASSWORD", "パスワード", lang)}</label>
              <div className="password-field">
                <input
                  type={showPwd ? "text" : "password"}
                  value={loginPwd}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onChange={(e) => setLoginPwd(e.target.value)}
                />
                <button className="password-toggle" type="button" onClick={() => setShowPwd((v) => !v)}>ᕦ(ò_óˇ)ᕤ</button>
              </div>
              <div className="error-msg">{t("密码不能为空", "Password cannot be empty", "パスワードを入力してください", lang)}</div>
            </div>
            <div className="forgot">
              <a href="#">{t("忘记密码？", "Forgot password?", "パスワードをお忘れですか？", lang)}</a>
            </div>
            <button className={`btn-primary${loading ? " loading" : ""}`} onClick={handleLogin} disabled={loading}>
              {t("登录", "SIGN IN", "ログイン", lang)}
            </button>
            <div className="divider"><span>{t("或", "OR", "または", lang)}</span></div>
            <div className="social-btns">
              <button title="Google">G</button>
              <button title="GitHub">⌘</button>
              <button title={t("微信", "WeChat", "WeChat", lang)}>微</button>
            </div>
            <p className="agreement">
              {lang === "zh" && (<>登录即表示同意《<a onClick={() => window.dispatchEvent(new CustomEvent("open-charter"))}>菲比博物馆章程</a>》和《<a onClick={() => window.dispatchEvent(new CustomEvent("open-pact"))}>数据公约</a>》</>)}
              {lang === "en" && (<>By signing in, you agree to the <a onClick={() => window.dispatchEvent(new CustomEvent("open-charter"))}>Phoebe Museum Charter</a> and <a onClick={() => window.dispatchEvent(new CustomEvent("open-pact"))}>Data Pact</a></>)}
              {lang === "ja" && (<>ログインにより《<a onClick={() => window.dispatchEvent(new CustomEvent("open-charter"))}>フィービー博物館定款</a>》と《<a onClick={() => window.dispatchEvent(new CustomEvent("open-pact"))}>データ公約</a>》に同意したものとみなします</>)}
            </p>
          </div>

          {/* 注册表单 */}
          <div className={`auth-form${tab === "register" && !success ? " active" : ""}`}>
            <div className={`field${errors.regEmail ? " error" : ""}`}>
              <label>{t("邮箱", "EMAIL", "メール", lang)}</label>
              <div className="email-input-wrapper">
                <input
                  ref={emailRef}
                  type="email"
                  value={regEmail}
                  placeholder="phoebe@phoebemuseum.art"
                  autoComplete="email"
                  onChange={(e) => handleEmailInput(e.target.value, setRegEmail)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && tab === "register" && (
                  <div className="email-suggestions active">
                    {emailSuggestions.map((email) => (
                      <div key={email} className="email-suggestion-item" onMouseDown={(e) => { e.preventDefault(); pickSuggestion(email); }}>
                        <span className="prefix">{email.split("@")[0]}</span>
                        <span className="suffix">@{email.split("@")[1]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="hint">{t("用于登录和接收作品通知", "For login and artwork notifications", "ログインと作品通知に使用", lang)}</div>
              <div className="error-msg">{t("请输入有效的邮箱地址", "Please enter a valid email", "有効なメールアドレスを入力してください", lang)}</div>
            </div>
            <div className={`field${errors.regCode ? " error" : ""}`}>
              <label>{t("创作者代号", "CREATOR CODE", "クリエイターコード", lang)}</label>
              <input
                type="text"
                value={regCode}
                placeholder="phoebe_sailor"
                autoComplete="username"
                onChange={(e) => setRegCode(e.target.value)}
              />
              <div className="hint">{t("你的创作者代号", "Your creator code", "あなたのクリエイターコード", lang)}</div>
              <div className="error-msg">{t("只能用英文、数字、下划线", "Only English, numbers, underscores", "英数字とアンダースコアのみ", lang)}</div>
            </div>
            <div className={`field${errors.regPwd ? " error" : ""}`}>
              <label>{t("密码", "PASSWORD", "パスワード", lang)}</label>
              <div className="password-field">
                <input
                  type={showPwd ? "text" : "password"}
                  value={regPwd}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  onChange={(e) => setRegPwd(e.target.value)}
                />
                <button className="password-toggle" type="button" onClick={() => setShowPwd((v) => !v)}>ᕦ(ò_óˇ)ᕤ</button>
              </div>
              <div className={`password-strength${strength === 1 ? " weak" : strength === 2 ? " medium" : strength === 3 ? " strong" : ""}`}>
                <div className="bar" /><div className="bar" /><div className="bar" />
              </div>
              <div className="password-strength-text">{strengthText}</div>
              <div className="hint">{t("至少 6 个字符", "At least 6 characters", "6文字以上", lang)}</div>
              <div className="error-msg">{t("密码至少 6 个字符", "Password must be at least 6 characters", "パスワードは6文字以上", lang)}</div>
            </div>
            <div className="field">
              <label>{t("个性签名", "BIO", "自己紹介", lang)}</label>
              <input
                type="text"
                value={regSlogan}
                placeholder={t("第一次见到菲比时，她正在便利店打瞌睡。", "When I first met Phoebe, she was dozing at a convenience store.", "初めてフィービーに会った時、彼女はコンビニで居眠りしていた。", lang)}
                onChange={(e) => setRegSlogan(e.target.value)}
              />
              <div className="hint">{t("用一句话介绍自己（选填）", "Introduce yourself in one sentence (optional)", "一言で自己紹介（任意）", lang)}</div>
            </div>
            <button className={`btn-primary${loading ? " loading" : ""}`} onClick={handleRegister} disabled={loading}>
              {t("注册", "REGISTER", "登録", lang)}
            </button>
            <p className="agreement">
              {lang === "zh" && (<>点击「注册」即表示同意《<a onClick={() => window.dispatchEvent(new CustomEvent("open-charter"))}>菲比博物馆章程</a>》和《<a onClick={() => window.dispatchEvent(new CustomEvent("open-pact"))}>数据公约</a>》</>)}
              {lang === "en" && (<>By clicking "Register", you agree to the <a onClick={() => window.dispatchEvent(new CustomEvent("open-charter"))}>Phoebe Museum Charter</a> and <a onClick={() => window.dispatchEvent(new CustomEvent("open-pact"))}>Data Pact</a></>)}
              {lang === "ja" && (<>「登録」をクリックすると《<a onClick={() => window.dispatchEvent(new CustomEvent("open-charter"))}>フィービー博物館定款</a>》と《<a onClick={() => window.dispatchEvent(new CustomEvent("open-pact"))}>データ公約</a>》に同意したものとみなします</>)}
            </p>
          </div>

          {/* 成功状态 */}
          <div className={`auth-success${success ? " active" : ""}`}>
            <div className="icon">⛵</div>
            <h3>{t("欢迎加入", "WELCOME", "ようこそ", lang)}</h3>
            <p>
              {lang === "zh" && (<>欢迎来到菲比博物馆<br />在这里，你不再只是观众。</>)}
              {lang === "en" && (<>Welcome to Phoebe Museum<br />Here, you are no longer just a viewer.</>)}
              {lang === "ja" && (<>フィービー博物館へようこそ<br />ここであなたはもはや観客ではありません。</>)}
            </p>
            <button className="btn-primary" onClick={() => { handleClose(); window.location.reload(); }}>
              {t("进入档案馆", "ENTER ARCHIVE", "アーカイブに入る", lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
