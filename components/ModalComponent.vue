<template>
  <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm">
      <div class="p-4 border-b">
        <h2 class="text-xl font-semibold">Recipient Form</h2>
      </div>
      <div class="p-4">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="recipient" class="block text-gray-700 font-semibold mb-2">Recipient</label>
            <input
                v-model="recipient"
                type="text"
                id="recipient"
                placeholder="Enter recipient's account"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
          </div>
          <div class="flex justify-end">
            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <button
          @click="closeModal"
          class="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-900"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  ticketId: string;
}>();

const emit = defineEmits<{
  (event: 'submit', recipient: string): void;
  (event: 'close'): void;
}>();

const recipient = ref('');

const handleSubmit = () => {
  emit('submit', recipient.value);
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
