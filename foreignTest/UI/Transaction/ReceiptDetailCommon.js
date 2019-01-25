var gRateKey = "RATE";
var gAccountKey = "ACCOUNT";
var gEntityKey = "ENTITY";
//combobox的基本配置信息
var gComboboxConfig = {
    panelWidth: 265,
    panelHeight: 'auto',
};
var gComponyAccountConfig={
    panelWidth: 265,
    panelHeight: 100,
}

var gSearchSetting = SEARCH_CUSTOMER_NO_W;
gSearchSetting+=SEARCH_CUSTOMER_NAME_W
gSearchSetting += SEARCH_RECEIPT_CREATETIME_START;
gSearchSetting += SEARCH_RECEIPT_CREATETIME_END;
gSearchSetting+=SEARCH_RECEIPT_STATUS;

var gTransactionColumnConfig=[
    [{
        field : 'ck',
        checkbox : 'true',
    }, {
        field : 'id',
        title : 'ID',
        width : '8%',
        align : 'center'
    }, {
        field : 'transactionNumber',
        title : 'transactionNumber',
        width : '10%',
        align : 'center',
    }, {
        field : 'dateTransaction',
        title : 'dateTransaction',
        width : '10%',
        align : 'center',
    }, {
        field : 'firstName',
        title : 'FirstName',
        width : '10%',
        align : 'center',
    },{
        field : 'lastName',
        title : 'LastName',
        width : '10%',
        align : 'center',
    }, {
        field : 'status',
        title : 'STATUS',
        width : '15%',
        align : 'center',
        formatter : function (value, row, index) {
            var _v = value + '';
            if (_v) {
                return getValueByKey(RECEIPT_STATUS, _v);
            }
        }
    }, {
        field : 'isThree',
        title : 'isThree',
        width : '8%',
        align : 'center',
        formatter : function (value, row, index) {
            var _v = value + '';
            if (_v) {
                return getValueByKey(ISTHREE, _v);
            }
        }
    }, {
        field : 'updateTime',
        title : 'UpdateTime',
        width : '10%',
        align : 'center',
    },]
];
//customerInfo的preview配置
var gConfigCustomerInfo = [
    {
        field: 'customerNumber',
        title: 'customerNumber',
    }, {
        field: 'firstName',
        title: 'firstName',
    }, {
        field: 'lastName',
        title: 'LastName',
    }, {
        field: 'phoneNumber',
        title: 'phoneNumber',
    },
    {
        field: 'customerAccountType',
        title: 'customerAccountType',
    }
];
//indentityInfo的preview配置
var gConfigIdentityInfo = [
    {
        field: 'type',
        title: 'Type',
    }, {
        field: 'number',
        title: 'Number',
    }, {
        field: 'issueCountry',
        title: 'IssueCountry',
    }];
//addressInfo的preview配置
var gConfigAddressInfo = [
    {
        field: 'addressType',
        title: 'Type',
    }, {
        field: 'address',
        title: 'Address',
    }, {
        field: 'countryCode',
        title: 'Contry',
    }, {
        field: 'zip',
        title: 'Zip',
    }];
//TransactionInfo的preview配置
var gConfigTransactionInfo = [
    {
        field: 'currencyCodeFrom',
        title: 'currencyCodeFrom',
    }, {
        field: 'currencyCodeTo',
        title: 'currencyCodeTo',
    }, {
        field: 'buyingBankRate1',
        title: 'Buying Bank Rate',
    }, {
        field: 'buyingRate1',
        title: 'Buying Rate',
    }, {
        field: 'sellingBankRate1',
        title: 'Selling Bank Rate',
    }, {
        field: 'sellingRate1',
        title: 'Selling Rate',
    }];

