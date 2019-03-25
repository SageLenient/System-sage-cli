<template>
<div>
    <Table border :columns="columns" :data="Listdata"></Table>
    <br>
    <Page :total="total" show-elevator show-sizer  show-total :page-size-opts="[5,10,20,30,40,50]"
    @on-change='pageChange' @on-page-size-change='pagesizeChange' />
    <Modal v-model="modal" title="确认对话框">
        <!-- @on-ok="ok" @on-cancel="cancel" -->
       <Form :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="name">
                <Input v-model="formItem.name" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="name">
                <Input v-model="formItem.name" placeholder="Enter something..."></Input>
            </FormItem>
            <Row><Col span="11">
                <FormItem label="birthday">
                    <DatePicker type="date" placeholder="出生日期" v-model="formItem.birthday"></DatePicker>
                </FormItem>
                <Col span="2" style="text-align: center"></Col>
                <FormItem label="Radio">
                    <RadioGroup v-model="formItem.radio">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </RadioGroup>
                </FormItem>
            </Col></Row>
            <FormItem label="Select">
                <Select v-model="formItem.select">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="Checkbox">
                <CheckboxGroup v-model="formItem.checkbox">
                    <Checkbox label="Eat"></Checkbox>
                    <Checkbox label="Sleep"></Checkbox>
                    <Checkbox label="Run"></Checkbox>
                    <Checkbox label="Movie"></Checkbox>
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
                    name:'',
                    age:'',
                    birthday:'',
                    tel:'',
                    card:'',
                    email:'',
                    interest:'',
                    address:'',
                    sex:'',
                    know:'',
                    time:''
                },
                ruleValidate:{
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: 'age cannot be empty', trigger: 'blur' },
                    ],
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
            pageChange(page){
                this.page = page;
                this.getData();
            },
            pagesizeChange(rows){
                this.rows=rows;
                this.getData();
            },
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
