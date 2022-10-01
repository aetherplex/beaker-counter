import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import {
    accountsAtom,
    appClientAtom,
    appInfoAtom,
    counterAtom,
} from '../store';

function IndexPage() {
    const [counter, setCounter] = useAtom(counterAtom);
    const [appClient] = useAtom(appClientAtom);
    const [appInfo] = useAtom(appInfoAtom);

    const [isDecrementLoading, setIsDecrementLoading] = useState(false);
    const [isIncrementLoading, setIsIncrementLoading] = useState(false);

    async function decrementCounter() {
        setIsDecrementLoading(true);
        await appClient?.decrement();
        const state = await appClient?.getApplicationState();
        if (!state) return;
        setCounter(state.counter as number);
        setIsDecrementLoading(false);
    }

    async function incrementCounter() {
        setIsIncrementLoading(true);
        await appClient?.increment();
        const state = await appClient?.getApplicationState();
        if (!state) return;
        setCounter(state.counter as number);
        setIsIncrementLoading(false);
    }

    return (
        <Flex
            flexDir="column"
            gap={3}
            align="center"
            justify="center"
            flexGrow={1}
        >
            <Heading>Beaker Counter</Heading>
            <Text>A simple counter using the Beaker framework</Text>
            <Flex gap={4} align="center" mt={4}>
                <IconButton
                    icon={<MinusIcon />}
                    aria-label="decerement"
                    onClick={decrementCounter}
                    isLoading={isDecrementLoading}
                    disabled={isIncrementLoading || counter === 0}
                />
                <Text fontSize="2xl" fontWeight="semibold">
                    {counter}
                </Text>
                <IconButton
                    icon={<AddIcon />}
                    aria-label="decerement"
                    isLoading={isIncrementLoading}
                    onClick={incrementCounter}
                    disabled={isDecrementLoading}
                />
            </Flex>
        </Flex>
    );
}

export default IndexPage;
