"use client";

import { useState } from "react";
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
import { toast } from "sonner";

export default function SignUp() {
  const [signUpObject, setSignUpObject] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedSignUpObject = signInSchema.safeParse(signUpObject);

    if (!validatedSignUpObject.success) {
      toast.error(validatedSignUpObject.error.errors[0].message);
      return;
    }

    const validatedFullSignUpObject = {
      ...validatedSignUpObject.data,
      confirm_password: validatedSignUpObject.data.password,
      role: "trader",
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_FASTAPI_URL + "/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFullSignUpObject),
      }
    );
    const data = await response.json();
    if (data && data.detail) {
      toast.error(data.detail.error);
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
            Sign up to GIC SuperTrader
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign up
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
                  value={signUpObject.email}
                  onChange={(e) =>
                    setSignUpObject({ ...signUpObject, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signUpObject.password}
                  onChange={(e) =>
                    setSignUpObject({
                      ...signUpObject,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
