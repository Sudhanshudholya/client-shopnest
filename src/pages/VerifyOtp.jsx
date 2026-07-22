import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/auth.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const API = import.meta.env.VITE_API;

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please try again.");
      navigate("/forgot-password");
      return;
    }

    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP verified successfully");
        navigate("/login", { state: { email } });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={verifyOtp}>
        <h2>Verify OTP</h2>

        <p className="auth-text">
          We’ve sent a 6-digit OTP to your email. Please enter it below.
        </p>

        {/* OTP input */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button type="submit" className="btn">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;