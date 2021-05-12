<template>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <button @click="handleLogOut" v-if="isAuth">logout</button>
    <button @click="login" v-else>
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login with Anilist</span>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Navbar',
    setup() {
        const store = useStore();
        const router = useRouter();

        const { VITE_ANILIST_ID } = import.meta.env;
        const REDIRECT_URI = 'http://localhost:3000/anilist';
        const ANILIST_LOGIN_URI = `https://anilist.co/api/v2/oauth/authorize?client_id=${VITE_ANILIST_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

        const handleLogOut = () => {
            store.commit('logout');

            router.push({ name: 'about' });
        };

        const login = () => {
            window.location.replace(ANILIST_LOGIN_URI);
        };

        return {
            isAuth: computed(() => store.state.isAuth),
            isLoading: computed(() => store.state.isLoading),
            handleLogOut,
            login,
        };
    },
});
</script>
