"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const colors = [
  "Rojo", "Vino", "Rosa", "Azul", "Celeste", "Azul Marino",
  "Verde olivo", "Verde oscuro", "Verde turquesa",
  "Amarillo", "Dorado", "Amarillo pastel"
];

const colorMap = {
  "Rojo": "#ff4d4d",
  "Vino": "#800020",
  "Rosa": "#ff80c0",
  "Azul": "#4da6ff",
  "Celeste": "#87ceeb",
  "Azul Marino": "#003366",
  "Verde olivo": "#808000",
  "Verde oscuro": "#006400",
  "Verde turquesa": "#40e0d0",
  "Amarillo": "#ffff66",
  "Dorado": "#ffd700",
  "Amarillo pastel": "#fffacd",
};

export default function ColorPage() {
   const [error, setError] = useState("");
   const [username, setUsername] = useState("");
   const [selectedColor, setSelectedColor] = useState("");
   const [email, setEmail] = useState(null);
   const router = useRouter();
   const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const emailParam = searchParams?.get?.("email");
      const emailStorage = typeof window !== "undefined" ? localStorage.getItem("email") : null;
      console.log("DEBUG emailParam, emailStorage:", emailParam, emailStorage);
      setEmail(emailParam || emailStorage || null);
    } catch (e) {
      console.error("Error leyendo email:", e);
      setEmail(null);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando al backend:", { email, username, selectedColor });
    setError("");

        if (!email) {
      setError("Email no definido. Regístrate o inicia sesión primero.");
      return;
    }
    if (!username.trim()) {
      setError("Debes elegir un nombre de usuario.");
      return;
    }
    if (!selectedColor) {
      setError("Debes seleccionar un color.");
      return;
    }

    const payload = { email, username: username.trim(), color: selectedColor };
    console.log("Enviando al backend:", payload);

      try {
      const res = await axios.post("http://localhost:5000/api/set_profile", payload);
      console.log("Respuesta set_profile:", res.data);
      router.push("/juegoColor");
    } catch (err) {
      console.error("Error al guardar perfil:", err);
      setError(err.response?.data?.error || "Error al guardar perfil");
    }
  };

  if (email === null) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        padding: "20px",
        backgroundColor: "#ffffff"
      }}>
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}>
          <h3>Falta información</h3>
          <p>No encontramos tu email. Por favor regístrate o vuelve a iniciar sesión.</p>
          <button
            onClick={() => router.push("/register")}
            style={{
              marginTop: "12px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#7b2ff7",
              color: "white",
              cursor: "pointer"
            }}
          >
            Ir a registro
          </button>
        </div>
      </div>
    );
  }


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        backgroundColor: selectedColor ? colorMap[selectedColor] : "#ffffff",
        transition: "background-color 0.5s ease",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Configura tu perfil
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <h3 style={{ marginBottom: "10px" }}>Escoge tu color favorito:</h3>
          <table
            style={{
              margin: "0 auto 20px auto",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <tbody>
              {colors.map((color) => (
                <tr key={color}>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      onChange={() => setSelectedColor(color)}
                    />
                  </td>
                  <td style={{ padding: "8px", textAlign: "left" }}>{color}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2fbf15",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Continuar
          </button>
        </form>
        {error && (
  <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "15px" }}>
    {error}
  </p>
)}
      </div>
    </div>
  );
}
