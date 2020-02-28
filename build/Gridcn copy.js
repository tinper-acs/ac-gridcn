"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeComplexGrid = require("bee-complex-grid");

var _beeComplexGrid2 = _interopRequireDefault(_beeComplexGrid);

var _acBtns = require("ac-btns");

var _acBtns2 = _interopRequireDefault(_acBtns);

var _beeButtonGroup = require("bee-button-group");

var _beeButtonGroup2 = _interopRequireDefault(_beeButtonGroup);

var _lodash = require("lodash.clonedeep");

var _lodash2 = _interopRequireDefault(_lodash);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _acConfirm = require("ac-confirm");

var _acConfirm2 = _interopRequireDefault(_acConfirm);

var _lodash3 = require("lodash.isequal");

var _lodash4 = _interopRequireDefault(_lodash3);

var _TextField = require("./RowField/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _SelectField = require("./RowField/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _NumberField = require("./RowField/NumberField");

var _NumberField2 = _interopRequireDefault(_NumberField);

var _YearField = require("./RowField/YearField");

var _YearField2 = _interopRequireDefault(_YearField);

var _DateField = require("./RowField/DateField");

var _DateField2 = _interopRequireDefault(_DateField);

var _acTips = require("ac-tips");

var _acTips2 = _interopRequireDefault(_acTips);

var _defaultProps = require("./defaultProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
//文本输入组件

//下拉选择组件

//数值选择组件

//年份选择组件

//日期组件


var defaultProps = {
    data: [],
    excludeKeys: [],
    delRow: function delRow() {}, //删除回调
    getSelectedDataFunc: function getSelectedDataFunc() {}, //选中回调
    save: function save() {}, //保存回调
    clsfix: 'ac-gridcn',
    onChange: function onChange() {}, //数据改变回调
    hideSave: false, //是否隐藏保存按钮
    isEdit: false, //是否需要表格编辑
    powerBtns: ['addRow', 'update', 'delRow', 'copyRow', 'export', 'min', 'max', 'cancel', 'save', 'copyToEnd'],
    forcePowerBtns: ['cancel'] //不受按钮权限控制的按钮
};

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props) {
        var _this$state;

        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _initialiseProps.call(_this);

        _this.state = (_this$state = {
            copying: false, //是否正在拷贝
            open: props.defaultOpen != undefined ? props.defaultValue : true, //默认展开收起
            isMax: false, //是否最大化了
            columns: props.columns,
            data: props.data,
            defaultValueKeyValue: {} }, _defineProperty(_this$state, "isMax", false), _defineProperty(_this$state, "selectData", []), _defineProperty(_this$state, "allEditing", false), _defineProperty(_this$state, "adding", false), _defineProperty(_this$state, "addNum", 0), _defineProperty(_this$state, "canExport", false), _this$state);
        _this.oldColumns = props.columns;
        _this.selectList = []; //选中的数据
        _this.allData = []; //表格所有数据
        _this.errors = {};
        _this.selectKeyData = {}; //存select类型字段  key:data(下拉列表)
        return _this;
    }

    /**
     *获取保存的column和table上的属性
     *
     */

    /**
     *
     * 重置grid的columns
     */


    Grid.prototype.componentWillMount = function componentWillMount() {
        this.setColumn(this.props.columns);
        this.setData(this.props.data);
    };

    Grid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && !(0, _lodash4["default"])(nextProps.data, this.state.data)) {
            this.setData(nextProps.data, nextProps.exportData);
        }
        if ('columns' in nextProps && !(0, _lodash4["default"])(nextProps.columns, this.state.columns)) {
            this.selectKeyData = {};
            this.setColumn(this.props.columns);
            this.setData(this.props.data);
        }
    };
    //增行


    //取消新增

    //修改


    //删除行


    //复制行


    //保存数据


    //取消复制

    //粘贴至末行


    //粘贴至此处


    //最大化、最小化


    //修改取消

    //全不选


    //行hover


    //粘贴至此处按钮


    //数据选择回调

    //打开关闭


    //编辑表格导出数据select类型单独处理


    Grid.prototype.render = function render() {
        return _react2["default"].createElement(
            "span",
            null,
            this.state.isMax ? ReactDOM.createPortal(this.renderDom(), document.querySelector('body')) : this.renderDom()
        );
    };

    return Grid;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getColumnsAndTablePros = function () {
        return _this2.grid.getColumnsAndTablePros();
    };

    this.resetColumns = function () {
        _this2.grid.resetColumns(_this2.oldColumns);
    };

    this.exportExcel = function () {
        _this2.grid.exportExcel();
    };

    this.getValue = function (text, props) {
        var renderType = props.renderType,
            fieldProps = props.fieldProps;
        var _fieldProps$data = fieldProps.data,
            data = _fieldProps$data === undefined ? [] : _fieldProps$data,
            defaultValue = fieldProps.defaultValue;

        var value = defaultValue != undefined ? defaultValue : '';
        if (renderType && renderType == 'select') {
            data.forEach(function (item) {
                if (item.value == text) {
                    value = item.key;
                }
            });
        } else {
            value = text;
        }
        return value;
    };

    this.setColumn = function (cl) {
        var columns = (0, _lodash2["default"])(cl);
        var defaultValueKeyValue = {};
        columns.forEach(function (item) {
            var renderType = item.renderType,
                _item$fieldProps = item.fieldProps,
                fieldProps = _item$fieldProps === undefined ? {} : _item$fieldProps,
                dataIndex = item.dataIndex,
                oldRender = item.render,
                component = item.component,
                other = _objectWithoutProperties(item, ["renderType", "fieldProps", "dataIndex", "render", "component"]);

            if (!oldRender) oldRender = function oldRender(text) {
                return text;
            };
            if (renderType) {
                if (fieldProps.defaultValue != undefined) {
                    defaultValueKeyValue[dataIndex] = fieldProps.defaultValue;
                } else {
                    defaultValueKeyValue[dataIndex] = '';
                }
                switch (renderType) {
                    case 'input':
                        item.render = function (text, record, index) {
                            return record._edit ? _react2["default"].createElement(_TextField2["default"], _extends({}, other, {
                                fieldProps: fieldProps,
                                index: index,
                                value: oldRender && oldRender(text, record, index),
                                field: item.dataIndex,
                                onChange: _this2.onChange,
                                status: record._status,
                                onValidate: _this2.onValidate
                            })) : _react2["default"].createElement(
                                "div",
                                null,
                                oldRender && oldRender(text, record, index)
                            );
                        };
                        break;
                    case 'inputNumber':
                        item.render = function (text, record, index) {
                            var value = text;
                            if (fieldProps.precision && fieldProps.precision > 0) {
                                value = typeof text === 'number' ? text.toFixed(fieldProps.precision) : "";
                            }
                            return record._edit ? _react2["default"].createElement(_NumberField2["default"], _extends({}, other, {
                                fieldProps: fieldProps,
                                index: index,
                                value: oldRender && oldRender(text, record, index),
                                field: item.dataIndex,
                                onChange: _this2.onChange,
                                status: record._status,
                                onValidate: _this2.onValidate
                            })) : _react2["default"].createElement(
                                "div",
                                null,
                                oldRender && oldRender(text, record, index)
                            );
                        };
                        break;
                    case 'select':
                        item.render = function (text, record, index) {
                            var value = _this2.getValue(text, item);
                            if (index == 0 && !_this2.selectKeyData[item.dataIndex]) {
                                _this2.selectKeyData[item.dataIndex] = fieldProps.data;
                            }
                            return record._edit ? _react2["default"].createElement(_SelectField2["default"], _extends({}, other, {
                                fieldProps: fieldProps,
                                index: index,
                                value: text + '',
                                field: item.dataIndex,
                                onChange: _this2.onChange,
                                status: record._status,
                                onValidate: _this2.onValidate
                            })) : _react2["default"].createElement(
                                "div",
                                null,
                                oldRender && oldRender(value, record, index)
                            );
                        };
                        break;
                    case 'datepicker':
                        item.render = function (text, record, index) {
                            return record._edit ? _react2["default"].createElement(_DateField2["default"], _extends({}, other, {
                                fieldProps: fieldProps,
                                index: index,
                                value: oldRender && oldRender(text, record, index),
                                field: item.dataIndex,
                                onChange: _this2.onChange,
                                status: record._status,
                                onValidate: _this2.onValidate
                            })) : _react2["default"].createElement(
                                "div",
                                null,
                                oldRender && oldRender(text, record, index)
                            );
                        };
                        break;
                    case 'year':
                        item.render = function (text, record, index) {
                            return record._edit ? _react2["default"].createElement(_YearField2["default"], _extends({}, other, {
                                fieldProps: fieldProps,
                                index: index,
                                value: oldRender && oldRender(text, record, index),
                                field: item.dataIndex,
                                onChange: _this2.onChange,
                                status: record._status,
                                onValidate: _this2.onValidate
                            })) : _react2["default"].createElement(
                                "div",
                                null,
                                oldRender && oldRender(text, record, index)
                            );
                        };
                        break;
                    case 'refer':
                        item.render = function (text, record, index) {
                            var displayName = 'name';
                            if (fieldProps && fieldProps.displayName) name = fieldProps.displayName;
                            var value = oldRender && oldRender(text, record, index);
                            if ((typeof text === "undefined" ? "undefined" : _typeof(text)) == 'object' && !record._edit) {
                                value = oldRender && oldRender(text[displayName], record, index);
                            }
                            return record._edit ? _react2["default"].createElement(
                                "span",
                                null,
                                _react2["default"].cloneElement(component, _extends({}, other, fieldProps, {
                                    index: index,
                                    value: value,
                                    field: item.dataIndex,
                                    onChange: _this2.onChange,
                                    status: record._status,
                                    onValidate: _this2.onValidate
                                }))
                            ) : _react2["default"].createElement(
                                "div",
                                null,
                                value
                            );
                        };
                        break;
                }
            }
        });
        _this2.setState({
            columns: columns,
            defaultValueKeyValue: defaultValueKeyValue
        });
        _this2.oldColumns = columns;
    };

    this.setData = function (da, exportData) {
        var data = (0, _lodash2["default"])(da);
        _this2.setState({
            data: data,
            canExport: false
        }, function () {
            if (exportData && (0, _lodash4["default"])(_this2.props.exportData, exportData)) {} else if (exportData && !(0, _lodash4["default"])(_this2.props.exportData, exportData)) {
                _this2.getExportData(exportData);
            } else if (!exportData) {
                _this2.getExportData(data);
            }
        });
        _this2.allData = data;
    };

    this.onValidate = function (filed, errors, index) {
        var current = _this2.errors[index] || {};
        if (errors) {
            current[filed] = errors[filed][0].message;
        } else {
            delete current[filed];
        }
        if (Object.keys(current).length == 0) {
            delete _this2.errors[index];
        } else {
            _this2.errors[index] = current;
        }
    };

    this.validate = function () {
        if (Object.keys(_this2.errors).length) {
            return _this2.errors;
        } else {
            return null;
        }
    };

    this.onChange = function (field, value, index) {
        if (!(0, _lodash4["default"])(_this2.allData[index][field], value)) {
            _this2.allData[index]._checked = true;
            _this2.allData[index][field] = value;
            var selectList = [];
            _this2.allData.forEach(function (item) {
                if (item._checked) selectList.push(item);
            });
            _this2.setState({
                data: _this2.allData,
                selectData: selectList
            });
            _this2.props.onChange(_this2.allData);
        }
    };

    this.addRow = function () {
        var defaultValueKeyValue = _this2.state.defaultValueKeyValue;
        var data = (0, _lodash2["default"])(_this2.state.data);
        var item = (0, _lodash2["default"])(defaultValueKeyValue);
        item._edit = true;
        item._status = 'edit';
        item._checked = true;
        data.unshift(item);
        var selectList = [];
        data.forEach(function (item) {
            if (item._checked) selectList.push(item);
        });
        _this2.setState({
            data: data,
            adding: true,
            addNum: _this2.state.addNum + 1,
            selectData: selectList
        });
        _this2.allData = data;
        _this2.props.onChange(data);

        if (!_this2.props.exportData) {
            var exportItem = (0, _lodash2["default"])(item);
            for (var attr in _this2.selectKeyData) {
                exportItem[attr] = _this2.getValue(exportItem[attr], {
                    renderType: 'select',
                    fieldProps: {
                        data: _this2.selectKeyData[attr]
                    }
                });
            }
            _this2.exportData.unshift(exportItem);
        }
    };

    this.cancelAdd = function () {
        _acConfirm2["default"].create({
            title: '温馨提示',
            content: '数据未保存，确定离开 ?',
            confirmFn: function confirmFn() {
                var data = (0, _lodash2["default"])(_this2.state.data);
                data.splice(0, _this2.state.addNum);
                if (!_this2.props.exportData) {
                    _this2.exportData.splice(0, _this2.state.addNum);
                }
                _this2.setState({
                    data: data,
                    adding: false,
                    addNum: 0,
                    selectData: []
                });
                _this2.props.onChange(data);
            },
            cancelFn: function cancelFn() {
                // console.log('Cancel');
            }
        });
    };

    this.updateAll = function () {
        var data = (0, _lodash2["default"])(_this2.state.data);
        data.forEach(function (item) {
            item._edit = true; //是否编辑态
            item._status = 'edit'; //是否编辑态，用于显示是否编辑过
            item._checked = false;
        });
        _this2.setState({
            data: data,
            allEditing: true,
            selectData: []
        });
        // this.props.onChange(data)
        _this2.allData = data;
    };

    this.delRow = function () {
        if (_this2.selectList.length <= 0) {
            _acTips2["default"].create({
                type: 'warning',
                content: "请先选择数据"
            });
        } else {
            _acConfirm2["default"].create({
                title: '温馨提示',
                content: '单据删除后将不能恢复。',
                confirmFn: function confirmFn() {
                    _this2.props.delRow(_this2.selectList);
                },
                cancelFn: function cancelFn() {
                    // console.log('Cancel');
                }
            });
        }
    };

    this.copyRow = function () {
        if (_this2.selectList.length <= 0) {
            _acTips2["default"].create({
                type: 'warning',
                content: "请先选择数据"
            });
        } else {
            var copyData = [];
            var data = (0, _lodash2["default"])(_this2.state.data);
            data.forEach(function (item) {
                if (item._checked) copyData.push(item);
            });
            _this2.setState({
                copying: true,
                selectData: copyData
            });
        }
    };

    this.save = function () {
        var selectList = [];
        _this2.allData.forEach(function (item) {
            if (item._checked) selectList.push(item);
        });
        if (selectList.length <= 0) {
            _acTips2["default"].create({
                type: 'warning',
                content: "请先选择数据"
            });
        } else if (_this2.validate()) {
            _acTips2["default"].create({
                type: 'warning',
                content: "数据校验失败"
            });
            console.log(_this2.errors);
        } else {
            var data = (0, _lodash2["default"])(_this2.state.data);
            data.forEach(function (item) {
                item._edit = false; //是否编辑态
                item._status = ''; //是否编辑态，用于显示是否编辑过
                item._checked = false;
            });
            _this2.setState({
                data: data,
                adding: false,
                allEditing: false,
                selectData: []
            });
            // this.props.onChange(data)
            _this2.allData = data;
            _this2.props.save(selectList);
        }
    };

    this.cancelCopy = function () {
        _this2.setState({
            copying: false,
            selectData: []
        });
    };

    this.copyToEnd = function () {
        var data = _this2.state.data;

        var selectData = _this2.selectList;
        selectData.forEach(function (item, index) {
            _this2.props.excludeKeys.forEach(function (it) {
                delete item[it];
            });
            if (!_this2.props.exportData) {
                var exportItem = (0, _lodash2["default"])(item);
                for (var attr in _this2.selectKeyData) {
                    exportItem[attr] = _this2.getValue(exportItem[attr], {
                        renderType: 'select',
                        fieldProps: {
                            data: _this2.selectKeyData[attr]
                        }
                    });
                }
                _this2.exportData.push(exportItem);
            }
        });
        data = data.concat(selectData);
        data = _this2.resetChecked(data);
        _this2.setState({
            data: data,
            copying: false
        });
        _this2.props.onChange(data);
        _this2.allData = data;
    };

    this.copyToHere = function () {
        var _data;

        var index = _this2.currentIndex;
        var data = (0, _lodash2["default"])(_this2.state.data);
        var selectData = _this2.selectList;
        selectData.forEach(function (item, index) {
            _this2.props.excludeKeys.forEach(function (it) {
                delete item[it];
            });
            if (!_this2.props.exportData) {
                var exportItem = (0, _lodash2["default"])(item);
                for (var attr in _this2.selectKeyData) {
                    exportItem[attr] = _this2.getValue(exportItem[attr], {
                        renderType: 'select',
                        fieldProps: {
                            data: _this2.selectKeyData[attr]
                        }
                    });
                }
                _this2.exportData.splice(index, 0, exportItem);
            }
        });
        (_data = data).splice.apply(_data, [index, 0].concat(_toConsumableArray(selectData)));
        data = _this2.resetChecked(data);
        _this2.setState({
            data: data,
            copying: false
        });
        _this2.props.onChange(data);
        _this2.allData = data;
    };

    this.max = function () {
        _this2.setState({
            isMax: !_this2.state.isMax
        });
    };

    this.cancelEdit = function () {
        _acConfirm2["default"].create({
            title: '温馨提示',
            content: '数据未保存，确定离开 ?',
            confirmFn: function confirmFn() {
                var data = (0, _lodash2["default"])(_this2.state.data);
                data.forEach(function (item) {
                    item._edit = false; //是否编辑态
                    item._status = ''; //是否编辑态，用于显示是否编辑过
                    item._checked = false;
                });
                _this2.setState({
                    data: data,
                    allEditing: false,
                    selectData: []
                });
                // this.props.onChange(data)
                _this2.allData = data;
            },
            cancelFn: function cancelFn() {
                // console.log('Cancel');
            }
        });
    };

    this.resetChecked = function (dataValue) {
        var data = (0, _lodash2["default"])(dataValue);
        data.forEach(function (item, index) {
            item._checked = false;
        });
        // this.props.onChange(data)
        return data;
    };

    this.onRowHover = function (index, record) {
        _this2.currentIndex = index;
    };

    this.hoverContent = function () {
        if (_this2.state.copying) {
            return _react2["default"].createElement(
                "span",
                { onClick: _this2.copyToHere, className: "copy-to-here" },
                "\u7C98\u8D34\u81F3\u6B64"
            );
        } else {
            return '';
        }
    };

    this.getSelectedDataFunc = function (selectList, record, index, newData) {
        _this2.selectList = selectList;
        var data = (0, _lodash2["default"])(_this2.state.data);
        if (index != undefined) {
            data[index]['_checked'] = !data[index]['_checked'];
        } else {
            //点击了全选
            if (selectList.length > 0) {
                //全选
                data.map(function (item) {
                    if (!item['_disabled']) {
                        item['_checked'] = true;
                    }
                });
            } else {
                //反选
                data.map(function (item) {
                    if (!item['_disabled']) {
                        item['_checked'] = false;
                    }
                });
            }
        }
        _this2.setState({
            data: data,
            selectData: selectList
        });
        _this2.allData = data;
        _this2.props.getSelectedDataFunc(selectList, record, index, newData);
    };

    this.open = function () {
        _this2.setState({
            open: !_this2.state.open
        });
    };

    this.getExportData = function (data) {
        var exportData = (0, _lodash2["default"])(data);
        exportData.forEach(function (item) {
            for (var attr in _this2.selectKeyData) {
                item[attr] = _this2.getValue(item[attr], {
                    renderType: 'select',
                    fieldProps: {
                        data: _this2.selectKeyData[attr]
                    }
                });
            }
        });
        _this2.exportData = exportData;
        _this2.setState({
            canExport: true
        });
    };

    this.renderDom = function () {
        var _state = _this2.state,
            copying = _state.copying,
            isMax = _state.isMax,
            columns = _state.columns,
            data = _state.data,
            allEditing = _state.allEditing,
            adding = _state.adding,
            open = _state.open,
            selectData = _state.selectData,
            canExport = _state.canExport;

        var _props = _this2.props,
            clsfix = _props.clsfix,
            paginationObj = _props.paginationObj,
            exportData = _props.exportData,
            disabled = _props.disabled,
            title = _props.title,
            hideSave = _props.hideSave,
            isEdit = _props.isEdit,
            powerBtns = _props.powerBtns,
            forcePowerBtns = _props.forcePowerBtns,
            otherProps = _objectWithoutProperties(_props, ["clsfix", "paginationObj", "exportData", "disabled", "title", "hideSave", "isEdit", "powerBtns", "forcePowerBtns"]);

        var _paginationObj = 'none';
        if (paginationObj != 'none') {
            _paginationObj = _extends({}, _defaultProps.paginationDefaultProps, paginationObj);
            _paginationObj.disabled = paginationObj.disabled !== undefined ? paginationObj.disabled : data.length === 0 || allEditing || copying || adding;

            if (data.length === 0 || allEditing || copying || adding) {
                _paginationObj.disabled = true;
            }
        }
        var btnsObj = {};
        btnsObj = {
            addRow: {
                onClick: _this2.addRow,
                disabled: disabled
            },
            update: {
                onClick: _this2.updateAll,
                disabled: disabled
            },
            delRow: {
                onClick: _this2.delRow,
                disabled: selectData.length == 0 || disabled
            },
            copyRow: {
                onClick: _this2.copyRow,
                disabled: selectData.length == 0 || disabled
            },
            "export": {
                onClick: function onClick() {
                    _this2.grid.exportExcel();
                },
                disabled: !canExport || disabled
            },
            min: {
                onClick: _this2.max
            }
        };
        if (!isMax) {
            delete btnsObj.min;
            btnsObj.max = {
                onClick: _this2.max
            };
        }
        if (allEditing) {
            btnsObj.cancel = {
                onClick: _this2.cancelEdit
            };
            if (!hideSave) {
                btnsObj.save = {
                    onClick: _this2.save,
                    disabled: selectData.length == 0 || disabled
                };
            }
        } else if (adding) {
            btnsObj.cancel = {
                onClick: _this2.cancelAdd
            };
            if (!hideSave) {
                btnsObj.save = {
                    onClick: _this2.save,
                    disabled: selectData.length == 0 || disabled
                };
            }
        } else if (copying) {
            btnsObj = {
                copyToEnd: {
                    onClick: _this2.copyToEnd
                },
                cancel: {
                    onClick: _this2.cancelCopy
                }
            };
        }
        var gridOptions = _extends({
            syncHover: false,
            autoCheckedByClickRows: false,
            multiSelect: { type: "checkbox" },
            showFilterMenu: false
        }, otherProps, {
            data: data,
            columns: columns,
            exportData: _this2.exportData,
            paginationObj: _paginationObj,
            ref: function ref(el) {
                return _this2.grid = el;
            },
            hoverContent: _this2.hoverContent,
            getSelectedDataFunc: _this2.getSelectedDataFunc,
            onRowHover: _this2.onRowHover

        });
        gridOptions = _extends(_defaultProps.gridDefalutProps, gridOptions);
        return _react2["default"].createElement(
            _react.Fragment,
            null,
            _react2["default"].createElement(
                "div",
                { className: clsfix + " " + (disabled ? 'disabled' : '') + " " + (isMax ? 'max' : '') },
                typeof title == 'string' ? _react2["default"].createElement(
                    "div",
                    { className: clsfix + "-panel " + (open ? '' : 'close') },
                    _react2["default"].createElement(
                        "span",
                        { onClick: _this2.open },
                        _react2["default"].createElement(
                            "span",
                            { className: clsfix + "-panel-icon" },
                            open ? _react2["default"].createElement(_beeIcon2["default"], { type: "uf-triangle-down" }) : _react2["default"].createElement(_beeIcon2["default"], { type: "uf-triangle-right" })
                        ),
                        _react2["default"].createElement(
                            "span",
                            { className: clsfix + "-panel-title" },
                            title
                        )
                    ),
                    open ? _react2["default"].createElement(
                        "span",
                        { className: clsfix + "-panel-btns" },
                        _react2["default"].createElement(
                            _beeButtonGroup2["default"],
                            null,
                            _react2["default"].createElement(_acBtns2["default"], { btns: btnsObj, powerBtns: powerBtns, forcePowerBtns: forcePowerBtns })
                        )
                    ) : ''
                ) : _react2["default"].createElement(
                    "span",
                    { className: "ac-gridcn-panel-btns" },
                    _react2["default"].createElement(
                        _beeButtonGroup2["default"],
                        null,
                        _react2["default"].createElement(_acBtns2["default"], { btns: btnsObj, powerBtns: powerBtns, forcePowerBtns: forcePowerBtns })
                    )
                ),
                typeof title == 'string' ? _react2["default"].createElement(
                    "div",
                    { className: clsfix + "-inner " + (open ? 'show' : 'hide') + " " + (isMax ? 'max' : '') },
                    _react2["default"].createElement(_beeComplexGrid2["default"], gridOptions)
                ) : _react2["default"].createElement(_beeComplexGrid2["default"], gridOptions)
            )
        );
    };
};

Grid.defaultProps = defaultProps;
exports["default"] = Grid;
module.exports = exports["default"];