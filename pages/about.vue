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
import {AptosAccount, AptosClient, FaucetClient, HexString, Network, TokenClient} from "aptos";

// Example user data
const {username} = storeToRefs(useAuthStore())
const githubLink = ref('https://github.com/MAAAAE/maeptos')


const MODULE_NAME = 'ticket::EventTicket';
const client: AptosClient = new AptosClient("http://localhost:8080");

const init = async () => {

  const tokenClient = new TokenClient(client);
  const faucetClient = new FaucetClient("http://localhost:8080/v1", "http://localhost:8081");
  const privateKey = '0xb352a28da0333ff48f77e83b3dc05cb5ac525ab287ba5e9103939576b37126a5'
  try {
    // const account = new AptosAccount(undefined, "0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329");
    const account = new AptosAccount(HexString.ensure(privateKey).toUint8Array());
    // const account: AccountData = await client.getAccount("0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329");
    const payload = {
      type: "entry_function_payload",
      function: "0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329::EventTicket::initialize_ticket_store",
      type_arguments: [],
      arguments: [],
    };

    // failed to parse path `address`: failed to parse "string(Address)": Invalid account address: Hex characters are invalid: Invalid character 't' at position 58
    // Generate transaction request

    const txnRequest = await client.generateTransaction(account.address(), payload);

    // Sign the transaction
    const signedTxn = await client.signTransaction(account, txnRequest);
    const txnResponse = await client.submitTransaction(signedTxn);

    // let aptosAccount = new AptosAccount();
    // const txnResponse = await client.signAndSubmitTransaction(aptosAccount, txnRequest);
    // Submit the transaction

    // Wait for the transaction to be confirmed
    await client.waitForTransaction(txnResponse.hash);

    console.log(`Event store initialized, transaction hash: ${txnResponse.hash}`);
  } catch (err) {
    console.error('Error initializing event store:', err);
  }
}

async function fetchEventStore(accountAddress: string) {
  try {
    // The resource type name follows the format: {module_address}::{module_name}::{resource_name}
    const resourceType = `${accountAddress}::EventTicket::EventStore`;

    // Fetch the resource
    const eventStoreResource = await client.getAccountResource(accountAddress, resourceType);

    console.log('EventStore:', eventStoreResource);
  } catch (error) {
    console.error('Error fetching EventStore:', error);
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
