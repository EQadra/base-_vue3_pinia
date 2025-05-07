<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      <div class="links">
        <router-link to="/register">¿No tienes cuenta? Regístrate</router-link>
        <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Aquí puedes agregar lógica de autenticación real
  if (email.value && password.value) {
    // Simular login exitoso
    router.push('/dashboard')
  } else {
    alert('Credenciales inválidas')
  }
}
</script>

<style scoped>
.login-container {
  background-color: #121212;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
}
input {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
}
.links {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
