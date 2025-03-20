import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue')
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/checkIn',
    component: () => import('pages/CheckInPage.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    redirect: "/dashboard/team",
    children: [
      {
        path: 'team',
        component: () => import('pages/DashboardPage.vue')
      },
      {
        path: 'projects',
        component: () => import('pages/ProjectPage.vue')
      },
      {
        path: 'peoples',
        component: () => import('pages/UsersPage.vue')
      },
      {
        path: 'rewards',
        component: () => import('pages/RewardsPage.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
