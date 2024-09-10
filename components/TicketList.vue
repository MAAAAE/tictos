<!-- components/TicketList.vue -->
<template>

  <h1
      class="text-4xl font-bold text-black border-b-4 border-black mb-8 pb-2"
  >
    Review your Tickets in Account
  </h1>

  <div class="container mx-auto px-4 py-8">
    <div class="space-y-6">
      <!-- Each ticket is displayed as a row -->
      <div
          v-for="ticket in myTickets"
          :key="ticket.id"
          class="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl flex items-center space-x-4"
          style="width: 100%; height: 150px;"
      >
        <!-- Ticket Info Section -->
        <div class="bg-blue-600 text-white p-4 rounded-l-lg flex-shrink-0" style="width: 150px;">
          <h3 class="text-xl font-bold text-white truncate">Ticket ID: {{ ticket.id }}</h3>
          <p class="text-sm font-semibold">Event ID: {{ ticket.event_id }}</p>
        </div>

        <!-- Ticket Details Section -->
        <div class="flex-grow px-4">
          <p class="text-gray-700 truncate"><strong>Owner:</strong>
            <span class="block truncate">{{ ticket.owner }}</span>
          </p>
          <p class="text-gray-700"><strong>Is Used:</strong> {{ ticket.is_used ? 'Yes' : 'No' }}</p>
          <p class="text-gray-700"><strong>Can Transfer:</strong> {{ ticket.can_transfer ? 'Yes' : 'No' }}</p>
          <p class="text-gray-700">
            <FontAwesome icon="money-bill" class="mr-1"/>
            <strong>Price: </strong> {{ ticket.price }} APT
          </p>
        </div>

        <!-- Action Button Section -->
        <div class="flex-shrink-0">
          <button
              v-if="ticket.can_transfer"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              @click="transferTicket(ticket.id)"
          >
            Transfer Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
  <ModalComponent
      :isVisible="showModal"
      :ticketId="selectedTicketId"
      @submit="handleSubmit"
      @close="showModal = false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PrivateKeyForm from "~/components/KeyForm.vue";
import {AptosAccount, HexString} from "aptos";
import { useAccountStore } from "~/store/account";
import { useAuthStore } from "~/store/auth";

const {$aptosClient, $toast} = useNuxtApp();
const user = useAuthStore();

interface Ticket {
  id: string;
  event_id: string;
  owner: string;
  is_used: boolean;
  can_transfer: boolean;
  price: string;
}

// Initialize the tickets array
const myTickets = ref<Ticket[]>([]);
// user's account key
const userAccount = ref('');


// Mock function to simulate fetching tickets (replace with real logic)
const runtimeConfig = useRuntimeConfig();

const resourceType = `${runtimeConfig.public.accountPrivateKey}::EventTicket::TicketStore`; // Replace with the correct module and resource path

async function getTicketStore(key: string) {
  try {
    const account = new AptosAccount(HexString.ensure(key).toUint8Array());
    const ticketStoreResource = await $aptosClient.getAccountResource(account.address(), resourceType);

    let structValue = ticketStoreResource.data as {
      ticket_count: String,
      tickets: Array<Ticket>
    };
    myTickets.value = structValue.tickets
    userAccount.value = key
  } catch (error) {
    console.error('Error fetching TicketStore:', error);
    $toast.error(`${error}`);
  }
}

const showModal = ref(false);
const selectedTicketId = ref('');

const handleSubmit = async (recipient: string) => {
  // Handle the recipient data here
  showModal.value = false; // Close modal after submit

  try {
    const account = new AptosAccount(HexString.ensure(user.privateKey).toUint8Array());
    const payload = {
      type: "entry_function_payload",
      function: `${runtimeConfig.public.accountPrivateKey}::EventTicket::transfer_ticket`,
      type_arguments: [],
      arguments: [recipient, selectedTicketId.value],
    };

    const txnRequest = await $aptosClient.generateTransaction(account.address(), payload);

    // Sign the transaction
    const signedTxn = await $aptosClient.signTransaction(account, txnRequest);
    const txnResponse = await $aptosClient.submitTransaction(signedTxn);
    // Wait for the transaction to be confirmed
    await $aptosClient.waitForTransaction(txnResponse.hash);

  } catch (e) {
    $toast.error(`error occur during transferring. ${e}`)
  }
  selectedTicketId.value = '';
  $toast('transferred successfully!')
  await getTicketStore(user.privateKey)
};


// Transfer ticket function (mock, replace with real logic)
const transferTicket = (ticketId: string) => {
  console.log(`Transfer ticket with ID: ${ticketId}`);
  showModal.value = true
  selectedTicketId.value = ticketId
  // Wait for the transaction to be confirmed
};

onMounted(async () => {
  await getTicketStore(user.privateKey);
})

// Fetch tickets on component mount

</script>

<style scoped>
/* Add any specific styles for this component here */
.truncate {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flex-grow {
  min-width: 0; /* Ensure that flex items can shrink and prevent overflow */
}
</style>
