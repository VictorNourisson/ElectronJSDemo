<!--UX/UI de la vue-->
<template>
  <main class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <form class="toggle-class">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="username" class="uk-input uk-border-pill" required placeholder="Username" type="text" :disabled="showForgot">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Password" type="password" :disabled="showForgot">
            </div>
          </div>
          <div v-if="!showForgot" class="uk-margin-bottom">
            <button @click="login(username, password)" type="button" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">LOG IN</button>
          </div>
          <div v-if="!showForgot" class="uk-margin-bottom">
            <button @click="goToRegister" type="button" class="uk-button uk-button-default uk-border-pill uk-width-1-1">Inscription</button>
          </div>
          <div class="uk-text-center uk-margin-small-top">
            <a href="#" class="uk-link-text uk-text-small" @click.prevent="showForgot = !showForgot">
              Mot de passe oublié ?
            </a>
          </div>
          <!-- Mot de passe oublié -->
          <div v-if="showForgot" class="uk-margin-top">
            <div class="uk-inline uk-width-1-1 uk-margin-small-bottom">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
              <input v-model="forgotEmail" class="uk-input uk-border-pill" required placeholder="Votre email" type="email">
            </div>
            <button @click="resetPassword" type="button" class="uk-button uk-button-primary uk-border-pill uk-width-1-1 uk-margin-small-bottom">
              Réinitialiser le mot de passe
            </button>
            <div v-if="resetMessage" class="uk-alert-success uk-text-center uk-margin-small-bottom" uk-alert>
              {{ resetMessage }}
              <div v-if="newPassword">
                <span class="uk-text-bold">Nouveau mot de passe :</span>
                <span style="font-family: monospace;">{{ newPassword }}</span>
                <button
                  class="uk-button uk-button-default uk-border-pill uk-margin-small-left"
                  @click="copyPassword"
                  style="padding: 0 10px; font-size: 0.9em;"
                >
                  Copier
                </button>
              </div>
            </div>
            <div class="uk-text-center">
              <a href="#" class="uk-link-text uk-text-small" @click.prevent="showForgot = false">
                Retour à la connexion
              </a>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </main>
</template>

<!--Partie logique de la vue-->
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import log from 'electron-log/renderer';

const router = useRouter();
const username = ref('');
const password = ref('');
const showForgot = ref(false);
const forgotEmail = ref('');
const resetMessage = ref('');
const newPassword = ref('');

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
    router.push({ name: 'Articles' });
    return data;

  } catch (error) {
    console.error('Erreur lors du login:', error);
    throw error;
  }
}

function goToRegister() {
  router.push({ name: 'Inscription' });
}

async function resetPassword() {
  resetMessage.value = '';
  newPassword.value = '';
  try {
    const res = await fetch('http://localhost:3000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail.value })
    });
    const data = await res.json();
    if (data.code === "200") {
      resetMessage.value = data.message;
      newPassword.value = data.data;
    } else {
      resetMessage.value = "Erreur : " + (data.message || "Impossible de réinitialiser le mot de passe.");
    }
  } catch (error) {
    resetMessage.value = "Erreur lors de la réinitialisation.";
    console.error(error);
  }
}

function copyPassword() {
  if (newPassword.value) {
    navigator.clipboard.writeText(newPassword.value);
  }
}
</script>