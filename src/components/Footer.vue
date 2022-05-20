<template>
    <div class="footer">
        <el-button class="btn" @click="debounceMethods(changeQuestion)">换道题</el-button>
        <el-button
            type="primary"
            class="btn"
            @click.prevent="submit"
            v-preventClick
            >提交</el-button
        >
    </div>
</template>

<script>
import eventBus from "../utils/eventBus.js";

export default {
    data() {
        return {
            debounceTimer: null
        };
    },
    methods: {
        submit() {
            eventBus.$emit("submit");
        },
        changeQuestion() {
            eventBus.$emit("changeQuestion");
        },
        debounceMethods(func, ...args) {
            let context = this;
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            let callNow = !this.debounceTimer; //是否立即执行
            this.debounceTimer = setTimeout(() => {
                this.debounceTimer = null;
            }, 200);
            if (callNow) func.apply(context, args);
        },
    },
};
</script>

<style lang="less">
@border: 1px solid rgb(240, 240, 240);

.footer {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 20px;
    border-top: @border;
    display: flex;
    justify-content: center;

    .btn {
        padding: 10px 15px;
    }
}
</style>