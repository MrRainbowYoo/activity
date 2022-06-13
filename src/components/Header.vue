<template>
    <div class="header">
        <div class="header-title">{{title}}</div>
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
            doneCoding: false,
        }
    },
    props: {
        title: {
            type: String,
            default: '信息科学与技术学院毕业感恩季活动'
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
            const that = this
            this.$alert('点击确定即可跳转哦', '非常感谢同学的参与', {
            confirmButtonText: '确定',
            callback: () => {
                localStorage.setItem('done', 1)
                that.$router.push({
                path: '/thanks'
                })
            }})            
        }
    }
}
</script>

<style lang="less" scoped>
    @bgColor: rgb(96, 160, 208);
    @fontColor: #fefefe;

    .header {
        background-color: @bgColor;
        color: @fontColor;
        font-family: STXinwei;
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

        &-title {
            font-size: 1.8rem;
        }

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

    @media (max-width: 960px) {
        .header-title {
            font-size: 100%;
        }

        .header-resouce{
            position: fixed;
            left: 10px;
        }
    }
</style>