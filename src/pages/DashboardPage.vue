<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';

const left = ref(false);
const $q = useQuasar();

// User data
const user = ref({
    name: 'Alex Johnson',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    department: 'Design',
    teamName: 'Product Experience',
    checkedIn: false,
    moodSubmitted: false,
    timezone: 'GMT+5:30',
    workStatus: 'Remote'
});

// Date and time data
const currentDate = ref('');
const currentTime = ref('');

// Check-in state
const isCheckedIn = ref(false);
const checkInTime = ref('');

// Mood tracking
const selectedMood = ref<number | null>(null);
const moodOptions = [
    { value: 5, label: 'Excellent', icon: 'sentiment_very_satisfied', color: '#10B981' },
    { value: 4, label: 'Good', icon: 'sentiment_satisfied', color: '#60A5FA' },
    { value: 3, label: 'Okay', icon: 'sentiment_neutral', color: '#F59E0B' },
    { value: 2, label: 'Not Great', icon: 'sentiment_dissatisfied', color: '#FB923C' },
    { value: 1, label: 'Struggling', icon: 'sentiment_very_dissatisfied', color: '#EF4444' }
];
const moodNotes = ref('');

// Update date and time
const updateDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.value = now.toLocaleDateString('en-US', options);
    currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Check in function
const handleCheckIn = () => {
    const now = new Date();
    checkInTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    isCheckedIn.value = true;

    // Show success notification
    $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle',
        message: `You've successfully checked in at ${checkInTime.value}`
    });
};

const handleCheckOut = () => {
    isCheckedIn.value = false;
};

// Submit mood feedback
const submitMood = () => {
    // In a real app, you would send this data to your backend
    const selectedMoodData = moodOptions.find(mood => mood.value === selectedMood.value);

    // Show success notification
    $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle',
        message: `Mood feedback submitted: ${selectedMoodData?.label}`
    });

    user.value.moodSubmitted = true;
};

// Navigate to profile
const goToProfile = () => {
    // router.push('/profile');
    console.log('Navigate to profile');
};

