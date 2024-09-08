<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300">
      <!-- Logo and Title Section -->
      <div class="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 p-6 flex items-center justify-center">
        <div class="text-center text-white font-semibold text-2xl">
          <!-- Logo -->
          <div class="mb-2">
            <FontAwesome icon="home" class="mr-1"/>
          </div>
          <!-- Title -->
          <div class="text-xl font-semibold">TICTOS</div>
        </div>
      </div>
      <!-- Form Section -->
      <div class="px-6 py-4">
        <form @submit.prevent="login">
          <!-- Username Input -->
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
                type="text"
                id="username"
                v-model="user.username"
                ref="usernameRef"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username"
            />
          </div>
          <!-- Password Input -->
          <div class="mb-4">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
                type="password"
                id="password"
                v-model="user.password"
                ref="passwordRef"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
            />
          </div>
          <!-- Private Key Input -->
          <div class="mb-6">
            <label for="privateKey" class="block text-gray-700 text-sm font-bold mb-2">Private Key</label>
            <input
                type="password"
                id="privateKey"
                v-model="user.privateKey"
                ref="privateKeyRef"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your private key"
            />
          </div>
          <!-- Submit Button -->
          <div class="flex items-center justify-center">
            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { $toast } = useNuxtApp();

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: 'addisonw',
  password: 'addisonwpass',
  privateKey: '',
});
const router = useRouter();

const login = async () => {
  if (!user.value.privateKey) {
    $toast.error('please enter your private key for demo.');
    return;
  }
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
};
</script>
