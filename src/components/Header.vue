<template>
    <div class="header">
        <h1>⭐活动页面⭐</h1>
        <div class="header-tip" title="使用说明" @click="openWelcome">🔔</div>
    </div>
</template>

<script>
import eventBus from '../utils/eventBus'

export default {
    methods: {
        openWelcome() {
            eventBus.$emit('openWelcome')
        }
    }
}
</script>

<style lang="less" scoped>
    @bgColor: #2980b9;
    @fontColor: #fefefe;

    .header {
        background-color: @bgColor;
        color: @fontColor;
        height: 70px;
        line-height: 70px;
        box-shadow: 0 2px 5px 5px rgba(92, 90, 90, 0.1);
        text-align: center;
        letter-spacing: .2rem;
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9;
        .header-tip {
            position: absolute;
            top: 0;
            right: 1rem;
            cursor: pointer;
            user-select: none;
        }
    }
</style>