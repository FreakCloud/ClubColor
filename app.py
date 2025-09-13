from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os, bcrypt, jwt
from dotenv import load_dotenv

# Cargar .env
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) 

# Variables de entorno
MONGO_URL = os.getenv("MONGO_URL")
JWT_SECRET = os.getenv("JWT_SECRET", "devsecret")

if not MONGO_URL:
    raise Exception("MONGO_URL no está definida en .env")

# Conectar a MongoDB Atlas
client = MongoClient(MONGO_URL, tls=True)
db = client.get_default_database("clubcolor")  
users = db.users

print(f"Conectado a MongoDB: {db.name}")

# --- ENDPOINTS ---

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")

    if users.find_one({"email": email}):
        return jsonify({"error": "usuario ya existe"}), 400

    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    users.insert_one({"email": email, "password": pw_hash, "role": role})
    return jsonify({"ok": True}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = users.find_one({"email": email})

    if not user or not bcrypt.checkpw(password.encode(), user["password"]):
        return jsonify({"error": "credenciales inválidas"}), 400

    token = jwt.encode(
        {"email": email, "role": user.get("role", "user")},
        JWT_SECRET,
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "email": email,
        "username": user.get("username"),
        "selectedColor": user.get("color")
    })

@app.route("/api/me")
def me():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return jsonify({"error": "no autorizado"}), 401

    token = auth.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception:
        return jsonify({"error": "token inválido"}), 401

    return jsonify({"email": payload["email"], "role": payload.get("role", "user")})

@app.route("/api/set_profile", methods=["POST"])
def set_profile():
    data = request.get_json()
    print("DEBUG RECIBIDO:", data)
    
    email = data.get("email")
    username = data.get("username")
    color = data.get("color")

    if not email or not username or not color:
        return jsonify({"error": "Faltan datos"}), 400

    if db.users.find_one({"username": username}):
        return jsonify({"error": "Nombre de usuario ya en uso"}), 400

    result = db.users.update_one(
        {"email": email},
        {"$set": {"username": username, "color": color}}
    )

    if result.matched_count == 0:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({"message": "Perfil actualizado"}), 200


@app.route("/health")
def health():
    return jsonify({"status": "ok"})

# --- INICIAR SERVIDOR ---
if __name__ == "__main__":
    app.run(debug=True, port=5000)
