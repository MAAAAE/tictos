// plugins/aptos-client.ts
import { AptosClient } from 'aptos';

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();
    const client = new AptosClient(runtimeConfig.public.nodeUrl as string);

    // Provide the client globally
    return {
        provide: {
            aptosClient: client,
        },
    };
});