var gConfig = {
    height: 200,//显示20条数据已经调整好的高度
    columns: [
        [{
            field: 'id',
            title: 'id',
            width: '0%',
            align: 'center'
        }, {
            field: 'payment',
            title: 'Payment',
            width: '35%',
            align: 'center',
            editor: {
                type: 'combobox',
                options: {
                    valueField: 'text',
                    textField: 'text',
                    panelWidth: 200,
                    panelHeight: 200,
                    data: RECEIPT_PAYMENTTYPE,
                },
            }
        }, {
            field: 'foreignAmount',
            title: 'Amount',
            width: '35%',
            align: 'center',
            editor: {
                type: 'numberbox',
            }
        }]
    ],
};//基本表格配置信息
var gAdminConfig = {
    height: 200,//显示20条数据已经调整好的高度
    columns: [
        [{
            field: 'ck',
            checkbox: 'true',
        }, {
            field: 'id',
            title: 'id',
            width: '0%',
            align: 'center'
        }, {
            field: 'payment',
            title: 'Payment',
            width: '20%',
            align: 'center',
            editor: {
                type: 'combobox',
                options: {
                    // idField: 'value',
                    valueField: 'value',
                    textField: 'text',
                    panelWidth: 200,
                    panelHeight: 200,
                    data: RECEIPT_PAYMENTTYPE,
                },
            }
        }, {
            field: 'type',
            title: 'Type',
            width: '18%',
            align: 'center',
            editor: {
                type: 'combobox',
                options: {
                    valueField: 'text',
                    textField: 'text',
                    panelWidth: 200,
                    panelHeight: 200,
                    data: transactionTypeData,
                },
            },
        }, {
            field: 'companyAccountId',
            title: 'CompanyAccount',
            width: '20%',
            align: 'center',
            editor: {
                type: 'combobox',
                options: {
                    valueField: 'text',
                    textField: 'text',
                    panelWidth: 200,
                    data: JSON.parse(localStorage.getItem('companyAccount')),
                },
            }
        }]
    ],
};

var gPhoneConfig = {
    height: 200,//显示20条数据已经调整好的高度
    columns: [
        [{
            field: 'contactType',
            title: 'contactType',
            width: '30%',
            align: 'center',
            formatter: function (v) {
                return JSON.parse(localStorage.getItem("ContactType")).filter(function (current) {
                    return current.code == v;
                })[0].name;
            }
        }, {
            field: 'number',
            title: 'Number',
            width: '30%',
            align: 'center',
        }, {
            field: 'communicationType',
            title: 'communicationType',
            width: '30%',
            align: 'center',
            formatter: function (v) {
                return JSON.parse(localStorage.getItem("CommunicationType")).filter(function (current) {
                    return current.code == v;
                })[0].name;
            }
        }]
    ],
};
var gIdentityConfig = {
    height: 200,//显示20条数据已经调整好的高度
    columns: [
        [{
            field: 'type',
            title: 'Type',
            width: '32%',
            align: 'center',
            formatter: function (v) {
                return JSON.parse(localStorage.getItem("IdentifierType")).filter(function (current) {
                    return current.code == v;
                })[0].name;
            }
        }, {
            field: 'number',
            title: 'Number',
            width: '32%',
            align: 'center',
        }, {
            field: 'issueCountry',
            title: 'issueCountry',
            width: '32%',
            align: 'center',
            formatter: function (v) {
                return JSON.parse(localStorage.getItem("CountryCodes")).filter(function (current) {
                    return current.code == v;
                })[0].name;
            }
        }]
    ],
};
var gAddressConfig = {
    height: 200,//显示20条数据已经调整好的高度
    columns: [
        [{
            field: 'addressType',
            title: 'Type',
            width: '24%',
            align: 'center',
            formatter: function (v) {
                return JSON.parse(localStorage.getItem("ContactType")).filter(function (current) {
                    return current.code == v;
                })[0].name;
            }
        },
            {
                field: 'address',
                title: 'Address',
                width: '24%',
                align: 'center',
            },
            {
                field: 'countryCode',
                title: 'Country',
                width: '24%',
                align: 'center',
                formatter: function (v) {
                    return JSON.parse(localStorage.getItem("CountryCodes")).filter(function (current) {
                        return current.code == v;
                    })[0].name;
                }
            },
            {
                field: 'zip',
                title: 'Zip',
                width: '20%',
                align: 'center',
            },
        ]
    ],

};

var gConvertFieldData = {
    "amount": "Float",
    "amountLocal": "Float",
    "fromAmount": "Float",
    "localRate": "Float",
    "toAmount": "Float",
    "exchangeRate": "Float",
    "foreignAmount": "Float",
};//从表单里取出来的字段的名称和要转换的类型

