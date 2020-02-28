import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 普通表格基本示例","code":"/**\n*\n* @title 普通表格基本示例\n* @description 普通表格基本示例\n*\n*/\nimport React, { Component } from 'react';\nimport { Button } from 'tinper-bee';\nimport data from './data';\nimport { Grid } from 'ac-gridcn/bulid/index';\n\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.column = [\n            {\n                title: \"员工编号\",\n                dataIndex: \"code\",\n                key: \"code\",\n                width: 150\n            },\n            {\n                title: \"员工姓名\",\n                dataIndex: \"name\",\n                key: \"name\",\n                width: 120,\n            },\n            {\n                title: \"员工性别\",\n                dataIndex: \"sexEnumValue\",\n                key: \"sexEnumValue\",\n                width: 120,\n                \n            },\n            {\n                title: \"工龄\",\n                dataIndex: \"serviceYears\",\n                key: \"serviceYears\",\n                width: 130,\n                \n            },\n            {\n                title: \"司龄\",\n                dataIndex: \"serviceYearsCompany\",\n                key: \"serviceYearsCompany\",\n                width: 130,\n            },\n            {\n                title: \"年份\",\n                dataIndex: \"year\",\n                key: \"year\",\n                width: 100,\n            },\n            {\n                title: \"月份\",\n                dataIndex: \"monthEnumValue\",\n                key: \"monthEnumValue\",\n                width: 120,\n            },\n            {\n                title: \"补贴类别\",\n                dataIndex: \"allowanceTypeEnumValue\",\n                key: \"allowanceTypeEnumValue\",\n                width: 120,\n            },\n            {\n                title: \"补贴标准\",\n                dataIndex: \"allowanceStandard\",\n                key: \"allowanceStandard\",\n                width: 120,\n            },\n            {\n                title: \"实际补贴\",\n                dataIndex: \"allowanceActual\",\n                key: \"allowanceActual\",\n                width: 120,\n            },\n            {\n                title: \"是否超标\",\n                dataIndex: \"exdeedsEnumValue\",\n                key: \"exdeedsEnumValue\",\n                width: 120,\n            },\n            {\n                title: \"领取方式\",\n                dataIndex: \"pickTypeEnumValue\",\n                key: \"pickTypeEnumValue\",\n                width: 120,\n            },\n            {\n                title: \"备注\",\n                dataIndex: \"remark\",\n                key: \"remark\",\n                width: 100,\n            }\n        ];\n        this.state={\n            activePage:1,\n            total:100,\n            items:10\n        }\n    }\n    /**\n     * 跳转指定页码\n     *\n     * @param {*} pageIndex\n     */\n    freshData = (pageIndex) => {\n        console.log('freshData')\n    }\n\n    /**\n     * 分页  跳转指定页数和设置一页数据条数\n     *\n     * @param {*} index\n     * @param {*} value\n     */\n    onDataNumSelect = (index, value) => {\n        console.log('onDataNumSelect')\n    }\n\n    /**\n     * type为0标识为pageIndex,为1标识pageSize\n     *\n     * @param {*} value\n     * @param {*} type\n     */\n    onPageSelect = (value, type) => {\n        console.log('onPageSelect')\n    }\n    getSelectedDataFunc=()=>{\n        console.log('getSelectedDataFunc')\n    }\n\n    getAllData=()=>{\n        console.log(this.grid.allData)\n    }\n    \n    changPag=()=>{\n        this.setState({\n            activePage:2,\n            total:50,\n            items:20\n        })\n    }\n    \n    render () {\n        let paginationObj = {\n            activePage: this.state.activePage,//当前页\n            total: this.state.total,//总条数\n            items: this.state.items,\n            freshData: this.freshData,//刷新数据\n            onDataNumSelect: this.onDataNumSelect,//选择记录行\n            // disabled: false//分页条禁用状态\n        }\n        return (\n            <div className='grid-parent'>\n                <Button onClick={()=>{\n                    this.grid.exportExcel()\n                }}>导出</Button>\n                <Grid\n                    ref={(el) => this.grid = el}//ref用于调用内部方法\n                    data={data}//数据\n                    columns={this.column}//定义列\n                    paginationObj={paginationObj}//分页数据\n                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调\n                />\n            </div>\n        )\n    }\n}\nexport default Demo1","desc":" 普通表格基本示例"},{"example":<Demo2 />,"title":" 编辑表格基本示例","code":"/**\n*\n* @title 编辑表格基本示例\n* @description 编辑表格基本示例\n*\n*/\nimport React, { Component } from 'react';\nimport { Button } from 'tinper-bee';\nimport data from './data';\nimport { EditGrid } from 'ac-gridcn/bulid/index'\nimport moment from 'moment';\n\nclass Demo2 extends Component {\n    constructor(props){\n        super(props);\n        this.column = [\n            {\n                title: \"员工编号\",\n                dataIndex: \"code\",\n                key: \"code\",\n                width: 150\n            },\n            {\n                title: \"员工姓名\",\n                dataIndex: \"name\",\n                key: \"name\",\n                width: 120,\n                renderType:'input',\n                required:true,\n                validate:true,\n                fieldProps:{\n                    defaultValue:'姓名'\n                },\n            },\n            {\n                title: \"员工性别\",\n                dataIndex: \"sex\",\n                key: \"sex\",\n                width: 120,\n                renderType:'select',\n                required:true,\n                validate:true,\n                fieldProps:{\n                    allowClear:true,\n                    defaultValue:'1',\n                    data:[{\n                        key: \"请选择\",\n                        value: '',\n                    }, {\n                        key: \"男\",\n                        value: '1'\n                    }, {\n                        key: \"女\",\n                        value: '0'\n                    }]\n                },\n            },\n            {\n                title: \"工龄\",\n                dataIndex: \"serviceYears\",\n                key: \"serviceYears\",\n                width: 130,\n                className: 'column-number-right ', // 靠右对齐\n                renderType:'inputNumber',\n                required:true,\n                fieldProps:{\n                    defaultValue:2\n                }\n            },\n            {\n                title: \"司龄\",\n                dataIndex: \"serviceYearsCompany\",\n                key: \"serviceYearsCompany\",\n                width: 130,\n                className: 'column-number-right ', // 靠右对齐\n                renderType:'inputNumber',\n                required:true,\n            },\n            {\n                title: \"年份\",\n                dataIndex: \"year\",\n                key: \"year\",\n                width: 100,\n                renderType:'year',\n                required:true,\n                fieldProps:{\n                    defaultValue:'2018'\n                },\n                render:(text, record, index)=>{\n                    return moment(text).format('YYYY');\n                }\n            },\n            {\n                title: \"月份\",\n                dataIndex: \"month\",\n                key: \"month\",\n                width: 120,\n                renderType:'select',\n                required:true,\n                fieldProps:{\n                    data:[{//月份\n                        key: \"请选择\",\n                        value: \"\",\n                        disabled: true\n                    }, {\n                        key: \"一月\",\n                        value: 1\n                    }, {\n                        key: \"二月\",\n                        value: 2\n                    }, {\n                        key: \"三月\",\n                        value: 3\n                    }, {\n                        key: \"四月\",\n                        value: 4\n                    }, {\n                        key: \"五月\",\n                        value: 5\n                    }, {\n                        key: \"六月\",\n                        value: 6\n                    }, {\n                        key: \"七月\",\n                        value: 7\n                    }, {\n                        key: \"八月\",\n                        value: 8\n                    }, {\n                        key: \"九月\",\n                        value: 9\n                    }, {\n                        key: \"十月\",\n                        value: 10\n                    }, {\n                        key: \"十一月\",\n                        value: 11\n                    }, {\n                        key: \"十二月\",\n                        value: 12\n                    }]\n                },\n            },\n            {\n                title: \"补贴类别\",\n                dataIndex: \"allowanceType\",\n                key: \"allowanceType\",\n                width: 120,\n                renderType:'select',\n                required:true,\n                fieldProps:{\n                    data:[{\n                        key: \"请选择\",\n                        value: \"\",\n                        disabled: true\n                    }, {\n                        key: \"电脑补助\",\n                        value: 1\n                    }, {\n                        key: \"住宿补助\",\n                        value: 2\n                    }, {\n                        key: \"交通补助\",\n                        value: 3\n                    }]\n                },\n            },\n            {\n                title: \"补贴标准\",\n                dataIndex: \"allowanceStandard\",\n                key: \"allowanceStandard\",\n                width: 120,\n                className: 'column-number-right ', // 靠右对齐\n                renderType:'inputNumber',\n                required:true,\n                fieldProps:{\n                    max: 999999,\n                    min: 0,\n                    step: 1,\n                    precision: 2\n                },\n            },\n            {\n                title: \"实际补贴\",\n                dataIndex: \"allowanceActual\",\n                key: \"allowanceActual\",\n                width: 120,\n                className: 'column-number-right ', // 靠右对齐\n                renderType:'inputNumber',\n                required:true,\n                fieldProps:{\n                    max: 999999,\n                    min: 0,\n                    step: 1,\n                    precision: 2\n                },\n            },\n            {\n                title: \"是否超标\",\n                dataIndex: \"exdeeds\",\n                key: \"exdeeds\",\n                width: 120,\n                required:true,\n                renderType:'select',\n                fieldProps:{\n                    data:[{\n                        key: \"请选择\",\n                        value: \"\",\n                        disabled: true\n                    }, {\n                        key: \"未超标\",\n                        value: 0\n                    }, {\n                        key: \"超标\",\n                        value: 1\n                    }]\n                },\n            },\n            {\n                title: \"领取方式\",\n                dataIndex: \"pickType\",\n                key: \"pickType\",\n                width: 120,\n                renderType:'select',\n                required:true,\n                fieldProps:{\n                    data:[{\n                        key: \"请选择\",\n                        value: \"\",\n                        disabled: true\n                    }, {\n                        key: \"转账\",\n                        value: 1\n                    }, {\n                        key: \"现金\",\n                        value: 2\n                    }]\n                },\n            },\n            {\n                title: \"备注\",\n                dataIndex: \"remark\",\n                key: \"remark\",\n                width: 100,\n                renderType:'input',\n                required:false,\n            }\n        ];\n        this.state={\n            activePage:1,\n            total:100,\n            items:10\n        }\n    }\n    /**\n     * 跳转指定页码\n     *\n     * @param {*} pageIndex\n     */\n    freshData = (pageIndex) => {\n        console.log('freshData')\n    }\n\n    /**\n     * 分页  跳转指定页数和设置一页数据条数\n     *\n     * @param {*} index\n     * @param {*} value\n     */\n    onDataNumSelect = (index, value) => {\n        console.log('onDataNumSelect')\n    }\n\n    /**\n     * type为0标识为pageIndex,为1标识pageSize\n     *\n     * @param {*} value\n     * @param {*} type\n     */\n    onPageSelect = (value, type) => {\n        console.log('onPageSelect')\n    }\n    getSelectedDataFunc=()=>{\n        console.log('getSelectedDataFunc')\n    }\n\n    getAllData=()=>{\n        console.log(this.grid.allData)\n    }\n    validate=()=>{\n        let error = this.grid.validate();\n        if(error){\n            alert('数据校验失败，错误信息见控制台');\n            console.log(error)\n        }else{\n            alert('数据校验成功')\n        }\n    }\n    changPag=()=>{\n        this.setState({\n            activePage:2,\n            total:50,\n            items:20\n        })\n    }\n    \n    render () {\n        let paginationObj = {\n            activePage: this.state.activePage,//当前页\n            total: this.state.total,//总条数\n            items: this.state.items,\n            freshData: this.freshData,//刷新数据\n            onDataNumSelect: this.onDataNumSelect,//选择记录行\n            // disabled: false//分页条禁用状态\n        }\n        return (\n            <div className='grid-parent'>\n                <div style={{'marginBottom':'20px'}}>\n                    <Button onClick={this.changPag} colors=\"primary\" >改变分页</Button>\n                    <Button onClick={this.getAllData} colors=\"primary\" style={{'marginLeft':'20px'}} >获得所有数据</Button>\n                    <Button onClick={this.validate} colors=\"primary\" style={{'marginLeft':'20px'}}>主动校验</Button>\n                </div>\n                \n                <EditGrid\n                    ref={(el) => this.grid = el}//ref用于调用内部方法\n                    data={data}//数据\n                    columns={this.column}//定义列\n                    paginationObj={paginationObj}//分页数据\n                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调\n                    excludeKeys={['id','ts','lastModified']}\n                    delRow={(selectList)=>{\n                        console.log('删除，数据如下-----------',selectList)\n                    }}\n                    save={(selectList)=>{\n                        console.log('保存，数据如下-----------',selectList)\n                    }}\n                />\n            </div>\n        )\n    }\n}\nexport default Demo2","desc":" 编辑表格基本示例"}]


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
