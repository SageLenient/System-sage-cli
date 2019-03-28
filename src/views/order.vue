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
                            <FormItem label="订单名称" prop="ordername">
                                <Input v-model="formValidate.ordername" placeholder="订单名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center"></Col>
                        <Col span="8">
                            <FormItem label="订单详情" prop="details">
                                <Input v-model="formValidate.details" placeholder="订单详情"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                            <FormItem label="开始时间" prop="sdate">
                                <Input v-model="formValidate.sdate" placeholder="开始时间" type="date"></Input>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center"></Col>
                        <Col span="11">
                            <FormItem label="预计完成" prop="sdate">
                                <Input v-model="formValidate.sdate" placeholder="预计完成" type="date"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="订单进度" prop="progress">
                        <Progress :percent="parseInt(formValidate.progress)" />
                        <Input v-model="formValidate.progress" placeholder="订单进度" number></Input>
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
                module: 'order',
                treeData:[],
                formValidate: {
                    newsId:null,
                    ordername:'',
                    details:'',
                    sdate:'',
                    fdate:'',
                    progress:0,
                },
                ruleValidate:{
                    ordername: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    details: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    sdate: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    fdate: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    progress: [
                        { required: true, type:'number', message: '不能为空', trigger: 'blur' }
                    ],
                },
                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '订单名称',
                        key: 'ordername'
                    },
                    {
                        title: '订单详情',
                        key: 'details'
                    },
                    {
                        title: '开始时间',
                        key: 'sdate',
                        render: (h, params) => {
                            return h('div', [
                                h('span', this.$moment(params.row.sdate).format('YYYY-MM-DD'))
                            ]);
                        }
                    },
                    {
                        title: '预计完成',
                        key: 'fdate',
                        render: (h, params) => {
                            return h('div', [
                                h('span', this.$moment(params.row.fdate).format('YYYY-MM-DD'))
                            ]);
                        }
                    },
                    {
                        title: '订单进度',
                        key: 'progress',
                        render: (h, params) => {
                            return h('div', [
                                h('Progress', {
                                    props:{
                                       percent:parseInt(params.row.progress)
                                    }
                                })
                            ]);
                        }
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
        //得产品分类列表
            getTreeData(){
                this.axios({
                    url   : `http://localhost:3000/cate/list/2`,
                    method: 'post'
                }).then(res=>{
                    this.treeData = res.data;
                })
            },
            //添加产品，需选择节点
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
