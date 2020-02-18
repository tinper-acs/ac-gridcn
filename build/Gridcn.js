"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _lodash3 = require("lodash.isequal");

var _lodash4 = _interopRequireDefault(_lodash3);

var _beeModal = require("bee-modal");

var _beeModal2 = _interopRequireDefault(_beeModal);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
//文本输入组件

//下拉选择组件

//数值选择组件

//年份选择组件

//日期组件


var defualtPaginationParam = {
    dataNumSelect: ["5", "10", "15", "20", "25", "50", "All"],
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    dataNum: 4,
    btnType: {
        shape: 'border'
    },
    noBorder: true,
    confirmBtn: function confirmBtn() {
        return null;
    }
};
var defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
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
        var _this$state2;

        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getColumnsAndTablePros = function () {
            return _this.grid.getColumnsAndTablePros();
        };

        _this.resetColumns = function () {
            _this.grid.resetColumns(_this.oldColumns);
        };

        _this.exportExcel = function () {
            _this.grid.exportExcel();
        };

        _this.setColumn = function (cl) {
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
                // if(customizeRender){
                //     item.render=(text,record,index)=>{

                //     }
                // }


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
                                    onChange: _this.onChange,
                                    status: record._status,
                                    onValidate: _this.onValidate
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
                                    onChange: _this.onChange,
                                    status: record._status,
                                    onValidate: _this.onValidate
                                })) : _react2["default"].createElement(
                                    "div",
                                    null,
                                    oldRender && oldRender(text, record, index)
                                );
                            };
                            break;
                        case 'select':
                            item.render = function (text, record, index) {
                                var selectList = fieldProps.data || [];
                                var selected = selectList.find(function (it) {
                                    return it.key === text;
                                });
                                var value = selected ? selected.value : '';
                                return record._edit ? _react2["default"].createElement(_SelectField2["default"], _extends({}, other, {
                                    fieldProps: fieldProps,
                                    index: index,
                                    value: value,
                                    field: item.dataIndex,
                                    onChange: _this.onChange,
                                    status: record._status,
                                    onValidate: _this.onValidate
                                })) : _react2["default"].createElement(
                                    "div",
                                    null,
                                    oldRender && oldRender(text, record, index)
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
                                    onChange: _this.onChange,
                                    status: record._status,
                                    onValidate: _this.onValidate
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
                                    onChange: _this.onChange,
                                    status: record._status,
                                    onValidate: _this.onValidate
                                })) : _react2["default"].createElement(
                                    "div",
                                    null,
                                    oldRender && oldRender(text, record, index)
                                );
                            };
                            break;
                        case 'refer':
                            item.render = function (text, record, index) {
                                return record._edit ? _react2["default"].createElement(
                                    "span",
                                    null,
                                    _react2["default"].cloneElement(component, _extends({}, other, fieldProps, {
                                        index: index,
                                        value: oldRender && oldRender(text, record, index),
                                        field: item.dataIndex,
                                        onChange: _this.onChange,
                                        status: record._status,
                                        onValidate: _this.onValidate
                                    }))
                                ) : _react2["default"].createElement(
                                    "div",
                                    null,
                                    oldRender && oldRender(text, record, index)
                                );
                            };
                            break;
                    }
                }
            });
            _this.setState({
                columns: columns,
                defaultValueKeyValue: defaultValueKeyValue
            });
            _this.oldColumns = columns;
        };

        _this.setData = function (da) {
            var data = (0, _lodash2["default"])(da);
            // data.forEach((item,index)=>{

            // })
            _this.setState({
                data: data
            });
            _this.allData = data;
        };

        _this.onValidate = function (filed, errors, index) {
            var current = _this.errors[index] || {};
            if (errors) {
                current[filed] = errors[filed][0].message;
            } else {
                delete current[filed];
            }
            if (Object.keys(current).length == 0) {
                delete _this.errors[index];
            } else {
                _this.errors[index] = current;
            }
        };

        _this.validate = function () {
            if (Object.keys(_this.errors).length) {
                return _this.errors;
            } else {
                return null;
            }
        };

        _this.onChange = function (field, value, index) {
            _this.allData[index][field] = value;
            // this.setState({
            //     data:this.allData
            // })
            _this.props.onChange(_this.allData);
        };

        _this.addRow = function () {
            var defaultValueKeyValue = _this.state.defaultValueKeyValue;
            var data = (0, _lodash2["default"])(_this.state.data);
            var item = (0, _lodash2["default"])(data[0] || defaultValueKeyValue);
            _this.props.excludeKeys.forEach(function (it) {
                delete item[it];
            });
            for (var attr in item) {
                if (defaultValueKeyValue[attr]) {
                    item[attr] = defaultValueKeyValue[attr];
                } else {
                    item[attr] = '';
                }
            }
            item._edit = true;
            item._status = 'edit';
            data.unshift(item);
            _this.setState({
                data: data,
                adding: true
            });
            _this.allData = data;
        };

        _this.cancelAdd = function () {
            var data = (0, _lodash2["default"])(_this.state.data);
            data.pop();
            _this.setState({
                data: data,
                adding: false
            });
        };

        _this.updateAll = function () {
            var data = (0, _lodash2["default"])(_this.state.data);
            data.forEach(function (item) {
                item._edit = true; //是否编辑态
                item._status = 'edit'; //是否编辑态，用于显示是否编辑过
                item._checked = false;
            });
            _this.setState({
                data: data,
                allEditing: true
            });
            _this.allData = data;
        };

        _this.delRow = function () {
            if (_this.selectList.length <= 0) {
                _acTips2["default"].create({
                    type: 'warning',
                    content: "请先选择数据"
                });
            } else {
                _beeModal2["default"].confirm({
                    title: '确定要删除这条单据吗？',
                    content: '单据删除后将不能恢复。',
                    onOk: function onOk() {
                        _this.props.delRow(_this.selectList);
                    },
                    onCancel: function onCancel() {
                        console.log('Cancel');
                    }
                });
            }
        };

        _this.copyRow = function () {
            if (_this.selectList.length <= 0) {
                _acTips2["default"].create({
                    type: 'warning',
                    content: "请先选择数据"
                });
            } else {
                var copyData = [];
                var data = (0, _lodash2["default"])(_this.state.data);
                data.forEach(function (item) {
                    if (item._checked) copyData.push(item);
                });
                _this.setState({
                    copying: true,
                    selectData: copyData
                });
                _this.allData = data;
            }
        };

        _this.save = function () {
            console.log(_this.allData);
            var selectList = [];
            _this.allData.forEach(function (item) {
                if (item._checked) selectList.push(item);
            });
            if (selectList.length <= 0) {
                _acTips2["default"].create({
                    type: 'warning',
                    content: "请先选择数据"
                });
            } else if (_this.validate()) {
                _acTips2["default"].create({
                    type: 'warning',
                    content: "数据校验失败"
                });
                console.log(_this.errors);
            } else {
                _this.cancelEdit();
                _this.props.save(selectList);
            }
        };

        _this.cancelCopy = function () {
            _this.setState({
                copying: false,
                selectData: []
            });
        };

        _this.copyToEnd = function () {
            var data = _this.state.data;

            var selectData = _this.selectList;
            selectData.forEach(function (item, index) {
                _this.props.excludeKeys.forEach(function (it) {
                    delete item[it];
                });
            });
            data = data.concat(selectData);
            data = _this.resetChecked(data);
            _this.setState({
                data: data,
                copying: false
            });
            _this.allData = data;
        };

        _this.copyToHere = function () {
            var _data;

            var index = _this.currentIndex;
            var data = (0, _lodash2["default"])(_this.state.data);
            var selectData = _this.selectList;
            selectData.forEach(function (item, index) {
                _this.props.excludeKeys.forEach(function (it) {
                    delete item[it];
                });
            });
            (_data = data).splice.apply(_data, [index, 0].concat(_toConsumableArray(selectData)));
            data = _this.resetChecked(data);
            _this.setState({
                data: data,
                copying: false
            });
            _this.allData = data;
        };

        _this.max = function () {
            _this.setState({
                isMax: !_this.state.isMax
            });
        };

        _this.cancelEdit = function () {
            var data = (0, _lodash2["default"])(_this.state.data);
            data.forEach(function (item) {
                item._edit = false; //是否编辑态
                item._status = ''; //是否编辑态，用于显示是否编辑过
                item._checked = false;
            });
            _this.setState({
                data: data,
                allEditing: false
            });
            _this.allData = data;
        };

        _this.resetChecked = function (dataValue) {
            var data = (0, _lodash2["default"])(dataValue);
            data.forEach(function (item, index) {
                item._checked = false;
            });
            return data;
        };

        _this.onRowHover = function (index, record) {
            _this.currentIndex = index;
        };

        _this.hoverContent = function () {
            if (_this.state.copying) {
                return _react2["default"].createElement(
                    "span",
                    { onClick: _this.copyToHere, className: "copy-to-here" },
                    "\u7C98\u8D34\u81F3\u6B64"
                );
            } else {
                return '';
            }
        };

        _this.getSelectedDataFunc = function (selectList, record, index, newData) {
            _this.selectList = selectList;
            if (index != undefined) {
                _this.allData[index]['_checked'] = !_this.allData[index]['_checked'];
            } else {
                //点击了全选
                if (selectData.length > 0) {
                    //全选
                    _this.allData.map(function (item) {
                        if (!item['_disabled']) {
                            item['_checked'] = true;
                        }
                    });
                } else {
                    //反选
                    _this.allData.map(function (item) {
                        if (!item['_disabled']) {
                            item['_checked'] = false;
                        }
                    });
                }
            }
            _this.props.getSelectedDataFunc(selectList, record, index, newData);
        };

        _this.open = function () {
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.renderDom = function () {
            var _this$state = _this.state,
                copying = _this$state.copying,
                isMax = _this$state.isMax,
                columns = _this$state.columns,
                data = _this$state.data,
                allEditing = _this$state.allEditing,
                adding = _this$state.adding,
                open = _this$state.open;

            var _this$props = _this.props,
                clsfix = _this$props.clsfix,
                paginationObj = _this$props.paginationObj,
                exportData = _this$props.exportData,
                disabled = _this$props.disabled,
                title = _this$props.title,
                hideSave = _this$props.hideSave,
                isEdit = _this$props.isEdit,
                powerBtns = _this$props.powerBtns,
                forcePowerBtns = _this$props.forcePowerBtns,
                otherProps = _objectWithoutProperties(_this$props, ["clsfix", "paginationObj", "exportData", "disabled", "title", "hideSave", "isEdit", "powerBtns", "forcePowerBtns"]);

            var _paginationObj = 'none';
            if (paginationObj != 'none') {
                _paginationObj = _extends({}, defualtPaginationParam, paginationObj);
                _paginationObj.gap = true;
                _paginationObj.size = "sm";
                _paginationObj.disabled = paginationObj.disabled !== undefined ? paginationObj.disabled : data.length === 0 || allEditing || copying || adding;
            }
            var _exportData = exportData || data;
            var btnsObj = {};
            btnsObj = {
                addRow: {
                    onClick: _this.addRow
                    // disabled:allEditing||adding||disabled
                },
                update: {
                    onClick: _this.updateAll,
                    disabled: disabled
                },
                delRow: {
                    onClick: _this.delRow
                    // disabled:this.selectList==0||disabled
                },
                copyRow: {
                    onClick: _this.copyRow
                    // disabled:this.selectList==0||disabled
                },
                "export": {
                    onClick: function onClick() {
                        _this.grid.exportExcel();
                    }
                },
                min: {
                    onClick: _this.max
                }
            };
            if (!isMax) {
                delete btnsObj.min;
                btnsObj.max = {
                    onClick: _this.max
                };
            }
            if (allEditing) {
                btnsObj.cancel = {
                    onClick: _this.cancelEdit
                };
                if (!hideSave) {
                    btnsObj.save = {
                        onClick: _this.save
                    };
                }
            } else if (adding) {
                btnsObj.cancel = {
                    onClick: _this.cancelAdd
                };
                if (!hideSave) {
                    btnsObj.save = {
                        onClick: _this.save
                    };
                }
            } else if (copying) {
                btnsObj = {
                    copyToEnd: {
                        onClick: _this.copyToEnd
                    },
                    cancel: {
                        onClick: _this.cancelCopy
                    }
                };
            }
            return _react2["default"].createElement(
                _react.Fragment,
                null,
                isEdit ? _react2["default"].createElement(
                    "div",
                    { className: clsfix + " " + (disabled ? 'disabled' : '') + " " + (isMax ? 'max' : '') },
                    typeof title == 'string' ? _react2["default"].createElement(
                        "div",
                        { className: clsfix + "-panel " + (open ? '' : 'close') },
                        _react2["default"].createElement(
                            "span",
                            { onClick: _this.open },
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
                        _react2["default"].createElement(_beeComplexGrid2["default"], _extends({}, otherProps, {
                            className: "ucf-example-grid",
                            data: data,
                            columns: columns,
                            exportData: _exportData,
                            paginationObj: _paginationObj,
                            ref: function ref(el) {
                                return _this.grid = el;
                            },
                            hoverContent: _this.hoverContent,
                            getSelectedDataFunc: _this.getSelectedDataFunc,
                            onRowHover: _this.onRowHover,
                            syncHover: false
                        }))
                    ) : _react2["default"].createElement(_beeComplexGrid2["default"], _extends({}, otherProps, {
                        className: "ucf-example-grid",
                        data: data,
                        columns: columns,
                        exportData: _exportData,
                        paginationObj: _paginationObj,
                        ref: function ref(el) {
                            return _this.grid = el;
                        },
                        hoverContent: _this.hoverContent,
                        getSelectedDataFunc: _this.getSelectedDataFunc,
                        onRowHover: _this.onRowHover,
                        syncHover: false
                    }))
                ) : _react2["default"].createElement(
                    "div",
                    { className: clsfix + " " + (disabled ? 'disabled' : '') },
                    _react2["default"].createElement(_beeComplexGrid2["default"], _extends({}, otherProps, {
                        className: "ucf-example-grid",
                        data: data,
                        columns: columns,
                        exportData: _exportData,
                        paginationObj: _paginationObj,
                        ref: function ref(el) {
                            return _this.grid = el;
                        },
                        hoverContent: _this.hoverContent,
                        getSelectedDataFunc: _this.getSelectedDataFunc,
                        onRowHover: _this.onRowHover,
                        syncHover: false
                    }))
                )
            );
        };

        _this.state = (_this$state2 = {
            copying: false, //是否正在拷贝
            open: props.defaultOpen != undefined ? props.defaultValue : true, //默认展开收起
            isMax: false, //是否最大化了
            columns: props.columns,
            data: props.data,
            defaultValueKeyValue: {} }, _defineProperty(_this$state2, "isMax", false), _defineProperty(_this$state2, "allEditing", false), _defineProperty(_this$state2, "adding", false), _this$state2);
        _this.oldColumns = props.columns;
        _this.selectList = []; //选中的数据
        _this.allData = []; //表格所有数据
        _this.errors = {};
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
        if ('data' in nextProps) {
            this.setData(nextProps.data);
            this.allData = nextProps.data;
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


    Grid.prototype.render = function render() {
        return _react2["default"].createElement(
            "span",
            null,
            this.state.isMax ? ReactDOM.createPortal(this.renderDom(), document.querySelector('body')) : this.renderDom()
        );
    };

    return Grid;
}(_react.Component);

Grid.defaultProps = defaultProps;
exports["default"] = Grid;
module.exports = exports["default"];