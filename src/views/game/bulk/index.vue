<!--
    by:
    name: 体积测试
    notes:
-->
<template lang="html">
    <div class="testFrame">
        <div class="returnBack" @click="backEvent">返回</div>
        <div class="testTitle">
            <span class="animated zoomIn">体积测试</span>
        </div>
        <div class="testBody">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        };
    },
    mounted(){

    },
    methods:{
        backEvent(){
            this.$router.push({name:"/"})
        }
    }
}
</script>
<style lang="less" scoped>
.testFrame {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.returnBack {
    position: fixed;
    z-index: 3;
    left: 10px;
    top: 20px;
    height: 25px;
    line-height: 25px;
    background: #eee;
    padding: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background: #3988f7;
        color: #fff;
    }
}
.testTitle {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    font-size: 30px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 0 10px rgba(0,0,0,0.07);
    span{
        display: block;
    }
}
.testBody {
    position: fixed;
    left: 10px;
    top: 60px;
    right: 10px;
    bottom: 10px;
    background-color: #f5f5f5;
    z-index: 1;
}
</style>
