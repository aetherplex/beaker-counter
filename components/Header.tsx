import { CopyIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Heading,
    IconButton,
    Text,
    useToast,
} from '@chakra-ui/react';
import { sandbox } from 'beaker-ts';
import { useAtom } from 'jotai';
import React, { useMemo, useState } from 'react';
import { CounterApp } from '../beaker/counterapp_client';
import useAlgod from '../hooks/useAlgod';
import {
    accountsAtom,
    appClientAtom,
    appInfoAtom,
    counterAtom,
} from '../store';
import { shortenAddress } from '../utils';
declare const AlgoSigner: any;

function Header() {
    const [creatingApp, setCreatingApp] = useState(false);
    const [accounts, setAccounts] = useAtom(accountsAtom);
    const [, setCounter] = useAtom(counterAtom);
    const [, setAppClient] = useAtom(appClientAtom);
    const [appInfo, setAppInfo] = useAtom(appInfoAtom);
    const toast = useToast();
    const { algodClient } = useAlgod();

    async function createApp() {
        setCreatingApp(true);
        try {
            const accts = await sandbox.getAccounts();
            console.log('Accounts: ', accts);
            setAccounts(accts);
            const creator = accts.pop();
            if (!creator) return;
            const appClient = new CounterApp({
                client: algodClient,
                signer: creator?.signer,
                sender: creator?.addr,
            });

            const [appId, appAddr] = await appClient.create();
            setAppInfo({
                id: appId,
                address: appAddr,
            });
            const globalState = await appClient.getApplicationState();
            setCounter(globalState['counter'] as number);
            setAppClient(appClient);
            toast({
                title: 'App created',
                description: `ID: ${appId}`,
                status: 'success',
                duration: 2000,
            });
        } catch (e) {
            toast({
                title: 'Something went wrong',
                status: 'error',
                duration: 2000,
            });
            throw e;
        } finally {
            setCreatingApp(false);
            console.log('App info: ', appInfo);
        }
    }

    async function copyAddress() {
        window.navigator.clipboard.writeText(accounts[0].addr);
        toast({
            title: 'Address Copied',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <Flex w="100%" py={4} justify="flex-end">
            {appInfo?.address ? (
                <Flex gap={2} align="center">
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        py={0.5}
                        px={3}
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.300"
                    >
                        App addr:{' '}
                        {shortenAddress(appInfo?.address as string) || ''}
                    </Text>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        py={0.5}
                        px={3}
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.300"
                    >
                        App ID: {appInfo.id as number}
                    </Text>
                    {/* <IconButton
                        aria-label="Copy"
                        size="xs"
                        icon={<CopyIcon />}
                        onClick={copyAddress}
                    /> */}
                </Flex>
            ) : (
                <Button onClick={createApp} isLoading={creatingApp}>
                    Create App
                </Button>
            )}
        </Flex>
    );
}

export default Header;
