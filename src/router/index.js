import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Articles from '../views/Articles.vue';
import Inscription from '../views/Inscription.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import ArticleUpdate from '../views/ArticleUpdate.vue'

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/article', name: 'Articles', component: Articles },
    { path: '/inscription', name: 'Inscription', component: Inscription },
    { path: '/articleDetail/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/articleUpdate/:id', name: 'ArticleUpdate', component: ArticleUpdate }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;