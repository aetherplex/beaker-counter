import { Flex } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';

function Layout({ children }) {
    return (
        <Flex
            w="100%"
            flexDir="column"
            minH="100vh"
            align="center"
            justify="start"
        >
            <Flex
                w="95%"
                mx="auto"
                maxW="1200px"
                flexDir="column"
                align="center"
                justify="start"
                gap={4}
                flexGrow={1}
            >
                <Flex flexDir="column" flexGrow={1} w="100%">
                    <Header />
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Layout;
