import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { Provider } from 'jotai';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <ChakraProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
