////关配置信息

//var RemoteLinkAddress = "http://192.168.199.248:8085";
var RemoteLinkAddress = "http://47.105.81.35:8085/gsms2";
//var RemoteLinkAddress = "http://192.168.3.50:8080/GSMS";
//var RemoteLinkAddress = "http://222.196.35.4:8060/GSMS";
var AddFlag = -1;
var ORDER_TYPE_WEBORDER = "1";
var ORDER_TYPE_HANDLEORDER = "0";

//继承函数
function extend(Child, Parent) {
    var F = function () {
    }; //申明一个局部的类来打断父类prototype的改变对目前类的影响
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype; //可以使用父类的方法
}

///保留两位小数
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        console.log('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

// 基础信息Dialog
var WebDataZoneList = [{
    "city": "涪城区",
    "code": "FCQ",
    "updatetime": "",
}, {
    "city": "游仙区",
    "code": "YXQ",
    "updatetime": "",
}, {
    "city": "三台县",
    "code": "STX",
    "updatetime": "",
},
    {
        "city": "盐亭县",
        "code": "YTX",
        "updatetime": "",
    }
];

//outOder
var orderFieldMap = [{
    "fieldname": "outAmount",
    "valuename": "出库数量",
}, {
    "fieldname": "sum",
    "valuename": "总价",
}];


//此函数查找orderfieldmap中的数据进行映射
function searchOrderFieldMap(data) {
    for (var i = 0; i < orderFieldMap.length; i++) {
        if (data == orderFieldMap[i].fieldname) {
            return orderFieldMap[i].valuename;
        }
    }
    return undefined;
}

function deepCopy(o) {
    var isArray = o instanceof Array;
    var isObject = o instanceof Object;
    if (!isObject) return o;
    var n = (isArray ? [] : {});
    for (var k in o) n[k] = deepCopy(o[k]);
    return n;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

function getNowFormatDate2() {
    var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

////检测手机号码是否符合规范
function checkPhoneNumber(_phonenumber) {
    var regular_phone = /^1[3|4|5|7|8]\d{9}$/;
    var phone = _phonenumber;
    var tip = "验证成功";
    if (phone == "") {
        tip = "电话号码为空";
    }
    if (!regular_phone.test(phone)) {
        tip = "电话号码格式不对";
    }
    return tip;
}

/////检测车牌号码是否符合规范
function checkCarNo(_carno) {
    var regular_car = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    var tip = "验证成功";
    if (_carno == "") {
        tip = "车牌号码为空";
    }
    if (!regular_car.test(_carno)) {
        tip = "车牌号格式不对";
    }
    return tip;
}

function alertMessages(_res) {
    alertMessage('提示', '正在保存');
    _res.complete(function (result) {
        $(".messager-body").window('close');
        var _result = result.responseJSON;
        if (_result.code === 0) {
            alertMessage('提示', '保存成功');
        } else {
            alertMessage('提示', '保存失败');

        }
    });
}

function alertMessage(title, msg, icon) {
    $.messager.alert(title, msg, icon, function () {
    });
}

function checkMail(mailStr) {
    var tip = "验证成功";
    var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    if (mailStr == "") {
        tip = "邮件地址不能为空";
    }
    if (!Regex.test(mailStr)) {
        tip = "邮件格式不正确";
    }
    return tip;
}

var TIME_YEAR = 0;
var TIME_MONTH = 1;
var TIME_DAY = 2;

function CalTimeLimit(startTime, endTime, Type) {
    var res;
    var s = 0;
    var reg = new RegExp("/", "g");
    var _start = startTime.replace(reg, "");
    var _end = endTime.replace(reg, "");
    if (parseFloat(_start) > parseFloat(_end)) {
        $.messager.alert("提示", "时间填写错误!");
        return -1;
    }
    switch (Type) {
        case TIME_YEAR:
            s = 1000 * 60 * 60 * 24 * 30 * 12;
            break;
        case TIME_MONTH:
            s = 1000 * 60 * 60 * 24 * 30;
            break;
        case TIME_DAY:
            s = 1000 * 60 * 60 * 24;
            break;
    }
    res = Math.ceil(Math.abs((Date.parse(endTime) - Date.parse(startTime))) / s);
    return res;
}

function IdentityCodeValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "验证成功";
    if (!/^\d{17}(\d|x)$/i.test(code)) {
        //	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
    } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
            }
        }
    }
    return tip;
}

function check_time(_time) {
    var regular_time = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/;
    var timecheck = _time;
    var tip = "验证成功";
    if (timecheck.length == 0) {
        tip = "时间位数不正确";
    }
    if (!regular_time.test(timecheck)) {
        tip = "时间格式不正确";
    }
    return tip;
}

//相关函数
function Clearnav() {
    var pp = $('#wnav').accordion('panels');
    $.each(pp, function (i, n) {
        if (n) {
            var t = n.panel('options').title;
            $('#wnav').accordion('remove', t);
        }
    });
    pp = $('#wnav').accordion('getSelected');
    if (pp) {
        var title = pp.panel('options').title;
        $('#wnav').accordion('remove', title);
    }
}

function addNav(data) {
    $.each(data, function (i, sm) {
        var menulist = "";
        menulist += '<ul>';
        $.each(sm.menus, function (j, o) {
            menulist += '<li><div><a ref="' + o.menuid + '" href="#" rel="' + o.url + '" ><span class="icon ' + o.icon + '" >&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div></li> ';
        });
        menulist += '</ul>';
        $('#wnav').accordion('add', {
            title: sm.menuname,
            content: menulist,
            iconCls: 'icon ' + sm.icon
        });
    });
    var pp = $('#wnav').accordion('panels');
    var t = pp[0].panel('options').title;
    $('#wnav').accordion('select', t);

}

