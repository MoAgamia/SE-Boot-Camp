<template>
    <div>
        <ul>
            <li v-bind:key="list.name" v-for="list in lists">
                {{list.name}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:'Lists',
        created (){
            
        },
        data (){
            return {
                lists:[]
            }
        },
        methods:{
            addList: (name) => {
                this.lists.add({name})
            }
        }
    }
</script>
<style>

</style>
