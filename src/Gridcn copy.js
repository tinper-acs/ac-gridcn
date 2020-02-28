import React, { Component,Fragment } from "react";
import BeeGrid from "bee-complex-grid";
import Btns from 'ac-btns';
import ButtonGroup from 'bee-button-group';
import cloneDeep from 'lodash.clonedeep';
import Icon from 'bee-icon';
import Confirm from 'ac-confirm';
import isequal from 'lodash.isequal';
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

import { gridDefalutProps,paginationDefaultProps } from './defaultProps'



const defaultProps = {
    data: [],
    excludeKeys:[],
    delRow:()=>{},//删除回调
    getSelectedDataFunc:()=>{},//选中回调
    save:()=>{},//保存回调
    clsfix:'ac-gridcn',
    onChange:()=>{},//数据改变回调
    hideSave:false,//是否隐藏保存按钮
    isEdit:false,//是否需要表格编辑
    powerBtns:['addRow','update','delRow','copyRow','export','min','max','cancel','save','copyToEnd'],
    forcePowerBtns:['cancel'],//不受按钮权限控制的按钮
};

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state={
            copying:false,//是否正在拷贝
            open:props.defaultOpen!=undefined?props.defaultValue:true,//默认展开收起
            isMax:false,//是否最大化了
            columns:props.columns,
            data:props.data,
            defaultValueKeyValue:{},//每个单元格的默认值
            isMax:false,//是否最大化了
            selectData:[],//选中的数据
            allEditing:false,//是否正在修改所有数据
            adding:false,//是否正在新增
            addNum:0,//新增的条数
            canExport:false,
        }
        this.oldColumns = props.columns;
        this.selectList = [];//选中的数据
        this.allData = [];//表格所有数据
        this.errors = {};
        this.selectKeyData = {};//存select类型字段  key:data(下拉列表)
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
    getValue=(text,props)=>{
        let { renderType,fieldProps } = props;
        let { data=[],defaultValue } = fieldProps;
        let value = defaultValue!=undefined?defaultValue:'';
        if(renderType&&renderType=='select'){
            data.forEach(item => {
                if(item.value==text){
                    value = item.key
                }
            });
        }else{
            value = text;
        }
        return value;
    }

    componentWillMount(){
        this.setColumn(this.props.columns)
        this.setData(this.props.data)
    }
    componentWillReceiveProps(nextProps){
        if('data' in nextProps&&(!isequal(nextProps.data,this.state.data))){
            this.setData(nextProps.data,nextProps.exportData);
        }
        if('columns' in nextProps&&(!isequal(nextProps.columns,this.state.columns))){
            this.selectKeyData = {};
            this.setColumn(this.props.columns)
            this.setData(this.props.data)
        }
    }
    setColumn=(cl)=>{
        let columns = cloneDeep(cl);
        let defaultValueKeyValue = {};
        columns.forEach(item => {
            let {
                renderType,//渲染类型 input/inputNumber/select/datepicker/year
                fieldProps={},//传给`field`的属性
                dataIndex,
                render:oldRender,
                component,//参照组件
                ...other
            } = item;
            if(!oldRender)oldRender=text=>text;
            if(renderType){
                if(fieldProps.defaultValue!=undefined){
                    defaultValueKeyValue[dataIndex]=fieldProps.defaultValue;
                }else{
                    defaultValueKeyValue[dataIndex]='';
                }
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
                                    onValidate={this.onValidate}
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
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'select':
                        item.render=(text,record,index)=>{
                            let value = this.getValue(text,item);
                            if(index==0&&(!this.selectKeyData[item.dataIndex])){
                                this.selectKeyData[item.dataIndex] = fieldProps.data;
                            }
                            return (
                                record._edit?<SelectField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {text+''}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(value,record,index)}</div>
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
                                    onValidate={this.onValidate}
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
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'refer':
                        item.render=(text,record,index)=>{
                            let displayName = 'name';
                            if(fieldProps&&fieldProps.displayName)name=fieldProps.displayName;
                            let value = oldRender&&oldRender(text,record,index);
                            if(typeof text == 'object'&&(!record._edit)){
                                value = oldRender&&oldRender(text[displayName],record,index);
                            }
                            return (
                                record._edit?<span>
                                    {
                                        React.cloneElement(component,{
                                            ...other,
                                            ...fieldProps,
                                            index : index,
                                            value ,
                                            field :item.dataIndex,
                                            onChange :this.onChange,
                                            status :record._status,
                                            onValidate:this.onValidate
                                        })
                                    }
                                </span>:<div>{value}</div>
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
    setData=(da,exportData)=>{
        let data = cloneDeep(da);
        this.setState({
            data,
            canExport:false
        },()=>{
            if(exportData&&(isequal(this.props.exportData,exportData))){
                
            }else if(exportData&&(!isequal(this.props.exportData,exportData))){
                this.getExportData(exportData)
            }else if(!exportData){
                this.getExportData(data)
            }
            
        })
        this.allData = data;
    }

    onValidate=(filed,errors,index)=>{
        let current = this.errors[index]||{};
        if(errors){
            current[filed] = errors[filed][0].message;
        }else{
           delete current[filed];
        }
        if(Object.keys(current).length==0){
            delete this.errors[index];
        }else{
            this.errors[index] = current;
        }
    }
    validate = ()=>{
        if(Object.keys(this.errors).length){
            return this.errors;
        }else{
            return null;
        }
    }

    onChange=(field, value, index)=>{
        if(!isequal(this.allData[index][field],value)){
            this.allData[index]._checked = true;
            this.allData[index][field] = value;
            let selectList = [];
            this.allData.forEach(item=>{
                if(item._checked)selectList.push(item)
            })
            this.setState({
                data:this.allData,
                selectData:selectList
            })
            this.props.onChange(this.allData);
        }
    }
    //增行
    addRow=()=>{
        let defaultValueKeyValue = this.state.defaultValueKeyValue;
        let data = cloneDeep(this.state.data);
        let item = cloneDeep(defaultValueKeyValue);
        item._edit = true;
        item._status = 'edit';
        item._checked = true;
        data.unshift(item);
        let selectList = [];
        data.forEach(item=>{
            if(item._checked)selectList.push(item);
        })
        this.setState({
            data,
            adding:true,
            addNum:this.state.addNum+1,
            selectData:selectList
        })
        this.allData = data;
        this.props.onChange(data)

        if(!this.props.exportData){
            let exportItem = cloneDeep(item)
            for(let attr in this.selectKeyData){
                exportItem[attr] = this.getValue(exportItem[attr],{
                    renderType:'select',
                    fieldProps:{
                        data:this.selectKeyData[attr]
                    }
                })
            }
            this.exportData.unshift(exportItem)
        }
    }

    //取消新增
    cancelAdd=()=>{
        Confirm.create({
            title: '温馨提示',
            content: '数据未保存，确定离开 ?',
            confirmFn:()=> {
                let data = cloneDeep(this.state.data);
                data.splice(0,this.state.addNum)
                if(!this.props.exportData){
                    this.exportData.splice(0,this.state.addNum)
                }
                this.setState({
                    data,
                    adding:false,
                    addNum:0,
                    selectData:[]
                })
                this.props.onChange(data)
            },
            cancelFn:()=> {
                // console.log('Cancel');
            },
        })
        
    }
    //修改
    updateAll=()=>{
        let data = cloneDeep(this.state.data);
        data.forEach(item=>{
            item._edit = true;//是否编辑态
            item._status = 'edit';//是否编辑态，用于显示是否编辑过
            item._checked = false;
        })
        this.setState({
            data,
            allEditing:true,
            selectData:[]
        })
        // this.props.onChange(data)
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
            Confirm.create({
                title: '温馨提示',
                content: '单据删除后将不能恢复。',
                confirmFn:()=> {
                    this.props.delRow(this.selectList);
                },
                cancelFn:()=> {
                    // console.log('Cancel');
                },
            })
            
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
        }
        
    }

    //保存数据
    save=()=>{
        let selectList = [];
        this.allData.forEach(item=>{
            if(item._checked)selectList.push(item)
        })
        if(selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else if(this.validate()){
            AcTips.create({
                type:'warning',
                content:"数据校验失败"
            })
            console.log(this.errors)
        }else{
            let data = cloneDeep(this.state.data);
            data.forEach(item=>{
                item._edit = false;//是否编辑态
                item._status = '';//是否编辑态，用于显示是否编辑过
                item._checked = false;
            })
            this.setState({
                data,
                adding:false,
                allEditing:false,
                selectData:[]
            })
            // this.props.onChange(data)
            this.allData = data;
            this.props.save(selectList);
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
            if(!this.props.exportData){
                let exportItem = cloneDeep(item)
                for(let attr in this.selectKeyData){
                    exportItem[attr] = this.getValue(exportItem[attr],{
                        renderType:'select',
                        fieldProps:{
                            data:this.selectKeyData[attr]
                        }
                    })
                }
                this.exportData.push(exportItem)
            }
        })
        data = data.concat(selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false
        })
        this.props.onChange(data)
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
            if(!this.props.exportData){
                let exportItem = cloneDeep(item)
                for(let attr in this.selectKeyData){
                    exportItem[attr] = this.getValue(exportItem[attr],{
                        renderType:'select',
                        fieldProps:{
                            data:this.selectKeyData[attr]
                        }
                    })
                }
                this.exportData.splice(index,0,exportItem)
            }
        })
        data.splice(index,0,...selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false
        })
        this.props.onChange(data)
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
        Confirm.create({
            title: '温馨提示',
            content: '数据未保存，确定离开 ?',
            confirmFn:()=> {
                let data = cloneDeep(this.state.data);
                data.forEach(item=>{
                    item._edit = false;//是否编辑态
                    item._status = '';//是否编辑态，用于显示是否编辑过
                    item._checked = false;
                })
                this.setState({
                    data,
                    allEditing:false,
                    selectData:[]
                })
                // this.props.onChange(data)
                this.allData = data;
            },
            cancelFn:()=> {
                // console.log('Cancel');
            },
        })
        
    }
    //全不选
    resetChecked=(dataValue)=>{
        let data = cloneDeep(dataValue);
        data.forEach((item,index)=>{
            item._checked=false
        })
        // this.props.onChange(data)
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
    getSelectedDataFunc=(selectList,record,index,newData)=>{
        this.selectList = selectList;
        let data = cloneDeep(this.state.data)
        if (index != undefined) {
            data[index]['_checked'] = !data[index]['_checked'];
        } else {//点击了全选
            if (selectList.length > 0) {//全选
                data.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = true
                    }
                });
            } else {//反选
                data.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = false
                    }
                });
            }
        }
        this.setState({
            data:data,
            selectData:selectList
        })
        this.allData = data;
        this.props.getSelectedDataFunc(selectList,record,index,newData);
    }
    //打开关闭
    open=()=>{
        this.setState({
            open:!this.state.open
        })
    }
    
    //编辑表格导出数据select类型单独处理
    getExportData=(data)=>{
        let exportData = cloneDeep(data);
        exportData.forEach(item=>{
            for(let attr in this.selectKeyData){
                item[attr] = this.getValue(item[attr],{
                    renderType:'select',
                    fieldProps:{
                        data:this.selectKeyData[attr]
                    }
                })
            }
        })
        this.exportData = exportData;
        this.setState({
            canExport:true
        })
        
    }

    renderDom=()=>{
        let { copying,isMax,columns,data,allEditing,adding,open,selectData,canExport } = this.state;
        const { clsfix,paginationObj, exportData,disabled,title,hideSave, isEdit,powerBtns,forcePowerBtns, ...otherProps } = this.props;
        let _paginationObj ='none';
        if(paginationObj!='none'){
            _paginationObj = {...paginationDefaultProps, ...paginationObj};
            _paginationObj.disabled = paginationObj.disabled !== undefined
                ? paginationObj.disabled
                : (data.length === 0||allEditing||copying||adding);

            if((data.length === 0||allEditing||copying||adding)){
                _paginationObj.disabled = true;
            }
        }
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
                disabled:selectData.length==0||disabled
            },
            copyRow:{
                onClick:this.copyRow,
                disabled:selectData.length==0||disabled
            },
            export: {
                onClick: () => {
                    this.grid.exportExcel();
                },
                disabled:(!canExport)||disabled
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
            if(!hideSave){
                btnsObj.save = {
                    onClick:this.save,
                    disabled:selectData.length==0||disabled
                }
            }
        }else if(adding){
            btnsObj.cancel = {
                onClick:this.cancelAdd
            }
            if(!hideSave){
                btnsObj.save = {
                    onClick:this.save,
                    disabled:selectData.length==0||disabled
                }
            }
        }else if(copying){
            btnsObj={
                copyToEnd:{
                    onClick:this.copyToEnd
                },
                cancel:{
                    onClick:this.cancelCopy
                }
            }
        }
        let gridOptions={
            syncHover:false,
            autoCheckedByClickRows:false,
            multiSelect:{ type:"checkbox" },
            showFilterMenu:false,
            ...otherProps,
            data:data,
            columns:columns,
            exportData:this.exportData,
            paginationObj:_paginationObj,
            ref:el => this.grid = el,
            hoverContent:this.hoverContent,
            getSelectedDataFunc:this.getSelectedDataFunc,
            onRowHover:this.onRowHover,
            
        }
        gridOptions = Object.assign(gridDefalutProps,gridOptions);
        return (
            <Fragment>
                <div className={`${clsfix} ${disabled?'disabled':''} ${isMax?'max':''}`}>
                    {
                        typeof title=='string'?<div className={`${clsfix}-panel ${open?'':'close'}`}>
                        <span onClick={this.open}>
                            <span className={`${clsfix}-panel-icon`}>
                                {
                                    open?<Icon type='uf-triangle-down'/>:<Icon type='uf-triangle-right'/>
                                }
                            </span>
                            <span className={`${clsfix}-panel-title`}>
                                {title}
                            </span>
                        </span>
                        {
                            open?<span className={`${clsfix}-panel-btns`}>
                                <ButtonGroup>
                                    <Btns btns={btnsObj} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                </ButtonGroup>
                            </span>:''
                        }
                        
                        </div>:<span className='ac-gridcn-panel-btns'>
                            <ButtonGroup>
                                <Btns btns={btnsObj} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                            </ButtonGroup>
                        </span>
                    }
                    {
                        typeof title=='string'?<div className={`${clsfix}-inner ${open?'show':'hide'} ${isMax?'max':''}`}>
                            <BeeGrid {...gridOptions}/>
                        </div>:<BeeGrid {...gridOptions}/>
                    }
                    </div>
            </Fragment>
        );
    }

    render() {
        return (
            <span>
                {
                    this.state.isMax?ReactDOM.createPortal(this.renderDom(),document.querySelector('body')):this.renderDom()
                }

            </span>
        )
        
    }
}

Grid.defaultProps = defaultProps;
export default Grid;