"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Function to handle form submission
  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted with data:", data);
    // The backend logic will be handled separately as mentioned
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left side (Form) */}
      <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="mr-2 h-6 w-6">✦</div>
              <span className="text-lg font-medium">nameless</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-500">Please enter your account details to continue.</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="example@company.com" 
                          type="email" 
                          className="pl-10"
                          {...field} 
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <div 
                          className="absolute right-3 top-2.5 cursor-pointer" 
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 
                            <EyeOff className="h-5 w-5 text-gray-400" /> : 
                            <Eye className="h-5 w-5 text-gray-400" />
                          }
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Forgot password
                </a>
              </div>
              
              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Log in
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path>
                  </g>
                </svg>
                Log in with Google
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="font-medium text-black hover:underline"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Right side (Image) */}
      <div className="hidden md:block md:w-1/2">
        <div 
          className="h-full w-full bg-gradient-to-br from-pink-400 via-red-500 to-blue-600"
          style={{
            backgroundImage: "url('/lovable-uploads/b9d049ab-ab03-42e8-912f-5a3edfe21fb9.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </div>
    </div>
  );
};

export default page;