// 初始化左侧
function InitLeftMenu() {

    hoverMenuItem();
    //  $("button#demo").click(function(){$("img").hide()})
    $('#wnav li a').click(function () {
        var tabTitle = $(this).children('.nav').text();
        var url = $(this).attr("rel");
        var menuid = $(this).attr("ref");
        var icon = getIcon(menuid, icon);
        addTab(tabTitle, url, icon);
        $('#wnav li div').removeClass("selected");
        $(this).parent().addClass("selected");
    });

}

/**
 * 菜单项鼠标Hover
 */
function hoverMenuItem() {
    $(".easyui-accordion").find('a').hover(function () {
        $(this).parent().addClass("hover");
    }, function () {
        $(this).parent().removeClass("hover");
    });
}

// 获取左侧导航的图标
function getIcon(menuid) {
    var icon = 'icon ';
    $.each(_menus, function (i, n) {
        $.each(n, function (j, o) {
            $.each(o.menus, function (k, m) {
                if (m.menuid == menuid) {
                    icon += m.icon;
                    return false;
                }
            });
        });
    });
    return icon;
}

function addTab(subtitle, url, icon) {
    if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            title: subtitle,
            content: createFrame(url),
            closable: true,
            icon: icon
        });
    } else {
        $('#tabs').tabs('select', subtitle);
        $('#mm-tabupdate').click();
    }
    tabClose();
}

function createFrame(url) {
    var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:99%;"></iframe>';
    return s;
}

function tabClose() {
    /* 双击关闭TAB选项卡 */
    $(".tabs-inner").dblclick(function () {
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tabs').tabs('close', subtitle);
    });
    /* 为选项卡绑定右键 */
    $(".tabs-inner").bind('contextmenu', function (e) {
        $('#mm').menu('show', {
            left: e.pageX,
            top: e.pageY
        });

        var subtitle = $(this).children(".tabs-closable").text();

        $('#mm').data("currtab", subtitle);
        $('#tabs').tabs('select', subtitle);
        return false;
    });
}

// 绑定右键菜单事件
function tabCloseEven() {
    // 刷新
    $('#mm-tabupdate').click(function () {
        var currTab = $('#tabs').tabs('getSelected');
        var url = $(currTab.panel('options').content).attr('src');
        $('#tabs').tabs('update', {
            tab: currTab,
            options: {
                content: createFrame(url)
            }
        });
    });
    // 关闭当前
    $('#mm-tabclose').click(function () {
        var currtab_title = $('#mm').data("currtab");
        $('#tabs').tabs('close', currtab_title);
    });
    // 全部关闭
    $('#mm-tabcloseall').click(function () {
        $('.tabs-inner span').each(function (i, n) {
            var t = $(n).text();
            $('#tabs').tabs('close', t);
        });
    });
    // 关闭除当前之外的TAB
    $('#mm-tabcloseother').click(function () {
        $('#mm-tabcloseright').click();
        $('#mm-tabcloseleft').click();
    });
    // 关闭当前右侧的TAB
    $('#mm-tabcloseright').click(function () {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length == 0) {
            // msgShow('系统提示','后边没有啦~~','error');
            alert('后边没有啦~~');
            return false;
        }
        nextall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });
    // 关闭当前左侧的TAB
    $('#mm-tabcloseleft').click(function () {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length == 0) {
            alert('到头了，前边没有啦~~');
            return false;
        }
        prevall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });

    // 退出
    $("#mm-exit").click(function () {
        $('#mm').menu('hide');
    });
}

// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
    $.messager.alert(title, msgString, msgType);
}

// 本地时钟

//获取传入的页面参数
function getID() {

    urlinfo = window.location.href; //获取当前页面的url
    len = urlinfo.length; //获取url的长度
    offset = urlinfo.indexOf("?"); //设置参数字符串开始的位置
    if (offset == -1) {
        return undefined;
    }
    newsidinfo = urlinfo.substr(offset, len); //取出参数字符串 这里会获得类似“id=1”这样的字符串
    newsids = newsidinfo.split("="); //对获得的参数字符串按照“=”进行分割
    newsid = newsids[1]; //得到参数值
    newsname = newsids[0]; //得到参数名字
    return newsid;
}

function getMultiID() {
    urlinfo = window.location.href; //获取当前页面的url
    len = urlinfo.length; //获取url的长度
    offset = urlinfo.indexOf("?"); //设置参数字符串开始的位置
    if (offset == -1) {
        return undefined;
    }
    newsidinfo = urlinfo.substr(offset + 1, len); //取出参数字符串 这里会获得类似“id=1”这样的字符串
    var newinfo = newsidinfo.split("&");
    var MultiID = {};
    for (var i = 0; i < newinfo.length; i++) {
        newsids = newinfo[i].split("="); //对获得的参数字符串按照“=”进行分割
        MultiID[newsids[0]] = newsids[1];
    }
    return MultiID;
}

//构建基本的dialog
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
        onClose: function () {
            $('#dg').datagrid('reload');
        },
    }).dialog('close');
}

////用于新增基础类型信息
function constructcomboDialog(dlgname, ptitle, comboObj) {
    var html = dlgname.html();
    var DICT_DIALOG_WIDTH = 485;
    var DICT_DIALOG_HEIGHT = 417;
    AddDialog = window.parent.$(html).appendTo(window.top.document.body);
    AddDialog.dialog({
        modal: true,
        title: ptitle,
        cache: true,
        closable: true,
        draggable: true,
        width: DICT_DIALOG_WIDTH,
        height: DICT_DIALOG_HEIGHT,
        onClose: function () {
            comboObj.combobox('reload');
        },
    }).dialog('close');
}

