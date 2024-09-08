<template>
  <div>
    <NuxtLayout>
      <div class="min-h-screen p-6">
        <!-- Dashboard Container -->
        <div class="max-w-7xl mx-auto">
          <!-- Page Title -->
          <h1 class="text-4xl font-bold text-black border-b-4 border-black mb-8 pb-2">
            Dashboard
          </h1>

          <!-- Card Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Dynamic events -->
            <div
                v-for="card in events"
                :key="card.id"
                class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300"
            >
              <div :class="`bg-gradient-to-r ${card.gradient} p-4 rounded-t-xl`">
                <h2 class="text-lg font-semibold text-white">{{ card.title }}</h2>
              </div>
              <div class="px-6 py-4">
                <p class="text-gray-800">{{ card.content }}</p>
                <button
                    v-if="card.hasButton"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="goToBuyPage"
                >
                  Click Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const eventId = ref(123); // Example eventId, replace it with the actual eventId
const router = useRouter();

// Array of card objects
const events = ref([
  {
    id: 1,
    title: 'Card Title 1',
    content: 'Content for the first card. Add details or metrics here.',
    gradient: 'from-green-400 via-teal-400 to-green-600',
    hasButton: true,
  },
  {
    id: 2,
    title: 'Card Title 2',
    content: 'Content for the second card. Add details or metrics here.',
    gradient: 'from-pink-400 via-red-400 to-pink-600',
    hasButton: false,
  },
  {
    id: 3,
    title: 'Card Title 3',
    content: 'Content for the third card. Add details or metrics here.',
    gradient: 'from-yellow-400 via-orange-400 to-yellow-600',
    hasButton: false,
  },
]);

// Method to navigate to the buy page
const goToBuyPage = () => {
  router.push(`/buy/${eventId.value}`);
};
</script>

<style scoped></style>
