<template>
<div>
    <Row>
        <Col span="3">
            <Tree :data="treeData" @on-select-change='treeChange'></Tree>
        </Col>
        <Col span="21">
            <Button type="primary" @click="addData" style="margin-right:10px">添加数据</Button>
            <Button type="error" @click="removesData">删除多条</Button>
            <Input search v-model="name" placeholder="请输入关键字" @on-search="searchData"/>
            <Table border :columns="columns" ref="selection" :data="Listdata" @on-selection-change="onSelectionChange"></Table>
            <br>
            <Page :total="total" show-elevator show-sizer  show-total :page-size-opts="[5,10,20,30,40,50]"
            @on-change='pageChange' @on-page-size-change='pagesizeChange' />
            <Modal v-model="modal" :title="changeTitle">
                <!-- @on-ok="ok" @on-cancel="cancel" -->
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="14">
                            <FormItem label="新闻标题" prop="title">
                                <Input v-model="formValidate.title" placeholder="新闻标题"></Input>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center"></Col>
                        <Col span="8">
                            <FormItem label="撰稿人" prop="author">
                                <Input v-model="formValidate.author" placeholder="撰稿人"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="关键词" prop="keyWords">
                        <Input v-model="formValidate.keyWords" placeholder="关键词"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button style="margin-left: 8px" @click="handleReset('formValidate')">重置</Button>
                    </FormItem>
                </Form>
            </Modal>
        </Col>
    </Row>
        
    
</div>
</template>
<script>
    import  { Base } from '../mixins/base'
    export default {
        mixins:[Base],
        data () {
            return{
                module: 'news',
                treeData:[],
                formValidate: {
                    newsId:null,
                    title:'',
                    author:'',
                    keyWords:''
                },
                ruleValidate:{
                    title: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    keyWords: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                },
                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '新闻标题',
                        key: 'title'
                    },
                    {
                        title: '撰稿人',
                        key: 'author'
                    },
                    {
                        title: '关键词',
                        key: 'keyWords'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.updateData(params.row._id)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeData(params.row._id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
        //得到新闻分类列表
            getTreeData(){
                this.axios({
                    url   : `http://localhost:3000/cate/list/1`,
                    method: 'post'
                }).then(res=>{
                    this.treeData = res.data;
                })
            },
            //添加新闻，需选择节点
            addData(){
                var saveData=this.formValidate.newsId;
                this.$data.formValidate=this.$options.data().formValidate;
                this.formValidate.newsId=saveData;
                if(this.formValidate.newsId!=null){
                    this.modal=true;
                }else{
                    alert('请选择一个分类')
                }
                
            },
            //点击树节点出发函数，设置newsId
            treeChange(node){
                if(node[0]!=null){
                    this.formValidate.newsId=node[0]._id;
                    this.getData();
                }
            }
        },
        //钩子函数
        mounted() {
            this.getTreeData();
        },

    }
</script>