// Initialize date and time, and set up interval to update them
onMounted(() => {
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
});
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <!-- Header -->
        <q-header elevated class="bg-primary">
            <q-toolbar>
                <q-btn flat round dense icon="menu" @click="left = !left" />
                <q-toolbar-title>
                    <div class="logo">
                        Remo<span class="text-secondary">Space</span>
                    </div>
                </q-toolbar-title>

                <q-space />

                <div class="current-time q-mr-md text-weight-medium">{{ currentTime }}</div>

                <q-btn round flat>
                    <q-avatar size="28px">
                        <img :src="user.avatar">
                    </q-avatar>

                    <q-menu>
                        <q-list style="min-width: 200px">
                            <q-item clickable v-ripple @click="goToProfile">
                                <q-item-section avatar>
                                    <q-avatar>
                                        <img :src="user.avatar">
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ user.name }}</q-item-label>
                                    <q-item-label caption>{{ user.department }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="person" />
                                </q-item-section>
                                <q-item-section>Profile</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="settings" />
                                </q-item-section>
                                <q-item-section>Settings</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="logout" />
                                </q-item-section>
                                <q-item-section>Logout</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>

            <q-tabs dense no-caps inline-label align="left">
                <q-route-tab to="/page1" icon="dashboard" label="Dashboard" />
                <q-route-tab to="/page2" icon="people" label="Team" />
                <q-route-tab to="/page3" icon="work" label="Projects" />
                <q-route-tab to="/page3" icon="emoji_events" label="Rewards" />
            </q-tabs>
        </q-header>

        <!-- Main content area -->
        <q-page-container class="bg-soft-white">
            <q-page padding>
                <!-- Welcome section with date -->
                <div class="dashboard-container">
                    <!-- Welcome section with date and check-in -->
                    <div class="welcome-section">
                        <q-card flat bordered class="welcome-card">
                            <q-card-section>
                                <div class="row items-center justify-between">
                                    <div class="col-12 col-md-6">
                                        <h5 class="q-my-none text-weight-bold">Welcome back, {{ user.name }}</h5>
                                        <p class="q-mb-none text-grey-7">{{ currentDate }}</p>
                                    </div>
                                    <div class="col-12 col-md-6 text-right">
                                        <div class="row justify-end items-center q-gutter-md">
                                            <div class="location-badge">
                                                <q-chip outline color="primary">
                                                    <q-avatar>
                                                        <q-icon name="schedule" />
                                                    </q-avatar>
                                                    {{ user.timezone }}
                                                </q-chip>
                                                <q-chip outline color="primary">
                                                    <q-avatar>
                                                        <q-icon name="location_on" />
                                                    </q-avatar>
                                                    {{ user.workStatus }}
                                                </q-chip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>

                    <!-- Main Content Cards -->
                    <div class="row q-col-gutter-md q-mt-md">
                        <!-- Check-in Card -->
                        <div class="col-12 col-md-6">
                            <q-card bordered class="full-height">
                                <q-card-section class="bg-primary text-white">
                                    <div class="text-h6">Daily Check-In</div>
                                    <p class="description q-mb-none">Start your day and let your team know you're online
                                    </p>
                                </q-card-section>

                                <q-separator />

                                <q-card-section class="text-center q-pa-lg">
                                    <div v-if="!isCheckedIn">
                                        <div class="text-h6 q-mb-md">Ready to begin your day?</div>

                                        <q-avatar size="80px" class="q-mb-lg">
                                            <q-icon name="login" size="60px" color="primary" />
                                        </q-avatar>

                                        <div class="q-mt-md">
                                            <q-btn unelevated color="primary" size="lg" class="full-width q-py-sm"
                                                label="Check In Now" @click="handleCheckIn" icon="login" />
                                        </div>
                                    </div>

                                    <div v-else>
                                        <div class="text-h6 text-positive q-mb-md">You're checked in for today</div>

                                        <q-avatar size="80px" class="q-mb-md">
                                            <q-icon name="check_circle" size="60px" color="positive" />
                                        </q-avatar>

                                        <div class="q-mt-sm text-subtitle1">
                                            Checked in at <span class="text-weight-bold">{{ checkInTime }}</span>
                                        </div>

                                        <div class="q-mt-lg">
                                            <q-btn outline color="negative" label="Check Out" @click="handleCheckOut"
                                                icon="logout" class="q-py-sm" />
                                        </div>
                                    </div>
                                </q-card-section>

                                <q-separator />

                                <q-card-section class="bg-blue-1 text-primary">
                                    <div class="row items-center">
                                        <q-icon name="info" class="q-mr-sm" />
                                        <div>Check-in is required to access all platform features</div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <!-- Mood Tracking Card -->
                        <div class="col-12 col-md-6">
                            <q-card bordered :class="{ 'disabled-card': !isCheckedIn }">
                                <q-card-section class="bg-primary text-white">
                                    <div class="text-h6">Mood Check</div>
                                    <p class="description q-mb-none">How are you feeling today?</p>
                                </q-card-section>

                                <q-separator />

                                <q-card-section class="q-pa-lg">
                                    <div class="text-center q-mb-md" v-if="!isCheckedIn">
                                        <q-icon name="lock" size="24px" color="grey-7" class="q-mr-xs" />
                                        <span class="text-grey-7">Check in first to share your mood</span>
                                    </div>

                                    <div v-else-if="user.moodSubmitted" class="text-center">
                                        <div class="text-h6 text-positive q-mb-md">Mood submitted</div>
                                        <q-avatar size="80px" class="q-mb-md">
                                            <q-icon name="how_to_reg" size="60px" color="positive" />
                                        </q-avatar>
                                        <div class="q-mt-sm text-subtitle1">
                                            Thank you for sharing how you're feeling today!
                                        </div>
                                    </div>

                                    <div v-else>
                                        <div class="mood-selection q-mb-lg">
                                            <div class="row justify-center q-gutter-md">
                                                <div v-for="mood in moodOptions" :key="mood.value"
                                                    class="mood-option text-center"
                                                    :class="{ 'selected-mood': selectedMood === mood.value }"
                                                    @click="selectedMood = mood.value">
                                                    <q-avatar size="54px"
                                                        :color="selectedMood === mood.value ? mood.color : 'grey-3'">
                                                        <q-icon :name="mood.icon" size="36px"
                                                            :color="selectedMood === mood.value ? 'white' : 'grey-7'" />
                                                    </q-avatar>
                                                    <div class="q-mt-sm"
                                                        :class="{ 'text-weight-bold': selectedMood === mood.value }">
                                                        {{ mood.label }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <q-input v-model="moodNotes" type="textarea"
                                            label="Anything to share? (optional)" outlined rows="2" />

                                        <div class="text-center q-mt-lg">
                                            <q-btn unelevated color="secondary" class="full-width q-py-sm"
                                                label="Submit Mood" @click="submitMood" :disable="!selectedMood" />
                                        </div>
                                    </div>
                                </q-card-section>

                                <q-separator />

                                <q-card-section class="bg-amber-1 text-amber-9">
                                    <div class="row items-center">
                                        <q-icon name="lightbulb" class="q-mr-sm" />
                                        <div>Your wellbeing matters! Mood data helps us support our team better</div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>

                    <!-- Quick Stats Section -->
                    <div class="row q-col-gutter-md q-mt-md">
                        <div class="col-12 col-md-4">
                            <q-card bordered class="quick-access-card">
                                <q-card-section class="bg-blue-1 text-primary">
                                    <div class="text-subtitle1 text-weight-bold">
                                        <q-icon name="access_time" class="q-mr-sm" />
                                        Weekly Check-ins
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-pa-md text-center">
                                    <div class="text-h4 text-weight-bold text-primary">4/5</div>
                                    <q-linear-progress size="10px" :value="0.8" color="primary" class="q-mt-sm" />
                                    <div class="text-caption q-mt-sm">Great progress this week!</div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col-12 col-md-4">
                            <q-card bordered class="quick-access-card">
                                <q-card-section class="bg-amber-1 text-amber-9">
                                    <div class="text-subtitle1 text-weight-bold">
                                        <q-icon name="emoji_events" class="q-mr-sm" />
                                        Reward Points
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-pa-md text-center">
                                    <div class="text-h4 text-weight-bold text-secondary">750</div>
                                    <div class="text-caption q-mt-sm">250 points until next reward</div>
                                    <q-btn flat color="secondary" class="q-mt-sm" label="Redeem" />
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col-12 col-md-4">
                            <q-card bordered class="quick-access-card">
                                <q-card-section class="bg-green-1 text-green-9">
                                    <div class="text-subtitle1 text-weight-bold">
                                        <q-icon name="people" class="q-mr-sm" />
                                        Team Status
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-pa-md text-center">
                                    <div class="text-h4 text-weight-bold text-positive">12/15</div>
                                    <div class="text-caption q-mt-sm">Team members checked in today</div>
                                    <q-btn flat color="positive" class="q-mt-sm" label="View Team" />
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
}

.bg-soft-white {
    background-color: #F8FAFC;
}

.welcome-card {
    background-color: white;
}

.active-nav-link {
    color: #1E3A8A;
    background-color: #EFF6FF;
    font-weight: 500;
}

.mood-option {
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.mood-option:hover {
    background-color: #EFF6FF;
}

.selected-mood {
    background-color: #EFF6FF;
}

.disabled-card {
    opacity: 0.75;
    pointer-events: none;
}

.text-secondary {
    color: #F59E0B !important;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
}

.description {
    font-size: 0.9rem;
    line-height: 1.6;
    opacity: 0.9;
}

.drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.drawer-footer {
    margin-top: auto;
}

.current-time {
    font-size: 1rem;
}

.quick-access-card {
    height: 100%;
    border-color: rgba(30, 58, 138, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .location-badge {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
    }
}
</style>