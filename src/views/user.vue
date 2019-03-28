<template>
<div>
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
                <Col span="11">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" placeholder="姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="年龄" prop="age">
                        <Input v-model="formValidate.age" placeholder="年龄" number></Input>
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
                        <Input v-model="formValidate.tel" placeholder="电话号码" number></Input>
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
                <i-switch v-model="formValidate.know" size="large">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
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
    import  { Base } from '../mixins/base'
    export default {
        mixins:[Base],
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
                        { required: true,type: 'number', message: '不能为空', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true,type: 'number', message: '不能为空', trigger: 'blur' },
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
                        width:80,
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        width: 65,
                        key: 'age'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday',
                        render: (h, params) => {
                            return h('div', [
                                h('span', this.$moment(params.row.birthday).format('YYYY-MM-DD'))
                            ]);
                        }
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
                        width: 65,
                        key: 'sex'
                    },
                    {
                        title: '了解',
                        width: 65,
                        key: 'know',
                        render: (h, params) => {
                            var yesNo=params.row.know==true?'是':'否';
                            return h('div', [
                                h('span', yesNo)
                            ]);
                        }
                    },{
                        title:'注册时间',
                        key:"time",
                        render: (h, params) => {
                            return h('div', [
                                h('span', this.$moment(params.row.time).format('YYYY-MM-DD'))
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
    }
</script>
<style>
.ivu-table-tbody td .ivu-table-cell span{
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
 }
 
</style>
