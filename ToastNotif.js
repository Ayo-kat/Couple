export default function ToastNotif({ text, sub }) {
  return (
    <div className="notif-toast" style={{ position: "absolute", top: 56, left: 16, right: 16, background: "rgba(30,10,25,0.92)", backdropFilter: "blur(12px)", borderRadius: 18, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, zIndex: 999, border: "1px solid rgba(255,107,157,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg,#FF6B9D,#C06BFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>💌</div>
      <div>
        <div style={{ color: "white", fontSize: 13, fontWeight: 700 }}>{text}</div>
        {sub && <div style={{ color: "rgba(255,179,204,0.7)", fontSize: 11, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}