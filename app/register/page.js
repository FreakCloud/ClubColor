"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function RegisterPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", credentials);
      console.log(response.data);
      //para que me guarde el email y no regrese null 
      router.push(`/color?email=${encodeURIComponent(credentials.email)}`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Usuario ya registrado");
      } else {
        setError("Error al registrar usuario");
      }
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
        <h2 style={{ marginBottom: "20px", color: "#7b2ff7" }}>Registro</h2>

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
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
          placeholder="Contraseña"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />

        {/* Mensaje de error */}
        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "15px" }}>
            {error}
          </p>
        )}

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
          Registrarse
        </button>

        <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" style={{ color: "#f107a3", fontWeight: "bold" }}>
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