function getMap() { //初始化map_，给map_对象增加方法，使map_像个Map
    var map_ = new Object();
    //属性加个特殊字符，以区别方法名，统一加下划线_
    map_.put = function (key, value) {
        map_[key] = value;
    };
    map_.get = function (key) {
        return map_[key];
    };
    map_.remove = function (key) {
        delete map_[key];
    };
    map_.keyset = function () {
        var ret = "";
        for (var p in map_) {
            if (typeof p == 'string' && p.substring(p.length - 1) == "_") {
                ret += ",";
                ret += p;
            }
        }
        if (ret == "") {
            return ret.split(","); //empty array
        } else {
            return ret.substring(1).split(",");
        }
    };
    return map_;
}

//给easyui的tabs添加了鼠标移动到相应的位置的hover效果
function Tabs_Hover() {
    var tabs = $("#div_tabs").tabs().tabs('tabs');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].panel('options').tab.unbind().bind('mouseenter', {
            index: i
        }, function (e) {
            $("#div_tabs").tabs('select', e.data.index);
        });
    }
}

function AddTabIn(pTitle, Obj, src) {
    var pSrc = "";
    if (Obj.tabs('exists', pTitle)) {
        Obj.tabs('close', pTitle);
    }
    pSrc = "<iframe id='ifmcontent' scrolling='auto' frameborder='0'  src='" + src + "' style='width:100%;height:99%;'></iframe>";
    Obj.tabs("add", { //获取到父窗体信息
        title: pTitle,
        content: pSrc,
        closable: true,
        tools: [{
            iconCls: 'icon-mini-refresh',
            handler: function () {
                var currTab = Obj.tabs('getSelected'); //获得当前tab
                var url = $(currTab.panel('options').content).attr('src');
                Obj.tabs('update', {
                    tab: currTab,
                    options: {
                        content: createFrame(url)
                    }
                });
            }
        }]
    });
}

function iFrameHeight(_ObjID) {
    var ifm = document.getElementById(_ObjID);
    var subWeb = document.frames ? document.frames[_ObjID].document : ifm.contentDocument;
    if (ifm != null && subWeb != null) {
        ifm.height = subWeb.body.scrollHeight;
        ifm.width = subWeb.body.scrollWidth;

    }
}

//在页面中添加脚注，底部一些基本信息的显示
function addFooter(obj_id) {
    var footer_content = "<table cellpadding='5' id='footertable'> <tr><td>备注 </td> <td colspan ='7'>";
    footer_content += " <input type = 'text' name='MEMO' id='input_MEMO' style ='width:100%'";
    footer_content += " class = 'easyui-textbox' /></td> <td></td> <td></td> <td></td> <td></td> <td></td>";
    footer_content += "</tr><tr><td>制单人 </td><td><input type='text' id='input_CREATE_MAN' style='border:none;'";
    footer_content += " readonly='readonly' class = 'easyui-textbox'/ > </td><td>审核人</td> <td>";
    footer_content += " <input type = 'text'name='AUDITOR' id='input_AUDITOR' style='border:none;'";
    footer_content += " readonly='readonly' class = 'easyui-textbox'/> </td><td>审核日期 </td><td><input ";
    footer_content += "type = 'text'  name='AUDITOR_TIME' id='input_AUDITOR_TIME' style='border:none;'";
    footer_content += " readonly='readonly' class = 'easyui-datebox'/ > </td><td>打印次数 </td> <td>";
    footer_content += " <input type ='text' name='PRINTCOUNT' id='input_PRINTCOUNT' style='border:none;'";
    footer_content += " readonly='readonly' class = 'easyui-textbox'/ > </td></tr></table>";
    obj_id.append(footer_content);
}

function getFooterData(data) {
    $("#footertable .easyui-textbox").each(function (index) {
        var s = $(this).attr("id");
        var substr = deletePreSymbol("input_", s);
        if (data[substr] != undefined) {
            $(this).textbox("setValue", data[substr]);
        }
    });
}

function addDialogFooter(obj_id) {
    obj_id.empty();
    obj_id.css('background-color', '#D2E0F2');
    var dialog_footer_content = "<div id=\"dialogfooter\" style=\"background-color:#D2E0F2;height:100px;margin: 10px auto\"><div style=\"width: 70%;height: 90%;float: left;\"><table cellpadding=\"5\" style=\"width: 97%;height: 97%;margin: 0px auto;\"><tr><td >备注</td><td colspan=\"7\"><input class=\"easyui-textbox\" type=\"text\" name=\"MEMO\" id=\"input_MEMO\" style=\"width: 85%;\" /></td></tr><tr><td>制单人</td><td><input type=\"text\" name=\"CREATE_MAN\" id=\"input_CREATE_MAN\" data-options=\"disabled:true\" class=\"easyui-textbox\"/></td><td>审核人</td><td><input type=\"text\" name=\"AUDITOR\" id=\"input_AUDITOR\" data-options=\"disabled:true\" class =\"easyui-textbox\" /></span></td><td>审核时间</td><td><input type=\"text\" name=\"AUDITOR_TIME\" id=\"input_AUDITOR_TIME\" class = 'easyui-datebox' data-options=\"disabled:true\" /></td></tr></table></div><div id=\"verifydisplay\" style=\"width: 30%;height: 50px;float: right;text-align: center\"></div></div>";
    obj_id.append(dialog_footer_content);
}

///Dialog中没有审核的footer
function addDialogFooterWithOutVerify(obj_id) {
    obj_id.empty();
    obj_id.css('background-color', '#D2E0F2');
    var dialog_footer_content = "<table cellpadding='5' style='margin: auto;width: 85%;'><tr><td>备注 </td><td colspan='3'> <input type='text' name='MEMO' id='input_MEMO' class='easyui-textbox' style='width:100%' /></td></tr><tr><td width='10%'>制单人 </td><td width='35%'><span  name='CREATE_MAN' id='input_CREATE_MAN' style='width:100%' class = 'easyui-textbox'></span> </td><td width='10%'>制单时间 </td><td width='35%'><span name='CREATE_TIME' id='input_CREATE_TIME' style='width:100%' class = 'easyui-datebox'></span> </td></tr></table>";

    obj_id.append(dialog_footer_content);
}

