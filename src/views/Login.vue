<!--UX/UI de la vue-->
<template>
  <main class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
  
  <div class="uk-width-medium uk-padding-small">
    <!-- login -->
    <form class="toggle-class" action="login-dark.html">
      <fieldset class="uk-fieldset">
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
            <input v-model="username" class="uk-input uk-border-pill" required placeholder="Username" type="text">
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
            <input v-model="password" class="uk-input uk-border-pill" required placeholder="Password" type="password">
          </div>
        </div>
        
        <div class="uk-margin-bottom">
          <button @click="login(username, password)" type="button" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">LOG IN</button>
        </div>
        <div class="uk-margin-bottom">
          <button @click="goToRegister" type="button" class="uk-button uk-button-default uk-border-pill uk-width-1-1">Inscription</button>
        </div>
      </fieldset>
    </form>
    <!-- /login -->

  </div>


  </main>
</template>

<!--Partie logique de la vue-->
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Ajout
import log from 'electron-log/renderer';

const router = useRouter(); // Ajout
const movies = ref([]);

async function login(username, password) {
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    const data = await res.json();

    // Redirection après succès
    router.push({ name: 'Articles' }); // Ajout

    return data;

  } catch (error) {
    console.error('Erreur lors du login:', error);
    throw error;
  }
}

function goToRegister() {
  router.push({ name: 'Inscription' });
}
</script>