<template>
  <NuxtLayout>
    <div>
      <!-- Form for private key input -->
      <PrivateKeyForm @submit="handleSubmit" placeholder-text="enter your account."/>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {ref} from 'vue'
import {AptosAccount, HexString} from "aptos";
import PrivateKeyForm from "~/components/KeyForm.vue";
import {toast} from "vue3-toastify";

const route = useRoute()
const privateKey = ref('')
const {$toast, $aptosClient} = useNuxtApp()

const handleSubmit = async (key: string) => {
  const id = $toast(
      'Please wait...',
      {
        position: $toast.POSITION.BOTTOM_RIGHT,
        autoClose: false
      },
  );
  privateKey.value = key
  try {
    const account = new AptosAccount(HexString.ensure(privateKey.value).toUint8Array());
    const payload = {
      type: "entry_function_payload",
      function: "0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329::EventTicket::create_ticket",
      type_arguments: [],
      arguments: [route.params.id],
    };

    const txnRequest = await $aptosClient.generateTransaction(account.address(), payload);

    // Sign the transaction
    const signedTxn = await $aptosClient.signTransaction(account, txnRequest);
    const txnResponse = await $aptosClient.submitTransaction(signedTxn);
    // Wait for the transaction to be confirmed
    await $aptosClient.waitForTransaction(txnResponse.hash);

    // toast.done(id)
    $toast.update(id, {
      render: (props) => {
        return h('div', `buy a ticket! ${txnResponse.hash}`);
      },
      autoClose: 2000,
      type: toast.TYPE.SUCCESS
    })

  } catch (err) {
    console.error('Error initializing event store:', err);
  }
}


</script>
