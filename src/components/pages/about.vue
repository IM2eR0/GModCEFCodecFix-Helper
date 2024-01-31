<template>
    <span>
        <div id="app">
            <h1>关于 GCCF-Helper</h1>
            <hr>
            <p>本软件诞生于一个让我爆炸的夜晚</p>
            <p>我实在是受不了玩家经常在群里发问：这个怎么办呀？这是怎么回事呀？</p>
            <p>我明明已经写的很清楚了，但你们仍不愿意根据步骤解决</p>
            <p>一气之下写了这个软件</p>
            <hr>
            <p>软件作者：昵称违规喵</p>
            <p @click="oiiaiooooiai">当前版本号：{{ $version }}</p>

        </div>
        <el-dialog id="nyancat" title="NyanNyanNyan!!" :visible.sync="dialogVisible" @opened="nyannyan" @close="nyan" width="300px">
            <video width="256px" autoplay="autoplay" loop="loop">
                <source src="../../assets/cat-space.mp4" type="video/mp4" />
            </video>
            <audio autoplay="autoplay" loop="loop">
                <source src="../../assets/nyancat.mp3" type="audio/mpeg">
            </audio>
        </el-dialog>
    </span>
</template>
<script>
export default {
    name: 'AboutPage',
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        oiiaiooooiai: function () {
            this.dialogVisible = true
        },
        nyannyan(){
            document.getElementsByTagName('audio')[0].load()
        },
        nyan(){
            document.getElementsByTagName('audio')[0].pause()
            this.dialogVisible = false
        }
    }
}
</script>
<style scoped>
#app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    cursor: default;
}

h1 {
    margin-top: 0;
}

#nyancat{
    margin: 0;
    padding: 0;
}
</style>