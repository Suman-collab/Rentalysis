
import sys
import os
import traceback

# Add current directory to path just in case
sys.path.append(os.getcwd())

try:
    print("Attempting to import utils.password_hash...")
    from utils.password_hash import generate_pass_hash, verify_password
    print("Successfully imported functions.")
    
    pw = "secret123"
    print(f"Hashing password: {pw}")
    hashed = generate_pass_hash(pw)
    print(f"Hashed: {hashed}")
    
    match = verify_password(pw, hashed)
    print(f"Verify match: {match}")
    
    match_wrong = verify_password("wrong", hashed)
    print(f"Verify wrong: {match_wrong}")
    
except Exception as e:
    print(f"Error occurred: {e}")
    traceback.print_exc()

try:
    import bcrypt
    print(f"Bcrypt version: {getattr(bcrypt, '__version__', 'unknown')}")
    print(f"Bcrypt file: {bcrypt.__file__}")
except ImportError:
    print("Could not import bcrypt directly.")
