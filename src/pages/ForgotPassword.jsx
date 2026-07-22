import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/auth.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  const sendOtp = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("OTP sent to email");
      navigate("/verify-resend-otp", { state: { email } });
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="auth-container">
        <form className="auth-form" onSubmit={sendOtp}>
      <h2>Forgot Password</h2>
      <p className="auth-text">
          Enter your email to receive OTP for password reset
        </p>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn">Send OTP</button>
    </form>
    </div>
  );
};

export default ForgotPassword;