function getDialogFooterData(data) {
    $("#dialogfooter span[id]").each(function (index) {
        var s = $(this).attr("id");
        var substr = deletePreSymbol("input_", s);
        if (typeof (data[substr]) != "undefined") {
            $(this).html(data[substr]);
        }
    });
    $("#dialogfooter .easyui-textbox").each(function (index) {
        var s = $(this).attr("id");
        var substr = deletePreSymbol("input_", s);
        if (data[substr] != undefined) {
            $(this).textbox("setValue", data[substr]);
        }
    });
}

function getFormData(data, ArrayMode, formArray) {
    if (ArrayMode && formArray) {
        formArray.forEach(function (current) {
            getFormData(data, current);
    });
    } else {
        if (typeof (data) != "undefined") {
            $((ArrayMode ? ArrayMode : "#ff") + " .easyui-textbox").each(function (index) {
                var s = $(this).attr("id");
                var substr = deletePreSymbol("input_", s);
                if (typeof (data[substr]) != "undefined") {
                    $(this).textbox("setValue", data[substr]);
                }
            });
            $((ArrayMode ? ArrayMode : "#ff") + " .easyui-combobox").each(function (index) {
                var s = $(this).attr("id");
                var substr = deletePreSymbol("input_", s);
                if (typeof (data[substr]) != "undefined") {
                    $(this).combobox("setValue", data[substr]);
                }
            });
            $((ArrayMode ? ArrayMode : "#ff") + " .easyui-datebox").each(function (index) {
                var s = $(this).attr("id");
                var substr = deletePreSymbol("input_", s);
                if (typeof (data[substr]) != "undefined") {
                    data[substr] = data[substr].replace(/-/g, "/");
                    $(this).textbox("setValue", data[substr]);
                }
            });
            $((ArrayMode ? ArrayMode : "#ff") + " .easyui-numberbox").each(function (index) {
                var s = $(this).attr("id");
                var substr = deletePreSymbol("input_", s);
                if (typeof (data[substr]) != "undefined") {
                    $(this).numberbox("setValue", parseFloat(data[substr]));
                }
            });
            $((ArrayMode ? ArrayMode : "#ff") + " .easyui-numberspinner").each(function (index) {
                var s = $(this).attr("id");
                var substr = deletePreSymbol("input_", s);
                if (typeof (data[substr]) != "undefined") {
                    $(this).textbox("setValue", data[substr]);
                }
            });
            $("#new_footer .div_footer_content_msg").each(function (index) {
                var s = $(this).attr("id");
                var substr = deletePreSymbol("input_", s);
                if (typeof (data[substr]) != "undefined") {
                    $(this).val(data[substr]);
                }
            });
        } else {
            console.log("该网页无数据！");
        }
    }
}

function getPrintData(data) {
    if (typeof (data) != "undefined") {
        $("input").each(function (index) {
            var s = $(this).attr("id");
            var substr = deletePreSymbol("input_", s);
            if (typeof (data[substr]) != "undefined") {
                $(this).val(data[substr]);
            }
        });

    } else {
        console.log("该网页无数据！");
    }

}

function submitDialogFormData() {
    var _data = {};
    $("#ff input").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        _data[subtr] = $("input[name=subtr]").val();
    });
    $("#ff span").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        _data[subtr] = $("span[name=subtr]").val();
    });
    return _data;
}

function submitFormData(currentFF) { ///获取需要提交的数据
    var _data = {};
    $((currentFF ? currentFF : "#ff") + " .easyui-combobox").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        _data[subtr] = $(this).combobox("getValue").trim();
    });
    $((currentFF ? currentFF : "#ff") + "  .easyui-textbox").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        _data[subtr] = $(this).textbox("getValue").trim();
    });
    $((currentFF ? currentFF : "#ff") + "  .easyui-datebox").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        var value = $(this).datebox("getValue").replace(/\//g, '-');
        if(value){
            value=new Date(value.trim()).format("yyyy-MM-dd").toString();
        }
        _data[subtr] = value;
    });
    $((currentFF ? currentFF : "#ff") + "  .easyui-numberbox").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        _data[subtr] = $(this).numberbox("getValue");
    });
    $((currentFF ? currentFF : "#ff") + "  .easyui-numberspinner").each(function (index) {
        var s = $(this).attr("id");
        var subtr = deletePreSymbol("input_", s);
        _data[subtr] = $(this).textbox("getValue").trim();
    });
    return _data;
}

////删除 id 中input_的前缀
function deletePreSymbol(_presymbol, _str) {
    var len = _str.length;
    var pre_symbol_len = _presymbol.length;
    var _substr = _str.substring(pre_symbol_len, len);
    return _substr;
}

//构建单据明细中的ToolBar,
var RECEIPT_FRONT_SYMBOL = 1;
var RECEIPT_NEXT_SYMBOL = 2;
var RECEIPT_ADD_SYMBOL = 4;
var RECEIPT_SAVE_SYMBOL = 8;
var RECEIPT_DELETE_SYMBOL = 16;
var RECEIPT_VERIFY_SYMBOL = 32;
var RECEIPT_UNVERIFY_SYMBOL = 64;
var RECEIPT_SEARCH_SYMBOL = 128;
var RECEIPT_PRINT_SYMBOL = 256;
var RECEIPT_CHARGE_SYMBOL = 512;
var RECEIPT_EXPORT_SYMBOL = 1024;
var RECEIPT_SEARCHALL_SYMBOL = 2048;

