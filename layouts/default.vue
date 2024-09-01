<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Top Navigation Bar -->
    <nav class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-lg font-semibold text-gray-800">
          <NuxtLink to="/" class="hover:text-gray-600">Maeptos</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/" class="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Home</NuxtLink>
          <NuxtLink to="/about" class="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">About</NuxtLink>
        </div>
      </div>
    </nav>

    <div class="flex flex-1">
      <!-- Left Navigation Bar -->
      <aside class="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <nav>
          <NuxtLink v-for="t in links" :to="t.path"
                    class="block px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">{{ t.name }}
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {type NavLink, navLinks} from "~/utils/navLinks";
defineProps<{ links: NavLink[] }>();
const links = computed(() => navLinks)
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
