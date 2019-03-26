<template>
<div>
    <Button type="primary" @click="addData" style="margin-right:10px">添加数据</Button>
    <Button type="error" @click="removesData">删除多条</Button>
    <Input search v-model="name" placeholder="请输入关键字" @on-search="searchData"/>
    <Table border :columns="columns" ref="selection" :data="Listdata" @on-selection-change="onSelectionChange"></Table>
    <br>
    <Page :total="total" show-elevator show-sizer  show-total :page-size-opts="[5,10,20,30,40,50]"
    @on-change='pageChange' @on-page-size-change='pagesizeChange' />
    <Modal v-model="modal" title="Common Modal dialog box title">
        <!-- @on-ok="ok" @on-cancel="cancel" -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row>
                <Col span="11">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" placeholder="姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="年龄" prop="age">
                        <Input v-model="formValidate.age" placeholder="年龄"></Input>
                    </FormItem>
                </Col>   
            </Row>             
            <Row>
                <Col span="11">
                    <FormItem label="出生日期" prop="birthday">
                        <DatePicker type="date" placeholder="出生日期" v-model="formValidate.birthday"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="性别" prop="sex">
                        <RadioGroup v-model="formValidate.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                    <FormItem label="电话号码" prop="tel">
                        <Input v-model="formValidate.tel" placeholder="电话号码"></Input>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="email" prop="email">
                        <Input v-model="formValidate.email" placeholder="邮箱地址"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="身份证号" prop="card">
                <Input v-model="formValidate.card" placeholder="身份证号"></Input>
            </FormItem>
            <FormItem label="住址" prop="address">
                <Input v-model="formValidate.address" placeholder="家庭住址"></Input>
            </FormItem>
            <FormItem label="兴趣爱好" prop='interest'>
                <Input v-model="formValidate.interest" placeholder="兴趣爱好"></Input>
            </FormItem>
            <FormItem label="了解我们" prop='know'>
                <!-- <RadioGroup v-model="formValidate.know">
                    <Radio label="true">了解</Radio>
                    <Radio label="false">不了解</Radio>
                </RadioGroup> -->
                <i-switch v-model="formValidate.know" size="large">
                    <span slot="open">Yes</span>
                    <span slot="close">No</span>
                </i-switch>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button style="margin-left: 8px" @click="handleReset('formValidate')">重置</Button>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name:'',
                    age:'',
                    birthday:'',
                    tel:'',
                    card:'',
                    email:'',
                    interest:'',
                    address:'',
                    sex:'',
                    know:true,
                    time:''
                },
                ruleValidate:{
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    age: [
                        { required: true,type:'number', message: '不能为空', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, type:'number', message: '不能为空', trigger: 'blur' },
                    ],
                    card: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { type: 'email', message: '格式非法', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请填写住址', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, message: '选择爱好', trigger: 'change' },
                    ],
                    birthday: [
                        { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
                    ],
                },
                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday'
                    },
                    {
                        title: '电话号码',
                        key: 'tel'
                    },
                    {
                        title: '身份证',
                        key: 'card'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '兴趣爱好',
                        key: 'interest'
                    },
                    {
                        title: '住址',
                        key: 'address'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '是否了解',
                        key: 'know'
                    },{
                        title:'注册时间',
                        key:"time"
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
                modal:false,
                Listdata: [],
                total:0,
                page:1,
                rows:10,
                name:'',
                id:'',
                ids:[]
            }
        },
        methods: {
        //获取数据
            getData(){
                this.axios({
                    url:'http://localhost:3000/users/list',
                    method:'post',
                    data:{
                        page: this.page,
                        rows: this.rows,
                        name: this.name,
                    }
                }).then(res=>{
                    // console.log(res.data);
                    // console.log(this.total);
                    this.total=res.data.total;
                    this.Listdata=res.data.rows
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
                this.modal=true;
            },
        //表单提交验证
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.formValidate._id && this.formValidate._id.trim().length>0){
                        //修改数据
                            this.axios({
                                url   : `http://localhost:3000/users/${this.formValidate._id}`,
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
                                url   : `http://localhost:3000/users`,
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
                this.axios({
                    url   : `http://localhost:3000/users/${id}`,
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
                            url:`http://localhost:3000/users/${id}`,
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
        //
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
                            url:`http://localhost:3000/users/removes`,
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
</script>
