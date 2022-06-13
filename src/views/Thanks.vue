<template>
    <div class="thanks">
        <HeaderVue title="感恩师大，你一定要..."/>

        <ul class="people-list">
            <li v-for="item in peoples" :key="item.id"  @click="openPeople(item.id)" class="people-card">
                <span>{{item.name}}</span>
            </li>
        </ul>


        <el-dialog
            :title="curPeople.title"
            :visible.sync="centerDialogVisible"
            width="500px"
            center
        >
            <div class="content">
                <p class="content-user">—— {{curPeople.name}}</p>
                <p class="content-text" v-for="(text, index) in curPeople.text" :key="index">{{text}}</p>
                <div class="content-imgs" >
                    <el-image v-for="url in curPeople.imgs" :key="url" :src="url" :preview-src-list="curPeople.imgs" title="点击查看大图">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                </div>

                <video v-if="curPeople.video" :src="video" style="width:100%" controls autoplay></video>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import HeaderVue from '../components/Header.vue';
const ThankSet = require("../thankSet.json").peoples

export default {
    data() {
        return {
            centerDialogVisible: false,
            peoples: Object.freeze(ThankSet),
            curPeople: {
                title: 'null'
            },
            video: require('../assets/计算机181-林肖颖.mp4')
        };
    },
    components: {
        HeaderVue
    },
    methods: {
        openPeople(id) {
            this.centerDialogVisible = true
            for(let i = 0; i < ThankSet.length; i++) {
                if(ThankSet[i].id == id) {
                    this.curPeople = ThankSet[i]
                    break
                }
            }
        }
    },
    watch: {
        centerDialogVisible(newVal) {
            if(newVal == false) {
                this.video = ""
            }
        },
        curPeople: {
            deep: true,
            handler(newPeople) {
                let name = newPeople.name
                if(newPeople.video)
                    this.video = require(`../assets/${name}.mp4`)
            }
        }
    }
};
</script>

<style lang="less">
@imgSize: 100px;

.thanks {
    background: url("../assets/bg.png") no-repeat 50%;
    background-size: cover;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .people-list {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        flex: 1;
        margin: 2rem 0;
        
        .people-card {
            // width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            margin: 1rem;
            background: #fff;
            box-shadow: 0 0 10px 5px #ecf0f1;
            border-radius: 1rem;
            cursor: pointer;
            font-family:"Microsoft YaHei";

            &:hover {
                box-shadow: 0 0 10px 5px rgb(96, 160, 208);
            }
        }
    }

    .el-image {
        width: @imgSize;
        height: @imgSize;

        .image-slot {
            background: rgb(245, 247, 250);
            height: @imgSize;
            line-height: @imgSize;
            text-align: center;
            font-size: .5rem;
        }
    }

    .el-dialog--center .el-dialog__body {
        text-align: initial;
        padding: 0px 25px 30px;
    }

    .content {
        font-size: 1rem;

        &-user {
            text-align: right;
            margin-bottom: 1rem;
        }

        &-text {
            margin: 5px 0;
            // text-indent: 2rem;
            line-height: 1.8rem;
        }

        &-imgs {
            margin-top: 10px;
            .el-image {
                margin-right: 5px;
            }
        }
    }
}

@media (max-width: 960px) {
    .el-dialog {
        width: 90% !important;
    }
}
</style>