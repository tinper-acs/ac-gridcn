/**
*
* @title 这是标题
* @description 这是描述
*
*/
import React, { Component } from 'react';
import data from './data';
import Grid from '../../src/index'
import moment from 'moment';
import Button from 'bee-button';

class Demo1 extends Component {
    constructor(props){
        super(props);
        this.column = [
            {
                title: "员工编号",
                dataIndex: "code",
                key: "code",
                width: 150
            },
            {
                title: "员工姓名",
                dataIndex: "name",
                key: "name",
                width: 120,
                renderType:'input',
                required:true,
                fieldProps:{
                    defaultValue:'姓名'
                }
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='name'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='name'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "员工性别",
                dataIndex: "sexEnumValue",
                key: "sexEnumValue",
                width: 120,
                renderType:'select',
                fieldProps:{
                    defaultValue:'男',
                    data:[{
                        key: "请选择",
                        value: '',
                        disabled: true
                    }, {
                        key: "男",
                        value: 1
                    }, {
                        key: "女",
                        value: 0
                    }]
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='sex'//性别业务组件类型
                //         value={record.sex}//初始化值
                //         field='sex'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            // {
            //     title: "所属部门",
            //     dataIndex: "deptName",
            //     key: "deptName",
            //     width: 120,
            //     render: (text, record, index) => {
            //         return <FactoryComp
            //             type='dept'//性别业务组件类型
            //             field='dept'//修改的字段
            //             index={index}//字段的行号
            //             required={true}//必输项
            //             record={record}//记录集用于多字段处理
            //             onChange={this.changeAllData}//回调函数
            //             onValidate={this.onValidate}//校验的回调
            //         />
            //     }
            // },
            // {
            //     title: "职级",
            //     dataIndex: "levelName",
            //     key: "levelName",
            //     width: 120,
            //     render: (text, record, index) => {
            //         return <FactoryComp
            //             type='level'//性别业务组件类型
            //             field='postLevel'//修改的字段
            //             index={index}//字段的行号
            //             required={true}//必输项
            //             record={record}//记录集用于多字段处理
            //             onChange={this.changeAllData}//回调函数
            //             onValidate={this.onValidate}//校验的回调
            //         />
            //     }
            // },
            {
                title: "工龄",
                dataIndex: "serviceYears",
                key: "serviceYears",
                width: 130,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                fieldProps:{
                    defaultValue:2
                }
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='serviceYears'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='serviceYears'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "司龄",
                dataIndex: "serviceYearsCompany",
                key: "serviceYearsCompany",
                width: 130,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='serviceYearsCompany'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='serviceYearsCompany'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "年份",
                dataIndex: "year",
                key: "year",
                width: 100,
                renderType:'year',
                required:true,
                required:true,
                fieldProps:{
                    defaultValue:'2018'
                },
                render:(text, record, index)=>{
                    return moment(text).format('YYYY');
                }
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='year'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='year'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "月份",
                dataIndex: "monthEnumValue",
                key: "monthEnumValue",
                width: 120,
                renderType:'select',
                required:true,
                fieldProps:{
                    data:[{//月份
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "一月",
                        value: 1
                    }, {
                        key: "二月",
                        value: 2
                    }, {
                        key: "三月",
                        value: 3
                    }, {
                        key: "四月",
                        value: 4
                    }, {
                        key: "五月",
                        value: 5
                    }, {
                        key: "六月",
                        value: 6
                    }, {
                        key: "七月",
                        value: 7
                    }, {
                        key: "八月",
                        value: 8
                    }, {
                        key: "九月",
                        value: 9
                    }, {
                        key: "十月",
                        value: 10
                    }, {
                        key: "十一月",
                        value: 11
                    }, {
                        key: "十二月",
                        value: 12
                    }]
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='month'//性别业务组件类型
                //         value={record.month}//初始化值
                //         field='month'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "补贴类别",
                dataIndex: "allowanceTypeEnumValue",
                key: "allowanceTypeEnumValue",
                width: 120,
                renderType:'select',
                required:true,
                fieldProps:{
                    data:[{
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "电脑补助",
                        value: 1
                    }, {
                        key: "住宿补助",
                        value: 2
                    }, {
                        key: "交通补助",
                        value: 3
                    }]
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='allowanceType'//性别业务组件类型
                //         value={record.allowanceType}//初始化值
                //         field='allowanceType'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "补贴标准",
                dataIndex: "allowanceStandard",
                key: "allowanceStandard",
                width: 120,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                fieldProps:{
                    max: 999999,
                    min: 0,
                    step: 1,
                    precision: 2
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='allowanceStandard'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='allowanceStandard'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "实际补贴",
                dataIndex: "allowanceActual",
                key: "allowanceActual",
                width: 120,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                fieldProps:{
                    max: 999999,
                    min: 0,
                    step: 1,
                    precision: 2
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='allowanceActual'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='allowanceActual'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "是否超标",
                dataIndex: "exdeedsEnumValue",
                key: "exdeedsEnumValue",
                width: 120,
                required:true,
                renderType:'select',
                fieldProps:{
                    data:[{
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "未超标",
                        value: 0
                    }, {
                        key: "超标",
                        value: 1
                    }]
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='exdeeds'//姓名业务组件类型
                //         value={record.exdeeds}//初始化值
                //         field='exdeeds'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "领取方式",
                dataIndex: "pickTypeEnumValue",
                key: "pickTypeEnumValue",
                width: 120,
                renderType:'select',
                required:true,
                fieldProps:{
                    data:[{
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "转账",
                        value: 1
                    }, {
                        key: "现金",
                        value: 2
                    }]
                },
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='pickType'//姓名业务组件类型
                //         value={record.pickType}//初始化值
                //         field='pickType'//修改的字段
                //         index={index}//字段的行号
                //         required={true}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            },
            {
                title: "备注",
                dataIndex: "remark",
                key: "remark",
                width: 100,
                renderType:'input',
                required:false,
                // render: (text, record, index) => {
                //     return <FactoryComp
                //         type='remark'//姓名业务组件类型
                //         value={text}//初始化值
                //         field='remark'//修改的字段
                //         index={index}//字段的行号
                //         required={false}//必输项
                //         record={record}//记录集用于多字段处理
                //         onChange={this.changeAllData}//回调函数
                //         onValidate={this.onValidate}//校验的回调
                //     />
                // }
            }
        ];
    }
    /**
     * 跳转指定页码
     *
     * @param {*} pageIndex
     */
    freshData = (pageIndex) => {
        console.log('freshData')
    }

    /**
     * 分页  跳转指定页数和设置一页数据条数
     *
     * @param {*} index
     * @param {*} value
     */
    onDataNumSelect = (index, value) => {
        console.log('onDataNumSelect')
    }

    /**
     * type为0标识为pageIndex,为1标识pageSize
     *
     * @param {*} value
     * @param {*} type
     */
    onPageSelect = (value, type) => {
        console.log('onPageSelect')
    }
    getSelectedDataFunc=()=>{
        console.log('getSelectedDataFunc')
    }

    getAllData=()=>{
        console.log(this.grid.allData)
    }
    
    
    render () {
        let paginationObj = {
            activePage: 1,//当前页
            total: 100,//总条数
            items: 10,
            freshData: this.freshData,//刷新数据
            onDataNumSelect: this.onDataNumSelect,//选择记录行
            disabled: false//分页条禁用状态
        }
        return (
            <div className='grid-parent'>
                <div style={{'marginBottom':'20px'}}>
                    <Button onClick={this.getAllData}>获得所有数据</Button>
                </div>
                
                <Grid
                    ref={(el) => this.grid = el}//ref用于调用内部方法
                    data={data}//数据
                    rowKey={r => r.id ? r.id : r.key}
                    columns={this.column}//定义列
                    paginationObj={paginationObj}//分页数据
                    columnFilterAble={true}//是否显示右侧隐藏行
                    showHeaderMenu={true}//是否显示菜单
                    dragborder={true}//是否调整列宽
                    draggable={true}//是否拖拽
                    syncHover={false}//是否同步状态
                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调
                    scroll={{ y: 500 }}
                    excludeKeys={['id','ts','lastModified']}
                    delRow={(selectList)=>{
                        console.log('删除，数据如下-----------',selectList)
                    }}
                    save={(selectList)=>{
                        console.log('保存，数据如下-----------',selectList)
                    }}
                />
            </div>
        )
    }
}
export default Demo1