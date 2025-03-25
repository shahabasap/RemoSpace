<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { useCheckInStore } from 'src/stores/checkInStore';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const loadingData = ref(true);
const currentDate = ref('');
const currentDateTime = ref(new Date());
const router = useRouter();
const authStore = useAuthStore();
const showModal = ref(true);
const locationVerified = ref(true);
const checkInStore = useCheckInStore();

console.log("asdf",checkInStore?.check)

let timeInterval: number | null = null;

const onSubmit = (): void => {

    showModal.value = false;
};

const user = ref({
    first_name: 'John Doe',
    position: 'UX Designer',
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    status: 'checked-in',
    checkedInTime: '08:30 AM',
    mood: 'happy'
});


const updateCurrentTime = (): void => {
    const now = new Date();
    currentDate.value = now.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};


// check-in modal
const handleCheckIn = () => {

};


const handleMood = () => {
    if (user.value.mood == '') {
        // $q.notify({
        //     message: 'You already checked-in',
        //     color: 'secondary',
        //     position: 'top'
        // })
        void router.push('/mood');
        return;
    } else {
        console.log("ok");
    }
};

const activeTeams = ref([
    {
        id: 1,
        name: 'Frontend Development Team',
        members: 8,
        progress: 75,
        leader: 'John Doe',
        color: 'primary',
        ongoingProjects: 3,
        completedProjects: 12
    },
]);


