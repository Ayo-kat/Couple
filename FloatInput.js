import { useState } from "react";

export default function FloatInput({ label, value, onChange, icon, type = "text" }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: "relative", background: "white", borderRadius: 16, border: `1.5px solid ${focused ? "#FF6B9D" : "rgba(168,136,181,0.2)"}`, transition: "border-color 0.2s", padding: "14px 16px 10px" }}>
      <div style={{ fontSize: 11, color: active ? "#FF6B9D" : "#A888B5", fontWeight: 600, letterSpacing: 0.3, marginBottom: 2, transition: "color 0.2s" }}>
        {icon} {label}
      </div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", border: "none", background: "transparent", fontSize: 15, color: "#2D1B33", fontFamily: "'Nunito',sans-serif", fontWeight: 500 }} />
    </div>
  );
}