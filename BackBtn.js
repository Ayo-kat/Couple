export default function BackBtn({ onClick, inline }) {
  return (
    <button onClick={onClick} style={{ ...(inline ? {} : { display: "block", marginTop: 48, marginBottom: 4 }), width: 36, height: 36, borderRadius: 12, border: "none", background: "rgba(255,107,157,0.1)", color: "#FF6B9D", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
      ←
    </button>
  );
}