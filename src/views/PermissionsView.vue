<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-semibold">Permisos por Rol</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th class="p-2 border">Rol</th>
            <th class="p-2 border">Permisos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td class="p-2 border font-medium">{{ role.name }}</td>
            <td class="p-2 border">
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="(perm, index) in allPermissions"
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <span class="min-w-[150px]">{{ perm }}</span>
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="role.permissions.includes(perm)"
                      @change="togglePermission(role, perm)"
                    />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Roles de ejemplo
const roles = ref([
  {
    id: 1,
    name: 'Administrador',
    permissions: ['crear usuarios', 'editar roles', 'ver reportes']
  },
  {
    id: 2,
    name: 'Editor',
    permissions: ['editar artículos']
  },
  {
    id: 3,
    name: 'Visor',
    permissions: ['ver artículos', 'ver reportes']
  }
])

// Todos los permisos posibles
const allPermissions = [
  'crear usuarios',
  'editar roles',
  'ver reportes',
  'editar artículos',
  'publicar artículos',
  'ver artículos'
]

// Función para activar/desactivar permisos
const togglePermission = (role, permission) => {
  const index = role.permissions.indexOf(permission)
  if (index === -1) {
    role.permissions.push(permission)
  } else {
    role.permissions.splice(index, 1)
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
