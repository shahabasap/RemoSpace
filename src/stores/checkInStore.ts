import { defineStore } from "pinia";
import { directus, readCollections } from "src/services/directus";
import { ref } from "vue";

export const useCheckInStore = defineStore('checkin', () => {
    // const checkInTime = ref<Date | null>(null);
    // const checkOutTime = ref<Date | null>(null);
    // const IsCheckedIn = ref(false);
    // const loading = ref(false);

    const check = ref();

    async function checkIn() {
        const attendances = await directus.request(readCollections());
        console.log(attendances);
        check.value = attendances
    }

    return {
        checkIn,
        check,
    }
})