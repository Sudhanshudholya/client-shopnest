import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const API = import.meta.env.VITE_API;

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const res = await fetch(`${API}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Password updated successfully");
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  return (
   <div className="auth-container">
     <form className="auth-form" onSubmit={resetPassword}>

      <h2>Reset Password</h2>

      <p className="auth-text">
          Create a strong password for your account.
        </p>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button type="submit" className="btn">Reset Password</button>
    </form>
   </div>
  );
};

export default ResetPassword;