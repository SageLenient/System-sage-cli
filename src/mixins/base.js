export const Base = {
    data () {
        return {
            module:'users',
            modal:false,
            Listdata: [],
            total:0,
            page:1,
            rows:10,
            name:'',
            id:'',
            ids:[],
            changeTitle:''
        }
    },
    methods: {
    //获取数据
        getData(){
            this.axios({
                url:`http://localhost:3000/${this.module}/list`,
                method:'post',
                data:{
                    page: this.page,
                    rows: this.rows,
                    name: this.name,
                    newsId:this.formValidate.newsId
                }
            }).then(res=>{
                // console.log(res.data);
                // console.log(this.total);
                this.total=res.data.total;
                this.Listdata=res.data.rows;
            });
        },
        pageChange(page){//页数变化
            this.page = page;
            this.getData();
        },
        pagesizeChange(rows){//每页显示条数
            this.rows=rows;
            this.getData();
        },
    //添加数据
        addData(){
            this.changeTitle='添加数据';
            this.modal=true;
            this.$data.formValidate=this.$options.data().formValidate;
        },
    //表单提交验证
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.formValidate._id && this.formValidate._id.trim().length>0){
                    //修改数据
                        this.axios({
                            url   : `http://localhost:3000/${this.module}/${this.formValidate._id}`,
                            method: 'put',
                            data  : this.formValidate
                        }).then(res=>{
                            this.$Message.success('修改数据成功!');
                            this.modal = false;
                            this.getData();
                        })
                    }else{
                    //添加数据
                        this.axios({
                            url   : `http://localhost:3000/${this.module}`,
                            method: 'post',
                            data  : this.formValidate
                        }).then(res=>{
                            this.$Message.success('添加数据成功!');
                            this.modal = false;
                            this.getData();
                        });
                        this.$Message.success('提交成功!');
                    }
                } else {
                    this.$Message.error('提交失败!');
                }
            })
        },
    //重置清除表单
        handleReset (name) {
            this.$refs[name].resetFields();
        },
    //修改数据
        updateData(id){
            this.changeTitle='修改数据';
            this.axios({
                url   : `http://localhost:3000/${this.module}/${id}`,
                method: 'get',
            }).then(res=>{
                this.formValidate = res.data;
                this.modal = true;
            })
        },
    //删除单条数据
        removeData(id){
            this.$Modal.confirm({
                title:"确认对话框",
                content:'<p>你确定删除吗？</p>',
                onOk: () => {
                    this.axios({
                        url:`http://localhost:3000/${this.module}/${id}`,
                        method:'delete',
                        data:{
                            id:id
                        }
                    }).then(res=>{
                        this.getData();
                        this.$Message.info('删除成功');
                    })
                },
                /* onCancel: () => {
                    this.$Message.info('取消成功');
                } *///确认对话框取消框回调
            })
        },
    //多选框操作
        onSelectionChange(selection){
            var selectionLen = selection.length;
            if(selectionLen>0){
                for(let i=0;i<selectionLen;i++){
                    this.ids.push(selection[i]._id);
                }
            }
        },
    //删除多条数局
        removesData(){
            this.$Modal.confirm({
                title:"确认对话框",
                content:'<p>你确定删除吗？</p>',
                onOk: () => {
                    this.axios({
                        url:`http://localhost:3000/${this.module}/removes`,
                        method:'post',
                        data:{
                            ids:this.ids.toString()
                        }
                    }).then(res=>{
                        this.getData();
                        this.$Message.info('删除成功');
                    })
                }
            })
        },
    //搜索数据
        searchData(){
            this.getData();
        }
        /* ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }, *///确认对话框确认和取消回调
    },
    mounted() {
        this.getData();
    },
}