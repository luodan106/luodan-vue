<template>
    <fieldset>
        <legend>点赞记录</legend>
        <span v-for="(user,index) in likeuser" :key="index">{{user}}</span>
    </fieldset>
</template>

<script>
export default {
    props:{
        likeuser:Array,
        name:String
    },
    data(){
        return{
            image:[]
        }
    }
}
</script>
