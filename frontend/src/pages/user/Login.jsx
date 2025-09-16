import React, { useState } from "react";
import { useFirebase } from "@/context/Firebase";
import { useNavigate } from "react-router-dom";

// shadcn/ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// icons
import { Mail, KeyRound, LogIn } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError("Failed to login. Please check your email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#064E3B]">
      <Card className="w-full max-w-sm shadow-none border-none bg-transparent">
        <CardHeader className="space-y-1">
          {/* Application Logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Application Logo" className="h-16 w-16 rounded-full" />
          </div>
          <CardTitle className="text-2xl text-center text-white">
            Log in to your account
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Enter your email and password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 bg-transparent border-b border-gray-400 rounded-none text-white placeholder-gray-300 focus:border-white focus:ring-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 bg-transparent border-b border-gray-400 rounded-none text-white placeholder-gray-300 focus:border-white focus:ring-0"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-[#064E3B] font-semibold rounded-full hover:bg-gray-200"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <LogIn className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </span>
              ) : (
                "Login"
              )}
            </Button>
            {error && (
              <p className="text-sm text-center font-medium text-red-600 mt-2 p-2 bg-gray-100">
                {error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
