<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const loadingData = ref(true);
const currentDateTime = ref(new Date());
const router = useRouter();


const user = ref({
    name: 'John Doe',
    position: 'UX Designer',
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    streak: 5,
    team: 'Design Squad',
    status: 'checked-in',
    checkedInTime: '08:30 AM'
});

// Projects data
const projects = ref([
    {
        id: 1,
        name: 'Website Redesign',
        progress: 68,
        deadline: '2025-04-15',
        priority: 'high',
        color: 'primary',
        tasks: 24,
        completedTasks: 16
    },
    {
        id: 2,
        name: 'Mobile App UI Kit',
        progress: 42,
        deadline: '2025-05-03',
        priority: 'medium',
        color: 'secondary',
        tasks: 36,
        completedTasks: 15
    },
    {
        id: 3,
        name: 'Brand Guidelines',
        progress: 91,
        deadline: '2025-03-28',
        priority: 'medium',
        color: 'purple',
        tasks: 18,
        completedTasks: 16
    },
    {
        id: 4,
        name: 'Product Onboarding Flow',
        progress: 12,
        deadline: '2025-06-10',
        priority: 'low',
        color: 'green',
        tasks: 15,
        completedTasks: 2
    }
]);

// Team members data
const teamMembers = ref([
    { name: 'Sarah Miller', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg', time: '08:32 AM' },
    { name: 'David Chen', status: 'away', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg', time: '07:45 AM' },
    { name: 'Priya Sharma', status: 'offline', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg', time: 'Yesterday' },
    { name: 'James Wilson', status: 'checked-in', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg', time: '09:05 AM' }
]);

// Recent tasks
const recentTasks = ref([
    { id: 1, title: 'Design homepage hero section', status: 'in-progress', project: 'Website Redesign', dueDate: '2025-03-22' },
    { id: 2, title: 'Create icon set for mobile navigation', status: 'completed', project: 'Mobile App UI Kit', dueDate: '2025-03-18' },
    { id: 3, title: 'Update typography guidelines', status: 'review', project: 'Brand Guidelines', dueDate: '2025-03-21' },
    { id: 4, title: 'Wireframe onboarding screens', status: 'in-progress', project: 'Product Onboarding Flow', dueDate: '2025-03-25' },
    { id: 5, title: 'Design system component updates', status: 'backlog', project: 'Website Redesign', dueDate: '2025-03-30' }
]);


// Upcoming calendar
const upcomingEvents = ref([
    { time: '10:00 AM', title: 'Weekly Team Standup', participants: 8 },
    { time: '12:30 PM', title: 'Lunch & Learn: UI Trends', participants: 12 },
    { time: '03:00 PM', title: 'Project Review', participants: 4 }
]);

// Time tracking for the week
const weeklyTimeData = ref([
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 7.2 },
    { day: 'Wed', hours: 8.0 },
    { day: 'Thu', hours: 8.2 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 }
]);

// Calculate work week stats
const weekStats = computed(() => {
    const totalHours = weeklyTimeData.value.reduce((sum, day) => sum + day.hours, 0);
    const completedDays = weeklyTimeData.value.filter(day => day.hours > 0).length;
    const targetHours = 40;
    const progressPercentage = Math.min(Math.round((totalHours / targetHours) * 100), 100);

    return {
        totalHours: totalHours.toFixed(1),
        completedDays,
        progressPercentage,
        remainingHours: Math.max(targetHours - totalHours, 0).toFixed(1)
    };
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

// Calculate days remaining for deadline
const getDaysRemaining = (deadline: Date) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = Number(deadlineDate) - Number(today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Get status color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'green';
        case 'in-progress':
            return 'blue';
        case 'review':
            return 'orange';
        case 'backlog':
            return 'grey';
        default:
            return 'grey';
    }
};

// Get priority color
const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high':
            return 'red';
        case 'medium':
            return 'orange';
        case 'low':
            return 'green';
        default:
            return 'grey';
    }
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
                <q-btn flat color="primary" class="q-ml-sm" label="View Timesheet" icon="schedule" />
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
                            <div class="text-h6">Active Projects</div>
                            <q-btn flat color="primary" label="View All Projects" />
                        </div>
                    </q-card-section>

                    <q-card-section>
                        <q-list separator>
                            <q-item v-for="project in projects" :key="project.id" clickable class="project-item">
                                <q-item-section>
                                    <div class="row items-center q-col-gutter-md">
                                        <div class="col-12 col-sm-4">
                                            <q-item-label class="text-weight-medium">{{ project.name
                                                }}</q-item-label>
                                            <q-item-label caption>
                                                <q-badge :color="getPriorityColor(project.priority)" text-color="white"
                                                    class="q-mr-xs">
                                                    {{ project.priority }}
                                                </q-badge>
                                                <span>{{ project.completedTasks }}/{{ project.tasks }}
                                                    tasks</span>
                                            </q-item-label>
                                        </div>

                                        <div class="col-12 col-sm-4">
                                            <q-linear-progress :value="project.progress / 100" :color="project.color"
                                                class="q-mt-sm" />
                                            <div class="row justify-between q-mt-xs">
                                                <span class="text-caption">Progress</span>
                                                <span class="text-caption text-weight-medium">{{
                                                    project.progress
                                                    }}%</span>
                                            </div>
                                        </div>

                                        <div class="col-12 col-sm-4">
                                            <div class="row">
                                                <div class="col">
                                                    <q-item-label caption>Deadline</q-item-label>
                                                    <q-item-label>{{ new
                                                        Date(project.deadline).toLocaleDateString()
                                                        }}</q-item-label>
                                                </div>
                                                <div class="col text-right">
                                                    <q-item-label caption>Remaining</q-item-label>
                                                    <q-item-label
                                                        :class="getDaysRemaining(new Date(project.deadline)) < 7 ? 'text-negative' : ''">
                                                        {{ getDaysRemaining(new Date(project.deadline)) }} days
                                                    </q-item-label>
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

                <!-- My Tasks -->
                <q-card>
                    <q-card-section class="q-pb-none">
                        <div class="row items-center justify-between">
                            <div class="text-h6">My Tasks</div>
                            <q-btn flat color="primary" label="View All Tasks" />
                        </div>
                    </q-card-section>

                    <q-card-section>
                        <q-table :rows="recentTasks" :columns="[
                            { name: 'title', label: 'Task', field: 'title', align: 'left' },
                            { name: 'project', label: 'Project', field: 'project', align: 'left' },
                            { name: 'status', label: 'Status', field: 'status', align: 'center' },
                            { name: 'dueDate', label: 'Due Date', field: 'dueDate', align: 'center' },
                            { name: 'actions', label: '', field: 'actions', align: 'right' }
                        ]" row-key="id" flat :pagination="{ rowsPerPage: 5 }">
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                    <q-td key="title" :props="props">
                                        {{ props.row.title }}
                                    </q-td>
                                    <q-td key="project" :props="props">
                                        {{ props.row.project }}
                                    </q-td>
                                    <q-td key="status" :props="props" class="text-center">
                                        <q-badge :color="getStatusColor(props.row.status)">
                                            {{ props.row.status.replace('-', ' ') }}
                                        </q-badge>
                                    </q-td>
                                    <q-td key="dueDate" :props="props" class="text-center">
                                        {{ new Date(props.row.dueDate).toLocaleDateString() }}
                                    </q-td>
                                    <q-td key="actions" :props="props" class="text-right">
                                        <q-btn flat round dense icon="more_vert">
                                            <q-menu>
                                                <q-list style="min-width: 120px">
                                                    <q-item clickable v-close-popup>
                                                        <q-item-section>View Details</q-item-section>
                                                    </q-item>
                                                    <q-item clickable v-close-popup>
                                                        <q-item-section>Change Status</q-item-section>
                                                    </q-item>
                                                    <q-item clickable v-close-popup>
                                                        <q-item-section>Edit Task</q-item-section>
                                                    </q-item>
                                                </q-list>
                                            </q-menu>
                                        </q-btn>
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
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
                                <div class="text-caption text-grey-7">{{ user.position }} · {{ user.team }}
                                </div>
                                <div class="text-caption q-mt-xs">
                                    <q-badge color="green" v-if="user.status === 'checked-in'">
                                        Checked in at {{ user.checkedInTime }}
                                    </q-badge>
                                </div>
                            </div>
                        </div>

                        <q-list>
                            <q-item>
                                <q-item-section avatar>
                                    <q-icon name="schedule" color="primary" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Weekly Time</q-item-label>
                                    <q-item-label caption>
                                        {{ weekStats.totalHours }} / 40.0 hours ({{ weekStats.completedDays }}
                                        days)
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-circular-progress :value="weekStats.progressPercentage" size="40px"
                                        :thickness="0.11" color="primary" track-color="grey-3" class="q-mr-sm">
                                        <div class="text-caption">{{ weekStats.progressPercentage }}%</div>
                                    </q-circular-progress>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>

                </q-card>

                <!-- Team Members -->
                <q-card class="q-mb-md">
                    <q-card-section class="q-pb-none">
                        <div class="text-h6">Team Members</div>
                    </q-card-section>

                    <q-card-section>
                        <q-list separator>
                            <q-item v-for="(member, index) in teamMembers" :key="index" clickable>
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

                <!-- Today's Schedule -->
                <q-card>
                    <q-card-section class="q-pb-none">
                        <div class="text-h6">Today's Schedule</div>
                    </q-card-section>

                    <q-card-section>
                        <q-list separator>
                            <q-item v-for="(event, index) in upcomingEvents" :key="index" clickable>
                                <q-item-section avatar>
                                    <q-icon name="event" color="primary" />
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>{{ event.title }}</q-item-label>
                                    <q-item-label caption>
                                        {{ event.time }} · {{ event.participants }} participants
                                    </q-item-label>
                                </q-item-section>

                                <q-item-section side>
                                    <q-btn flat round icon="videocam" color="primary" size="sm" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>