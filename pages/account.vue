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


import {AptosAccount, AptosClient, FaucetClient, Network, Provider, TokenClient} from "aptos";

const { $aptosClient } = useNuxtApp();

const getAccount = async () => {
  const nodeUrl = useRuntimeConfig().nodeUrl as string;

  // AptosClient 인스턴스 생성
  const client: AptosClient = new AptosClient("http://localhost:8080/v1");
  const tokenClient = new TokenClient(client);
  const faucetClient = new FaucetClient("http://localhost:8080/v1", "http://localhost:8081");

  let accountAddress = "0xf3228d5a50466fef943575dd05f9da23c6b5842194889f5112bdc4ec6f8e2329";
  client.getAccount(accountAddress)
      .then(account => console.log(account))
      .catch(error => console.log(error));

  console.log("=== Creating Collection and Token ===");
  const alice = new AptosAccount();
  const bob = new AptosAccount(); // <:!:section_2

  // Print out account addresses.
  console.log("=== Addresses ===");
  console.log(`Alice: ${alice.address()}`);
  console.log(`Bob: ${bob.address()}`);
  console.log("");

  // Fund accounts.
  // :!:>section_3
  await faucetClient.fundAccount(alice.address(), 100_000_000);
  await faucetClient.fundAccount(bob.address(), 100_000_000); // <:!:section_3

  const collectionName = "Alice's";
  const tokenName = "Alice's first token";
  const tokenPropertyVersion = 0;

  const tokenId = {
    token_data_id: {
      creator: alice.address().hex(),
      collection: collectionName,
      name: tokenName,
    },
    property_version: `${tokenPropertyVersion}`,
  };

  // Create the collection.
  // :!:>section_4
  const txnHash1 = await tokenClient.createCollection(
      alice,
      collectionName,
      "Alice's simple collection",
      "https://alice.com",
  ); // <:!:section_4
  await client.waitForTransaction(txnHash1, { checkSuccess: true });

  // Create a token in that collection.
  // :!:>section_5
  const txnHash2 = await tokenClient.createToken(
      alice,
      collectionName,
      tokenName,
      "Alice's simple token",
      1,
      "https://aptos.dev/img/nyan.jpeg",
  ); // <:!:section_5
  await client.waitForTransaction(txnHash2, { checkSuccess: true });

  // Print the collection data.
  // :!:>section_6
  const collectionData = await tokenClient.getCollectionData(alice.address(), collectionName);
  console.log(`Alice's collection: ${JSON.stringify(collectionData, null, 4)}`); // <:!:section_6

  // Get the token balance.
  // :!:>section_7
  const aliceBalance1 = await tokenClient.getToken(
      alice.address(),
      collectionName,
      tokenName,
      `${tokenPropertyVersion}`,
  );
  console.log(`Alice's token balance: ${aliceBalance1["amount"]}`); // <:!:section_7

  // Get the token data.
  // :!:>section_8
  const tokenData = await tokenClient.getTokenData(alice.address(), collectionName, tokenName);
  console.log(`Alice's token data: ${JSON.stringify(tokenData, null, 4)}`); // <:!:section_8


  // Alice offers one token to Bob.
  console.log("\n=== Transferring the token to Bob ===");
  // :!:>section_9
  const txnHash3 = await tokenClient.offerToken(
      alice,
      bob.address(),
      alice.address(),
      collectionName,
      tokenName,
      1,
      tokenPropertyVersion,
  ); // <:!:section_9
  await client.waitForTransaction(txnHash3, { checkSuccess: true });

  // Bob claims the token Alice offered him.
  // :!:>section_10
  const txnHash4 = await tokenClient.claimToken(
      bob,
      alice.address(),
      alice.address(),
      collectionName,
      tokenName,
      tokenPropertyVersion,
  ); // <:!:section_10
  await client.waitForTransaction(txnHash4, { checkSuccess: true });

  // Print their balances.
  const aliceBalance2 = await tokenClient.getToken(
      alice.address(),
      collectionName,
      tokenName,
      `${tokenPropertyVersion}`,
  );
  const bobBalance2 = await tokenClient.getTokenForAccount(bob.address(), tokenId);
  console.log(`Alice's token balance: ${aliceBalance2["amount"]}`);
  console.log(`Bob's token balance: ${bobBalance2["amount"]}`);

  console.log("\n=== Transferring the token back to Alice using MultiAgent ===");
  // :!:>section_11
  let txnHash5 = await tokenClient.directTransferToken(
      bob,
      alice,
      alice.address(),
      collectionName,
      tokenName,
      1,
      tokenPropertyVersion,
  ); // <:!:section_11
  await client.waitForTransaction(txnHash5, { checkSuccess: true });

  // Print out their balances one last time.
  const aliceBalance3 = await tokenClient.getToken(
      alice.address(),
      collectionName,
      tokenName,
      `${tokenPropertyVersion}`,
  );
  const bobBalance3 = await tokenClient.getTokenForAccount(bob.address(), tokenId);
  console.log(`Alice's token balance: ${aliceBalance3["amount"]}`);
  console.log(`Bob's token balance: ${bobBalance3["amount"]}`);

  const provider = new Provider(Network.LOCAL);
  console.log("\n=== Checking if indexer devnet chainId same as fullnode chainId  ===");
  const indexerLedgerInfo = await provider.getIndexerLedgerInfo();
  const fullNodeChainId = await provider.getChainId();

  console.log(
      `\n fullnode chain id is: ${fullNodeChainId}, indexer chain id is: ${indexerLedgerInfo.ledger_infos[0].chain_id}`,
  );

  if (indexerLedgerInfo.ledger_infos[0].chain_id !== fullNodeChainId) {
    console.log(`\n fullnode chain id and indexer chain id are not synced, skipping rest of tests`);
    return;
  }

  console.log("\n=== Getting Alices's NFTs ===");
  const aliceNfts = await provider.getAccountNFTs(alice.address().hex());
  console.log(`Alice current token ownership: ${aliceNfts.current_token_ownerships[0].amount}. Should be 1`);

  console.log("\n=== Getting Bob's NFTs ===");
  const bobNfts = await provider.getAccountNFTs(bob.address().hex());
  console.log(`Bob current token ownership: ${bobNfts.current_token_ownerships.length}. Should be 0`);
}

onMounted(() => {
  getAccount()
})
</script>
