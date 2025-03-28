import { AuthContextProvider } from "@/contexts/auth/context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