function AddReceiptsToolBar(type, newdata) {
    var data = [{
        "icon": "icon-left",
        "func": "frontpage()",
        "functionname": "上张"
    }, {
        "icon": "icon-right",
        "func": "nextpage()",
        "functionname": "下张"
    }, {
        "icon": "icon-add",
        "func": "newdata()",
        "functionname": "新建单据"
    }, {
        "icon": "icon-save",
        "func": "save()",
        "functionname": "保存单据"
    }, {
        "icon": "icon-remove",
        "func": "deletedata()",
        "functionname": "删除单据"
    }, {
        "icon": "icon-to_do",
        "func": "verifydata()",
        "functionname": "审核单据"
    }, {
        "icon": "icon-redo",
        "func": "unverifydata()",
        "functionname": "弃审单据"
    }, {
        "icon": "icon-search",
        "func": "searchmore()",
        "functionname": "查询"
    }, {
        "icon": "icon-print",
        "func": "print()",
        "functionname": "打印单据"
    }, {
        "icon": "icon-usermanagement",
        "func": "charge()",
        "functionname": "收费"
    }, {
        "icon": "icon-save",
        "func": "exportExcel()",
        "functionname": "导出"
    }, {
        "icon": "icon-undo",
        "func": "redodata()",
        "functionname": "查看所有数据"
    }];
    var content = "";
    var s;

    /////验证权限
    var currLocation = subStrBaseUrl(window.location.href); //当前页面
    _data = localStorage.getItem('currRight');
    if (_data != null) {
        var authorityList = JSON.parse(_data);
        var authorityArray = $.grep(authorityList, function (value) {
            return value.name == currLocation;
        });
        if (authorityArray.length > 0) //表明存在权限配置
        {
            var _right = authorityArray[0];
            var validataType = RECEIPT_FRONT_SYMBOL + RECEIPT_NEXT_SYMBOL + RECEIPT_SEARCH_SYMBOL;
            validataType += RECEIPT_PRINT_SYMBOL;
            validataType += RECEIPT_CHARGE_SYMBOL;
            if (_right.hasAdd == true) {
                validataType += RECEIPT_ADD_SYMBOL;
            }
            if (_right.hasEdit == true) {
                validataType += RECEIPT_SAVE_SYMBOL;
            }
            if (_right.hasDel == true) {
                validataType += RECEIPT_DELETE_SYMBOL;
            }
            if (_right.hasSh == true) {
                validataType += RECEIPT_VERIFY_SYMBOL;
            }
            if (_right.hasQs == true) {
                validataType += RECEIPT_UNVERIFY_SYMBOL;
            }
            if (_right.hasDc == true) {
                validataType += RECEIPT_EXPORT_SYMBOL;
            }
            type = type & validataType;
        }
    } else {
        authorityCheck();
    }

    ////////////////
    for (var i = 0; i < data.length; i++) {
        s = type & (1 << i);
        if (s != 0) {
            content += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\"  iconCls=\"" + data[i].icon + "\" plain='true' onclick=\"" + data[i].func + "\">" + data[i].functionname + "</a>";
        }
    }
    ////处理附加的功能
    for (var i = 0; i < newdata.length; i++) {
        content += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\"  iconCls=\"" + newdata[i].icon + "\" plain='true' onclick=\"" + newdata[i].func + "\">" + newdata[i].functionname + "</a>";
    }
    return content;
}

var DETAIL_TB_ADD_DETAIL = 1;
var DETAIL_TB_CANCLE = 2;
var DETAIL_TB_DELETE_DETAIL = 4;
var DETAIL_TB_CHARGE = 8;
var DETAIL_TB_SAVE = 16;
var DETAIL_TB_START_BOOST = 32;
var DETAIL_TB_STOP_BOOST = 64;
var DETAIL_TB_RETURN_FEE = 128;
var DETAIL_TB_PRINT_CHARGE = 256;
var DETAIL_TB_PRINT_RETURNS = 512;

//用于生成edatagrid中的工具栏
function AddDetailToolBar(detailToolBarType) {
    var DetailToolBarData = [{
        text: '新增明细', //1
        iconCls: 'icon-add',
        handler: function () {
            $('#tt').edatagrid('addRow');
        }
    }, {
        text: '取消', //2
        iconCls: 'icon-cancel',
        handler: function () {
            $('#tt').edatagrid('cancelRow');
        }
    }, {
        text: '删除明细', //4
        iconCls: 'icon-remove',
        handler: function () {
            $('#tt').edatagrid('destroyRow');
        }
    }, {
        text: '收费', //8
        iconCls: 'icon-charge',
        handler: function () {
            charge();
        }
    }, {
        text: '保存', //16
        iconCls: 'icon-save',
        handler: function () {
            save();
        }
    }, {
        text: '摊位启用', //32
        iconCls: 'icon-startBoost',
        handler: function () {
            startBoost();
        }
    }, {
        text: '摊位停用', //64
        iconCls: 'icon-stopBoost',
        handler: function () {
            stopBoost();
        }
    }, {
        text: '退费', //128
        iconCls: 'icon-returnFee',
        handler: function () {
            returnFee();
        }
    }, {
        text: '打印收费单', //256
        iconCls: 'icon-print',
        handler: function () {
            printCharge();
        }
    }, {
        text: '打印退费单', //512
        iconCls: 'icon-print',
        handler: function () {
            printReturnCharge();
        }
    }];
    var data = [];
    var s;
    for (var i = 0; i < DetailToolBarData.length; i++) {
        s = detailToolBarType & (1 << i);
        if (s != 0) {
            data.push(DetailToolBarData[i]);
        }
    }
    return data;

}

var TOOLBAR_ADD = 1;
var TOOLBAR_EDITOR = 2;
var TOOLBAR_DELETE = 4;
var TOOLBAR_PRINT = 8;
var TOOLBAR_LOAD = 16;
var TOOLBAR_REDO = 32;
var TOOLBAR_FINDMORE = 64;
var TOOLBAR_UPDATEDATA = 256;
var TOOLBAR_VERIFY = 512;
var TOOLBAR_UNVERIFY = 1024;

