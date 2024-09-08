<!-- components/TicketList.vue -->
<template>
  <!-- Ticket Cards Container -->
  <PrivateKeyForm @submit="getTicketStore" placeholderText="enter your account" />

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
          <p class="text-gray-700"><strong>Owner:</strong> {{ ticket.owner }}</p>
          <p class="text-gray-700"><strong>Is Used:</strong> {{ ticket.is_used ? 'Yes' : 'No' }}</p>
          <p class="text-gray-700"><strong>Can Transfer:</strong> {{ ticket.can_transfer ? 'Yes' : 'No' }}</p>
        </div>

        <!-- Action Button Section -->
        <div class="flex-shrink-0">
          <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              @click="transferTicket(ticket.id)"
          >
            Transfer Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PrivateKeyForm from "~/components/KeyForm.vue";

const {$aptosClient, $toast} = useNuxtApp();

interface Ticket {
  id: string;
  event_id: string;
  owner: string;
  is_used: boolean;
  can_transfer: boolean;
}

// Initialize the tickets array
const myTickets = ref<Ticket[]>([]);

// Mock function to simulate fetching tickets (replace with real logic)

const resourceType = '0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329::EventTicket::TicketStore'; // Replace with the correct module and resource path

async function getTicketStore(key: string) {
  try {
    // Fetch the TicketStore resource from the account
    const ticketStoreResource = await $aptosClient.getAccountResource(key, resourceType);

    let structValue = ticketStoreResource.data as {
      ticket_count: String,
      tickets: Array<Ticket>
    };
    myTickets.value = structValue.tickets
  } catch (error) {
    console.error('Error fetching TicketStore:', error);
    $toast.error(`${error}`);
  }
}

// Transfer ticket function (mock, replace with real logic)
const transferTicket = (ticketId: string) => {
  console.log(`Transfer ticket with ID: ${ticketId}`);
  // Implement the ticket transfer logic here
};

// Fetch tickets on component mount

</script>

<style scoped>
/* Add any specific styles for this component here */
</style>
