import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo3 = require("./demolist/Demo3");var DemoArray = [{"example":<Demo3 />,"title":" 编辑表格使用参照、行编辑为弹框模式","code":"/**\r\n*\r\n* @title 编辑表格使用参照、行编辑为弹框模式\r\n* @description 编辑表格使用参照(ac-mdf-refer)、行编辑为弹框模式(rowFieldPop)\r\n*\r\n*/\r\nimport React, { Component } from 'react';\nimport { FormControl, Button } from 'tinper-bee';\r\nimport { EditGrid} from 'ac-gridcn/build/index'\r\nimport moment from 'moment';\r\n\n\nimport MdfRefer from 'ac-mdf-refer';\r\nimport ReferField from 'ac-gridcn-refer-field';\r\nclass Demo3 extends Component {\r\n    constructor(props){\r\n        super(props);\r\n\r\n        window._baseUrl= '';//'u8c-baseservice';\r\n        cb.businessContext = {};\r\n        cb.rest.AppContext.ignoreuniform = true;\r\n        cb.rest.AppContext.serviceUrl = 'https://u8c-baseapi-daily.yyuap.com'\r\n        this.column = [\r\n            {\r\n                title: \"员工编号\",\r\n                dataIndex: \"code\",\r\n                key: \"code\",\r\n                width: 150\r\n            },\r\n            {\r\n                title: \"员工姓名\",\r\n                dataIndex: \"name\",\r\n                key: \"name\",\r\n                width: 120,\r\n                renderType:'input',\r\n                required:true,\r\n                validate:true,\r\n                fieldProps:{\r\n                    defaultValue:'姓名',\r\n                    // autoSize: { minRows: 3, maxRows: 5 },\r\n                    // componentClass: 'textarea' // 多行文本示例\r\n                },\r\n            },\r\n            {\r\n                title: \"员工性别\",\r\n                dataIndex: \"sex\",\r\n                key: \"sex\",\r\n                width: 120,\r\n                renderType:'select',\r\n                required:true,\r\n                validate:true,\r\n                fieldProps:{\r\n                    allowClear:true,\r\n                    defaultValue:'1',\r\n                    data:[{\r\n                        key: \"请选择\",\r\n                        value: '',\r\n                    }, {\r\n                        key: \"男\",\r\n                        value: '1'\r\n                    }, {\r\n                        key: \"女\",\r\n                        value: '0'\r\n                    }]\r\n                },\r\n            },\r\n            {\r\n                title: \"司龄\",\r\n                dataIndex: \"serviceYearsCompany\",\r\n                key: \"serviceYearsCompany\",\r\n                width: 130,\r\n                className: 'column-number-right ', // 靠右对齐\r\n                renderType:'inputNumber',\r\n                required:true,\r\n            },\r\n            {\r\n                title: \"年份\",\r\n                dataIndex: \"year\",\r\n                key: \"year\",\r\n                width: 100,\r\n                renderType:'year',\r\n                required:true,\r\n                fieldProps:{\r\n                    defaultValue:'2018'\r\n                },\r\n                render:(text, record, index)=>{\r\n                    return moment(text).format('YYYY');\r\n                }\r\n            },\r\n            {\r\n                title: \"日期\",\r\n                dataIndex: \"year1\",\r\n                key: \"year1\",\r\n                width: 100,\r\n                renderType:'datepicker',\r\n                required:true,\r\n                fieldProps:{\r\n                    defaultValue:'2018-12-5-6'\r\n                },\r\n                render:(text, record, index)=>{\r\n                    return moment(text).format('YYYY-MM-DD');\r\n                }\r\n            },\r\n            {\r\n                title: \"补贴类别\",\r\n                dataIndex: \"allowanceType\",\r\n                key: \"allowanceType\",\r\n                width: 120,\r\n                renderType:'select',\r\n                required:true,\r\n                fieldProps:{\r\n                    data:[{\r\n                        key: \"请选择\",\r\n                        value: \"\",\r\n                        disabled: true\r\n                    }, {\r\n                        key: \"电脑补助\",\r\n                        value: 1\r\n                    }, {\r\n                        key: \"住宿补助\",\r\n                        value: 2\r\n                    }, {\r\n                        key: \"交通补助\",\r\n                        value: 3\r\n                    }]\r\n                },\r\n            },\r\n            {\r\n                title: \"补贴标准\",\r\n                dataIndex: \"allowanceStandard\",\r\n                key: \"allowanceStandard\",\r\n                width: 120,\r\n                className: 'column-number-right ', // 靠右对齐\r\n                renderType:'inputNumber',\r\n                required:true,\r\n                fieldProps:{\r\n                    max: 999999,\r\n                    min: 0,\r\n                    step: 1,\r\n                    precision: 2\r\n                },\r\n            },\r\n            {\r\n                title: \"物料名称\" ,\r\n                    dataIndex: \"pickType\",\r\n                    key: \"pickType\",\r\n                    width: 200,\r\n                    required: true,\r\n                    validate: true,\r\n                    renderType: 'refer',\r\n                    component:<ReferField/>,\r\n                    fieldProps:{\r\n                        multiple: true,\r\n                        displayName: 'name',\r\n                        valueField: 'code',\r\n                        defaultValue:[{\"code\":\"lwnkuiaj\",name:'aa'},{\"code\":\"lwncaigou\",name:'ccc'}],\r\n                        // code: \"00000062\"\r\n                        // id: \"1771704067707136\"\r\n                        // name: \"小丽\"\r\n                        cRefType: 'ucfbasedoc.bd_baseorgref',\r\n                        referValueType:'any',\r\n                    }\r\n            },\r\n            {\r\n                title: \"备注\",\r\n                dataIndex: \"remark\",\r\n                key: \"remark\",\r\n                width: 100,\r\n                renderType:'input',\r\n                required:false,\r\n            }\r\n        ];\r\n        this.state={\r\n            activePage:1,\r\n            total:100,\r\n            items:10,\r\n            data:require('./data')\r\n        }\r\n    }\r\n    /**\r\n     * 跳转指定页码\r\n     *\r\n     * @param {*} pageIndex\r\n     */\r\n    freshData = (pageIndex) => {\r\n        console.log('freshData')\r\n    }\r\n\r\n    /**\r\n     * 分页  跳转指定页数和设置一页数据条数\r\n     *\r\n     * @param {*} index\r\n     * @param {*} value\r\n     */\r\n    onDataNumSelect = (index, value) => {\r\n        console.log('onDataNumSelect')\r\n    }\r\n\r\n    /**\r\n     * type为0标识为pageIndex,为1标识pageSize\r\n     *\r\n     * @param {*} value\r\n     * @param {*} type\r\n     */\r\n    onPageSelect = (value, type) => {\r\n        console.log('onPageSelect')\r\n    }\r\n\r\n    getAllData=()=>{\r\n        console.log(this.grid.allData)\r\n    }\r\n    getSelectData=()=>{\r\n        console.log(this.grid.selectList)\r\n    }\r\n    validate=()=>{\r\n        let error = this.grid.validate();\r\n        if(error){\r\n            alert('数据校验失败，错误信息见控制台');\r\n            console.log(error)\r\n        }else{\r\n            alert('数据校验成功')\r\n        }\r\n    }\r\n    validateSelect=()=>{\r\n        let error = this.grid.validateSelect();\r\n        if(error){\r\n            alert('数据校验失败，错误信息见控制台');\r\n            console.log(error)\r\n        }else{\r\n            alert('数据校验成功')\r\n        }\r\n    }\r\n    changPag=()=>{\r\n        this.setState({\r\n            activePage:2,\r\n            total:50,\r\n            items:20\r\n        })\r\n    }\r\n\r\n    onChange = (value,error) => {\r\n        console.log('Demo3 onchange ',value);\r\n    }\r\n    \r\n    inputChange = (v)=>{\r\n        this._data[0].name = v;\r\n        this.setState({\r\n            data:this._data\r\n        })\r\n    }\r\n\r\n    render () {\r\n        let paginationObj = {\r\n            activePage: this.state.activePage,//当前页\r\n            total: this.state.total,//总条数\r\n            items: this.state.items,\r\n            freshData: this.freshData,//刷新数据\r\n            onDataNumSelect: this.onDataNumSelect,//选择记录行\r\n            // disabled: false//分页条禁用状态\r\n        }\r\n\r\n        return (\r\n            <div className='grid-parent'>\r\n                <div style={{'marginBottom':'20px'}}>\r\n                    <Button onClick={this.changPag} colors=\"primary\" >改变分页</Button>\r\n                    <Button onClick={this.getAllData} colors=\"primary\" style={{'marginLeft':'20px'}} >获得所有数据</Button>\r\n                    <Button onClick={this.getSelectData} colors=\"primary\" style={{'marginLeft':'20px'}} >获得选中数据</Button>\r\n                    <Button onClick={this.validate} colors=\"primary\" style={{'marginLeft':'20px'}}>主动校验</Button>\r\n                    <Button onClick={this.validateSelect} colors=\"primary\" style={{'marginLeft':'20px'}}>主动校验选中数据</Button>\r\n                </div>\r\n                \r\n                <EditGrid\r\n                    ref={(el) => this.grid = el}//ref用于调用内部方法\r\n                    data={this.state.data}//数据\r\n                    columns={this.column}//定义列\r\n                    paginationObj={paginationObj}//分页数据\r\n                    \r\n                    rowFieldPop = {true}\r\n                    rowFieldRow = {4}\r\n\r\n                    excludeKeys={['id','ts','lastModified']}\r\n                    delRow={(selectList,newData)=>{\r\n                        console.log('删除，数据如下-----------',selectList)\r\n                        console.log('新的数据如下-----------',newData)\r\n                    }}\r\n                    save={(selectList)=>{\r\n                        console.log('保存，数据如下-----------',selectList)\r\n                    }}\r\n                    headerScroll={true}\r\n                    onChange = {this.onChange}\r\n                    title=\"我是标题\"\r\n                />\r\n            </div>\r\n        )\r\n    }\r\n}\r\nexport default Demo3","desc":" 编辑表格使用参照(ac-mdf-refer)、行编辑为弹框模式(rowFieldPop)"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
