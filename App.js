import { useState, useEffect, useRef, useCallback } from "react";
import Phone from "./components/Phone";
import TeddyBear from "./components/TeddyBear";
import HeartIcon from "./components/HeartIcon";
import FloatInput from "./components/FloatInput";
import GradBtn from "./components/GradBtn";
import BackBtn from "./components/BackBtn";
import ToastNotif from "./components/ToastNotif";
import { SUGGESTIONS, INITIAL_MESSAGES } from "./data/sampleData";
import "./styles/globalStyles.css";

export default function CoupleApp() {
  const [screen, setScreen] = useState("splash"); // splash | auth | pair | home | chat
  const [authMode, setAuthMode] = useState("signup"); // signup | login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [myCode] = useState("ROSE" + Math.floor(1000 + Math.random() * 9000));
  const [pairInput, setPairInput] = useState("");
  const [partnered, setPartnered] = useState(false);
  const [partnerName] = useState("Alex");
  const [partnerOnline] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [hearts, setHearts] = useState([]);
  const [notif, setNotif] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [missedCount, setMissedCount] = useState(3);
  const [isTyping, setIsTyping] = useState(false);
  const [screenDir, setScreenDir] = useState("right");
  const chatEndRef = useRef(null);
  const missRef = useRef(null);

  // Splash
  useEffect(() => {
    const t = setTimeout(() => setScreen("auth"), 2400);
    return () => clearTimeout(t);
  }, []);

  // Scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const go = (s, dir = "right") => {
    setScreenDir(dir);
    setScreen(s);
  };

  // Spawn heart particles
  const spawnHearts = useCallback((e) => {
    const rect = (e?.currentTarget || document.body).getBoundingClientRect();
    const cx = e ? e.clientX - rect.left + (e.currentTarget === document.body ? 0 : 0) : 160;
    const cy = e ? e.clientY - rect.top  : 160;
    const newHearts = Array.from({ length: 7 }, (_, i) => ({
      id: Date.now() + i,
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 30,
      emoji: ["❤️","💕","💖","💗","💝","🌸","✨"][i % 7],
    }));
    setHearts(h => [...h, ...newHearts]);
    setTimeout(() => setHearts(h => h.filter(x => !newHearts.find(n => n.id === x.id))), 1500);
  }, []);

  const sendMissYou = (e) => {
    spawnHearts(e);
    setNotif({ text: "💌 You sent 'I Miss You' to Alex!", sub: "They'll feel your love instantly ❤️" });
    setTimeout(() => setNotif(null), 3500);
  };

  const sendMessage = (text) => {
    const t = text || chatInput.trim();
    if (!t) return;
    const msg = { id: Date.now(), text: t, from: "me", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(m => [...m, msg]);
    setChatInput("");
    setShowSuggestions(false);
    // Simulate partner typing + reply
    setTimeout(() => setIsTyping(true), 800);
    setTimeout(() => {
      setIsTyping(false);
      const replies = ["Aww 🥺💕", "I love you so much ❤️", "You're my everything ✨", "Counting down the days 🗓️💕", "Missing you too 🌸"];
      setMessages(m => [...m, { id: Date.now() + 1, text: replies[Math.floor(Math.random() * replies.length)], from: "partner", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 2800);
  };

  const connectPartner = () => {
    if (pairInput.length >= 4) {
      setPartnered(true);
      setNotif({ text: "💑 Connected with Alex!", sub: "You're now paired together ❤️" });
      setTimeout(() => { setNotif(null); go("home"); }, 2000);
    }
  };

  // ── Splash Screen ──────────────────────────────────────────────────────
  if (screen === "splash") return (
    <Phone bg="linear-gradient(160deg,#1a0a14 0%,#2D0A1F 50%,#0a1428 100%)">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 20 }}>
        <div style={{ animation: "wiggle 2s ease infinite" }}>
          <TeddyBear size={110} color="pink" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: "white", letterSpacing: -1, lineHeight: 1 }}>
            couple
          </div>
          <div style={{ color: "rgba(255,179,204,0.7)", fontSize: 13, marginTop: 6, letterSpacing: 3, textTransform: "uppercase" }}>
            stay close, stay loved
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: i === 0 ? 24 : 8, height: 8, borderRadius: 4, background: i === 0 ? "#FF6B9D" : "rgba(255,107,157,0.3)", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </Phone>
  );

  // ── Auth Screen ────────────────────────────────────────────────────────
  if (screen === "auth") return (
    <Phone bg="linear-gradient(160deg,#fff5f9 0%,#f5f8ff 100%)">
      <div style={{ height: "100%", overflow: "auto", padding: "0 24px 24px" }} className="scrollable">
        {/* Header */}
        <div style={{ textAlign: "center", padding: "40px 0 24px" }}>
          <div style={{ display: "inline-block", animation: "wiggle 3s ease infinite" }}>
            <TeddyBear size={72} color={authMode === "signup" ? "pink" : "blue"} />
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#2D1B33", marginTop: 8 }}>
            {authMode === "signup" ? "Create Account" : "Welcome Back"}
          </div>
          <div style={{ color: "#A888B5", fontSize: 13, marginTop: 4 }}>
            {authMode === "signup" ? "Start your love story ❤️" : "Your partner is waiting 💕"}
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", background: "rgba(255,107,157,0.08)", borderRadius: 16, padding: 4, marginBottom: 24 }}>
          {["signup", "login"].map(m => (
            <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: "10px 0", borderRadius: 13, border: "none", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: 14, transition: "all 0.3s", background: authMode === m ? "white" : "transparent", color: authMode === m ? "#FF6B9D" : "#A888B5", boxShadow: authMode === m ? "0 2px 12px rgba(255,107,157,0.2)" : "none" }}>
              {m === "signup" ? "Sign Up" : "Sign In"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {authMode === "signup" && (
            <FloatInput label="Your name" value={name} onChange={setName} icon="👤" />
          )}
          <FloatInput label="Email address" value={email} onChange={setEmail} icon="📧" type="email" />
          <FloatInput label="Password" value={password} onChange={setPassword} icon="🔒" type="password" />
        </div>

        <GradBtn style={{ marginTop: 28 }} onClick={() => go("pair")} label={authMode === "signup" ? "Create My Account ✨" : "Sign In ❤️"} />

        <p style={{ textAlign: "center", color: "#A888B5", fontSize: 12, marginTop: 16 }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </Phone>
  );

  // ── Pair Screen ────────────────────────────────────────────────────────
  if (screen === "pair") return (
    <Phone bg="linear-gradient(160deg,#fff5f9 0%,#f5f8ff 100%)">
      <div style={{ height: "100%", overflow: "auto", padding: "0 24px 32px" }} className="scrollable">
        <BackBtn onClick={() => go("auth", "left")} />

        <div style={{ textAlign: "center", padding: "16px 0 28px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            <TeddyBear size={54} color="pink" />
            <div style={{ display: "flex", alignItems: "center", fontSize: 24 }}>💕</div>
            <TeddyBear size={54} color="blue" />
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#2D1B33" }}>
            Connect with Your<br />Partner
          </div>
          <div style={{ color: "#A888B5", fontSize: 13, marginTop: 6 }}>
            Share your code or enter theirs to connect
          </div>
        </div>

        {/* My Code */}
        <div style={{ background: "white", borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: "0 4px 20px rgba(255,107,157,0.15)", textAlign: "center" }}>
          <div style={{ color: "#A888B5", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Your Pairing Code</div>
          <div className="code-char">{myCode}</div>
          <button onClick={() => { navigator.clipboard?.writeText(myCode); setNotif({ text: "✅ Code copied!", sub: "Share it with your partner" }); setTimeout(() => setNotif(null), 2000); }} style={{ marginTop: 12, padding: "8px 20px", borderRadius: 12, border: "1.5px solid rgba(255,107,157,0.3)", background: "transparent", color: "#FF6B9D", fontSize: 13, fontFamily: "'Nunito',sans-serif", fontWeight: 600 }}>
            Copy Code
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(168,136,181,0.2)" }} />
          <span style={{ color: "#A888B5", fontSize: 12 }}>or enter partner's code</span>
          <div style={{ flex: 1, height: 1, background: "rgba(168,136,181,0.2)" }} />
        </div>

        <FloatInput label="Partner's code (e.g. ROSE1234)" value={pairInput} onChange={setPairInput} icon="💌" />

        <GradBtn style={{ marginTop: 20 }} onClick={connectPartner} label="Connect ❤️" disabled={pairInput.length < 4} />

        <button onClick={() => go("home")} style={{ display: "block", width: "100%", marginTop: 12, padding: "12px 0", border: "none", background: "transparent", color: "#A888B5", fontSize: 14, fontFamily: "'Nunito',sans-serif" }}>
          Skip for now →
        </button>
      </div>

      {notif && <ToastNotif {...notif} />}
    </Phone>
  );

  // ── Home Screen ────────────────────────────────────────────────────────
  if (screen === "home") return (
    <Phone bg="linear-gradient(160deg,#fff5f9 0%,#f0f4ff 100%)">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

        {/* Top bar */}
        <div style={{ padding: "48px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#A888B5", fontSize: 12, letterSpacing: 0.5 }}>Hello,</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#2D1B33" }}>
              {name || "My Love"} 🌸
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#FF6B9D,#C06BFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            👤
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflow: "auto", padding: "0 24px 24px" }} className="scrollable">

          {/* Partner card */}
          <div style={{ background: "white", borderRadius: 24, padding: "20px", marginBottom: 20, boxShadow: "var(--shadow)", animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg,#B3CCFF,#6B9DFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🥰</div>
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 14, height: 14, borderRadius: "50%", background: partnerOnline ? "#4CAF50" : "#ccc", border: "2px solid white", animation: partnerOnline ? "statusPing 2s ease infinite" : "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#2D1B33", fontSize: 16 }}>{partnerName}</div>
                <div style={{ color: partnerOnline ? "#4CAF50" : "#A888B5", fontSize: 12, marginTop: 2 }}>
                  {partnerOnline ? "● Online now" : "Last seen recently"}
                </div>
              </div>
              <button onClick={() => go("chat")} style={{ padding: "8px 16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#FF6B9D,#C06BFF)", color: "white", fontSize: 13, fontFamily: "'Nunito',sans-serif", fontWeight: 700 }}>
                Chat 💬
              </button>
            </div>
          </div>

          {/* Miss You Button */}
          <div style={{ textAlign: "center", marginBottom: 24, position: "relative" }}>
            <div style={{ color: "#A888B5", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Tell them how you feel</div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <button
                className="miss-btn"
                ref={missRef}
                onClick={sendMissYou}
                style={{ width: 160, height: 160, borderRadius: "50%", background: "linear-gradient(135deg,#FF6B9D,#E8436A)", color: "white", fontSize: 16, fontFamily: "'Playfair Display',serif", fontWeight: 700, letterSpacing: 0 }}
              >
                <div style={{ fontSize: 36, marginBottom: 4 }}>🫀</div>
                <div style={{ fontSize: 15 }}>I Miss You</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2, fontFamily: "'Nunito',sans-serif", fontWeight: 400 }}>Tap to send ❤️</div>
              </button>
              {hearts.map(h => (
                <div key={h.id} className="heart-particle" style={{ left: h.x, top: h.y }}>{h.emoji}</div>
              ))}
            </div>
            <div style={{ color: "#A888B5", fontSize: 12, marginTop: 16 }}>Sent {missedCount} times today</div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Days Together", value: "127 💑", color: "#FFB3CC" },
              { label: "Messages Sent", value: "2,341 💬", color: "#B3CCFF" },
              { label: "Miss You Sent", value: "89 🫀", color: "#FFC6E0" },
              { label: "Next Visit", value: "14 days 🗓️", color: "#C8D8FF" },
            ].map(s => (
              <div key={s.label} style={{ background: "white", borderRadius: 18, padding: "16px 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 11, color: "#A888B5", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#2D1B33" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Recent messages preview */}
          <div style={{ background: "white", borderRadius: 20, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, color: "#2D1B33", fontSize: 15 }}>Recent Messages</div>
              <button onClick={() => go("chat")} style={{ border: "none", background: "none", color: "#FF6B9D", fontSize: 13, fontFamily: "'Nunito',sans-serif", fontWeight: 600 }}>See all →</button>
            </div>
            {messages.slice(-2).map(m => (
              <div key={m.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 10, background: m.from === "me" ? "linear-gradient(135deg,#FF6B9D,#E8436A)" : "linear-gradient(135deg,#B3CCFF,#6B9DFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                  {m.from === "me" ? "🙋" : "🥰"}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#2D1B33", lineHeight: 1.4 }}>{m.text}</div>
                  <div style={{ fontSize: 10, color: "#A888B5", marginTop: 2 }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {notif && <ToastNotif {...notif} />}
    </Phone>
  );

  // ── Chat Screen ────────────────────────────────────────────────────────
  if (screen === "chat") return (
    <Phone bg="#f8f0f5">
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Chat header */}
        <div style={{ background: "white", padding: "48px 20px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 12px rgba(255,107,157,0.1)" }}>
          <BackBtn onClick={() => go("home", "left")} inline />
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg,#B3CCFF,#6B9DFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, position: "relative" }}>
            🥰
            <div style={{ position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: "50%", background: "#4CAF50", border: "2px solid white" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: "#2D1B33", fontSize: 16 }}>{partnerName}</div>
            <div style={{ color: "#4CAF50", fontSize: 11 }}>Online now ●</div>
          </div>
          <button onClick={sendMissYou} style={{ width: 38, height: 38, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#FF6B9D,#E8436A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, position: "relative" }}>
            🫀
            {hearts.map(h => (
              <div key={h.id} className="heart-particle" style={{ left: h.x - 100, top: h.y - 40 }}>{h.emoji}</div>
            ))}
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 16px 8px" }} className="scrollable">
          {messages.map((m, i) => (
            <div key={m.id} className="msg-bubble-in" style={{ display: "flex", flexDirection: "column", alignItems: m.from === "me" ? "flex-end" : "flex-start", marginBottom: 10, animationDelay: `${i * 0.03}s` }}>
              <div style={{
                maxWidth: "78%", padding: "11px 16px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.from === "me" ? "linear-gradient(135deg,#FF6B9D,#C06BFF)" : "white",
                color: m.from === "me" ? "white" : "#2D1B33",
                fontSize: 14, lineHeight: 1.5, fontWeight: 500,
                boxShadow: m.from === "me" ? "0 3px 12px rgba(255,107,157,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                {m.text}
              </div>
              <div style={{ fontSize: 10, color: "#A888B5", marginTop: 4, paddingLeft: m.from === "partner" ? 4 : 0, paddingRight: m.from === "me" ? 4 : 0 }}>{m.time}</div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg,#B3CCFF,#6B9DFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🥰</div>
              <div style={{ background: "white", borderRadius: "18px 18px 18px 4px", padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: 5, alignItems: "center" }}>
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div style={{ padding: "0 12px 8px", overflow: "auto" }} className="scrollable">
            <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", overflowX: "auto", paddingBottom: 4 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 20, border: "1.5px solid rgba(255,107,157,0.25)", background: "white", color: "#FF6B9D", fontSize: 12, fontFamily: "'Nunito',sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input bar */}
        <div style={{ background: "white", padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-end", boxShadow: "0 -1px 12px rgba(255,107,157,0.08)" }}>
          <button onClick={() => setShowSuggestions(s => !s)} style={{ width: 38, height: 38, borderRadius: 12, border: "none", background: showSuggestions ? "linear-gradient(135deg,#FF6B9D,#C06BFF)" : "rgba(255,107,157,0.1)", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            💕
          </button>
          <div style={{ flex: 1, background: "#f8f0f5", borderRadius: 16, padding: "10px 16px", display: "flex", alignItems: "center" }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Write something sweet..."
              style={{ border: "none", background: "transparent", width: "100%", fontFamily: "'Nunito',sans-serif", fontSize: 14, color: "#2D1B33" }}
            />
          </div>
          <button onClick={() => sendMessage()} style={{ width: 38, height: 38, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#FF6B9D,#C06BFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            ➤
          </button>
        </div>
      </div>

      {notif && <ToastNotif {...notif} />}
    </Phone>
  );

  return null;
}