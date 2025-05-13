<script setup>
import { ref } from 'vue'
import { useSidebarStore } from '../stores/sidebarStore'
import { useDark } from '@vueuse/core'
import {
  Menu,
  User,
  FileText,
  Briefcase,
  Building,
  ShoppingBag,
  Gavel,
  Stethoscope,
  Settings,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun
} from 'lucide-vue-next'

const sidebarStore = useSidebarStore()
const dropdownOpen = ref(false)
const isDark = useDark()

const toggleDark = () => {
  isDark.value = !isDark.value
}

const modules = ref([
  {
    name: 'Admin',
    icon: Settings,
    open: true,
    options: [
      { name: 'Usuarios', icon: User, to: '/dashboard' },
      { name: 'Roles', icon: FileText, to: '/roles' },
      { name: 'Permisos', icon: Briefcase, to: '/permisos' }
    ]
  },
  {
    name: 'App',
    icon: ShoppingBag,
    open: false,
    options: [
      { name: 'Asociación', icon: Building, to: '/asociations' },
      { name: 'Tiendas', icon: ShoppingBag, to: '/stores' },
      { name: 'Abogados', icon: Gavel, to: '/lawyers' },
      { name: 'Doctores', icon: Stethoscope, to: '/doctors' }
    ]
  }
])

</script>

<template>
  <div :class="['flex w-full h-screen', isDark ? 'bg-gray-900 text-white' : 'bg-white text-black']">
    <div :class="[
      'shadow-lg h-full p-5 transition-all',
      sidebarStore.isOpen ? 'w-64' : 'w-18',
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
    ]">
      <div class="flex items-center justify-between mb-5">
        <span class="text-xl font-bold">{{ sidebarStore.isOpen ? 'Logo' : '' }}</span>
        <button
          @click="sidebarStore.toggleSidebar()"
          class="p-2 rounded-md transition-colors duration-200 bg-white text-white hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-800"
        >
          <Menu size="24" />
        </button>
      </div>

      <nav>
  <div v-for="module in modules" :key="module.name" class="mb-4">
    <template v-if="module.name === 'Admin'">
      <div class="flex items-center space-x-2 mb-2">
        <component :is="module.icon" size="20" />
        <span v-if="sidebarStore.isOpen">{{ module.name }}</span>
      </div>
      <div class="ml-6 space-y-2">
        <router-link
          v-for="option in module.options"
          :key="option.name"
          :to="option.to"
          class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <component :is="option.icon" size="16" />
          <span v-if="sidebarStore.isOpen">{{ option.name }}</span>
        </router-link>
      </div>
    </template>

    <!-- APP (colapsable) -->
    <template v-else>
      <button
        @click="module.open = !module.open"
        class="flex items-center w-full justify-between p-2 rounded-md hover:bg-gray-200 dark:hover:bg-blue-700"
      >
        <div class="flex items-center space-x-2">
          <component :is="module.icon" size="20" />
          <span v-if="sidebarStore.isOpen">{{ module.name }}</span>
        </div>
        <ChevronUp v-if="module.open && sidebarStore.isOpen" size="20" />
        <ChevronDown v-else-if="sidebarStore.isOpen" size="20" />
      </button>
      <div v-if="module.open" class="ml-6 space-y-2">
        <router-link
          v-for="option in module.options"
          :key="option.name"
          :to="option.to"
          class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <component :is="option.icon" size="16" />
          <span v-if="sidebarStore.isOpen">{{ option.name }}</span>
        </router-link>
      </div>
    </template>
  </div>
</nav>

    </div>

    <!-- Main Content -->
    <div class="flex-1 p-5">
      <div class="flex justify-between border-solid border-2 rounded-md border-blue-300 bg-blue-200 hover:bg-gray-200 dark:hover:bg-blue-700 p-2 items-center">
        <button @click="toggleDark()" class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <Moon v-if="isDark" size="24" />
          <Sun v-else size="24" />
        </button>
        <div class="relative">
          <img
            @click="dropdownOpen = !dropdownOpen"
            src="https://picsum.photos/40"
            alt="Perfil"
            class="rounded-full w-10 h-10 cursor-pointer"
          />
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg rounded-md overflow-hidden">
            <button class="w-full flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              <User size="18" /> <span>Perfil</span>
            </button>
            <button class="w-full flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Settings size="18" /> <span>Configuración</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 p-5" :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'">
        <router-view />
      </div>
    </div>
  </div>
</template>
