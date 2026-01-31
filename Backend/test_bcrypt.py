
import bcrypt
try:
    print(f"Bcrypt version: {bcrypt.__version__}")
except:
    print("Bcrypt imported but no version attr")
