export default function GradBtn({ label, onClick, disabled, style: s }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "16px 0", borderRadius: 18, border: "none", background: disabled ? "rgba(168,136,181,0.2)" : "linear-gradient(135deg,#FF6B9D,#C06BFF,#6B9DFF)", backgroundSize: "200%", color: disabled ? "#A888B5" : "white", fontSize: 16, fontFamily: "'Nunito',sans-serif", fontWeight: 700, boxShadow: disabled ? "none" : "0 6px 24px rgba(255,107,157,0.35)", transition: "all 0.3s", ...(s || {}) }}>
      {label}
    </button>
  );
}