
import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout title={"the good corner"}>
      <Component {...pageProps} />
    </Layout>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
