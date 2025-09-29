<template>
  <main class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <form @submit.prevent="register">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="Email" type="email">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Password" type="password">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="pseudo" class="uk-input uk-border-pill" required placeholder="Pseudo" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
              <input v-model="cityCode" class="uk-input uk-border-pill" required placeholder="Code postal" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
              <input v-model="city" class="uk-input uk-border-pill" required placeholder="Ville" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: phone"></span>
              <input v-model="phone" class="uk-input uk-border-pill" required placeholder="Téléphone" type="text">
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">S'inscrire</button>
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center">
        <a @click="goToLogin" class="uk-link-reset uk-text-small">Déjà inscrit ? Se connecter</a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const pseudo = ref('');
const cityCode = ref('');
const city = ref('');
const phone = ref('');

async function register() {
  try {
    const payload = {
      email: email.value,
      password: password.value,
      pseudo: pseudo.value,
      cityCode: cityCode.value,
      city: city.value,
      phone: phone.value
    };
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
}

function goToLogin() {
  router.push({ name: 'Login' });
}
</script>