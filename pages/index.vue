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
              <!-- Card 1 -->
              <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
                <div class="bg-gradient-to-r from-green-400 via-teal-400 to-green-600 p-4 rounded-t-xl">
                  <h2 class="text-lg font-semibold text-white">Card Title 1</h2>
                </div>
                <div class="px-6 py-4">
                  <p class="text-gray-800">Content for the first card. Add details or metrics here.</p>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
                <div class="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 p-4 rounded-t-xl">
                  <h2 class="text-lg font-semibold text-white">Card Title 2</h2>
                </div>
                <div class="px-6 py-4">
                  <p class="text-gray-800">Content for the second card. Add details or metrics here.</p>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
                <div class="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 p-4 rounded-t-xl">
                  <h2 class="text-lg font-semibold text-white">Card Title 3</h2>
                </div>
                <div class="px-6 py-4">
                  <p class="text-gray-800">Content for the third card. Add details or metrics here.</p>
                </div>
              </div>

              <!-- Add more cards as needed -->
            </div>
          </div>
        </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