// Team members data
const activeMembers = ref([
    { name: 'Sarah Miller', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg', time: '08:32 AM' },
    { name: 'David Chen', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg', time: '07:45 AM' },
    { name: 'Priya Sharma', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg', time: 'Yesterday' },
    { name: 'James Wilson', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg', time: '09:05 AM' }
]);


const checkLocation = (): void => {
    // Implement actual location checking logic here
    locationVerified.value = true;
};


// Update date time periodically
onMounted(() => {

    // Set initial time
    updateDateTime();

    // Update time every minute
    setInterval(updateDateTime, 60000);

    // Simulate navigation to check-in page
    setTimeout(() => {
        handleCheckIn();
    }, 1000);

    setTimeout(() => {
        handleMood();
    }, 1000);

    // Simulating data loading
    setTimeout(() => {
        loadingData.value = false;
    }, 1000);
});

onMounted(() => {
    updateCurrentTime();
    timeInterval = window.setInterval(updateCurrentTime, 60000);
    checkLocation();
});

onBeforeUnmount(() => {
    if (timeInterval !== null) {
        clearInterval(timeInterval);
    }
});

const updateDateTime = () => {
    currentDateTime.value = new Date();
};

// Format time as hh:mm AM/PM
const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Format date as Day of Week, Month Day
const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

onMounted(() => {
    const currentUser = authStore.user as {
        id: string;
        email: string;
        first_name?: string;
        last_name?: string;
        avatar?: string;
    } | null;

    if (currentUser) {
        user.value = {
            first_name: currentUser.first_name || '',
            position: 'UX Designer',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
            status: 'checked-in',
            checkedInTime: '08:30 AM',
            mood: 'happy'
        };
    } else {
        console.error('User not found');
    }
});

</script>


<template>
    <q-page class="bg-soft-white q-pa-md">
        <!-- Welcome Header -->
        <div class="row items-center q-mb-md">
            <div class="col-12 col-md-6">
                <h4 class="q-mt-none q-mb-xs">Welcome back, {{ user.first_name }}!</h4>
                <p class="text-grey-7 q-mb-none">{{ formatDate(currentDateTime) }} · {{
                    formatTime(currentDateTime) }}
                </p>
            </div>
            <div class="col-12 col-md-6 text-right">
                <q-btn color="primary" label="Check In/Out" icon="login" @click="showModal = true" />
            </div>
        </div>

        <!-- Dashboard Content -->
        <div class="row q-col-gutter-md">
            <!-- Main Column -->
            <div class="col-12 col-lg-8">

                <!-- Active Projects -->
                <q-card class="q-mb-md">
                    <q-card-section class="q-pb-none">
                        <div class="row items-center justify-between">
                            <div class="text-h6">Active Teams</div>
                            <q-btn flat color="primary" label="View All Projects" />
                        </div>
                    </q-card-section>

                    <q-card-section>
                        <q-list separator>
                            <q-item v-for="team in activeTeams" :key="team.id" clickable class="team-item">
                                <q-item-section>
                                    <div class="row items-center q-col-gutter-md">
                                        <div class="col-12 col-sm-6">
                                            <q-item-label class="text-weight-medium">{{ team.name }}</q-item-label>
                                            <q-item-label caption>
                                                <q-badge :color="team.color" text-color="white" class="q-mr-xs">
                                                    Leader: {{ team.leader }}
                                                </q-badge>
                                                <span>{{ team.members }} Members</span>
                                            </q-item-label>
                                        </div>

                                        <div class="col-12 col-sm-6">
                                            <div class="row">
                                                <div class="col">
                                                    <q-item-label caption>Ongoing Projects</q-item-label>
                                                    <q-item-label>{{ team.ongoingProjects }}</q-item-label>
                                                </div>
                                                <div class="col text-right">
                                                    <q-item-label caption>Completed Projects</q-item-label>
                                                    <q-item-label>{{ team.completedProjects }}</q-item-label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-item-section>

                                <q-item-section side>
                                    <q-btn flat round icon="chevron_right" color="grey-6" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>

                </q-card>
            </div>

            <!-- Sidebar Column -->
            <div class="col-12 col-lg-4">
                <!-- My Status -->
                <q-card class="q-mb-md">
                    <q-card-section class="q-pb-xs">
                        <div class="text-h6">My Status</div>
                    </q-card-section>

                    <q-card-section>
                        <div class="row items-center q-mb-md">
                            <div class="col-auto">
                                <q-avatar size="48px">
                                    <img :src="user.avatar" />
                                    <q-badge floating rounded color="green" v-if="user.status === 'checked-in'" />
                                </q-avatar>
                            </div>
                            <div class="col q-ml-md">
                                <div class="text-subtitle1">{{ user.first_name }}</div>
                                <div class="text-caption text-grey-7">{{ user.position }}
                                </div>
                                <div class="text-caption q-mt-xs">
                                    <q-badge color="green" v-if="user.status === 'checked-in'">
                                        Checked in at {{ user.checkedInTime }}
                                    </q-badge>
                                </div>
                            </div>
                        </div>

                    </q-card-section>

                </q-card>

                <!-- Team Members -->
                <q-card class="q-mb-md">
                    <q-card-section class="q-pb-none">
                        <div class="text-h6">Active Members</div>
                    </q-card-section>

                    <q-card-section>
                        <q-list separator>
                            <q-item v-for="(member, index) in activeMembers" :key="index" clickable>
                                <q-item-section avatar>
                                    <q-avatar>
                                        <img :src="member.avatar" />
                                        <q-badge floating color="green" v-if="member.status === 'checked-in'" />
                                        <q-badge floating color="orange" v-if="member.status === 'away'" />
                                        <q-badge floating color="grey" v-if="member.status === 'offline'" />
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>{{ member.name }}</q-item-label>
                                    <q-item-label caption>
                                        <span class="text-capitalize">{{ member.status.replace('-', ' ')
                                        }}</span> · {{
                                                member.time }}
                                    </q-item-label>
                                </q-item-section>

                                <q-item-section side>
                                    <q-btn flat round size="sm" icon="chat_bubble_outline" color="primary" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>

            </div>
        </div>
    </q-page>



    <!-- check-in/out  modal -->
    <q-dialog v-model="showModal" persistent>
        <q-card class="check-in-modal">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">
                    Remo<span class="text-secondary">Space</span>
                </div>
                <q-btn icon="close" @click="showModal = false" flat size="md" class="absolute-right" />
            </q-card-section>

            <q-card-section class="q-pt-lg">
                <div class="text-center q-mb-md">
                    <h5 class="q-my-sm">{{ user.status ? 'Start Your Day' : 'End Your Day' }}</h5>
                    <p class="text-grey-7 q-mb-lg">Track your attendance and work time</p>
                </div>

                <div class="time-display text-center q-mb-lg">
                    <div class="text-h4 text-primary">{{ formatTime(currentDateTime) }}</div>
                    <div class="text-caption text-grey">{{ currentDate }}</div>
                </div>

                <div class="q-mb-lg">
                    <q-banner class="bg-blue-1 text-primary">
                        <template v-slot:avatar>
                            <q-icon name="person" color="primary" />
                        </template>
                        Welcome, {{ user.first_name }}
                    </q-banner>
                </div>

            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat color="grey-7" label="Cancel" v-close-popup />
                <q-btn unelevated color="primary" :label="user.status ? 'Check-In' : 'Check-Out'"
                    :disable="!locationVerified" @click="onSubmit" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.check-in-modal {
    width: 30vw;
    max-width: 90vw;
    border-radius: 12px;
    background: white;
}

.time-display {
    padding: 1rem;
}

h5 {
    font-weight: 700;
    margin: 0;
}

.text-secondary {
    color: #F59E0B !important;
}

.bg-primary {
    background-color: #1E3A8A !important;
}

.text-primary {
    color: #1E3A8A !important;
}

.text-success,
.bg-success {
    color: #10B981 !important;
    background-color: #10B981 !important;
}

.text-error,
.bg-error {
    color: #EF4444 !important;
    background-color: #EF4444 !important;
}
</style>