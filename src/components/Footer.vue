<template>
    <div class="footer">
        <el-button class="btn">换道题</el-button>
        <el-button type="primary" class="btn">提交</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
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