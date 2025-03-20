<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentDateTime = ref(new Date());
const loadingData = ref(true);

// User profile data
const user = ref({
    name: 'Alex Johnson',
    position: 'UX Designer',
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    streak: 5,
    team: 'Design Squad',
    status: 'checked-in',
    checkedInTime: '08:30 AM'
});


// Update date time periodically
onMounted(() => {
    // Set initial time
    updateDateTime();

    // Update time every minute
    setInterval(updateDateTime, 60000);

    // Simulating data loading
    setTimeout(() => {
        loadingData.value = false;
    }, 1000);
});

const updateDateTime = () => {
    currentDateTime.value = new Date();
};

const handleLogout = async () => {
    await router.push('/');
};

const goToCheckIn = async () => {
    // This would navigate to your separate check-in page
    await router.push('/checkin');
};


</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-primary">
            <q-toolbar>
                <q-toolbar-title>
                    Remo<span class="text-secondary">Space</span>
                </q-toolbar-title>

                <q-space />

                <q-btn flat round icon="notifications" class="q-mr-sm">
                    <q-badge color="red" floating>3</q-badge>
                </q-btn>


                <q-btn-dropdown flat>
                    <template v-slot:label>
                        <div class="row items-center no-wrap">
                            <q-avatar size="32px">
                                <img :src="user.avatar">
                            </q-avatar>
                            <div class="q-ml-sm">
                                {{ user.name }}
                            </div>
                        </div>
                    </template>

                    <q-list>
                        <q-item clickable v-close-popup @click="() => { }">
                            <q-item-section>My Profile</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="goToCheckIn">
                            <q-item-section>Check In/Out</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="() => { }">
                            <q-item-section>Preferences</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup @click="handleLogout">
                            <q-item-section>Logout</q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-toolbar>

            <q-tabs align="left" class="bg-primary text-white">
                <q-route-tab to="/dashboard" label="Dashboard" icon="dashboard" />
                <q-route-tab to="projects" label="Projects" icon="folder" />
                <q-route-tab to="/tasks" label="Tasks" icon="check_circle" />
                <q-route-tab to="/team" label="Team" icon="groups" />
                <q-route-tab to="/peoples" label="People" icon="people" />
                <q-route-tab to="/reports" label="Reports" icon="bar_chart" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.bg-soft-white {
    background-color: #F8FAFC;
}

.metric-card {
    border-color: rgba(30, 58, 138, 0.1);
    transition: all 0.2s ease;
}

.metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.project-item {
    transition: background-color 0.2s ease;
}

.project-item:hover {
    background-color: rgba(30, 58, 138, 0.04);
}

.weekly-chart .bar-container {
    width: 20px;
    height: 70px;
    display: flex;
    align-items: flex-end;
}

.weekly-chart .time-bar {
    width: 12px;
    border-radius: 6px;
    min-height: 4px;
}

/* Override Quasar theme colors to match our palette */
:deep(.q-btn.bg-primary) {
    background-color: #1E3A8A !important;
}

:deep(.text-secondary) {
    color: #F59E0B !important;
}

:deep(.bg-green-1) {
    background-color: rgba(16, 185, 129, 0.1) !important;
}

:deep(.text-green) {
    color: #10B981 !important;
}

:deep(.bg-red-1) {
    background-color: rgba(239, 68, 68, 0.1) !important;
}

:deep(.text-red) {
    color: #EF4444 !important;
}
</style>