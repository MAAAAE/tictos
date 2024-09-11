<template>
  <NuxtLayout>
    <div class="container space-y-4">
      <h2
          class="text-2xl font-bold text-black border-b-4 border-black mb-8 pb-2"
      >
        concert info
      </h2>
      <div v-if="event" class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Event Image -->
        <img :src="event.image" alt="Event Image" class="w-full h-48 object-cover rounded-t-lg" />

        <!-- Event Information -->
        <div class="p-6 space-y-4">
          <!-- Event Name -->
          <div class="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-sm">
            <FontAwesome icon="signature" class="text-gray-700 text-lg" />
            <div class="pl-3 flex flex-col">
              <span class="font-semibold text-gray-700 text-sm">Name:</span>
              <p class="text-gray-900 mt-1">{{ event.name }}</p>
            </div>
          </div>

          <!-- Event Date -->
          <div class="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-sm">
            <FontAwesome icon="calendar-day" class="text-gray-700 text-lg" />
            <div class="pl-3 flex flex-col">
              <span class="font-semibold text-gray-700 text-sm">Date:</span>
              <p class="text-gray-900 mt-1">{{ event.date }}</p>
            </div>
          </div>

          <!-- Event Price -->
          <div class="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-sm">
            <FontAwesome icon="money-bill" class="text-gray-700 text-lg" />
            <div class="pl-3 flex flex-col">
              <span class="font-semibold text-gray-700 text-sm">Price:</span>
              <p class="text-gray-900 mt-1">{{ event.ticket_price }}</p>
            </div>
          </div>
        </div>

        <!-- Form for private key input -->
        <PrivateKeyForm v-if="!user.privateKey" @submit="handleSubmit" placeholder-text="enter your private key."/>
        <div v-else class="flex items-center justify-end p-4">
          <button
              type="submit"
              class="bg-cyan-50 transition text-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click.prevent="handleSubmit(user.privateKey)"
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {ref} from 'vue'
import {AptosAccount, HexString} from "aptos";
import PrivateKeyForm from "~/components/KeyForm.vue";
import {toast} from "vue3-toastify";
import {useEventStore} from "~/store/event";
import {useRouter} from "nuxt/app";
import { useAuthStore } from "~/store/auth";

const route = useRoute()
const privateKey = ref('')
const {$toast, $aptosClient} = useNuxtApp()

const eventStore = useEventStore()
const event = eventStore.getEventByIndex(route.params.id)
const user = useAuthStore();
const runtimeConfig = useRuntimeConfig()
const router = useRouter();


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
      function: `${runtimeConfig.public.accountPrivateKey}::EventTickets::create_ticket`,
      type_arguments: [],
      arguments: [route.params.id, event.ticket_price],
    };

    const txnRequest = await $aptosClient.generateTransaction(account.address(), payload);

    // Sign the transaction
    const signedTxn = await $aptosClient.signTransaction(account, txnRequest);
    const txnResponse = await $aptosClient.submitTransaction(signedTxn);
    // Wait for the transaction to be confirmed
    let newVar = await $aptosClient.waitForTransaction(txnResponse.hash);

    const transaction = await $aptosClient.getTransactionByHash(txnResponse.hash) as TransactionStatus;
    if (!transaction.success) {
      throw new Error(transaction.vm_status);
    }
    await router.push('/tickets')
    eventStore.buying(route.params.id)
    $toast.update(id, {
      render: (props) => {
        return h('div', `process is done.`);
      },
      autoClose: 2000,
      type: toast.TYPE.SUCCESS
    })

  } catch (err) {
    $toast.error(err.message)
    console.error('Error initializing event store:', err);
    $toast.update(id, {
      render: (props) => {
        return h('div', `process is done.`);
      },
      autoClose: 2000,
      type: toast.TYPE.SUCCESS
    })
  }
  // toast.done(id)

}
interface TransactionStatus {
  success: boolean;
  vm_status: string;
}


</script>
