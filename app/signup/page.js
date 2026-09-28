import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Create an account",
  description:
    "Create a free Price Watcher account. Add your groceries and a target price, and get an email when they're cheap.",
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
