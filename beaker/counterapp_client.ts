import algosdk from 'algosdk';
import {
    ApplicationClient,
    Schema,
    AVMType,
    TransactionOverrides,
    ABIResult,
} from 'beaker-ts';
export class CounterApp extends ApplicationClient {
    desc: string = '';
    override appSchema: Schema = {
        declared: {
            counter: {
                type: AVMType.uint64,
                key: 'counter',
                desc: '',
                static: false,
            },
        },
        dynamic: {},
    };
    override acctSchema: Schema = { declared: {}, dynamic: {} };
    override approvalProgram: string =
        'I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NjM2Zjc1NmU3NDY1NzIgMHgxNTFmN2M3NQp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGRhZTZlNGNlIC8vICJkZWNyZW1lbnQoKXVpbnQ2NCIKPT0KYm56IG1haW5fbDUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg0YTMyNTkwMSAvLyAiaW5jcmVtZW50KCl1aW50NjQiCj09CmJueiBtYWluX2w0CmVycgptYWluX2w0Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGluY3JlbWVudF80CnN0b3JlIDEKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgMQppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgZGVjcmVtZW50XzMKc3RvcmUgMApieXRlY18xIC8vIDB4MTUxZjdjNzUKbG9hZCAwCml0b2IKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQpibnogbWFpbl9sOAplcnIKbWFpbl9sODoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CmJ5dGVjXzAgLy8gImNvdW50ZXIiCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzE6Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8yOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBkZWNyZW1lbnQKZGVjcmVtZW50XzM6CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8yCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKYnl0ZWNfMCAvLyAiY291bnRlciIKYnl0ZWNfMCAvLyAiY291bnRlciIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKLQphcHBfZ2xvYmFsX3B1dApieXRlY18wIC8vICJjb3VudGVyIgphcHBfZ2xvYmFsX2dldApyZXRzdWIKCi8vIGluY3JlbWVudAppbmNyZW1lbnRfNDoKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzEKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18wIC8vICJjb3VudGVyIgpieXRlY18wIC8vICJjb3VudGVyIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQorCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzAgLy8gImNvdW50ZXIiCmFwcF9nbG9iYWxfZ2V0CnJldHN1Yg==';
    override clearProgram: string =
        'I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu';
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({
            name: 'decrement',
            desc: '',
            args: [],
            returns: { type: 'uint64', desc: '' },
        }),
        new algosdk.ABIMethod({
            name: 'increment',
            desc: '',
            args: [],
            returns: { type: 'uint64', desc: '' },
        }),
    ];
    async decrement(
        txnParams?: TransactionOverrides
    ): Promise<ABIResult<bigint>> {
        const result = await this.execute(
            await this.compose.decrement(txnParams)
        );
        return new ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async increment(
        txnParams?: TransactionOverrides
    ): Promise<ABIResult<bigint>> {
        const result = await this.execute(
            await this.compose.increment(txnParams)
        );
        return new ABIResult<bigint>(result, result.returnValue as bigint);
    }
    compose = {
        decrement: async (
            txnParams?: TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, 'decrement'),
                {},
                txnParams,
                atc
            );
        },
        increment: async (
            txnParams?: TransactionOverrides,
            atc?: algosdk.AtomicTransactionComposer
        ): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(
                algosdk.getMethodByName(this.methods, 'increment'),
                {},
                txnParams,
                atc
            );
        },
    };
}
