import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome back, Master Admin!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-slate-900 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-slate-800 rounded-full blur-3xl opacity-30 -top-20 -left-20 pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] bg-amber-900/20 rounded-full blur-3xl opacity-30 -bottom-20 -right-20 pointer-events-none"></div>

      <div className="bg-slate-950/80 border border-slate-800 shadow-2xl backdrop-blur-xl rounded-3xl p-8 sm:p-10 max-w-md w-full relative z-10 text-white">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-black tracking-widest text-white">
              TEXHUNT
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Control Center • Staff Authentication
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-sm text-white placeholder-slate-500 outline-none focus:border-white transition font-medium"
              type="email"
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Security Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-sm text-white placeholder-slate-500 outline-none focus:border-white transition font-medium"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-2">
            <button
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-slate-950 bg-white hover:bg-slate-100 transition-all active:scale-95 text-xs font-black tracking-widest uppercase disabled:opacity-50 shadow-lg shadow-white/5 flex items-center justify-center gap-2 cursor-pointer"
              type="submit"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] text-slate-500 mt-6">
          TexHunt Studio Engine • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default Login;