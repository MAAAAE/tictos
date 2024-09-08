<template>
  <div class="account">
    <NuxtLayout>
      <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
        <div class="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 p-4 rounded-t-xl">
          <div class="flex items-center justify-center">
            <!-- Bitcoin Icon -->
            <div class="bg-white p-3 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-500" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM18.02 23.83v2.51h-2.02v-2.43c-0.514 0-1.04 0-1.58 0v2.43h-2.02v-2.51h-3.53l0.34-2.19h0.75c0.583 0 0.743-0.312 0.82-0.64l0.91-5.51c0.102-0.587-0.041-0.69-0.625-0.69h-0.691v-2.19h2.04v-2.51h2.02v2.43c0.542 0 1.085 0.020 1.62 0.020v-2.45h2.02v2.51c2.368 0.141 3.922 0.834 4.153 3.034 0.175 1.704-0.853 2.463-2.201 2.793 1.631 0.273 2.366 1.255 2.096 3.07-0.322 2.105-1.821 2.828-4.156 2.961zM15.801 14.13h-1.64l-0.56 3.36h1.61c0.849 0 1.664-0.324 1.808-1.241 0.175-1.103-0.745-1.595-1.778-1.597zM16.261 19.26h-1.68l-0.59 3.54h1.63c0.937 0 2.028-0.303 2.221-1.416 0.186-1.065-0.812-1.674-1.778-1.674z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <div class="text-center">
            <!-- Account Name -->
            <div class="text-2xl font-semibold text-gray-800">Bitcoin Account</div>
            <div class="text-sm text-gray-500 mt-1">0x123...abc</div>
          </div>
          <!-- Balance -->
          <div class="mt-6 text-center">
            <div class="text-gray-600 text-lg">Balance</div>
            <div class="text-3xl font-bold text-gray-800 mt-2">₿ 1.2345 BTC</div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  // getAccount()
})
</script>