var gConvertGridData = {
    fromClients: [{
        field: "type",
        menu: transactionTypeData,
    }, {
        field: 'payment',
        menu: RECEIPT_PAYMENTTYPE,
    }, {
        field: 'companyAccountId',
        menu: JSON.parse(localStorage.getItem('companyAccount')),
    }],
    toClients: [{
        field: "type",
        menu: transactionTypeData,
    }, {
        field: 'payment',
        menu: RECEIPT_PAYMENTTYPE,
    }, {
        field: 'companyAccountId',
        menu: JSON.parse(localStorage.getItem('companyAccount')),
    }],
    arrives: [
        {
            field: 'payment',
            menu: RECEIPT_PAYMENTTYPE,
        },
        {
            field: "type",
            menu: transactionTypeData,
        }, {
            field: 'companyAccountId',
            menu: JSON.parse(localStorage.getItem('companyAccount')).map(function (current) {
                current.value = current.id;
                return current;
            }),
        }],
    pays: [{
        field: 'payment',
        menu: RECEIPT_PAYMENTTYPE,
    }, {
        field: "type",
        menu: transactionTypeData,
    }, {
        field: 'companyAccountId',
        menu: JSON.parse(localStorage.getItem('companyAccount')).map(function (current) {
            current.value = current.id;
            return current;
        }),
    }],
    serviceFee: [{
        field: 'payment',
        menu: RECEIPT_PAYMENTTYPE,
    }, {
        field: 'companyAccountId',
        menu: JSON.parse(localStorage.getItem('companyAccount')).map(function (current) {
            current.value = current.id;
            return current;
        }),
    },
    ]
};//表格中需要V ，T互转的字段

var gConvertData = {
    type: {src: 'IdentifierType', key: 'code', value: 'name'},
    countryCode: {src: 'CountryCodes', key: 'code', value: 'name'},
    issueCountry: {src: 'CountryCodes', key: 'code', value: 'name'},
    transmodeCode: {src: 'TransmodeType', key: 'code', value: 'name'},
    payment: {src: RECEIPT_PAYMENTTYPE, key: 'value', value: 'text'},
    companyAccountId: {src: "companyAccount", key: "value", value: "text"},
    fundsCode: {src: "FundsType", key: "code", value: "name"},
    addressType: {src: "ContactType", key: "code", value: "name"},
    customerAccountType: {src: CUSTOMER_ACCOUNT_TYPE, key: "value", value: "text"}
};//需要从数据字典中转换的数据映射表表单的列表
var gFormList = [
    '#ff_transactionInfo',
    '#ff_formClient',
    '#ff_toClient',
    '#ff_serviceFree',
    '#ff_customer'
];//

var gGridTitleDataList = [
    "customerId",
    "personId",
    "transactionId",
    "accountId",
];//可以直接从第一层数据里面拿的字段,添加到表格中的每一行中

var gSerViceDataList = [
    "companyAccountId",
    "transactionId",
    "payment",
    "amount",
];//把第一层的数据添加到fee中的字段

function extendConfig(config, element, field) {
    var _config = deepCopy(config);
    switch (field) {
        case 'fromClients':
            _config.onCheck = function (index, row) {
                gFromClientSelect = index;
            };
            _config.onDblClickRow = function (index, row) {
                gFromClientSelect = index;
                return updateGridData("#fromClientDlg");
            };
            break;
        case 'toClients':
            _config.onCheck = function (index, row) {
                gToClientSelect = index;
            };
            _config.onDblClickRow = function (index, row) {
                gToClientSelect = index;
                return updateGridData("#toClientDlg");
            };
            break;
        case 'arrives':
            _config.columns[0].push({
                    field: "foreignAmount",
                    title: 'Amount',
                    width: '18%',
                    align: 'center',
                }, {
                    field: "verify",
                    title: 'Verified',
                    width: '8%',
                    align: 'center',
                    formatter: function (v) {
                        return ARRIVE_PAY_VERIFY.filter(function (current) {
                            return current.value === v;
                        })[0].text;
                    }
                }, {
                    field: "isThree",
                    title: 'tripartite transaction',
                    width: '9%',
                    align: 'center',
                    formatter: function (v) {
                        return ISTHREE.filter(function (current) {
                            return current.value === v;
                        })[0].text;
                    }
                },
            );
            _config.onDblClickRow = function (index, row) {
                var _id = row.id;
                var _pLocation = "UI/Transaction/ReceiptArrivesForm.html?id=" + _id + "&transactionId=" + gUpdateData.id + "&customerId=" + gUpdateData.customerId + "&customerAccountType=" + gUpdateData.customerAccountType;
                $("#ifrmEdit").attr("src", _pLocation);
                constructDialog($('#dlg'), "arrives", 400, 400);
                AddDialog.dialog('open');
            };
            break;
        case 'pays':
            _config.columns[0].push(
                {
                    field: "foreignAmount",
                    title: 'Amount',
                    width: '18%',
                    align: 'center',
                }, {
                    field: "verify",
                    title: 'Verified',
                    width: '8%',
                    align: 'center',
                    formatter: function (v) {
                        return ARRIVE_PAY_VERIFY.filter(function (current) {
                            return current.value === v;
                        })[0].text;
                    }
                }, {
                    field: "isThree",
                    title: 'tripartite transaction',
                    width: '9%',
                    align: 'center',
                    formatter: function (v) {
                        return ISTHREE.filter(function (current) {
                            return current.value === v;
                        })[0].text;
                    }
                },
            );
            _config.onDblClickRow = function (index, row) {
                var _id = row.id;
                var _pLocation = "UI/Transaction/ReceiptPaysForm.html?id=" + _id + "&transactionId=" + gUpdateData.id + "&customerId=" + gUpdateData.customerId + "&customerAccountType=" + gUpdateData.customerAccountType;
                $("#ifrmEdit").attr("src", _pLocation);
                constructDialog($('#dlg'), "pays", 400, 400);
                AddDialog.dialog('open');
            };
            break;
        case 'reportFromClients':
            _config.onCheck = function (index, row) {
                gFromClientSelect = index;
            };
            _config.onDblClickRow = function (index, row) {
                gToClientSelect = index;
                return updateGridData("#fromClientDlg");
            };
            break;
        case'reportToClients':
            _config.onCheck = function (index, row) {
                gToClientSelect = index;
            };
            _config.onDblClickRow = function (index, row) {
                gToClientSelect = index;
                return updateGridData("#toClientDlg");
            };
            break;
        default:
            break;
    }
    return _config;
}//不同的config继承信息

