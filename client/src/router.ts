import { createRouter, createWebHistory } from 'vue-router';
import { anilistLogin } from './api';
import store from './store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./components/Home.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./components/About.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/Login.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/anilist',
            name: 'anilist',
            beforeEnter: async (to) => {
                try {
                    store.commit('setLoading');
                    const code = to.query.code?.toString();

                    await store.dispatch('getUserToken', { code });

                    store.commit('setLoading');
                    return await { path: '/', query: {} };
                } catch (e) {
                    console.log(e.message);
                    return { path: '/about', query: {} };
                }
            },
            component: () => import('./components/Anilist.vue'),
        },
    ],
});

router.beforeEach((to, from) => {
    const isAuth = store.state.isAuth;
    if (to.meta.requiresAuth && !isAuth) {
        return {
            path: '/login',
        };
    }

    return true;
});

export default router;
