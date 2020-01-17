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
    data: []
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
        }
        this.oldColumns = props.columns;
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
        columns.forEach(item => {
            let {
                renderType,//渲染类型 input/inputNumber/select/datepicker/year
                fieldProps={},//传给`field`的属性
                // customizeRender,//自定义render
                dataIndex,
                ...other
            } = item;
            // if(customizeRender){
            //     item.render=(text,record,index)=>{
                    
            //     }
            // }
            if(renderType){
                switch(renderType){
                    case 'input':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<TextField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {text}
                                    field = {item.dataIndex}
                                />:<div>{text}</div>
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
                                    value = {value}
                                    field = {item.dataIndex}
                                />:<div>{text}</div>
                            )
                        }
                    break;
                    case 'select':
                        item.render=(text,record,index)=>{
                            let selectList = fieldProps.data;
                            let selected = selectList.find(item => item.value === value);
                            let value = selected ? selected.key : '';
                            return (
                                record._edit?<SelectField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {value}
                                    field = {item.dataIndex}
                                />:<div>{text}</div>
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
                                    value = {text}
                                    field = {item.dataIndex}
                                />:<div>{text}</div>
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
                                    value = {text}
                                    field = {item.dataIndex}
                                />:<div>{text}</div>
                            )
                        }
                    break;
                }
            }
        });
        this.setState({
            columns
        })
        this.oldColumns = columns;
    }
    setData=(da)=>{
        let data = cloneDeep(da);
        data.forEach((item,index)=>{
            if(index%2>0){
                item._edit = true;
            }else{
                item._edit = false;
            }
        })
        this.setState({
            data
        })
    }

    render() {
        let { copying,isMax,columns,data } = this.state;
        const { paginationObj, exportData,disabled,  ...otherProps } = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        _paginationObj.disabled = paginationObj.disabled !== undefined
            ? paginationObj.disabled
            : data.length === 0;
        let _exportData = exportData || data;
        let btnsObj = {}
        
        if(isMax){
            btnsObj= {
                addRow:{
                    onClick:this.addRow,
                    disabled:disabled
                },
                delRow:{
                    onClick:this.delRow,
                    disabled:this.state.selectData==0||disabled
                },
                copyRow:{
                    onClick:this.copyRow,
                    disabled:this.state.selectData==0||disabled
                },
                min:{
                    onClick:this.max
                }
            }
        }else{
            btnsObj= {
                addRow:{
                    onClick:this.addRow,
                    disabled:disabled
                },
                delRow:{
                    onClick:this.delRow,
                    disabled:this.state.selectData==0||disabled
                },
                copyRow:{
                    onClick:this.copyRow,
                    disabled:this.state.selectData==0||disabled
                },
                max:{
                    onClick:this.max
                }
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
        return (
            <div className='demo-grid-wrapper'>
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
                />
            </div>
        );
    }
}

Grid.defaultProps = defaultProps;
export default Grid;