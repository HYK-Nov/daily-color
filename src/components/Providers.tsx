"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export const revalidate = 60;

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ThemeProvider attribute={"class"}>{children}</ThemeProvider>
    </>
  );
}
