<template>
    <div class="header">
        <h1>⭐活动页面⭐</h1>
        <div class="header-btns">
            <div class="header-resouce" title="资源地址" @click="openResource" v-if="doneCoding">🎁</div>
            <div class="header-tip" title="使用说明" @click="openWelcome">🔔</div>
        </div>
    </div>
</template>

<script>
import eventBus from '../utils/eventBus'

export default {
    data() {
        return {
            doneCoding: false
        }
    },
    created() {
        let val = localStorage.getItem('done')
        if(val) {
            this.doneCoding = true
        }

        eventBus.$on('doneCoding', () => {
            this.doneCoding = true
        })
    },
    methods: {
        openWelcome() {
            eventBus.$emit('openWelcome')
        },
        openResource() {
            this.$alert('这是资源地址', '非常感谢同学的参与', {
            confirmButtonText: '确定',
            callback: () => {
                localStorage.setItem('done', 1)
            }})            
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

        &-btns {
            position: absolute;
            // width: 200px;
            top: 0;
            right: 0;
            display: flex;
            font-size: 1.2rem;

            .header-tip {
                margin: 0 1rem;
                cursor: pointer;
            }

            .header-resouce {
                cursor: pointer;
            }
        }       
    }
</style>