function addBasicInfo(gridData, gGridTitleDataList, isNewRecord, field) {
    return gridData.map(function (currentRow) {
        currentRow = currentRow ? deepCopy(currentRow) : {};
        if (isNewRecord === true) {
            gGridTitleDataList.forEach(function (currentField) {
                if (typeof gUpdateData[currentField] !== 'object') {
                    currentRow[currentField] = gUpdateData[currentField];
                }
            });
            currentRow.transactionId = isNewRecord ? 1 : gUpdateData.id;
        }
        if (field) {
            currentRow.toFrom = field === "toClients" ? TO_FROM_CODE.TOCLIENT : TO_FROM_CODE.TOFROM;
            var _fromCurrencyCode = $('#input_fromCurrencyCode').combobox('getValue');
            var _toCurrencyCode = $('#input_toCurrencyCode').combobox('getValue');
            currentRow.foreignCurrencyCode = _fromCurrencyCode;
            currentRow.toCurrencyCode = _toCurrencyCode;
        }
        return currentRow;
    });
}

function convertFormData(originData, convertMap, reConvert) {
    var _originData = JSON.parse(JSON.stringify(originData));
    Object.keys(originData).forEach(function (current) {
        if (_originData[current] && typeof _originData[current] !== "object" && convertMap.hasOwnProperty(current)) {
            _originData[current] = reConvert ? reConvertDictData(_originData[current], convertMap[current]) : convertDictData(_originData[current], convertMap[current]);
        }
    });
    return _originData;
}

function createPreview(configInfo, contentElement, getData, dataSource) {
    gPreviewPage = new BasicPreviewPage(configInfo, contentElement, getData, dataSource);
    gPreviewPage.getData(gConvertData);
}

function mergeUpdateData(originData, willMergeData) {
    Object.keys(willMergeData).forEach(function (current) {
        if (typeof originData[current] !== 'object') {
            originData[current] = willMergeData[current];
        }
    });
    return originData;
}//可以合并每张单独表单的字段到总数据中；

function createDataGrid(config, element, toolBar) {
    var _defaultConfig = {
        toolbar: toolBar,
        pagination: 'true',
        fitColumns: 'false',
        rownumbers: 'true',
        pageSize: 10,
        autoSave: 'true',
        singleSelect: true,
        height: 200,//显示20条数据已经调整好的高度
        width: '100%',
        striped: 'true',
        loadMsg: '正在吃力加载中.....',
        columns: [],
        showFooter: 'true',
    };
    var _config = $.extend(false, _defaultConfig, config);
    $(element).datagrid(_config);
}

function setServiceFee(data) {
    //设置serviceFree中的3个combobox的数据

    $('#input_amount').numberbox('setValue', data.amount);
    var serviceFreePayment = data.payment;
    RECEIPT_PAYMENTTYPE.forEach(function (v) {
        if (v.value === serviceFreePayment) {
            $('#input_payment').combobox('setValue', v.text);
        }
    });
    var companyAccountId = data.companyAccountId;
    JSON.parse(localStorage.getItem('companyAccount')).forEach(function (v) {
        if (v.id === companyAccountId) {
            $("#input_companyAccountId").combobox('setValue', v.text);
        }
    });
}

