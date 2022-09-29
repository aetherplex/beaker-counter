import { Algodv2 } from 'algosdk';
import { useState } from 'react';

function useAlgod() {
    const [algodClient] = useState(
        () => new Algodv2('a'.repeat(64), 'http://localhost', 4000)
    );
    return {
        algodClient,
    };
}

export default useAlgod;
