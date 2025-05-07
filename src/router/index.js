import { createRouter, createWebHistory } from 'vue-router'

// Vistas de auth
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import NotFoundView from '../views/auth/NotFoundView.vue'

// Layout y vistas internas
import BaseLayout from '../layouts/BaseLayout.vue'
import DataTableView from '../views/DataTableView.vue'  
import RolesView from '../views/RolesView.vue'
import PermissionsView from '../views/PermissionsView.vue'



const routes = [
  // Auth routes (sin layout)
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/forgot-password', component: ForgotPasswordView },

  // Protected routes (con layout)
  {
    path: '/dashboard',
    component: BaseLayout,
    children: [
      { path: '', component: DataTableView },
      // { path: 'profile', component: ProfileView }
      // Aquí puedes seguir agregando rutas internas protegidas
    ]
  },
  {
    path: '/roles',
    component: BaseLayout,
    children: [
      { path: '', component: RolesView },
      // { path: 'profile', component: ProfileView }
      // Aquí puedes seguir agregando rutas internas protegidas
    ]
  },
  {
    path: '/permisos',
    component: BaseLayout,
    children: [
      { path: '', component: PermissionsView },
      // { path: 'profile', component: ProfileView }
      // Aquí puedes seguir agregando rutas internas protegidas
    ]
  },

  // Ruta 404
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router




// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import LoginView from '../views/LoginView.vue';
// import RegisterView from '../views/RegisterView.vue';
// import ProfileView from '../views/ProfileView.vue';
// import ForgotPasswordView from '../views/ForgotPasswordView.vue';
// import ResetPasswordView from '../views/ResetPasswordView.vue';
// import VerifyAccountView from '../views/VerifyAccountView.vue';
// import NotFoundView from '../views/NotFoundView.vue';

// // Definir las rutas
// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: LoginView },
//   { path: '/register', component: RegisterView },
//   { path: '/profile', component: ProfileView },
//   { path: '/forgot-password', component: ForgotPasswordView },
//   { path: '/reset-password', component: ResetPasswordView },
//   { path: '/verify-account', component: VerifyAccountView },
//   { path: '/:pathMatch(.*)*', component: NotFoundView }, // Ruta 404
// ];

// // Crear el enrutador
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
