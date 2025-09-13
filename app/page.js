import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh" }}>
      {/* Hero */}
      <header
        style={{
          background: "linear-gradient(135deg, #7b2ff7, #f107a3, #2fbf15)",
          color: "white",
          padding: "150px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Club del Color
        </h1>
        <p style={{ fontSize: "1.3rem", maxWidth: "600px", margin: "0 auto" }}>
          ¿Tienes un color favorito? Únete al club y defiende tu color contra
          los enemigos.
        </p>
        <div style={{ marginTop: "30px" }}>
          <Link
            href="/register"
            style={{
              background: "white",
              color: "#7b2ff7",
              padding: "12px 25px",
              borderRadius: "8px",
              fontWeight: "bold",
              marginRight: "15px",
              textDecoration: "none",
              display: "inline-block",
              transition: "0.3s",
            }}
          >
            Regístrate
          </Link>
          <Link
            href="/login"
            style={{
              border: "2px solid white",
              padding: "10px 25px",
              borderRadius: "8px",
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
              display: "inline-block",
              transition: "0.3s",
            }}
          >
            Inicia sesión
          </Link>
        </div>
      </header>

      {/* Sección beneficios */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#6a1b9a" }}>
          ¿Por qué unirse?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              padding: "25px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #ffe29f, #ffa99f, #ff719a)",
              color: "#333",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Conexión</h3>
            <p>Conoce personas que aman los mismos colores que tú.</p>
          </div>
          <div
            style={{
              padding: "25px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #90f7ec, #32ccbc)",
              color: "#333",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Juego de Guerra</h3>
            <p>Defiende tu color en batallas estratégicas.</p>
          </div>
          <div
            style={{
              padding: "25px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #a18cd1, #fbc2eb)",
              color: "#333",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Eventos</h3>
            <p>Participa en torneos, retos y reuniones en vivo.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#222",
          color: "white",
          padding: "25px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <p>© {new Date().getFullYear()} Club del Color</p>
      </footer>
    </div>
  );
}
