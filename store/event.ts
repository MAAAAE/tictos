// store/event.ts
import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [
      {
        available_tickets: 10,
        date: "20240910",
        id: "0",
        name: "Rock Festival",
        ticket_price: 150,
        image: "https://picsum.photos/seed/one/300/150",
      },
      {
        available_tickets: 50,
        date: "20240912",
        id: "1",
        name: "Jazz Night",
        ticket_price: 80,
        image: "https://picsum.photos/seed/two/300/150",
      },
      {
        available_tickets: 200,
        date: "20240915",
        id: "2",
        name: "Pop Concert",
        ticket_price: 120,
        image: "https://picsum.photos/seed/three/300/150",
      },
      {
        available_tickets: 5,
        date: "20240920",
        id: "3",
        name: "Classical Evening",
        ticket_price: 200,
        image: "https://picsum.photos/seed/four/300/150",
      },
      {
        available_tickets: 0,
        date: "20240925",
        id: "4",
        name: "Indie Music Fest",
        ticket_price: 90,
        image: "https://picsum.photos/seed/five/300/150",
      },
    ],
  }),
  getters: {
    getEventByIndex: (state) => (index: number) => {
      return state.events[index];
    },

  },
  actions: {
    buying: function (index: number) {
      this.events[index].available_tickets = this.events[index].available_tickets - 1;
    }
    // 이벤트 관련 데이터 업데이트 로직 추가 가능
  },
});
