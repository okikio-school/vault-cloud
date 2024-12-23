"use client";

import type { Session } from "next-auth";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Github, Loader2 } from "lucide-react";

import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { signUp } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "signup";
}

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3, {
    message: "Password must longer than 3 characters",
  }),
  remember: z.boolean().default(false).optional(),
});

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const session = useSession();
  console.log({
    session
  })
  if (session?.data?.user) {
    redirect(callbackUrl ? callbackUrl : "/");
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "John Doe",
      password: "123456",
      email: "johndoe@gmail.com",
      remember: true,
    },
  });


  function onSubmit(data: z.infer<typeof FormSchema>) {      
    (async () => {
      setIsLoading(true);

      if (type === "login") {
        await signIn("credentials", {
          redirect: true,
          email: data.email,
          password: data.password,
          callbackUrl: callbackUrl ? callbackUrl : "/",
        });

        toast({
          title: "Login In",
          description: "Description...",
        });
      } else if (type === "signup") { 
        await signUp({
          name: data.name,
          email: data.email,
          password: data.password
        })

        toast({
          title: "Sign Up",
          description: "Description...",
        });
      }

      setIsLoading(false);
    })()
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className={cn("grid py-4", "gap-6")}>
            {type === "signup" && <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Name</FormLabel>

                  <div className="flex flex-col gap-0.5">
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        autoComplete="name"
                        autoFocus
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Email</FormLabel>

                  <div className="flex flex-col gap-0.5">
                    <FormControl>
                      <Input
                        placeholder="johndoe@email.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        autoFocus={type === "login"}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Password</FormLabel>

                  <div className="flex flex-col gap-0.5">
                    <FormControl>
                      <Input
                        placeholder="Password..."
                        type="password"
                        autoComplete="password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex pb-4">
                <div className="items-top flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </FormLabel>
                </div>
                <div className="flex-grow"></div>
                <Link
                  className="text-sm font-semibold text-primary underline underline-offset-4"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "login" ? "Log in" : "Sign up"} with Email
          </Button>

          <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm text-muted-foreground text-center">
            <span>{type !== "login" ? 'Already have an account?' : `Don't have an account yet?`} </span>
            <Link
              className="text-sm font-semibold text-primary underline underline-offset-4"
              href={type !== "login" ? "/login" : "/signup"}
            >
              {type !== "login" ? "Log in" : "Sign up"}
            </Link>
          </p>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("github", { callbackUrl: callbackUrl ? callbackUrl : "/" })}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>

      {/* <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              autoFocus
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button> */}
    </div>
  );
}
