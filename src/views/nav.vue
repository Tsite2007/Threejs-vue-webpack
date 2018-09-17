<template lang="html">
    <div class="navFrame">
        <h1 class="title animated zoomIn">互动测试体验</h1>
        <ul class="testNav animated zoomIn">
            <li @click="nevClickEvent('/ratio/index.html')">占比测试</li>
            <li @click="nevClickEvent('/area/index.html')">面积测试</li>
            <li @click="nevClickEvent('/draw/index.html')">画图测试</li>
            <li @click="nevClickEvent('/rotate/index.html')">旋转测试</li>
        </ul>
        <ul class="testNav animated zoomIn">
            <li @click="nevClickEvent('/line/index.html')">连线测试</li>
            <li @click="nevClickEvent('/bulk/index.html')">体积测试</li>
            <li @click="nevClickEvent('/grid/index.html')">方块测试</li>
            <li @click="nevClickEvent('/group/index.html')">组合测试</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    mounted(){

    },
    methods:{
        nevClickEvent(navUrl){
            this.$router.push({
                name:navUrl
            })
        }
    }
}
</script>

<style lang="less" scoped>
.navFrame{
    position: fixed;
    left: 0;
    top: 50%;
    width: 100%;
    height: 350px;
    margin-top:-210px;
}
.title {
    font-size: 40px;
    text-align: center;
    padding-bottom: 50px;color: #3988f7;
}
.testNav {
    display: block;
    text-align: center;
    li {
        list-style: none;
        display: inline-block;
        margin: 10px;
        width: 120px;
        font-size: 16px;
        height: 100px;
        line-height: 100px;
        border: #e5e5e5 1px solid;
        border-radius: 10px;
        cursor: pointer;
        transition: 300ms ease all;
        border-color: #3988f7;
        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.07);
        &:hover {
            font-weight: bold;
            background-color: #3988f7;
            border-color: #3988f7;
            color: #fff;
            transform: scale(1.2);
            box-shadow: 0 3px 8px 0 #93dbfd;
        }
    }
}
</style>
