"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Mapa de colores
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

// Función para decidir si un color es oscuro o claro
function getTextColor(bgColor) {
  if (!bgColor) return "#000";
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000" : "#fff";
}

export default function JuegoColorPage() {
  const [username, setUsername] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedColor = localStorage.getItem("selectedColor");
    if (storedUsername) setUsername(storedUsername);
    if (storedColor) setSelectedColor(storedColor);
  }, []);

  const bgColor = colorMap[selectedColor] || "#f0f0f0";
  const textColor = getTextColor(bgColor);

  const handleLogout = () => {
    localStorage.clear();

    window.history.pushState(null, "", "/");
    window.onpopstate = () => {
      window.history.go(1);
    };

    router.replace("/");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Columna izquierda */}
      <div
        style={{
          flex: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "2px solid #ddd",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "#555" }}>
          Página aún en desarrollo 🚧
        </h1>
      </div>

      {/* Columna derecha */}
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: bgColor,
          color: textColor,
          transition: "background-color 0.5s ease",
          position: "relative",
        }}
      >
        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "transparent",
            border: `2px solid ${textColor}`,
            color: textColor,
            padding: "8px 14px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Cerrar sesión
        </button>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
          {username || "Usuario"}
        </h1>
        <hr style={{ width: "80%", margin: "15px 0", borderColor: textColor }} />
        <h2 style={{ fontSize: "1.8rem" }}>
          {selectedColor ? `Color favorito: ${selectedColor}` : "Sin color"}
        </h2>
      </div>
    </div>
  );
}
