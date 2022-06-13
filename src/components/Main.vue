<template>
    <div class="main-wrap">
        <Header />
        <div class="main">
            <Problem />
            <Editor />
            <Welcome />
        </div>
        <Footer />
    </div>

</template>

<script>
import Editor from "./Editor.vue";
import Problem from "./Problem.vue";
import Welcome from "./Welcome.vue";
import Footer from "./Footer.vue";
import Header from "./Header.vue"


export default {
    name: "Main",
    data() {
        return {};
    },
    components: {
        Editor,
        Problem,
        Welcome,
        Footer,
        Header
    },
};
</script>

<style lang="less">
.main-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: url('../assets/bg.png') no-repeat 50%;
    background-size: cover;
}
.main {
    flex: 1;
    padding: 20px 20px 10px 20px;
    display: flex;

    .problem-wrap {
        width: 48%;
    }

    #monaco-editor-box {
        flex: 1;
    }
}

@media (max-width: 1300px) {
    .main {
        flex-direction: column;

        .problem-wrap {
            width: 100%;
            margin-right: 0;
            box-sizing: border-box;
        }

        #monaco-editor-box {
            width: 100%;
            margin: 10px 0;
        }
    }
}
</style>
