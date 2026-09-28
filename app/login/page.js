import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Log in",
  description: "Log in to Price Watcher to see your grocery list and today's best prices.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
