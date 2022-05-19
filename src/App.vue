<template>
    <div id="app">
        <Header />
        <Main />
        <Footer />
    </div>
</template>

<script>
import Main from "./components/Main.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Main,
        Header,
        Footer,
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    /* min-width: 1314px; */
}
</style>
