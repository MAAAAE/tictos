<template>
  <div class="account">
    <NuxtLayout>
      <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
        <div class="bg-gradient-to-r from-black via-gray-700 to-green-600 p-4 rounded-t-xl">
          <div class="flex items-center justify-center">
            <!-- Aptos Icon -->
            <div class="bg-white p-3 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.935 9.352a.57.57 0 0 1-.43-.193l-.572-.646a.45.45 0 0 0-.672 0l-.49.555a.85.85 0 0 1-.634.285H4.42A8 8 0 0 0 4 11.328h7.285a.47.47 0 0 0 .34-.145l.678-.707a.45.45 0 0 1 .324-.139h.028c.128 0 .251.055.336.152l.572.645a.57.57 0 0 0 .43.194h5.946a8 8 0 0 0-.42-1.975zM8.41 15.479c.128 0 .25-.052.338-.145l.68-.708a.45.45 0 0 1 .323-.138h.028a.45.45 0 0 1 .336.151l.572.646c.11.123.265.194.43.194h8.058a8 8 0 0 0 .655-1.994h-7.735a.57.57 0 0 1-.43-.194l-.571-.646a.45.45 0 0 0-.673 0l-.49.555a.85.85 0 0 1-.634.285H4.11c.132.702.353 1.37.655 1.994zm5.716-8.284a.47.47 0 0 0 .34-.145l.678-.707a.45.45 0 0 1 .324-.139h.028c.128 0 .251.055.336.152l.572.645a.57.57 0 0 0 .43.194h1.532A7.99 7.99 0 0 0 11.97 4a7.99 7.99 0 0 0-6.395 3.195zM8.952 17.456a.57.57 0 0 1-.43-.194l-.57-.646a.45.45 0 0 0-.673 0l-.491.555a.85.85 0 0 1-.633.285h-.033A7.98 7.98 0 0 0 11.97 20c2.308 0 4.387-.98 5.847-2.544z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="px-6 py-4">
          <div class="text-center">
            <!-- Account Name -->
            <div class="text-2xl font-semibold text-gray-800">Aptos Account</div>
            <div class="text-sm text-gray-500 mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
              {{ address }}
            </div>

          </div>
          <!-- Balance -->
          <div class="mt-6 text-center">
            <div class="text-gray-600 text-lg">Balance</div>
            <div class="text-3xl font-bold text-gray-800 mt-2">{{ coinBalance }} APT</div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { AptosAccount, HexString } from "aptos";
import { useAuthStore } from "~/store/auth";
import {Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";

const {$toast} = useNuxtApp();
const user = useAuthStore();

const coinBalance = ref('');
const address = ref('');
const getBalance = async () => {
  try {
    const config = new AptosConfig({ network: Network.DEVNET });
    const aptos = new Aptos(config);

    const account = new AptosAccount(HexString.ensure(user.privateKey).toUint8Array());

    const accountAPTAmount: number = await aptos.getAccountAPTAmount({accountAddress: account.address().toString()})

    coinBalance.value = String(accountAPTAmount / 100_000_000);
    address.value = account.address().toString();
  } catch (error) {
    console.error('Error Fetching Coin Balance:', error);
    $toast.error(`${error}`);
  }
}
onMounted(async () => {
  await getBalance();
})
</script>
