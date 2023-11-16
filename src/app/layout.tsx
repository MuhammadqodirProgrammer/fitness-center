"use client";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import Layout from "@/layout/client/Layout";
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LayoutAdmin from "@/layout/admin/Layout";
import LayoutClient from "@/layout/client/Layout";
import { CartContext } from "@/context/cartContext";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string>("");

  const getCartId: any =
    typeof window !== "undefined" && window.localStorage.getItem("cartId");
  const [cart, setCart] = useState<number[]>(JSON.parse(getCartId));

  const router: any = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = router.pathname;
    // console.log(router,"currentPath");
    setTimeout(() => {
      const roles: any = localStorage.getItem("role");
      setRole(roles);
    }, 1000);
    if (!token) {
      router.replace("/login");
    }
    if (token && role == "admin") {
      router.replace("/admin");
    } else if (token && role == "client") {
      router.replace("/client");
    }
  }, []);

  if (role == "admin") {
    return (
      <html lang="en">
        <body className={`${inter.className} dark:bg-[#1a202c] bg-[#D8EDF7]`}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider attribute="class">
              <LayoutAdmin>{children}</LayoutAdmin>
            </ThemeProvider>
          </I18nextProvider>
        </body>
      </html>
    );
  } else if (role == "client") {
    return (
      <html lang="en">
        <body className={`${inter.className} dark:bg-[#1a202c] bg-[#D8EDF7]`}>
          <I18nextProvider i18n={i18n}>
            <CartContext.Provider value={{ cart, setCart }}>
              <ThemeProvider attribute="class">
                <LayoutClient>{children}</LayoutClient>
              </ThemeProvider>
            </CartContext.Provider>
          </I18nextProvider>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={`${inter.className} dark:bg-[#1a202c] bg-[#D8EDF7]`}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </I18nextProvider>
        </body>
      </html>
    );
  }
}
