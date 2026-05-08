export default function Phone({ children, bg }) {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1a0a14 0%,#0a1428 100%)" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)", pointerEvents: "none", top: "20%", left: "30%" }} />
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,157,255,0.12) 0%, transparent 70%)", pointerEvents: "none", bottom: "20%", right: "30%" }} />

      <div style={{
        width: 375, height: 812,
        borderRadius: 50, overflow: "hidden", position: "relative",
        background: bg || "white",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
        border: "2px solid rgba(255,255,255,0.06)",
      }}>
        {/* Status bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, zIndex: 99, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 24px 8px", pointerEvents: "none" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(45,27,51,0.6)" }}>9:41</span>
          <div style={{ width: 126, height: 34, background: "rgba(255,255,255,0.9)", borderRadius: "0 0 20px 20px", position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0 }} />
          <span style={{ fontSize: 12, color: "rgba(45,27,51,0.6)" }}>●●● 🔋</span>
        </div>
        {children}
      </div>
    </div>
  );
}