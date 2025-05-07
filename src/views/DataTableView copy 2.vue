<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-semibold">Tabla de Usuarios</h1>

    <div class="search-bar">
      <label for="search-field">Buscar por:</label>
      <select v-model="searchField" id="search-field" class="search-select">
        <option value="name">Nombre</option>
        <option value="email">Email</option>
      </select>

      <label for="search-value">Valor:</label>
      <input
        id="search-value"
        type="text"
        v-model="searchValue"
        class="search-input"
        placeholder="Escribe para buscar..."
      />

      <button @click="showAddUserForm" class="form-toggle-btn">➕ Nuevo Usuario</button>
    </div>

    <EasyDataTable
      class="custom-table"
      :headers="headers"
      :items="filteredUsers"
    >
      <template #item-action="{ id }">
        <button @click="viewUser(id)" title="Ver">👁️</button>
        <button @click="editUser(id)" title="Editar">✏️</button>
        <button @click="deleteUser(id)" title="Eliminar">🗑️</button>
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

const users = ref([
  { id: 1, name: 'Ana Pérez', email: 'ana@example.com' },
  { id: 2, name: 'Carlos López', email: 'carlos@example.com' },
  { id: 3, name: 'Luisa Gómez', email: 'luisa@example.com' }
])

const searchField = ref('name')
const searchValue = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user[searchField.value]?.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Nombre', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Acciones', value: 'action' }
]

const findUser = (id) => users.value.find(u => u.id === id)

const viewUser = (id) => {
  const user = findUser(id)
  Swal.fire({
    title: `Usuario: ${user.name}`,
    text: `Email: ${user.email}`,
    icon: 'info'
  })
}

const editUser = async (id) => {
  const user = findUser(id)
  const { value: newName } = await Swal.fire({
    title: 'Editar nombre',
    input: 'text',
    inputLabel: 'Nuevo nombre',
    inputValue: user.name,
    showCancelButton: true
  })
  if (newName) {
    user.name = newName
    Swal.fire('Actualizado', 'El nombre ha sido actualizado', 'success')
  }
}

const deleteUser = (id) => {
  const user = findUser(id)
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Esto eliminará a ${user.name}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      users.value = users.value.filter(u => u.id !== id)
      Swal.fire('Eliminado', 'El usuario fue eliminado', 'success')
    }
  })
}

const showAddUserForm = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Agregar Nuevo Usuario',
    html:
      `<input id="swal-input-name" class="swal2-input" placeholder="Nombre">` +
      `<input id="swal-input-email" class="swal2-input" placeholder="Email">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Agregar',
    preConfirm: () => {
      const name = document.getElementById('swal-input-name').value
      const email = document.getElementById('swal-input-email').value
      if (!name || !email) {
        Swal.showValidationMessage('Todos los campos son obligatorios')
        return
      }
      return { name, email }
    }
  })

  if (formValues) {
    const newId = users.value.length
      ? Math.max(...users.value.map(u => u.id)) + 1
      : 1

    users.value.push({ id: newId, ...formValues })
    Swal.fire('Agregado', 'Nuevo usuario agregado', 'success')
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
