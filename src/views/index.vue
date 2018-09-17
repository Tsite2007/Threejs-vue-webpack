<!--
    by: tengma 2018年07月27日
    name: 入口路由
    notes: 登陆后根据路由进行分发
-->
<template lang="html">
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import url from "@/libs/interface/public.js";
export default {
    data(){
       return {
       }
    },
    props: {
        firstRouter: {
            type: Object
        }
    },
    methods: {
    },
    mounted() {
        this.$router.replace(Object.assign({}, this.firstRouter));
    }
}
</script>
