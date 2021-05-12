import { createLogger, createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { anilistLogin } from './api';

const strict = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

const store = createStore({
    strict,
    state: () => {
        return {
            isAuth: false,
            accessToken: '',
            refreshToken: '',
            expiresIn: null,
            isLoading: false,
        };
    },

    mutations: {
        login: (state, payload) => {
            const { access_token, expires_in, refresh_token } = payload;

            state.isAuth = true;
            state.accessToken = access_token;
            state.refreshToken = refresh_token;
            state.expiresIn = expires_in;
        },

        logout: (state) => {
            state.isAuth = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.expiresIn = null;
        },

        setLoading: (state) => {
            state.isLoading = !state.isLoading;
        },
    },

    actions: {
        getUserToken: async ({ commit }, payload) => {
            const { code } = payload;

            const data = await anilistLogin(code);

            commit('login', data);
        },
    },

    plugins: [createLogger(), vuexLocal.plugin],
});

export default store;
