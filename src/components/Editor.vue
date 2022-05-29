<template>
    <div id="monaco-editor-box" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="editor-btns">
            <el-select v-model="currentLanguage" placeholder="请选择编程语言" size="mini">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>
            </el-select>
        </div>

        <div id="monaco-editor" ref="monacoEditor" />

        <div class="output-wrap">
            <p class="bold">输出结果</p>
            <div class="output-content" contenteditable="true" ref="output"></div>
        </div>
    </div>
</template>

<script>
// import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import eventBus from "../utils/eventBus";
import axios from "axios"

const NEEDCOUNT = 2
const BASE = "http://47.96.91.10:3003"
const CONFIG = {
  timeout: 3000
}

export default {
    name: "MonacoEditor",
    components: {},
    props: {
        // 名称
        name: {
            type: String,
            default: "test",
        },
        editorOptions: {
            type: Object,
            default: function () {
                return {
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false, // 只读
                    writeOnly: false,
                    cursorStyle: "line", //光标样式
                    automaticLayout: true, //自动布局
                    glyphMargin: true, //字形边缘
                    useTabStops: false,
                    fontSize: 32, //字体大小
                    autoIndent: true, //自动布局
                    quickSuggestionsDelay: 500, //代码提示延时
                };
            },
        },
    },
    data() {
        return {
            editor: null, //文本编辑器
            codeValue: "// 把写好的代码粘贴到这里哦", //保存后的文本
            codeCopy: '',

            options: [
                {
                    value: "javascript",
                    label: "JavaScript",
                },
                {
                    value: "python",
                    label: "Python3",
                },
                {
                    value: "java",
                    label: "Java",
                },
                {
                    value: "cpp",
                    label: "C++",
                },
                {
                    value: "c",
                    label: "C",
                },
            ],

            currentLanguage: "JavaScript",
            languageType: "javascript",
            fullscreenLoading: false,
            questionId: 0,
            correctCount: 0
        };
    },
    watch: {
        currentLanguage(val) {
            this.destroyEditor(); 
            this.languageType = val;
            switch(val) {
              case 'javascript':
              case 'cpp':
              case 'c':
              case 'java':
                this.codeValue = '// 把写好的代码粘贴到这里哦'
                break;
              case 'python':
                this.codeValue = '# 把写好的代码粘贴到这里哦'
                break;
            }
            this.initEditor();
        },
    },
    mounted() {
        this.initEditor();
    },
    created() {
        eventBus.$on('changeQuestion', () => {
          this.destroyEditor(); 
          this.initEditor();
        })

        eventBus.$on('submit', () => {
            let codeValue = this.codeCopy;
            let outputValue = this.$refs.output.innerText;
            if (this.isValid(codeValue.trim()) && this.isValid(outputValue.trim())) {
              this.submitCodes()
            } else {
                this.$message({
                  type: 'info',
                  message: '请提交代码与输出结果'
                });                  
            }          
        })
    },
    methods: {
        initEditor() {
            // 清除编辑器内容与输出结果内容
            this.codeCopy = ""
            this.$refs.output.innerText = ""

            const self = this;
            // 初始化编辑器，确保dom已经渲染
            this.editor = monaco.editor.create(self.$refs.monacoEditor, {
                value: self.codeValue || self.codes, // 编辑器初始显示内容
                language: self.languageType, // 支持语言
                theme: "vs", // 主题
                selectOnLineNumbers: true, //显示行号
                editorOptions: self.editorOptions,
                minimap: {
                    enabled: false, // 不要小地图
                },
                // 不要滚动条
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                    vertical: "hidden",
                },
                overviewRulerBorder: false,
            });
            // self.$emit("onMounted", self.editor); //编辑器创建完成回调
            self.editor.onDidChangeModelContent(function (event) {
                //编辑器内容changge事件
                self.codeCopy = self.editor.getValue();
                self.$emit("onCodeChange", self.editor.getValue(), event);
            });
        },
        destroyEditor() {
            // 销毁编辑器
            this.editor.dispose();
        },
        isValid(str) {
            if (str.replace(/\\s+/g, "") == "")
                return false;
            else
                return true;
        },
        submitCodes() {
          const URL = BASE + '/submit'
          const BODY = {
            questionId: this.questionId,
            codeContent: this.codeCopy,
            output: this.$refs.output.innerText
          }

          if(this.correctCount < NEEDCOUNT) {
            this.fullscreenLoading = true;
            axios.post(URL, BODY, CONFIG).then(res => {
              console.log(res.data);
              let isPass = res.data.code
              if(isPass) {
                this.correctCount = this.correctCount + 1
                this.correctCount < NEEDCOUNT ? this.gotoNext() : this.showForm()
              } else {
                this.$message({
                  type: 'error',
                  message: '抱歉，回答错误，请再好好思考'
                });              
              }
            }).catch(reason => {
              this.$message({type: 'error', message: reason.message})
            }).finally(() => {
              this.fullscreenLoading = false;
            })
          } else {
            this.showForm()
          }
        },
      showResource() {
        this.$alert('这是资源地址', '非常感谢同学的参与', {
          confirmButtonText: '确定',
          callback: () => {
            localStorage.setItem('done', 1)
            eventBus.$emit('doneCoding')
          }})
      },
      gotoNext() {
        this.$alert('很厉害！那再来一道题吧！', '回答正确', {
          confirmButtonText: '确定',
          callback: () => {
            eventBus.$emit("changeQuestion");
          }})        
      },
      submitComments(value) {
        let timeStamp = +new Date()
        let date = new Date().toLocaleString()
        let content = value
        let data = { timeStamp, date, content }

        axios.post(BASE + '/comments', data, CONFIG).then(res => {
          console.log(res);
        }).catch(e => {
          console.log(e);
        })
        
      },      
      showForm() {
        this.$prompt('这是最后一问，对本次活动形式有什么建议或评价吗？', '回答正确', {
          confirmButtonText: '提交',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '什么，没有建议或评价吗',
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(({ value} ) => {
          this.showResource()
          this.submitComments(value)
        }).catch(e => {
          this.showResource()
          this.submitComments(e)
        }).finally(() => {
          eventBus.$emit('killBtn')
        })
      }
    },
};
</script>

<style lang="less">
@border: 1px solid rgb(240, 240, 240);


#monaco-editor-box {
    border: @border;
    display: flex;
    flex-direction: column;

    .bold {
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 13px;
    }

    .editor-btns {
        // background-color: rgb(30, 30, 30);
        display: flex;

        .el-select {
            // margin-left: auto;
            // height: 50px;
            margin: 10px;
        }
    }


    .output-wrap {
      border-top: @border;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      padding: 10px;
      position: relative;
      
      .output-content {
        width: 100%;
        height: 160px;
        border: @border;
        padding: 5px;
        box-sizing: border-box;
        font-size: 14px;
        overflow: auto;

        &:empty::before {
          content: '请不要忘记把输出结果一起提交哦';
          color: gray;
        }

        &:focus::before {
          content: none;
        }
      }
    }
}

#monaco-editor {
    width: 100%;
    flex: 1;
    min-height: 30vh;
}
</style>


