<!--
by: lizishan 2018/8/20
name: index
notes:
-->
<template>
<div class="content">
    <div class="errContent" v-if="type === '404'">
        <div><img src="@/libs/images/public/404.png" alt=""></div>
        <span class="tip">哎呀，您访问的页面不见了，{{time}}s 后为您返回首页。</span>
        <div type="text" class="backHome" @click="handleBack">返回首页</div>
    </div>


    <div class="errContent" v-if="type === 'serverError'">
        <div><img src="@/libs/images/public/serverError.png" alt=""></div>
        <span class="tip">哎呀，服务器睡着了，{{time}}s 秒后为您返回首页。</span>
        <div type="text" class="backHome" @click="handleBack">返回首页</div>
    </div>

</div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            time: 0,
            type: '404'
        }
    },

    methods: {
        handleBack() {
            this.time = 0
            this.$router.push('/page/student/home.html')
        },

        countDown() {
            this.time--
        }
    },

    mounted() {

        this.type = this.$route.query.type || this.type
        this.time = 3;
        setInterval(this.countDown, 1000);
    },

    watch: {
        'time': function(newVal, oldVal) {
            if (newVal === 0) {
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped lang="less">
.content {
    position: fixed;
    height: 100%;
    background-color: #F2F6FC;
    width: 100%;
    left: 0;
    top: 0;
    text-align: center;
    .errContent {
        width: 330px;
        height: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -165px;
        margin-top: -170px;
        .tip {
            font-size: 14px;
            color: #C9CED7;
        }

        .backHome {
            padding-top: 30px;
            color: #3988f7;
            margin: auto;
            width: 60px;
            border-bottom: 1px solid #3988f7;
            cursor: pointer;
        }
    }
}
</style>
