<template>
  <div class="min-h-screen flex flex-col bg-gray-100 relative">
    <!-- Top Navigation Bar -->
    <nav class="bg-white border-b border-gray-200 z-20">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-lg font-semibold text-gray-800">
          <NuxtLink to="/" class="hover:text-gray-600">TICTOS</NuxtLink>
        </div>
        <!-- Toggle Button for Left Navigation Bar -->
        <button class="block md:hidden" @click="isMenuOpen = !isMenuOpen">
          <FontAwesome icon="bars" class="text-gray-800"/>
        </button>
        <div class="hidden md:flex">
          <NuxtLink to="/" class="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">
            <FontAwesome icon="home" class="mr-1"/>
            Home
          </NuxtLink>
          <NuxtLink to="/about" class="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">
            <FontAwesome icon="user" class="mr-1"/>
            About
          </NuxtLink>
          <NuxtLink to="/login" @click="handleLogout" class="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">
            <FontAwesome icon="door-open" class="mr-1"/>
            Logout
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Overlay for background when menu is open -->
    <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-10"
        @click="isMenuOpen = false"
    ></div>

    <div class="flex flex-1 relative">
      <!-- Left Navigation Bar -->
      <aside
          class="w-64 bg-white border-r border-gray-200 p-6 absolute md:relative z-10 transform md:transform-none transition-transform duration-300"
          :class="{'translate-y-0': isMenuOpen, '-translate-y-full': !isMenuOpen, 'md:block': true}"
      >
        <nav>
          <NuxtLink v-for="t in links" :key="t.name" :to="t.path"
                    class="block px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">
            {{ t.name }}
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 z-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { type NavLink, navLinks } from "~/utils/navLinks";
import { useAuthStore } from "~/store/auth";
import { useRouter } from 'vue-router';

// Retrieve navigation links and authentication store
const links = computed(() => navLinks);
const router = useRouter();
const { logUserOut } = useAuthStore();

// Toggle state for the mobile menu
const isMenuOpen = ref(false);

const handleLogout = () => {
  logUserOut();
  router.push('/login');
};
</script>

<style scoped>
/* Custom styles for menu transitions */
</style>