//type为二进制数字 如全部显示为63
function AddToolBar(type) {
    var data = [{
        "icon": "icon-add",
        "func": "newdata()",
        "functionname": "新增"
    }, {
        "icon": "icon-edit",
        "func": "editdata()",
        "functionname": "修改"
    }, {
        "icon": "icon-remove",
        "func": "destroy()",
        "functionname": "删除"
    }, {
        "icon": "icon-print",
        "func": "print()",
        "functionname": "打印"
    }, {
        "icon": "icon-save",
        "func": "loaddata()",
        "functionname": "导出"
    }, {
        "icon": "icon-undo",
        "func": "redodata()",
        "functionname": "查看所有数据"
    }, {
        "icon": "icon-large-chart",
        "func": "findmore()",
        "functionname": "相关信息"
    }, {
        "icon": "icon-usermanagement",
        "func": "tenantcharge()",
        "functionname": "租户明细账"
    }, {
        "icon": "icon-information",
        "func": "updateBasicData()",
        "functionname": "更新数据"
    }, {
        "icon": "icon-to_do",
        "func": "verifyReceipt()",
        "functionname": "审核",
    }, {
        "icon": "icon-redo",
        "func": "unVerifyReceipt()",
        "functionname": "弃审",
    },];
    var content = "";
    var s;
    ///权限验证
    var currLocation = subStrBaseUrl(window.location.href); //当前页面
    _data = localStorage.getItem('currRight');
    if (_data != null) {
        var authorityList = JSON.parse(_data);
        var authorityArray = $.grep(authorityList, function (value) {
            return value.name == currLocation;
        });
        if (authorityArray.length > 0) //表明存在权限配置
        {
            var _right = authorityArray[0];
            var validataType = TOOLBAR_FINDMORE + TOOLBAR_REDO + TOOLBAR_PRINT;
            if (_right.hasAdd == true) {
                validataType += TOOLBAR_ADD;
            }
            if (_right.hasEdit == true) {
                validataType += TOOLBAR_EDITOR;
            }
            if (_right.hasDel == true) {
                validataType += TOOLBAR_DELETE;
            }
            if (_right.hasDc == true) {
                validataType += TOOLBAR_LOAD;
            }
            type = type & validataType;
        }
    } else {
        authorityCheck();
    }
    ///////////
    for (var i = 0; i < data.length; i++) {
        s = type & (1 << i);
        if (s != 0) {
            content += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\"  iconCls=\"" + data[i].icon + "\" plain='true' onclick=\"" + data[i].func + "\">" + data[i].functionname + "</a>";
        }
    }
    return content;
}

function isJson(obj) {
    if (obj.length > 0) {
        isjson = true;
    } else {
        isjson = false;
    }
    return isjson;
}

////object 数据完整性检查
function checkObjectDataIntegrity(obj, KeyField, omitField) {
    for (var i = 0; i < obj.length; i++) {
        var m = obj[i];
        if (m[KeyField] != undefined) {
            for (s in m) {
                if (s != omitField && m[s] == undefined) {
                    return false;
                }
            }
        }
    }
    return true;
}

function logProcess(data, type) {
    var str = "";
    switch (type) {
        case "add":
            str = "[新增记录]:";
            break;
        case "delete":
            str = "[删除记录]:";
            break;
    }
    for (var s in data) {
        if (searchOrderFieldMap(s) != undefined) {
            str += searchOrderFieldMap(s) + ":" + data[s] + " ";
        }
    }
    str += ";";
    return str;
}

function searchParent(name) {
    for (var i = 0; i < window.parent.length; i++) {
        if (getLastsymol(window.parent[i].location.pathname) == name) {
            return window.parent[i];
        }
    }
}

function getLastsymol(str) {
    var index = str.lastIndexOf("\/");
    str = str.substring(index + 1, str.length);
    return str;
}

function verifyStatus(isVerify, displayImg) {
    var unverifyImg = '<img src="../../images/checkfailed.png" width="100%"/>';
    var verifyImg = '<img src="../../images/checked.png" width="100%"/>';
    if (displayImg) {
        var notreviewImg = $("#notreview");
    }

    var status = "";
    var img = "";
    switch (isVerify) {
        case "":
        case "0":
        case 0:
            status = "未审核";
            img = unverifyImg;
            break;
        case "1":
        case 1:
            status = "审核通过";
            img = verifyImg;
            break;

    }
    if (displayImg) {
        notreviewImg.empty();
        notreviewImg.append(img);
    }
    return status;
}

function verifyStatus_Market(isVerify, displayImg) {
    var unverifyImg = '<img src="../../images/checkedfailedMarket.png" width="40%"/>';
    var verifyImg = '<img src="../../images/checkedMarket.png" width="40%"/>';
    if (displayImg) {
        var verifydisplayImg = $("#verifydisplay");
    }

    var status = "";
    var img = "";
    switch (isVerify) {
        case "":
        case "0":
        case 0:
            status = "未审核";
            img = unverifyImg;
            break;
        case "1":
        case 1:
            status = "审核通过";
            img = verifyImg;
            break;

    }
    if (displayImg) {
        verifydisplayImg.empty();
        verifydisplayImg.append(img);
    }
    return status;
}

function refreshTabs(obj, _title) {
    var s = {};
    s.title = _title;
    obj.tabs('select', _title); //获得当前tab
    var currTab = obj.tabs('getSelected');
    if (currTab != null) {
        var url = $(currTab.panel('options').content).attr('src');
        obj.tabs('update', {
            tab: currTab,
            options: {
                content: createFrame(url)
            }
        });
    } else {
        console.log("没有选中TABS");
    }
}

function subStrBaseUrl(_url) {
    var spritIndex = _url.lastIndexOf("\/"); //斜杠所在的位置
    var htmlIndex = _url.lastIndexOf("\.html"); //.html所在的位置
    var res = _url.substring(spritIndex + 1, htmlIndex);
    return res;

}

