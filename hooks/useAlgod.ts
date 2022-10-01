import { Algodv2 } from 'algosdk';
import { useState } from 'react';

function useAlgod() {
    const [algodClient, setAlgodClient] = useState(
        () => new Algodv2('a'.repeat(64), 'http://localhost', 4001)
    );
    return {
        algodClient,
    };
}

export default useAlgod;
