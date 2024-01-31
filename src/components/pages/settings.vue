<template>
    <div id="app">
        <h1>软件设置</h1>
        <hr>
        <el-form label-width="auto" label-position="left" :model="appSettings">
            <el-form-item label="缓存目录" prop="tempFolder">
                <el-input v-model="appSettings.tempFolder" disabled style="width: 450px;"></el-input>
                <el-button icon="el-icon-folder-opened" @click="selectFolder"></el-button>
            </el-form-item>

            <el-form-item label="Steam路径" prop="steamPath">
                <el-input v-model="$steamPath" disabled style="width: 450px;"></el-input>
                <el-button icon="el-icon-folder-opened" disabled></el-button>
            </el-form-item>

            <el-form-item label="Steam Library" prop="steamLibrary">
                <el-input v-model="$steamLibrary.path" disabled style="width: 450px;"></el-input>
                <el-button icon="el-icon-folder-opened" disabled></el-button>
            </el-form-item>

            <el-form-item label="Steam 用户数据" prop="steamUser">
                <el-input v-model="$steamUser.path" disabled style="width: 450px;"></el-input>
                <el-button icon="el-icon-folder-opened" disabled></el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
import {ipcRenderer} from 'electron'
export default{
    name: "SettingsPage",
    data(){
        return{
            appSettings: {
                tempFolder: '',
                steamPath: ''
            }
        }
    },
    watch:{
        appSettings: {
            handler:function(){
                // console.log(JSON.stringify(n))
            },
            deep: true
        }
    },
    methods:{
        selectFolder: function(){
            const result = ipcRenderer.invoke('dialog:openFile')
            result.then(res=>{
                this.appSettings.tempFolder = res
            })
        }
    },
    mounted: function(){
    }
}
</script>
<style scoped>
h1{
    margin-top: 0;
}
</style>