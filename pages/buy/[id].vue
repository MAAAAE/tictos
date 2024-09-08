<template>
  <NuxtLayout>
    <div>
      <!-- Form for private key input -->
      <PrivateKeyForm @submit="handleSubmit" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {ref} from 'vue'
import {AptosAccount, AptosClient, HexString} from "aptos";
import PrivateKeyForm from "~/components/KeyForm.vue";
const client: AptosClient = new AptosClient("http://localhost:8080");

const route = useRoute()
const privateKey = ref('')

const handleSubmit = async (key: string) => {
  privateKey.value = key
  try {
    const account = new AptosAccount(HexString.ensure(privateKey.value).toUint8Array());
    const payload = {
      type: "entry_function_payload",
      function: "0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329::EventTicket::create_ticket",
      type_arguments: [],
      arguments: [route.params.id],
    };

    const txnRequest = await client.generateTransaction(account.address(), payload);

    // Sign the transaction
    const signedTxn = await client.signTransaction(account, txnRequest);
    const txnResponse = await client.submitTransaction(signedTxn);
    // Wait for the transaction to be confirmed
    await client.waitForTransaction(txnResponse.hash);

  } catch (err) {
    console.error('Error initializing event store:', err);
  }
}


</script>
