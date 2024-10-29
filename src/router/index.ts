import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/Pages/HomeView.vue'
import LoginView from '@/Pages/LoginView.vue'
import EventsView from '@/Pages/EventsView.vue'
import TeamView from '@/Pages/TeamView.vue'
import ProfileView from '@/Pages/ProfileView.vue'
import CreateView from '@/Pages/CreateView.vue'
import BirthdayView from '@/Pages/BirthdayView.vue'
import UserView from '@/Pages/UserView.vue'
import Settings from '@/Pages/Settings.vue'
import Icons from '@/Pages/Icons.vue'
import SuccessPage from '@/Pages/SuccessPage.vue'
import LineUpView from "@/Pages/LineUpView.vue";

// Define routes
const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/success', component: SuccessPage },
  { path: '/termine', component: EventsView },
  { path: '/geburtstage', component: BirthdayView },
  { path: '/team', component: TeamView },
  {
    path: '/team/:id',
    component: UserView,
  },
  { path: '/dein-profil', component: ProfileView },
  { path: '/erstellen', component: CreateView },
  { path: '/einstellungen', component: Settings },
  { path: '/icons', component: Icons },
  { path: '/lineup', component: LineUpView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
