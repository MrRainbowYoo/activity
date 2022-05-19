<template>
    <div id="monaco-editor-box">
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
            <div class="output-content" contenteditable="true"></div>
        </div>
    </div>
</template>

<script>
// import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";

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
        codes: {
            type: String,
            default: function () {
                return "";
            },
        },
    },
    data() {
        return {
            editor: null, //文本编辑器
            codeValue: "// 把写好的代码粘贴到这里哦", //保存后的文本

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
                    value: "Java",
                    label: "Java (抱歉,暂不支持)",
                    disabled: true
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
        };
    },
    watch: {
        codes: function (newValue) {
            console.debug("Code editor: content change");
            if (this.editor) {
                if (newValue !== this.editor.getValue()) {
                    this.editor.setValue(newValue);
                    this.editor.trigger(
                        this.editor.getValue(),
                        "editor.action.formatDocument"
                    );
                }
            }
        },
        currentLanguage(val) {
            this.destroyEditor(); 
            this.languageType = val;
            switch(val) {
              case 'javascript':
              case 'cpp':
              case 'c':
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
    methods: {
        initEditor() {
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
                self.codesCopy = self.editor.getValue();
                self.$emit("onCodeChange", self.editor.getValue(), event);
            });
        },
        destroyEditor() {
            // 销毁编辑器
            this.editor.dispose();
        },
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
    // height: 65vh;
}
</style>


