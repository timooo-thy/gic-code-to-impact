"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { signInSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [signInObject, setSignInObject] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validatedSignInObject = signInSchema.safeParse(signInObject);
    if (!validatedSignInObject.success) {
      setError(validatedSignInObject.error.errors[0].message);
      return;
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_FASTAPI_URL + "/users/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedSignInObject.data),
      }
    );
    const data = await response.json();
    if (data && data.detail) {
      setError(data.detail.error);
      return;
    }

    //Decode jwt
    const base64Url = data.access_token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jwtPayload = JSON.parse(window.atob(base64));

    localStorage.setItem("jwt_token", data.access_token);
    localStorage.setItem("role", jwtPayload.role);

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to GIC Trader
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={signInObject.email}
                  onChange={(e) =>
                    setSignInObject({
                      ...signInObject,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signInObject.password}
                  onChange={(e) =>
                    setSignInObject({
                      ...signInObject,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