function constructSpecialCondition(obj) {
    for (s in obj) {
        var res = s + "=" + obj[s];
        return res;
    }
}

function authorityCheck() //如果出现用户登录信息丢失的情况,应该跳转到登录页面
{
    //	$.parent.location.href = "UI/Common/Login/Login.html";
    //	console.log("登录信息丢失"); //此处应该要跳转到登录界面
}

/*还原查询时候的信息*/
function checkAllData(address) {
    var _url = RemoteLinkAddress + address;
    $('#dg').datagrid('options').url = _url;
    $('#dg').datagrid('reload');
}

// 判断输入的是否为拼音

function isEnglish(val) {
    var ret = false;
    var reg = /^[A-Za-z]+$/;
    if (reg.test(val)) {
        return true;
    }
    return ret;
}

function isEnglishAndNumber(val) {
    var reg = /^[A-Za-z0-9]+$/;
    return reg.test(val);
}


function handleSaveReturnData(result) {
    var res = new Object;
    var rev = new Array();
    rev = result.msg.split(";");
    res.ID = rev[1];
    res.ORDER_NO = rev[2];
    getFormData(res);
    return res.ID;
}

Array.prototype.unique = function (data) {
    data = data || [];
    var a = {};
    len = data.length;
    for (var i = 0; i < len; i++) {
        var v = data[i];
        if (typeof (a[v]) == 'undefined') {
            a[v] = 1;
        }
    }
    ;
    data.length = 0;
    for (var i in a) {
        data[data.length] = i;
    }
    return data;
};

function lockButton(state) {
    if (state == "lock") {
        $(".easyui-linkbutton").each(function (index) {
            $(this).linkbutton('disable');
        });
    }
    if (state == "unlock") {
        $(".easyui-linkbutton").each(function (index) {
            $(this).linkbutton('enable');
        });
    }
}

//批量打印中处理打印次数的问题
function bulkPrintCount(bulkid, baseUrl) {
    var ids = new Array();
    ids = id.split(";");
    var _url = RemoteLinkAddress + baseUrl + '/updateprint.do?ID=';
    ids.forEach(function (val) {
        if (val != "") {
            $.ajax({
                type: "get",
                url: _url + val,
                dataType: "json",
            });
        }
    });
}

//单页面打印中处理打印次数的问题
function singlePrintCount(id, baseUrl) {
    var _url = RemoteLinkAddress + baseUrl + '/updateprint.do?ID=' + id;
    $.ajax({
        type: "get",
        url: _url,
        dataType: "json",
    });
}

//计算id为tt的表格映射到number并转化大写映射到id为dx
function CalSum() {
    var _statisticsNum = 0;
    var _selfSum = 0;
    var _freeSum = 0;
    var dataGridRows = $("#tt").datagrid("getRows");
    for (var i = 0; i < dataGridRows.length; i++) {
        if (dataGridRows[i].sum !== undefined) {
            _statisticsNum += parseFloat(dataGridRows[i].sum);
        }
        if (dataGridRows[i].freeSum !== undefined) {
            _freeSum += parseFloat(dataGridRows[i].freeSum);
        }
        if (dataGridRows[i].selfSum !== undefined) {
            _selfSum += parseFloat(dataGridRows[i].selfSum);
        }
    }
    var statisticsNum = changeMoneyToChinese(_statisticsNum);
    var selfSum = changeMoneyToChinese(_selfSum);
    var freeSum = changeMoneyToChinese(_freeSum);
    return {
        statisticsNum: {value: _statisticsNum, uppercase: statisticsNum},
        selfNum: {value: _selfSum, uppercase: selfSum},
        freeNum: {value: _freeSum, uppercase: freeSum},
    };
}

function getValueByKey(arr, key) {
    var i = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].value == key) {
            return arr[i].text;
        }
    }
    return "未能找到";
}

//用于禁用或者取消禁用表单(是否禁用 boolean ,忽略的input框 array)
function forbidFormData(ffName, isForbid, ignoreInputs) {
    $((ffName ? ffName : "#ff") + " .easyui-combobox").each(function () {
        if (ignoreInputs) {
            if (ignoreInputs.indexOf($(this).context.id) == -1) {
                $(this).combobox(isForbid ? "disable" : "enable");
            }
        } else {
            $(this).combobox(isForbid ? "disable" : "enable");
        }
    });
    $((ffName ? ffName : "#ff") + " .easyui-textbox").each(function () {
        if (ignoreInputs) {
            if (ignoreInputs.indexOf($(this).context.id) == -1) {
                $(this).textbox(isForbid ? "disable" : "enable");
            }
        } else {
            $(this).textbox(isForbid ? "disable" : "enable");
        }
    });
    $((ffName ? ffName : "#ff") + " .easyui-datebox").each(function () {
        if (ignoreInputs) {
            if (ignoreInputs.indexOf($(this).context.id) == -1) {
                $(this).datebox(isForbid ? "disable" : "enable");
            }
        } else {
            $(this).datebox(isForbid ? "disable" : "enable");
        }
    });
    $((ffName ? ffName : "#ff") + " .easyui-numberbox").each(function () {
        if (ignoreInputs) {
            if (ignoreInputs.indexOf($(this).context.id) == -1) {
                $(this).numberbox(isForbid ? "disable" : "enable");
            }
        } else {
            $(this).numberbox(isForbid ? "disable" : "enable");
        }
    });
}

