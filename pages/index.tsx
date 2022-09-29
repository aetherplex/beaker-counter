import { Flex, Text, Heading, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { sandbox } from 'beaker-ts';
import { CounterApp } from '../beaker/counterapp_client';

function IndexPage({ appId, appAddr }) {
    const [appClient, setAppClient] = useState<CounterApp>();

    async function init(id) {
        const acct = (await sandbox.getAccounts()).pop();
        const appClient = new CounterApp({
            client: sandbox.getAlgodClient(),
            signer: acct!.signer,
            sender: acct!.addr,
            appId: id,
        });
        setAppClient(appClient);
    }

    useEffect(() => {
        init(appId);
    }, [appId]);

    return (
        <Flex
            w="100%"
            flexDir="column"
            minH="100vh"
            align="center"
            justify="center"
        >
            <Flex
                w="95%"
                mx="auto"
                maxW="1200px"
                flexDir="column"
                align="center"
                justify="center"
                gap={4}
            >
                <Heading>Beaker Counter</Heading>
                <Text>A simple counter using the Beaker framework</Text>
                <Flex gap={4} align="center" mt={4}>
                    <IconButton icon={<MinusIcon />} aria-label="decerement" />
                    <Text fontSize="2xl" fontWeight="semibold">
                        0
                    </Text>
                    <IconButton icon={<AddIcon />} aria-label="decerement" />
                </Flex>
                <Text>App ID: {appId}</Text>
                <Text>App address: {appAddr}</Text>
            </Flex>
        </Flex>
    );
}

export default IndexPage;

export async function getStaticProps() {
    const acct = (await sandbox.getAccounts()).pop();
    if (acct === undefined) return;

    const appClient = new CounterApp({
        client: sandbox.getAlgodClient(),
        signer: acct.signer,
        sender: acct.addr,
    });

    const [appId, appAddr] = await appClient.create();

    return {
        props: {
            appId,
            appAddr,
        },
    };
}
