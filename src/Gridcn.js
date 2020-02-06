import React, {Component} from "react";
import BeeGrid from "bee-complex-grid";
import Btns from 'ac-btns';
import ButtonGroup from 'bee-button-group';
import cloneDeep from 'lodash.clonedeep';

//文本输入组件
import TextField from './RowField/TextField';
//下拉选择组件
import SelectField from './RowField/SelectField';
//数值选择组件
import NumberField from './RowField/NumberField';
//年份选择组件
import YearField from './RowField/YearField';
//日期组件
import DateField from './RowField/DateField';

import AcTips from 'ac-tips';

const defualtPaginationParam = {
    dataNumSelect: ["5", "10", "15", "20", "25", "50", "All"],
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    dataNum: 4,
    btnType: {
        shape: 'border'
    },
    noBorder: true,
    confirmBtn: () => null
};
const defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
    data: [],
    excludeKeys:[],
    delRow:()=>{},//删除回调
    getSelectedDataFunc:()=>{},//选中回调
    save:()=>{},//保存回调

};

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state={
            copying:false,//是否正在拷贝
            open:props.defaultOpen||true,//默认展开收起
            isMax:false,//是否最大化了
            columns:props.columns,
            data:props.data,
            defaultValueKeyValue:{},//每个单元格的默认值
            isMax:false,//是否最大化了
            // selectData:[],//copy的数据
            allEditing:false,//是否正在修改所有数据
        }
        this.oldColumns = props.columns;
        this.selectList = [];//选中的数据
        this.allData = [];//表格所有数据
    }

    /**
     *获取保存的column和table上的属性
     *
     */
    getColumnsAndTablePros = () => {
        return this.grid.getColumnsAndTablePros();
    };
    /**
     *
     * 重置grid的columns
     */
    resetColumns = () => {
        this.grid.resetColumns(this.oldColumns);
    };

    exportExcel = () => {
        this.grid.exportExcel();
    };

    componentWillMount(){
        this.setColumn(this.props.columns)
        this.setData(this.props.data)
    }

    setColumn=(cl)=>{
        let columns = cloneDeep(cl);
        let defaultValueKeyValue = {};
        columns.forEach(item => {
            let {
                renderType,//渲染类型 input/inputNumber/select/datepicker/year
                fieldProps={},//传给`field`的属性
                // customizeRender,//自定义render
                dataIndex,
                render:oldRender,
                component,
                ...other
            } = item;
            // if(customizeRender){
            //     item.render=(text,record,index)=>{
                    
            //     }
            // }
            if(!oldRender)oldRender=text=>text;
            if(renderType){
                if(fieldProps.defaultValue!=undefined)defaultValueKeyValue[dataIndex]=fieldProps.defaultValue;
                switch(renderType){
                    case 'input':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<TextField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'inputNumber':
                        item.render=(text,record,index)=>{
                            let value = text;
                            if (fieldProps.precision && fieldProps.precision > 0) {
                                value = (typeof text) === 'number' ? text.toFixed(fieldProps.precision) : ""
                            } 
                            return (
                                record._edit?<NumberField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'select':
                        item.render=(text,record,index)=>{
                            let selectList = fieldProps.data;
                            let selected = selectList.find(item => item.key === text);
                            let value = selected ? selected.value : '';
                            return (
                                record._edit?<SelectField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {value}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'datepicker':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<DateField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'year':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<YearField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'refer':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<component 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                }
            }
        });
        this.setState({
            columns,
            defaultValueKeyValue
        })
        this.oldColumns = columns;
    }
    setData=(da)=>{
        let data = cloneDeep(da);
        // data.forEach((item,index)=>{
            
        // })
        this.setState({
            data
        })
        this.allData = data;
    }
    onChange=(field, value, index)=>{
        console.log(field, value, index)
        // let data = cloneDeep(this.state.data);
        // data[index]['status']='edit';
        // this.setState({
        //     data
        // })
        this.allData[index][field] = value;
    }
    //增行
    addRow=()=>{
        let defaultValueKeyValue = this.state.defaultValueKeyValue;
        let data = cloneDeep(this.state.data);
        let item = cloneDeep(data[0]);
        this.props.excludeKeys.forEach(it=>{
            delete item[it];
        })
        for( let attr in item){
            if(defaultValueKeyValue[attr]){
                item[attr]=defaultValueKeyValue[attr];
            }else{
                item[attr]='';
            }
            
        }
        item._edit = true;
        item._status = 'edit';
        data.push(item);
        this.setState({
            data
        })
        this.allData = data;
    }

    //修改
    updateAll=()=>{
        let data = cloneDeep(this.state.data);
        data.forEach(item=>{
            item._edit = true;//是否编辑态
            item._status = 'edit';//是否编辑态，用于显示是否编辑过
        })
        this.setState({
            data,
            allEditing:true
        })
        this.allData = data;
    }

    //删除行
    delRow=()=>{
        if(this.selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else{
            this.props.delRow(this.selectList);
        }
    }

    //复制行
    copyRow=()=>{
        if(this.selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else{
            let copyData = [];
            let data = cloneDeep(this.state.data);
            data.forEach(item=>{
                if(item._checked)copyData.push(item)
            })
            this.setState({
                copying:true,
                selectData:copyData
            })
            this.allData = data;
        }
        
    }

    //保存数据
    save=()=>{
        if(this.selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else{
            this.cancelEdit();
            this.props.save(this.selectList);
        }
    }

    //取消复制
    cancelCopy=()=>{
        this.setState({
            copying:false,
            selectData:[]
        })
    }
    //粘贴至末行
    copyToEnd=()=>{
        let { data } = this.state;
        let selectData = this.selectList;
        selectData.forEach((item,index)=>{
            this.props.excludeKeys.forEach(it=>{
                delete item[it];
            })
        })
        data = data.concat(selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false
        })
        this.allData = data;
    }

    //粘贴至此处
    copyToHere=()=>{
        let index = this.currentIndex;
        let data = cloneDeep(this.state.data);
        let selectData = this.selectList;
        selectData.forEach((item,index)=>{
            this.props.excludeKeys.forEach(it=>{
                delete item[it];
            })
        })
        data.splice(index,0,...selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false
        })
        this.allData = data;
    }

    //最大化、最小化
    max=()=>{
        this.setState({
            isMax:!this.state.isMax
        })
    }

    //修改取消
    cancelEdit=()=>{
        let data = cloneDeep(this.state.data);
        data.forEach(item=>{
            item._edit = false;//是否编辑态
            item._status = '';//是否编辑态，用于显示是否编辑过
        })
        this.setState({
            data,
            allEditing:false
        })
        this.allData = data;
    }
    //全不选
    resetChecked=(dataValue)=>{
        let data = cloneDeep(dataValue);
        data.forEach((item,index)=>{
            item._checked=false
        })
        return data;
    }

    //行hover
    onRowHover = (index,record) => {
        this.currentIndex = index;
    }

    //粘贴至此处按钮
    hoverContent=()=>{
        if(this.state.copying){
            return <span onClick={this.copyToHere} className='copy-to-here'>粘贴至此</span>
        }else{
            return ''
        }
    }

    //数据选择回调
    getSelectedDataFunc=(selectList,record,index)=>{
        this.selectList = selectList;
        this.props.getSelectedDataFunc(selectList,record,index)
    }

    

    renderDom=()=>{
        let { copying,isMax,columns,data,allEditing } = this.state;
        const { paginationObj, exportData,disabled,  ...otherProps } = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        _paginationObj.disabled = paginationObj.disabled !== undefined
            ? paginationObj.disabled
            : data.length === 0;
        let _exportData = exportData || data;
        let btnsObj = {}
        btnsObj= {
            addRow:{
                onClick:this.addRow,
                disabled:disabled
            },
            update:{
                onClick:this.updateAll,
                disabled:disabled
            },
            delRow:{
                onClick:this.delRow,
                // disabled:this.state.selectData==0||disabled
            },
            copyRow:{
                onClick:this.copyRow,
                // disabled:this.state.selectData==0||disabled
            },
            min:{
                onClick:this.max
            }
        }
        if(!isMax){
            delete btnsObj.min;
            btnsObj.max = {
                onClick:this.max
            };
        }
        if(allEditing){
            btnsObj.cancel = {
                onClick:this.cancelEdit
            }
            btnsObj.save = {
                onClick:this.save
            }
            
        }
        if(copying){
            btnsObj={
                copyToEnd:{
                    onClick:this.copyToEnd
                },
                cancel:{
                    onClick:this.cancelCopy
                }
            }
        }
        
        return (<div className={`demo-grid-wrapper ${disabled?'disabled':''} ${isMax?'max':''}`}>
                <span className='ac-gridcn-panel-btns'>
                    <ButtonGroup>
                        <Btns btns={btnsObj}/>
                    </ButtonGroup>
                </span>
                <BeeGrid
                    {...otherProps}
                    className="ucf-example-grid"
                    data={data}
                    columns={columns}
                    exportData={_exportData}
                    paginationObj={_paginationObj}
                    ref={el => this.grid = el}
                    hoverContent={this.hoverContent}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    onRowHover={this.onRowHover}
                />
            </div>
        );
    }

    render() {
        return (<span>
                {
                    this.state.isMax?ReactDOM.createPortal(this.renderDom(),document.querySelector('body')):this.renderDom()
                }
            </span>
        )
        
    }
}

Grid.defaultProps = defaultProps;
export default Grid;