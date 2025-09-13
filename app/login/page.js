"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // <- para manejar errores
  const router = useRouter();

  //Cuando se escribe se hace una copia de credentials
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpiar errores previos

    try {
      const response = await axios.post("http://localhost:5000/api/login", credentials);

      // si login correcto
      if (response.status === 200) {
        const { email, username, selectedColor } = response.data;

        // guardamos datos en localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("selectedColor", selectedColor);

        // redirigir a juegoColor
        router.push("/juegoColor");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Usuario no existe");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #7b2ff7, #f107a3, #2fbf15)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#7b2ff7" }}>Inicia sesión</h2>

        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#7b2ff7",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Login
        </button>

        {/* mensaje de error */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" style={{ color: "#f107a3", fontWeight: "bold" }}>
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
