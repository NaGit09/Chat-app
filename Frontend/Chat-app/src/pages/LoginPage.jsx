import React, { useState } from 'react'
import { useAuthStore } from '../stores/useAuthStore';
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import AuthImagePattern from '../components/AuthImagePattern';
const LoginPage = () => {
  const [showPassword , setShowPassword] = useState(false);
  const [formData ,setFormData] = useState({
    email : "" ,
    password : ""
  })
  const {login , isLoggingIn} = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    {/* left side */}
    <div className="flex flex-col  justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary"></MessageSquare>
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome back  </h1>
            <p className="text-base-content/60">
              Sign in to  your  account{" "}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium"> Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 z-50 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="JohnDoe@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium"> Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-1 z-50 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute insert-y-0 top-2.5 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button className="btn btn-primary w-full" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Create account {" "}
            <Link to={"/signup"} className="link link-primary">
             Sign up 
            </Link>
          </p>
        </div>
      </div>
    </div>
    {/* right side */}
    <div className="flex flex-col  justify-center items-center">
    <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friend  , share moments , and stay in touch with your love ones."
    />
    </div>
  </div>
  )
}

export default LoginPage