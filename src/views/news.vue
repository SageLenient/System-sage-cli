<template>
<div>
    <Table border :columns="columns" :data="Listdata"></Table>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '主题',
                        key: 'title'
                    },
                    {
                        title: '关键词',
                        key: 'keyWords'
                    },
                    {
                        title: '撰稿人',
                        key: 'author'
                    }
                ],
                Listdata: []
            }
        },
        methods: {
            getData(){
                this.axios({
                    url:'http://localhost:3000/news/list',
                    method:'post'
                }).then(res=>{
                   
                    this.Listdata=res.data.rows
                });
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>
