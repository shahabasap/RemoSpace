<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const loadingData = ref(true);
const currentDateTime = ref(new Date());
const router = useRouter();


const user = ref({
    name: 'John Doe',
    position: 'UX Designer',
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    status: 'checked-in',
    checkedInTime: '08:30 AM',
    mood: 'happy'
});


// check-in modal
const handleCheckIn = () => {
    if (user.value.status == 'checked-in') {
        // $q.notify({
        //     message: 'You already checked-in',
        //     color: 'secondary',
        //     position: 'top'
        // })
        return;
    } else {
        void router.push('/checkIn');
    }
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
    {
        id: 2,
        name: 'UI/UX Design Team',
        members: 5,
        progress: 60,
        leader: 'Emily Smith',
        color: 'secondary',
        ongoingProjects: 2,
        completedProjects: 8
    },
    {
        id: 3,
        name: 'Backend Development Team',
        members: 10,
        progress: 85,
        leader: 'Michael Brown',
        color: 'purple',
        ongoingProjects: 4,
        completedProjects: 15
    },
    {
        id: 4,
        name: 'Marketing & Content Team',
        members: 6,
        progress: 50,
        leader: 'Sophia Johnson',
        color: 'green',
        ongoingProjects: 2,
        completedProjects: 6
    }
]);


// Team members data
const activeMembers = ref([
    { name: 'Sarah Miller', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg', time: '08:32 AM' },
    { name: 'David Chen', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg', time: '07:45 AM' },
    { name: 'Priya Sharma', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg', time: 'Yesterday' },
    { name: 'James Wilson', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg', time: '09:05 AM' }
]);


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

const updateDateTime = () => {
    currentDateTime.value = new Date();
};

const goToCheckIn = async () => {
    // This would navigate to your separate check-in page
    await router.push('/checkin');
};

// Format time as hh:mm AM/PM
const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Format date as Day of Week, Month Day
const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};




</script>


<template>
    <q-page class="bg-soft-white q-pa-md">
        <!-- Welcome Header -->
        <div class="row items-center q-mb-md">
            <div class="col-12 col-md-6">
                <h4 class="q-mt-none q-mb-xs">Welcome back, {{ user.name }}!</h4>
                <p class="text-grey-7 q-mb-none">{{ formatDate(currentDateTime) }} · {{
                    formatTime(currentDateTime) }}
                </p>
            </div>
            <div class="col-12 col-md-6 text-right">
                <q-btn color="primary" label="Check In/Out" icon="login" @click="goToCheckIn" />
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
                                <div class="text-subtitle1">{{ user.name }}</div>
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
</template>