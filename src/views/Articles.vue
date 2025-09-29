<template>
  <h1>Articles : </h1>
  <div v-for="article in articles" :key="article.id || article.title">
    <div>
      <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column">
        <div class="uk-card-header uk-text-center">
          <h4 class="uk-text-bold">{{ article.title }}</h4>
        </div>
        <div class="uk-card-body uk-flex-1">
          <div class="uk-flex uk-flex-middle uk-flex-center">
            <span style="font-size: 4rem; font-weight: 200; line-height: 1em"></span>
          </div>

          <button
            class="uk-button uk-button-primary uk-margin-small-top"
            @click="detail(article.id)"
          >
            Voir le détail
          </button>
          <button
            class="uk-button uk-button-danger uk-margin-small-left"
            @click="supprimer(article.id)"
          >
            Supprimer
          </button>
          <button
            class="uk-button uk-button-secondary uk-margin-small-left"
            @click="modifier(article.id, article.title, article.desc, article.author)"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const articles = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/articles/');
    if (!res.ok) throw new Error('Erreur lors du chargement des articles');
    const data = await res.json();
    articles.value = data.data;
  } catch (error) {
    console.error(error);
    articles.value = [];
  }
});

function detail(id) {
  router.push({ name: 'ArticleDetail', params: { id } });
}

async function supprimer(id) {
  if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;
  try {
    const res = await fetch(`http://localhost:3000/articles/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression');
    // Retire l'article du tableau local
    articles.value = articles.value.filter(a => a.id !== id);
  } catch (error) {
    console.error(error);
    alert('Suppression impossible');
  }
}

function modifier(id, title, desc, author) {
  router.push({ name: 'ArticleUpdate', params: { id, title, desc, author } });
}
</script>