<template>
  <div>
    <NuxtLayout>
      <div class="min-h-screen p-6">
        <!-- Dashboard Container -->
        <div class="max-w-7xl mx-auto">
          <!-- Page Title -->
          <h1
              class="text-4xl font-bold text-black border-b-4 border-black mb-8 pb-2"
          >
            Buying a ticket NFT
          </h1>

          <!-- Card Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 카드 생성 -->
            <div
                v-for="(event, index) in events"
                :key="index"
                class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300 flex"
            >
              <!-- 이미지 섹션 -->

              <div class="w-36">
                <!-- 로딩 스피너 (imageLoaded가 false일 때만 표시) -->
                <div
                    v-if="!imageLoaded"
                    class="w-full h-full flex items-center justify-center bg-gray-200"
                >
                  <div class="spinner"></div>
                </div>
                <!-- 이미지 -->
                <img
                    :src="event.image"
                    alt="Event Image"
                    class="w-full h-full object-cover"
                    @load="imageLoaded = true"
                    @error="imageLoaded = true"
                />
              </div>

              <!-- 정보 섹션 -->
              <div class="px-2 py-3 w-2/3 flex flex-col justify-between">
                <div>
                  <h2 class="text-lg font-semibold">
                    {{ event.name }}
                  </h2>
                  <p class="text-gray-800">
                    Date: {{ formatDate(event.date) }}
                  </p>
                  <p class="text-gray-800">
                    Price: {{ event.ticket_price }} APT
                  </p>
                  <p class="text-gray-800">
                    Tickets left: {{ event.available_tickets }}
                  </p>
                </div>
                <div class="flex justify-end">
                  <button
                      :class="[
          'w-full py-2 px-4 rounded text-white font-bold transition-colors duration-300',
          event.available_tickets === '0' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        ]"
                      :disabled="event.available_tickets === '0'" @click="goToBuyPage(event.id)"

                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
//api 호출용

// import axios from 'axios';

// // 상태 관리 변수들
// const events = ref([]);
// const loading = ref(true);
// const error = ref(null);

// // API에서 데이터 불러오기
// const fetchEvents = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/api/concert');
//     events.value = response.data.events;
//   } catch (err) {
//     error.value = 'Failed to load events.';
//     console.error(err);
//   } finally {
//     loading.value = false;
//   }
// };

// // 컴포넌트가 마운트될 때 데이터 가져오기
// onMounted(() => {
//   fetchEvents();
// });

import {useEventStore} from "~/store/event";
import {useRouter} from "nuxt/app";

// store에서 이벤트 데이터 불러오기
const eventStore = useEventStore();
const events = eventStore.events;

const imageLoaded = ref(false); // 이미지 로딩 상태
const placeholderImage = "https://via.placeholder.com/150"; // 기본 플레이스홀더 이미지

const formatDate = (dateString: string) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}.${month}.${day}`;
};
ref(123);
const router = useRouter();

const goToBuyPage = (eventId: string) => {
  router.push(`/buy/${eventId}`);
};
</script>

<style scoped>
/* 로딩 스피너 스타일 */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
