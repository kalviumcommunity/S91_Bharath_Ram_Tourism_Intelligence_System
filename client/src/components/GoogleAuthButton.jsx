import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Loads Google's script once, even if this component mounts on both
// the Login and Register pages during one session.
let scriptPromise;
function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return scriptPromise;
}

function GoogleAuthButton() {
  const buttonRef = useRef(null);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    if (!GOOGLE_CLIENT_ID) {
      setError("Google sign-in is not configured.");
      return;
    }

    const handleCredential = async (response) => {
      setError("");

      try {
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.token) {
          login(data.token, data.user?.username ?? "");
          navigate(location.state?.from?.pathname || "/", { replace: true });
        } else {
          setError(data.message || "Google sign-in failed.");
        }
      } catch (err) {
        setError("Unable to connect to the server.");
      }
    };

    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredential,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: 320,
        });
      })
      .catch(() => {
        if (!cancelled) setError("Could not load Google sign-in.");
      });

    return () => {
      cancelled = true;
    };
  }, [login, navigate, location]);

  return (
    <div className="google-auth">
      <div className="auth-divider">
        <span>or</span>
      </div>
      <div ref={buttonRef} />
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default GoogleAuthButton;
