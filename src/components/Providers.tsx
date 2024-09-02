"use client";
import { ThemeProvider } from "next-themes";

export const revalidate = 60;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute={"class"}>{children}</ThemeProvider>
    </>
  );
}
