import "./globals.css";
import { CartProvider } from "@/Hooks/cartContext";

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>{children}</body>
      </html>
    </CartProvider>
  );
}
