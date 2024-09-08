<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-8">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="privateKey">
        {{ placeholderText }}
      </label>
      <input
          v-model="privateKey"
          type="text"
          id="privateKey"
          placeholder="Enter your value"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
      />
    </div>

    <div class="flex items-center justify-between">
      <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// Define props
const props = defineProps<{
  placeholderText: string;
}>();

// Define a privateKey ref
const privateKey = ref('');

// Emit event to the parent on form submit
const emit = defineEmits(['submit']);

const handleSubmit = () => {
  // Emit the privateKey value when the form is submitted
  emit('submit', privateKey.value);
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
