"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ConfigProvider } from "antd";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBorderColor: "#d9d9d9",
            defaultGhostBorderColor: "#d9d9d9",
            linkHoverBg: "#d9d9d9",
          },
        },
      }}
    >
      <Provider store={store}>
        <html lang="en">
          <body>
            <Navbar />
            <main className="mainLayout">{children}</main>
            <Footer />
          </body>
        </html>
      </Provider>
    </ConfigProvider>
  );
}
