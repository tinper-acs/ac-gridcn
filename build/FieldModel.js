'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeModal = require('bee-modal');

var _beeModal2 = _interopRequireDefault(_beeModal);

var _acBtns = require('ac-btns');

var _acBtns2 = _interopRequireDefault(_acBtns);

var _beeForm = require('bee-form');

var _beeForm2 = _interopRequireDefault(_beeForm);

var _beeLabel = require('bee-label');

var _beeLabel2 = _interopRequireDefault(_beeLabel);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeLayout = require('bee-layout');

var _beeSelect = require('bee-select');

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _beeDatepicker = require('bee-datepicker');

var _beeDatepicker2 = _interopRequireDefault(_beeDatepicker);

var _zh_CN = require('bee-datepicker/build/locale/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _beeInputNumber = require('bee-input-number');

var _beeInputNumber2 = _interopRequireDefault(_beeInputNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
//本地化日期


//变量结构
var YearPicker = _beeDatepicker2["default"].YearPicker;


var FormItem = _beeForm2["default"].FormItem;

var defaultProps = {
  show: false,
  title: '标题',
  context: null,
  style: null,
  cancel: null,
  columns: null,
  itemDate: null,
  rowFieldRow: 6
};

var FieldModel = function (_Component) {
  _inherits(FieldModel, _Component);

  function FieldModel(props) {
    _classCallCheck(this, FieldModel);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.close = function () {
      _this.props.cancel && _this.props.cancel();
    };

    _this.onChange = function (_field, _data) {
      _this.props.form.setFieldsValue(_defineProperty({}, _field, _data), function () {
        // this.setState({value:_field})
        _this.setState({ value: _data });
      });
    };

    _this.state = {
      show: props.show,
      value: ''
    };

    _this.btns = {
      confirm: {
        onClick: function onClick(e) {
          e.preventDefault();
          _this.props.form.validateFields(function (err, values) {
            if (err) {
              console.log('form validate is error !', values);
            } else {
              _this.props.cancel && _this.props.cancel(values);
            }
          });
        }
      }, cancel: {
        onClick: function onClick() {
          _this.props.cancel && _this.props.cancel(null);
        }
      }
    };
    return _this;
  }

  FieldModel.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        show = _props.show,
        title = _props.title,
        btns = _props.btns,
        itemDate = _props.itemDate,
        rowFieldRow = _props.rowFieldRow,
        clsfix = _props.clsfix,
        rowFieldDialog = _props.rowFieldDialog,
        other = _objectWithoutProperties(_props, ['show', 'title', 'btns', 'itemDate', 'rowFieldRow', 'clsfix', 'rowFieldDialog']);

    var _props$form = this.props.form,
        getFieldProps = _props$form.getFieldProps,
        getFieldError = _props$form.getFieldError;
    var value = this.state.value;

    return _react2["default"].createElement(
      'div',
      { id: 'refer_field' },
      _react2["default"].createElement(
        _beeModal2["default"],
        _extends({
          show: show,
          onHide: this.close,
          dialogClassName: clsfix + '-field-model',
          style: { minWidth: 850 }
        }, rowFieldDialog),
        _react2["default"].createElement(
          _beeModal2["default"].Header,
          null,
          _react2["default"].createElement(
            _beeModal2["default"].Title,
            null,
            title
          )
        ),
        _react2["default"].createElement(
          _beeModal2["default"].Body,
          null,
          _react2["default"].createElement(
            _beeLayout.Row,
            null,
            this.props.columns.map(function (da) {
              var comp = _react2["default"].createElement(
                'div',
                { className: 'u-form-control disable-text' },
                itemDate[da.key]
              );
              switch (da.renderType) {
                case 'input':
                  comp = _react2["default"].createElement(_beeFormControl2["default"], _extends({ placeholder: '\u8BF7\u8F93\u5165' + da.title
                  }, getFieldProps(da.key, {
                    validateTrigger: 'onBlur',
                    initialValue: itemDate[da.key],
                    rules: [{
                      required: da.required, message: _react2["default"].createElement(
                        'span',
                        null,
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t' }),
                        _react2["default"].createElement(
                          'span',
                          null,
                          '\u8BF7\u8F93\u5165' + da.title
                        )
                      )
                    }]
                  })));
                  break;
                case 'inputNumber':
                  comp = _react2["default"].createElement(_beeInputNumber2["default"], _extends({
                    size: 'sm',
                    iconStyle: 'one'
                  }, getFieldProps(da.key, {
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: da.required, message: _react2["default"].createElement(
                        'span',
                        null,
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t' }),
                        _react2["default"].createElement(
                          'span',
                          null,
                          '\u8BF7\u8F93\u5165' + da.title
                        )
                      )
                    }]
                  })));

                  break;
                case 'select':
                  comp = _react2["default"].createElement(_beeSelect2["default"], _extends({
                    className: da.className,
                    data: da.fieldProps.data
                  }, getFieldProps(da.key, {
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: da.required, message: _react2["default"].createElement(
                        'span',
                        null,
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t' }),
                        _react2["default"].createElement(
                          'span',
                          null,
                          '\u8BF7\u8F93\u5165' + da.title
                        )
                      )
                    }]
                  })));
                  break;
                case 'datepicker':
                  comp = _react2["default"].createElement(_beeDatepicker2["default"], _extends({
                    format: 'YYYY-MM-DD',
                    locale: _zh_CN2["default"],
                    placeholder: '\u9009\u62E9\u65E5\u671F',
                    className: da.className,
                    getCalendarContainer: function getCalendarContainer(trigger) {
                      return trigger.parentNode;
                    }
                  }, getFieldProps(da.key, {
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: da.required, message: _react2["default"].createElement(
                        'span',
                        null,
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t' }),
                        _react2["default"].createElement(
                          'span',
                          null,
                          '\u8BF7\u8F93\u5165' + da.title
                        )
                      )
                    }]
                  })));
                  break;
                case 'year':
                  comp = _react2["default"].createElement(YearPicker, _extends({
                    format: 'YYYY',
                    locale: _zh_CN2["default"],
                    placeholder: "选择年",
                    getCalendarContainer: function getCalendarContainer(trigger) {
                      return trigger.parentNode;
                    }
                  }, getFieldProps(da.key, {
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: da.required, message: _react2["default"].createElement(
                        'span',
                        null,
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t' }),
                        _react2["default"].createElement(
                          'span',
                          null,
                          '\u8BF7\u8F93\u5165' + da.title
                        )
                      )
                    }]
                  })));
                  break;
                case 'refer':
                  comp = _react2["default"].cloneElement(da.component, _extends({}, da.fieldProps, {
                    field: da.dataIndex,
                    value: value,
                    // container:()=>{return document.getElementById('field_model');},
                    onChange: _this2.onChange,
                    getFieldProps: getFieldProps(da.key, {
                      validateTrigger: 'onBlur',
                      initialValue: itemDate[da.key],
                      rules: [{
                        required: da.required, message: _react2["default"].createElement('span', null, _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t' }), _react2["default"].createElement('span', null, '\u8BF7\u8F93\u5165' + da.title))
                      }]
                    })
                  }));
                  break;
              }
              return _react2["default"].createElement(
                _beeLayout.Col,
                { md: rowFieldRow, xs: rowFieldRow, sm: rowFieldRow },
                _react2["default"].createElement(
                  _beeForm2["default"],
                  { className: 'form-item' },
                  _react2["default"].createElement(
                    FormItem,
                    null,
                    _react2["default"].createElement(
                      'div',
                      { className: 'input', id: 'field_model' },
                      _react2["default"].createElement(
                        _beeLabel2["default"],
                        null,
                        da.required ? _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-mi', className: 'mast' }) : null,
                        da.title
                      ),
                      comp
                    ),
                    _react2["default"].createElement(
                      'span',
                      { className: 'error' },
                      getFieldError(da.key)
                    )
                  )
                )
              );
            })
          )
        ),
        _react2["default"].createElement(
          _beeModal2["default"].Footer,
          { className: 'text-center' },
          _react2["default"].createElement(_acBtns2["default"], { btns: btns ? btns : this.btns })
        )
      )
    );
  };

  return FieldModel;
}(_react.Component);

FieldModel.propTypes = {
  form: _beeForm2["default"].formShape
};


FieldModel.defaultProps = defaultProps;
exports["default"] = _beeForm2["default"].createForm()(FieldModel);
module.exports = exports['default'];