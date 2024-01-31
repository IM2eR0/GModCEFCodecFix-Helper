<template>
    <el-menu default-active="/" router :collapse="true">

        <el-menu-item index="/">
            <svg-icon type="mdi" :path="icon_home"></svg-icon>
            <span slot="title">主页</span>
        </el-menu-item>

        <el-menu-item index="/setup">
            <svg-icon type="mdi" :path="icon_setup"></svg-icon>
            <span slot="title">安装</span>
        </el-menu-item>

        <el-menu-item id="settings" index="/settings">
            <svg-icon type="mdi" :path="icon_cog"></svg-icon>
            <span slot="title">设置</span>
        </el-menu-item>

        <el-menu-item index="/feedback">
            <svg-icon type="mdi" :path="icon_feedback"></svg-icon>
            <span slot="title">反馈</span>
        </el-menu-item>

        <el-menu-item index="/about">
            <svg-icon type="mdi" :path="icon_infomation"></svg-icon>
            <span slot="title">关于</span>
        </el-menu-item>

        <el-menu-item @click="centerDialogVisible = true">
            <svg-icon type="mdi" :path="icon_exit"></svg-icon>
            <span slot="title">退出</span>
        </el-menu-item>

        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>你确定要退出程序吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="quitApp">确 定</el-button>
            </span>
        </el-dialog>
    </el-menu>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiHomeVariantOutline,
    mdiInformationOutline,
    mdiExitToApp,
    mdiPackageVariant,
    mdiCogOutline,
    mdiCommentQuestionOutline
} from '@mdi/js';


export default {
    name: "LeftMenu",
    components: {
        SvgIcon
    },
    data() {
        return {
            icon_home: mdiHomeVariantOutline,
            icon_infomation: mdiInformationOutline,
            icon_exit: mdiExitToApp,
            icon_setup: mdiPackageVariant,
            icon_cog: mdiCogOutline,
            icon_feedback: mdiCommentQuestionOutline,
            centerDialogVisible: false
        }
    },
    methods: {
        quitApp: function () {
            this.$electron.ipcRenderer.send('quitapp', 'CallSend');
        }
    },
    mounted: function(){
    }
}
</script>
<style scoped>
.box {
    width: 400px;

    .top {
        text-align: center;
    }

    .left {
        float: left;
        width: 60px;
    }

    .right {
        float: right;
        width: 60px;
    }

    .bottom {
        clear: both;
        text-align: center;
    }

    .item {
        margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
        padding: 8px 10px;
    }
}
</style>