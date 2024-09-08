<template>
  <NuxtLayout>
    <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10">
      <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 p-6 rounded-t-xl text-center">
        <!-- Avatar -->
        <div class="bg-white p-3 rounded-full shadow-md mx-auto mb-4">
          <FontAwesome icon="user" class="h-12 w-12 text-indigo-600"/>
          <div class="text-2xl font-bold text-indigo-600 mb-2">{{ username }}</div>

        </div>
      </div>
      <div class="px-6 py-4 text-center">
        <!-- GitHub Badge -->
        <a
            :href="githubLink"
            target="_blank"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          <FontAwesome :icon="['fab', 'github']" class="mr-2"/>
          GitHub Repo
        </a>
      </div>
    </div>

  </NuxtLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from "~/store/auth";
// Example user data
const {username} = storeToRefs(useAuthStore())
const githubLink = ref('https://github.com/MAAAAE/maeptos')

</script>

<style scoped>
/* Additional styling if needed */
</style>
