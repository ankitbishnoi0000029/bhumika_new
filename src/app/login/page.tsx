import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | CodeBeauty",
  description: "Login to your CodeBeauty account to access premium features and manage your tools.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
