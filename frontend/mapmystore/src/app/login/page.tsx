"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) return;

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left side: branding/art */}
      <div className="hidden w-1/2 bg-gray-900 lg:block relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900"></div>
        <div className="absolute -top-[20%] -left-[10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "4s" }}></div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-center text-white">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight">Map<span className="text-blue-400">My</span>Store</h1>
          <p className="text-lg text-blue-100 max-w-md">
            The next generation of location intelligence. Discover the most profitable retail zones using multi-dimensional geospatial ML models.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24 bg-gray-50">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or <Link href="/" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">return to the home page</Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-white px-4 py-8 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
              <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                  <div className="rounded-md bg-red-50 p-4 border border-red-100">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm shadow-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm shadow-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex w-full justify-center rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                      loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Authenticating...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 bg-gray-50 py-2 rounded-lg border border-gray-100">
                  Demo credentials: <strong className="text-gray-700">admin@mapmystore.com / admin123</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
