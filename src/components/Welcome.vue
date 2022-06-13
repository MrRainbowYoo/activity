<template>
    <div class="welcome" v-show="showWelcome">
        <div class="welcome-box">
            <h4 class="welcome-box-head">活动说明🙋🙋‍♂</h4>
            <ul class="welcome-box-content">
                <li>首先非常感谢同学能够来参与本次活动！</li>
                <li>学长和学姐们为同学准备了几道小题，相信一定难不倒聪明的你！下面请来听我给你介绍如何使用该平台。</li>
                <li>左侧部分为题目区，包含题目描述、输入示例、以及输入用例。</li>
                <li>右侧部分为编码区，包含代码编辑器，输出结果。</li>
                <li><strong>注：</strong>同学可以使用自己的 IDE 编写代码，提交的时候，把代码复制到编辑器区域。左侧提供了一些输入用例，同学需要将这些数据作为代码的输入，将对应的输出复制到输出结果区域，每个输出结果应 <strong>换行</strong>。</li>
                <li style="color:red;">我不管你用什么语言，对应输出结果对了就OK！</li>
            </ul>
            <el-button type="primary" class="welcome-box-btn" @click="closeWelcome">好的</el-button>
        </div>
    </div>
</template>

<script>
import eventBus from '../utils/eventBus'

export default {
    data() {
        return {
            showWelcome: true
        }
    },
    methods: {
        closeWelcome() {
            this.showWelcome = false
            localStorage.setItem('hideWelcome', 0)
        }
    },
    mounted() {
        let show = localStorage.getItem('hideWelcome')
        if(!show) {
            this.showWelcome = true
        } else
            this.showWelcome = false

        eventBus.$on('openWelcome', () => {
            this.showWelcome = true
        })
    }
}
</script>

<style lang="less">
    .welcome {
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, .8);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &-box {
            width: 20rem;
            border-radius: 1rem;
            box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, .1);
            background-color: #ffffff;
            padding: 1.5rem 2rem;
        }

        &-box-content li{
            margin: 1rem 0;
            font-size: .9rem;
        }

        &-box-btn {
            float: right;
        }
    }
</style>