<template>

    <div id="app">
        <h1>修复向导</h1>
        <hr>
        <div id="loadingbar">
            <el-progress type="circle" :percentage="this.loading"></el-progress>
            <p>{{ nowdoing }}</p>
        </div>
    </div>

</template>
<script>
export default{
    'name': 'SetUpMain',
    data(){
        return{
            'nowdoing': "初始化中...",
            'loading': 0,
            'status': "success"
        }
    },
    mounted: function(){
        if(this.$mainifest){
            this.loading = 10
            // console.log("nsdd");
        }else{
            this.status = "excption"
        }
    }
}
</script>
<style scoped>
h1{
    margin-top: 0;
}
#loadingbar{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
}
</style>