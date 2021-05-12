<template>
    <div>
        <Navbar />
        <h1>Anima</h1>

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Navbar from './components/Navbar.vue';

export default defineComponent({
    name: 'App',
    components: { Navbar },
    setup: () => {},
});
</script>

<style>
#app {
    font-family: 'Roboto Slab', serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

a {
    margin: 0 1rem;
}
</style>
