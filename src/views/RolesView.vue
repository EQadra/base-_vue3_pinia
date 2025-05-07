<template>
    <div class="p-4">
      <h1 class="mb-4 text-xl font-semibold">Tabla de Roles</h1>
  
      <div class="search-bar">
        <label for="search-field">Buscar por:</label>
        <select v-model="searchField" id="search-field" class="search-select">
          <option value="name">Nombre</option>
          <option value="description">Descripción</option>
        </select>
  
        <label for="search-value">Valor:</label>
        <input
          id="search-value"
          type="text"
          v-model="searchValue"
          class="search-input"
          placeholder="Escribe para buscar..."
        />
  
        <button @click="showAddRoleForm" class="form-toggle-btn">➕ Nuevo Rol</button>
      </div>
  
      <EasyDataTable
        class="custom-table"
        :headers="headers"
        :items="filteredRoles"
      >
        <template #item-permissions="{ permissions }">
          <ul>
            <li v-for="perm in permissions" :key="perm">{{ perm }}</li>
          </ul>
        </template>
  
        <template #item-action="{ id }">
          <button @click="viewRole(id)" title="Ver">👁️</button>
          <button @click="editRole(id)" title="Editar">✏️</button>
          <button @click="deleteRole(id)" title="Eliminar">🗑️</button>
        </template>
      </EasyDataTable>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import Swal from 'sweetalert2'
  import EasyDataTable from 'vue3-easy-data-table'
  import 'vue3-easy-data-table/dist/style.css'
  
  // Datos estáticos de roles y permisos
  const roles = ref([
    {
      id: 1,
      name: 'Administrador',
      description: 'Acceso total al sistema',
      permissions: ['crear usuarios', 'editar roles', 'ver reportes', 'eliminar usuarios']
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Puede editar contenido',
      permissions: ['editar artículos', 'publicar artículos']
    },
    {
      id: 3,
      name: 'Visor',
      description: 'Solo lectura',
      permissions: ['ver artículos', 'ver reportes']
    }
  ])
  
  const searchField = ref('name')
  const searchValue = ref('')
  
  const filteredRoles = computed(() => {
    return roles.value.filter(role =>
      role[searchField.value]?.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  })
  
  const headers = [
    { text: 'ID', value: 'id' },
    { text: 'Nombre', value: 'name' },
    { text: 'Descripción', value: 'description' },
    { text: 'Permisos', value: 'permissions' },
    { text: 'Acciones', value: 'action' }
  ]
  
  const findRole = (id) => roles.value.find(r => r.id === id)
  
  const viewRole = (id) => {
    const role = findRole(id)
    Swal.fire({
      title: `Rol: ${role.name}`,
      text: `Descripción: ${role.description}\nPermisos: ${role.permissions.join(', ')}`,
      icon: 'info'
    })
  }
  
  const editRole = async (id) => {
    const role = findRole(id)
    const { value: newName } = await Swal.fire({
      title: 'Editar nombre del rol',
      input: 'text',
      inputLabel: 'Nuevo nombre',
      inputValue: role.name,
      showCancelButton: true
    })
    if (newName) {
      role.name = newName
      Swal.fire('Actualizado', 'El nombre del rol ha sido actualizado', 'success')
    }
  }
  
  const deleteRole = (id) => {
    const role = findRole(id)
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esto eliminará el rol "${role.name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        roles.value = roles.value.filter(r => r.id !== id)
        Swal.fire('Eliminado', 'El rol fue eliminado', 'success')
      }
    })
  }
  
  const showAddRoleForm = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Nuevo Rol',
      html:
        `<input id="swal-input-name" class="swal2-input" placeholder="Nombre del rol">` +
        `<input id="swal-input-desc" class="swal2-input" placeholder="Descripción">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      preConfirm: () => {
        const name = document.getElementById('swal-input-name').value
        const description = document.getElementById('swal-input-desc').value
        if (!name || !description) {
          Swal.showValidationMessage('Todos los campos son obligatorios')
          return
        }
        return { name, description }
      }
    })
  
    if (formValues) {
      const newId = roles.value.length
        ? Math.max(...roles.value.map(r => r.id)) + 1
        : 1
  
      roles.value.push({ id: newId, ...formValues, permissions: [] })
      Swal.fire('Agregado', 'Nuevo rol agregado', 'success')
    }
  }
  
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }
  
  .search-select,
  .search-input {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  .search-select {
    background-color: #f9f9f9;
  }
  
  .search-input {
    background-color: #eef5ff;
  }
  
  .form-toggle-btn {
    background-color: #4caf50;
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
  }
  
  .custom-table {
    --easy-table-header-background-color: #3f51b5;
    --easy-table-header-text-color: white;
    --easy-table-row-hover-background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  button {
    margin: 0 4px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  
  button:hover {
    opacity: 0.7;
  }
  </style>
  