<template>
    <div @contextmenu="contextmenu">
        <Tabs value="typeChange" @on-click="typeChange">
            <TabPane label="新闻分类" name="1"><Tree ref="tree" :data="treedata"></Tree></TabPane>
            <TabPane label="订单分类" name="2"><Tree ref="tree" :data="treedata"></Tree></TabPane>
            <TabPane label="用户分类" name="3"><Tree ref="tree" :data="treedata"></Tree></TabPane>
        </Tabs>
        <Dropdown transfer ref="contextMenu" trigger="click" style="display: none;margin-left: 20px" placement="right-start" @on-click="menuclick">
            <DropdownMenu slot="list">
                <DropdownItem name="addnode">新增节点</DropdownItem>
                <DropdownItem name="upnode">修改</DropdownItem>
                <DropdownItem name="removenode" style="color: #ed4014">删除</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- 添加节点表单 -->
        <Modal
            v-model="modal"
            :title="modaltitle"
            :footer-hide=true
            :style="{zIndex:1000}">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="节点名" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入节点名"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default{
    data() {
        return {
            treedata:[],
            type:1,
            modaltitle:null,
            modal:false,
            formValidate: {
                title: '',
                parentId:null,
                type:1
            },
            ruleValidate: {
                title: [
                    { required: true, message: '节点名不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getdata(){
            this.axios({
                url:`http://localhost:3000/cate/list/${this.type}`,
                method:'post'
            }).then(res=>{
                this.treedata=res.data
            })
        },
        changeTab(type){
            this.axios({
                url   : `http://localhost:3000/cate/list/${type}`,
                method: 'post'
            }).then(res=>{
                return this.treedata=res.data;
            })
        },
        typeChange(type){
            this.type=type;
            this.changeTab(type);
        },
        // 右键事件
        contextmenu(event){
            event.preventDefault();
            //event.target.click();
            if(this.$refs.tree.getSelectedNodes().length>0 &&  event.target.nodeName=="SPAN"){
                this.formValidate.parentId=this.$refs.tree.getSelectedNodes()[0]._id;
                this.formValidate.type = this.$refs.tree.getSelectedNodes()[0].type;
            };
            this.$refs.contextMenu.$refs.reference= event.target;
            this.$refs.contextMenu.currentVisible =!this.$refs.contextMenu.currentVisible;
        },
        //
        menuclick(name){
            if(name==="addnode"){
                this.modaltitle="添加节点";
                this.modal=true;
            }else if(name==="upnode"){
                this.modaltitle="修改";
                this.axios({
                    url:`http://localhost:3000/cate/${this.formValidate.parentId}`,
                    method:'get'
                }).then(res=>{
                    var data=JSON.parse(JSON.stringify(res.data));
                    data.title=data.text;
                    delete data.text
                    this.formValidate=data;
                })
                this.modal=true;

            }else if(name==="removenode"){
                var removedata=this.remove(this.$refs.tree.getSelectedNodes()[0],[]).join(',');
                console.log(this.type,removedata);
                this.$Modal.confirm({
                   title:"删除数据节点",
                   content:"删除此节点的同时下面的子节点将都被删除，确定要删除吗",
                   onOk:()=>{
                        this.axios({
                            url:`http://localhost:3000/cate/${removedata}`,
                            method:'delete',
                            data:{
                                id:removedata
                            }
                        }).then(res=>{
                            this.$Message.success('删除成功！');
                            this.getdata();
                            this.modal=false;
                        })
                   }
                })

            }
        },
        // 添加修改对话框提交和重置
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.formValidate._id && this.formValidate._id.length>0){
                        this.axios({
                            url:`http://localhost:3000/cate/${this.formValidate._id}`,
                            method:'put',
                            data:this.formValidate
                        }).then(res=>{
                            this.$Message.success('修改成功！');
                            this.getdata();
                            this.modal=false;
                        })
                    }else{
                        this.axios({
                            url:`http://localhost:3000/cate`,
                            method:'post',
                            data:this.formValidate
                        }).then(res=>{
                            this.$Message.success('提交成功！');
                            this.getdata();
                            this.modal=false;
                        })
                    }

                } else {
                    this.$Message.error('提交失败！');
                }
            })
             this.formValidate=this.$options.data().formValidate;
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        closemodal(res){
            if(!res){
                this.formValidate=this.$options.data().formValidate;
            }
        },

        remove(obj,data){
            data.push(obj._id);
            if(obj.children){
                for(var i in obj.children){
                    this.remove(obj.children[i],data);
                }
            }
            return data;
        }
    },
    /* mounted() {
        console.log(this.$refs.contextMenu)
    }, */
}
    
</script>