function checkCombobox() {
    var _DialogWidth = 1350;
    var _DialogHeight = 106;
    var _toCurrencyCode = $('#input_toCurrencyCode').combobox('getValue');
    var _fromCurrencyCode = $('#input_fromCurrencyCode').combobox('getValue');
    var _sendData = {
        currencyCodeFrom: _fromCurrencyCode,
        currencyCodeTo: _toCurrencyCode,
    };
    gRequest.putRemoteData(gRateKey, 'currency', _sendData).done(function (_result) {
        if (!_result.data) {
            $.messager.alert('Alert', 'No current exchange rate was found');
        } else {
            localStorage.setItem("codeToCodeRate", JSON.stringify(_result.data));
            var _pLocation = "UI/Transaction/RateTable.html";
            $("#ifrmEdit").attr("src", _pLocation);
            constructDialog($("#dlg"), 'Rate', _DialogWidth, _DialogHeight);
            AddDialog.dialog('open');
        }
    });

}

function mult() {
    operation(true);
}

function division() {
    operation(false);
}

function operation(isMult) {
    var exchangeRate = $('#input_exchangeRate').textbox('getValue');
    var fromAmount = $('#input_fromAmount').textbox('getValue');
    if (!(exchangeRate && fromAmount)) {
        $.messager.alert('Alert', 'fromAmount and exchangeRate are required!');
        return;
    }
    var result;
    result = (isMult ? exchangeRate * fromAmount : fromAmount / exchangeRate);
    $('#input_toAmount').numberbox('setValue', result);
}

function addToolTips() {
    var content = 'edit basicIndentityInfo';
    toolTips('#identityInfoButton', content);
    content = 'edit basicAddress';
    toolTips('#addressInfoButton', content);
}

function toolTips(element, content) {
    var _content = '<span>' + content + '</span>';
    $(element).tooltip({
        position: 'top',
        content: _content,
        onShow: function () {
            $(this).tooltip('tip').css({
                backgroundColor: '#fafafa',
                borderColor: '#fafafa'
            });
        }
    });
}

function calculate() {
    if (gRateStatus === RateStatus.neither) {
        var _loacalRate = $('#input_localRate').numberbox('getValue');
        var _fromAmount = $('#input_fromAmount').numberbox('getValue');
        var _result = _loacalRate * _fromAmount;
        if (!(_fromAmount && _loacalRate)) {
            $.messager.alert('Alert', 'localRate and fromAmount can not be empty!');
            return;
        }
        $('#input_amountLocal').numberbox('setValue', _result);
        return _result;
    }
    var _value = gRateStatus === RateStatus.NZDIsFrom ? $('#input_fromAmount').numberbox('getValue') : $('#input_toAmount').numberbox('getValue');
    RateStatus[gRateStatus](_value);
    return _value;
}

function editIndentityInfo() {
    var _pLocation = "UI/BasicData/BasicIdentification.html";
    var payload = {
        id: gUpdateData.personId,
        type: "customerIdent",
    };
    localStorage.setItem("customerIdent", JSON.stringify(payload));
    AddTabIn("BasicIdentification", parent.$('#tabs'), _pLocation);
}

function editAddressInfo() {
    var _pLocation = "UI/BasicData/BasicAddress.html";
    var payload = {
        id: gUpdateData.personId,
        type: "customerAddress",
    };
    localStorage.setItem("customerAddress", JSON.stringify(payload));
    AddTabIn("BasicAddress", parent.$('#tabs'), _pLocation);
}

function initDate(date) {
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
        + (date.getMonth() + 1);
    return month + '/' + day + '/' + date.getFullYear();
}

function constructDialog(dlgname, ptitle, pwidth, pheight) {
    var html = dlgname.html();
    AddDialog = window.parent.$(html).appendTo(window.top.document.body);
    AddDialog.dialog({
        modal: true,
        title: ptitle,
        cache: true,
        closable: true,
        draggable: true,
        width: pwidth,
        height: pheight,
    }).dialog('close');
}

function alertMsg(msg) {
    $.messager.alert("Info", msg);
}

function setStatus(data) {
    var _status = "";
    var _isThree = "no";
    ISTHREE.forEach(function (current) {
        if (current.value == data.isThree) {
            _isThree = current.text;
        }
    });
    RECEIPT_STATUS.forEach(function (current) {
        if (current.value == data.status) {
            _status = current.text;
        }
    });
    $("#span_status").html("Status:" + _status + "<br/>" + "tripartite transaction:" + _isThree);
}
