import { AptosClient } from 'aptos';

export default defineNuxtPlugin((nuxtApp) => {
    // Nuxt.js의 runtimeConfig에서 Aptos Node URL 가져오기
    // const nodeUrl = useRuntimeConfig().nodeUrl as string;
    const nodeUrl = "http://localhost:8080/v1";

    // AptosClient 인스턴스 생성
    const client: AptosClient = new AptosClient(nodeUrl);

    // Nuxt.js 인스턴스에 'aptosClient'라는 이름으로 주입
    nuxtApp.provide('aptosClient', client);
});
