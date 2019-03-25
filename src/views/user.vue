<template>
<div>
    <Button type="primary" @click="addData" style="margin-right:10px">添加数据</Button>
    <Button type="error" @click="removesData">删除多条</Button>
    <Input search v-model="name" placeholder="请输入关键字" @on-search="searchData"/>
    <Table border :columns="columns" :data="Listdata"></Table>
    <br>
    <Page :total="total" show-elevator show-sizer  show-total :page-size-opts="[5,10,20,30,40,50]"
    @on-change='pageChange' @on-page-size-change='pagesizeChange' />
    <Modal v-model="modal" title="Common Modal dialog box title">
        <!-- @on-ok="ok" @on-cancel="cancel" -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row>
                <Col span="11">
                    <FormItem label="name">
                        <Input v-model="formValidate.name" placeholder="姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="age">
                        <Input v-model="formValidate.age" placeholder="年龄"></Input>
                    </FormItem>
                </Col>   
            </Row>             
            <Row>
                <Col span="11">
                    <FormItem label="birthday">
                        <DatePicker type="date" placeholder="出生日期" v-model="formValidate.birthday"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="sex">
                        <RadioGroup v-model="formValidate.sex">
                            <Radio label="male">男</Radio>
                            <Radio label="female">女</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="address">
                <Select v-model="formValidate.address">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="interest">
                <CheckboxGroup v-model="formValidate.interest">
                    <Checkbox label="吃"></Checkbox>
                    <Checkbox label="睡"></Checkbox>
                    <Checkbox label="玩"></Checkbox>
                    <Checkbox label="电影"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem>
                <Button type="primary">Submit</Button>
                <Button style="margin-left: 8px">Cancel</Button>
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
                    name:'111',
                    /* age:'',
                    birthday:'',
                    tel:'',
                    card:'',
                    email:'',
                    interest:'',
                    address:'',
                    sex:'',
                    know:'',
                    time:'' */
                },
                ruleValidate:{
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    /* age: [
                        { required: true, message: 'age cannot be empty', trigger: 'blur' },
                    ], */
                },
                columns: [
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
                page    : 1,
                rows    : 10,
                name    :'',
                id:''
            }
        },
        methods: {
        //获取数据
            getData(){
                this.axios({
                    url:'http://211.159.182.250:3000/users/list',
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
                console.log('添加数据');
                this.modal=true;
            },
        //修改数据
            updateData(id){
                console.log(id);
            },

        //删除单条数据
            removeData(id){
                this.$Modal.confirm({
                    title:"确认对话框",
                    content:'<p>你确定删除吗？</p>',
                    onOk: () => {
                        this.axios({
                            url:`http://211.159.182.250:3000/users/${id}`,
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
        //删除多条数局
            removesData(){
                console.log("删除多条")
            },
        //搜索数据
            searchData(){
                console.log('搜索数据')
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
