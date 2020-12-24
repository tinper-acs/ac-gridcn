import React, { Component } from 'react';
import Modal from 'bee-modal';
import Btns from 'ac-btns';
import Form from 'bee-form';
import Label from 'bee-label';
import FormControl from 'bee-form-control';
import Icon from 'bee-icon';
import { Col, Row } from 'bee-layout';
import Select from 'bee-select';
import DatePicker from 'bee-datepicker';
//本地化日期
import zhCN from "bee-datepicker/build/locale/zh_CN";
//变量结构
const { YearPicker } = DatePicker;

import InputNumber from 'bee-input-number';

const FormItem = Form.FormItem;

const defaultProps = {
  show: false,
  title: '标题',
  context: null,
  style: null,
  cancel:null,
  columns:null,
  itemDate:null,
  rowFieldRow:6
};

class FieldModel extends Component {
  static propTypes = {
    form: Form.formShape,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      value:''
    };
    
    this.btns = {
      confirm: {
        onClick: (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
              if (err) {
                  console.log('form validate is error !', values);
              } else {
                  this.props.cancel && this.props.cancel(values)
              }
          });
        }
      }, cancel: {
        onClick: () => {
          this.props.cancel && this.props.cancel(null)
        }
      },
    }
  }

  close = ()=> {
    this.props.cancel && this.props.cancel();
  }

  onChange=(_field,_data)=>{
      this.props.form.setFieldsValue({
        [_field]:_data
      }, () => {
        // this.setState({value:_field})
        this.setState({value:_data})
      });
  }

  render() {
    const {show, title, btns,itemDate ,rowFieldRow,clsfix,rowFieldDialog, ...other } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;
    const { value } = this.state;
    return (<div id='refer_field'>
      <Modal
        show={show}
        onHide={this.close}
        dialogClassName={`${clsfix}-field-model`}
        style={{ minWidth: 850 }}
        {...rowFieldDialog}
        // container={t=>{
        //   console.log(" ==== ",t);
        //   return document.getElementById('field_model');
        // }}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {
              this.props.columns.map(da=>{
              let comp = <div className='u-form-control disable-text'>{itemDate[da.key]}</div>;
                  switch(da.renderType){
                      case 'input':
                        comp = <FormControl placeholder={`请输入${da.title}`}
                            {...getFieldProps(da.key, {
                                validateTrigger: 'onBlur',
                                initialValue:itemDate[da.key],
                                rules: [{
                                    required: da.required, message: <span><Icon type="uf-exc-t"></Icon><span>{`请输入${da.title}`}</span></span>,
                                }],
                            }) }
                        />
                      break;
                    case 'inputNumber':
                      comp = <InputNumber 
                          size='sm'
                          iconStyle="one"
                          {...getFieldProps(da.key, {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: da.required, message: <span><Icon type="uf-exc-t"></Icon><span>{`请输入${da.title}`}</span></span>,
                            }],
                        }) }
                      />
                      
                      break;
                    case 'select':
                      comp = <Select
                          className={da.className}
                          data={da.fieldProps.data}
                          {...getFieldProps(da.key, {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: da.required, message: <span><Icon type="uf-exc-t"></Icon><span>{`请输入${da.title}`}</span></span>,
                            }],
                        }) }
                      >
                      </Select>
                      break;
                    case 'datepicker':
                      comp = <DatePicker
                        format={'YYYY-MM-DD'}
                        locale={zhCN}
                        placeholder='选择日期'
                        className={da.className}
                        getCalendarContainer={trigger => trigger.parentNode} 
                        {...getFieldProps(da.key, {
                          validateTrigger: 'onBlur',
                          rules: [{
                              required: da.required, message: <span><Icon type="uf-exc-t"></Icon><span>{`请输入${da.title}`}</span></span>,
                          }],
                        }) }
                      />
                      break;
                    case 'year':
                      comp = <YearPicker
                          format={'YYYY'}
                          locale={zhCN}
                          placeholder={"选择年"}
                          getCalendarContainer={trigger => trigger.parentNode} 
                          {...getFieldProps(da.key, {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: da.required, message: <span><Icon type="uf-exc-t"></Icon><span>{`请输入${da.title}`}</span></span>,
                            }],
                          }) }
                      /> 
                      break;
                    case 'refer':
                      comp = React.cloneElement(da.component,{ 
                          ...da.fieldProps, 
                          field :da.dataIndex,
                          value,
                          // container:()=>{return document.getElementById('field_model');},
                          onChange :this.onChange,
                          getFieldProps:getFieldProps(da.key, {
                            validateTrigger: 'onBlur',
                            initialValue:itemDate[da.key],
                            rules: [{
                              required: da.required, message: React.createElement(
                                'span',
                                null,
                                React.createElement(Icon, { type: 'uf-exc-t' }),
                                React.createElement(
                                  'span',
                                  null,
                                  '\u8BF7\u8F93\u5165' + da.title
                                )
                              )
                            }]
                          })
                      })
                      break;
                  }
                  return (<Col md={rowFieldRow} xs={rowFieldRow} sm={rowFieldRow}>
                    <Form className='form-item'>
                      <FormItem>
                          <div className='input' id='field_model'>
                          <Label>{da.required?<Icon type="uf-mi" className='mast'/>:null}{da.title}</Label>
                            {comp}
                          </div>
                          <span className='error'>
                              {getFieldError(da.key)}
                          </span>
                      </FormItem>
                    </Form>
                  </Col>)
              })
            }
          </Row>
        </Modal.Body>
        <Modal.Footer className="text-center">
          <Btns btns = {btns?btns:this.btns} />
        </Modal.Footer>
      </Modal>
    </div>)
  }
}

FieldModel.defaultProps = defaultProps;
export default Form.createForm()(FieldModel);

