import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 relative overflow-hidden">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-20 py-10">
        {/* Left - Image/Text */}
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none p-6 sm:p-10 z-10">
          <div>
            <h4 className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold leading-snug sm:leading-[48px] lg:leading-[58px]">
              Capture Your <br /> Journeys
            </h4>
            <p className="text-sm sm:text-[15px] text-white leading-6 mt-3 sm:mt-4 pr-4 sm:pr-7">
              Record your travel experiences and memories in your personal
              travel journal.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none p-6 sm:p-10 lg:p-16 shadow-lg shadow-cyan-200/20 z-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-7">
              Login
            </h4>

            <input
            id={Math.random()}
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswordInput
            id={Math.random()}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="text-red-500 text-sm pt-1">{error}</p>}

            <button type="submit" className="btn-primary mt-4">
              LOGIN
            </button>

            <p className="text-xs text-slate-500 text-center my-4">or</p>

            <button
              type="button"
              className="btn-primary btn-light"
              onClick={() => navigate("/signup")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
