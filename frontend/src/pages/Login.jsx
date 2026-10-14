import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign In");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome to TexHunt! Account created successfully.");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome back to TexHunt!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center py-12">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm text-gray-800"
      >
        <div className="text-center mb-8">
          <p className="prata-regular text-3xl text-gray-900 mb-2">{currentState}</p>
          <p className="text-xs text-gray-400">
            {currentState === "Sign In"
              ? "Access your TexHunt profile, orders & wishlists"
              : "Join TexHunt for exclusive drops and benefits"}
          </p>
        </div>

        {currentState === "Sign Up" && (
          <div className="w-full mb-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-black transition"
              type="text"
              placeholder="e.g. Imran Hossain"
              required
            />
          </div>
        )}

        <div className="w-full mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-black transition"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-black transition"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="w-full flex justify-between text-xs text-gray-500 mb-6">
          <span className="cursor-pointer hover:text-black">Forgot password?</span>
          {currentState === "Sign In" ? (
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer font-semibold text-black hover:underline"
            >
              Create Account
            </span>
          ) : (
            <span
              onClick={() => setCurrentState("Sign In")}
              className="cursor-pointer font-semibold text-black hover:underline"
            >
              Sign In Instead
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-lg hover:bg-gray-800 transition active:scale-95 disabled:opacity-50"
        >
          {loading ? "PROCESSING..." : currentState === "Sign In" ? "SIGN IN" : "CREATE ACCOUNT"}
        </button>
      </form>
    </div>
  );
};

export default Login;