//清除表单
function clearFormData(ffName) {
    $((ffName ? ffName : "#ff") + " .easyui-combobox").each(function () {
        $(this).combobox("setValue", "");
    });
    $((ffName ? ffName : "#ff") + " .easyui-textbox").each(function () {
        $(this).textbox("setValue", "");
    });
    $((ffName ? ffName : "#ff") + " .easyui-datebox").each(function () {
        $(this).datebox("setValue", "");
    });
    $((ffName ? ffName : "#ff") + " .easyui-numberbox").each(function () {
        $(this).numberbox("setValue", "");
    });
    $("#new_footer .div_footer_content_msg").each(function (index) {
        $(this).val("");
    });

}

function searchByCodeOrCodePy(value) {
    var _goodsData = JSON.parse(localStorage.getItem("GoodsData"));
    var _value = value.toLowerCase();
    var _searchGoodData = _goodsData.filter(function (current) {
        return (current.code.indexOf(value) >= 0 || current.pinyin.toLowerCase().indexOf(_value) >= 0);
    });
    return _searchGoodData;
}

//  修改权限树里面的属性名称并且添加checked属性
var CHANGETABLE = {
    "child": "children",
    "name": "text",
};

function createRoleTreeData(tree) {
    for (var i = 0; i < tree.length; i++) {
        tree[i]['checked'] = false;
        if (tree[i].child && tree[i].child.length > 0) {
            createRoleTreeData(tree[i].child);
        }
        for (var n in CHANGETABLE) {
            if (tree[i][n]) {
                tree[i][CHANGETABLE[n]] = tree[i][n];
                delete tree[i][n];
            }
        }
    }
}

//  将当前用户的权限映射到权限树中
function permissionToTree(tree, role) {
    for (var i = 0; i < tree.length; i++) {
        for (var n in role) {
            if (role.hasOwnProperty(n)) {
                if (role[n].id === tree[i].id && tree[i].children === undefined) {
                    tree[i]['checked'] = true;
                }
            }
        }
        if (tree[i].children && tree[i].children.length > 0) {
            permissionToTree(tree[i].children, role);
        }
    }
}

function checkInput() {//检查input表单值是否符合要求
    var flag = true;
    $("#ff .easyui-combobox").each(function (index) {
        if (!$(this).combobox('isValid')) {
            flag = false;
            return;
        }
        ;
    });
    $("#ff .easyui-textbox").each(function (index) {
        if (!$(this).textbox('isValid')) {
            flag = false;
            return;
        }
        ;
    });
    $("#ff .easyui-datebox").each(function (index) {
        if (!$(this).datebox('isValid')) {
            flag = false;
            return;
        }
        ;
    });
    if (!flag) {
        $.messager.alert("Info", "Format error, can not save!");
    }
    return flag;
}

function checkCombobox() {//输入与下拉不一致返回空
    var _options = $(this).combobox('options');
    var _data = $(this).combobox('getData');
    var _value = $(this).combobox('getValue');
    var _flag = false;
    for (var i = 0; i < _data.length; i++) {
        if (_data[i][_options.valueField] == _value) {
            _flag = true;
            break;
        }
    }
    if (!_flag) {
        $(this).combobox('setValue', '');
    }
}

function getReturnValue(value, type) {//logstorage的Type匹配formatter
    value = String(value);
    var reValue;
    if (value) {
        var arr = JSON.parse(localStorage.getItem(type));
        arr.forEach(function (key, index) {
            if (key.code == value) {
                reValue = key.name;
            }
        });
        return reValue;
    }
}

function convertDictData(originData, dataSourceType) {
    var dataSource = typeof dataSourceType.src === 'object' ? dataSourceType.src : JSON.parse(localStorage.getItem(dataSourceType.src));
    var result = dataSource.filter(function (current) {
        return current[dataSourceType.key] == originData;
    })[0];
    return result && result[dataSourceType.value];
}

function reConvertDictData(originData, dataSourceType) {
    var dataSource = typeof dataSourceType.src === 'object' ? dataSourceType.src : JSON.parse(localStorage.getItem(dataSourceType.src));
    var result = dataSource.filter(function (current) {
        return current[dataSourceType.value] == originData;
    })[0];
    return result && result[dataSourceType.key];
}


function convertDateData(data, type) {
    var _convert = function (originData) {
        var regDate = type === "/" ? /\d{4}[-/]\d{1,2}[-/]\d{1,2}/ : /\d{1,2}[-/]\d{1,2}[-/]\d{4}/;
        var regTime = /\d{2}:\d{2}:\d{2}/;
        var currentData = regDate.exec(originData);
        var currentTime = regTime.exec(originData);
        if (currentData) {
            currentData = currentData[0];
            var convertDate = currentData.split('-');
            var result = "";
            if (type === '/') {
                convertDate.push(convertDate.shift());
            } else {
                convertDate.unshift(convertDate.pop());
            }
            result = convertDate.join(type);
            return result + " " + (currentTime ? currentTime[0] : "");
        }
        return originData;
    };
    Object.keys(data).forEach(function (current) {
        if (typeof data[current] === 'string') {
            data[current] = _convert(data[current]);
        }
    });
    return data;
};

//将payment的内容换成其对应的code
function changeTextToValue(dataGrid, convertArray) {
    convertArray.forEach(function (current) {
        var field = current.field;
        var menu = current.menu;
        for (var i = 0; i < dataGrid.length; i++) {
            for (var j = 0; j < menu.length; j++) {
                if (dataGrid[i][field] == menu[j].text) {
                    dataGrid[i][field] = menu[j].value;
                }
            }
        }
    });
    return dataGrid;
}

//将内容换成其对应的text
function changeValueToText(dataGrid, convertArray) {
    convertArray.forEach(function (current) {
        var field = current.field;
        var menu = current.menu;
        for (var i = 0; i < dataGrid.length; i++) {
            for (var j = 0; j < menu.length; j++) {
                if (dataGrid[i][field] == menu[j].value) {
                    dataGrid[i][field] = menu[j].text;
                }
            }
        }
    });
    return dataGrid;
}

function delSpace(data) {//删除空格
    return data.replace(/\s+/g, "");
}
