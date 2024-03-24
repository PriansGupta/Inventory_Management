import "./globals.css";
import { CartProvider } from "@/Hooks/cartContext";
import { AlertProvider } from "@/Hooks/alertContext";

export default function RootLayout({ children }) {
  return (
    <AlertProvider>
      <CartProvider>
        <html lang="en">
          <body suppressHydrationWarning={true}>{children}</body>
        </html>
      </CartProvider>
    </AlertProvider>
  );
}
