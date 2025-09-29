<template>
  <main class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-large uk-padding-small">
      <h2 class="uk-text-center uk-margin-bottom">Modifier l'article</h2>
      <form @submit.prevent="updateArticle">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: pencil"></span>
              <input v-model="title" class="uk-input uk-border-pill" required placeholder="Titre" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: file-text"></span>
              <textarea v-model="desc" class="uk-textarea uk-border-pill" required placeholder="Description"></textarea>
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="author" class="uk-input uk-border-pill" required placeholder="Auteur" type="text">
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">Enregistrer</button>
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center uk-margin-top">
        <router-link class="uk-link-reset uk-text-small" :to="{ name: 'Articles' }">Retour à la liste</router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const id = ref()
const title = ref('');
const desc = ref('');
const author = ref('');

onMounted(async () => {
  id.value = route.params.id;
  try {
    const res = await fetch(`http://localhost:3000/articles/${id.value}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'article');
    const data = await res.json();
    title.value = data.data.title;
    desc.value = data.data.desc;
    author.value = data.data.author;
  } catch (error) {
    console.error(error);
  }
});

async function updateArticle() {
  try {
    const res = await fetch(`http://localhost:3000/articles/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id.value,
        title: title.value,
        desc: desc.value,
        author: author.value,
      })
    });
    if (!res.ok) throw new Error('Erreur lors de la modification');
    router.push({ name: 'ArticleDetail', params: { id: id.value } });
  } catch (error) {
    console.error(error);
    alert('Modification impossible');
  }
}
</script>