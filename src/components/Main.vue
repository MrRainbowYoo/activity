<template>
    <div class="main">
        <Problem />
        <Editor />
        <Welcome />
    </div>
</template>

<script>
import Editor from "./Editor.vue";
import Problem from "./Problem.vue";
import Welcome from "./Welcome.vue";

export default {
    name: "Main",
    data() {
        return {};
    },
    components: {
        Editor,
        Problem,
        Welcome
    },
};
</script>

<style lang="less">
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
