<template>
    <div class="header">
        <h1>⭐活动页面⭐</h1>
    </div>
</template>

<script>
export default {

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
        z-index: 9999;
    }
</style>