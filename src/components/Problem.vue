<template>
    <div class="problem-wrap">
        <h2 class="problem-title">{{questionId+1}}. {{title}}</h2>
        <div class="problem-desc">
            <p class="descText" v-for="(item,index) in desc" :key="index">{{item}}</p>
        </div>
        <div class="problem-demo" v-for="item in demo" :key="item.id">
            <p class="bold">示例 {{item.id+1}}:</p>
            <div class="demo-content">
                <p>
                    <span class="bold">输入：</span><code>{{item.input.replaceAll("'", '"')}}</code>
                </p>
                <p>
                    <span class="bold">输出：</span><code>{{item.output}}</code>
                </p>
                <p v-if="item.explain">
                    <span class="bold">解释：</span><pre style="margin-top:5px">{{item.explain}}</pre>
                </p>                             
            </div>
        </div>
        <div class="problem-input">
            <p class="bold">输入用例</p>
            <p class="tip">
                注：用户可在本地IDE编写代码，提交的时候，将下方输入用例的『代码与输出结果』分别填充至右侧。
                输出结果记得换行。
            </p>

            <div class="input-content">
                <code v-for="(item, index) in inputContent" :key="index">{{item.replaceAll("'", '"')}}</code>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../utils/eventBus.js"

export default {
    data() {
        return {
            questionSet: require("../questionSet.json").questions,
            questionId: 0,
            title: null,
            desc: null,
            demo: null, 
            inputContent: null
        }
    },
    created() {
        this.initProblem()
        eventBus.$on('changeQuestion', () => {
            let nowId = this.questionId
            let length = this.questionSet.length
            this.questionId = (nowId + 1) % length
        })
    },
    watch: {
        questionId() {
            this.initProblem()
            this.$parent.$children[1].questionId = this.questionId
        }
    },
    methods: {
        initProblem() {
            let nowQuestion = this.questionSet[this.questionId]

            this.questionId = nowQuestion.questionId
            this.title = nowQuestion.title
            this.desc = nowQuestion.desc
            this.demo = nowQuestion.demo
            this.inputContent = nowQuestion.inputContent
        }
    }
};
</script>

<style lang="less">
    @fontSize: 13px;
    @gap: 10px;
    @border: 1px solid rgb(240, 240, 240);
    

    .problem-wrap {
        font-size: @fontSize;
        padding: 10px;
        margin-right: 10px;
        border: @border;
        display: flex;
        flex-direction: column;


        background-color: rgba(255, 255, 255, .7);
        // background: url('../assets/bg.png') no-repeat 50%;
        // background-size: cover;

        code {
            font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
        }

        .bold {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .problem-title {
            padding: 10px 0;
            border-bottom: @border;
        }

        .problem-desc {
            .descText {
                margin: @gap 0;
            }
        }

        .problem-demo {
            margin: @gap 0;
            
            .demo-content {
                background-color: rgb(242, 243, 244);
                padding: 5px 0 5px 10px;

                p {
                    margin: @gap;
                }
            }
        }

        .problem-input {
            border-top: @border;
            margin-top: @gap;
            padding-top: @gap;
            display: flex;
            flex-direction: column;
            flex: 1;

            .tip {
                color: #2980b9;
                font-size: 12px;
                margin: @gap 0;
            }

            .input-content {
                width: 100%;
                border: @border;
                flex: 1;
                // max-height: 200px;
                padding: 5px;
                box-sizing: border-box;
                font-size: 14px;
                overflow: auto;

                code {
                    display: block;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>