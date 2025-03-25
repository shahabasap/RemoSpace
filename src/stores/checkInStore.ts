// import { defineStore } from "pinia";
// import { directus, readItems } from "src/services/directus";
// import { ref } from "vue";

// export const useCheckInStore = defineStore('checkin', () => {
//     // const checkInTime = ref<Date | null>(null);
//     // const checkOutTime = ref<Date | null>(null);
//     // const IsCheckedIn = ref(false);
//     // const loading = ref(false);
//     const check = ref();

//     async function checkIn() {
//         check.value = await directus.request(readItems('/items/attendances'));
//         console.log(check);
//     }

//     return {
//         checkIn,
//         check,
//     }
// })