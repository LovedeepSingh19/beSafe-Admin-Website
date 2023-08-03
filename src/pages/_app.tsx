import type { AppProps } from "next/app";
import { ChakraBaseProvider } from "@chakra-ui/react";
import Layout from "@/Components/Layout/Layout";
import theme from "@/Chakra/Theme";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraBaseProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraBaseProvider>
    </RecoilRoot>
  );
}
