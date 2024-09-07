<template>
  <NuxtLayout>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
      <!-- Private Key Input -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="privateKey">
          Private Key
        </label>
        <input
            v-model="privateKey"
            type="text"
            id="privateKey"
            placeholder="Enter your private key"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        />
      </div>

      <!-- Submit Button -->
      <div class="flex items-center justify-between">
        <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {ref} from 'vue'
import {AptosAccount, AptosClient, FaucetClient, HexString, TokenClient} from "aptos";


const MODULE_NAME = 'ticket::EventTicket';
const client: AptosClient = new AptosClient("http://localhost:8080");

const route = useRoute()
const privateKey = ref('')

const submitForm = async () => {
  console.log('Private Key:', privateKey.value);
  console.log('route', route.params.id);
  const tokenClient = new TokenClient(client);
  const faucetClient = new FaucetClient("http://localhost:8080/v1", "http://localhost:8081");

  try {
    const account = new AptosAccount(HexString.ensure(privateKey.value).toUint8Array());
    const payload = {
      type: "entry_function_payload",
      function: "0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329::EventTicket::create_ticket",
      type_arguments: ['u64'],
      arguments: [route.params.id],
    };

    const txnRequest = await client.generateTransaction(account.address(), payload);

    // Sign the transaction
    const signedTxn = await client.signTransaction(account, txnRequest);
    const txnResponse = await client.submitTransaction(signedTxn);
    // Wait for the transaction to be confirmed
    await client.waitForTransaction(txnResponse.hash);

    console.log({txnResponse});
    console.log(`Event store initialized, transaction hash: ${txnResponse.hash} / ${txnResponse}`);
  } catch (err) {
    console.error('Error initializing event store:', err);
  }
}

</script>
