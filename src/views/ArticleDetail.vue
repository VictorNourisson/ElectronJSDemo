<template>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <img v-if="article.imgPath" :src="article.imgPath" alt="Image de l'article" style="max-width: 400px; margin-bottom: 1rem;" />
    <p><strong>Auteur :</strong> {{ article.author }}</p>
    <p>{{ article.desc }}</p>
    <router-link to="/article">Retour à la liste</router-link>
  </div>
  <div v-else>
    <p>Chargement ou article introuvable.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref(null);

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await fetch(`http://localhost:3000/articles/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'article');
    const data = await res.json();
    article.value = data.data; // Utilise la propriété "data" de la réponse
  } catch (error) {
    console.error(error);
    article.value = null;
  }
});
</script>