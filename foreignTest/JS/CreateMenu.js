var _menus = {
    basic: [
        {
            "menuid": "1",
            "menuname": "我的物联",
            "icon": "icon-logistic",
            "menus": [{
                "menuid": "011",
                "menuname": "我的设备",
                "url": "UI/Device/DeviceList.html",
                "menus": []
            }, {
                "menuid": "012",
                "menuname": "传感器与控制器",
                "url": "UI/OriginalOrder/List.html",
                "icon": "icon-logistic",
                "menus": []
            }, {
                "menuid": "013",
                "menuname": "实时监控",
                "url": "UI/OriginalOrder/List.html",
                "menus": []
            }, {
                "menuid": "014",
                "menuname": "地图模式",
                "url": "UI/OriginalOrder/List.html",
                "menus": []
            }, {
                "menuid": "014",
                "menuname": "集中监控",
                "url": "UI/OriginalOrder/List.html",
                "menus": []
            },]
        }, {
            "menuid": "4",
            "menuname": "基础信息",
            "icon": "icon-information",
            "menus": [{
                "menuid": "041",
                "menuname": "物流基础信息",
                "menus": [{
                    "menuid": "0411",
                    "menuname": "供货商",
                    "url": "UI/BasicData/SupplyList.html"
                }, {
                    "menuid": "0412",
                    "menuname": "供货商类型",
                    "url": "UI/BasicData/SupplyTypeList.html"
                }, {
                    "menuid": "0413",
                    "menuname": "配送单位",
                    "url": "UI/BasicData/OrderUnitList.html"
                }, {
                    "menuid": "0414",
                    "menuname": "内部商品名",
                    "url": "UI/BasicData/GoodsList.html"
                }, {
                    "menuid": "0418",
                    "menuname": "商品名转换",
                    "url": "UI/BasicData/GoodsConvertList.html"
                }, {
                    "menuid": "0420",
                    "menuname": "用户组",
                    "url": "UI/BasicData/CustomerTypeList.html"
                }, {
                    "menuid": "0419",
                    "menuname": "库房名称",
                    "url": "UI/BasicData/StoreHouseList.html"
                }, {
                    "menuid": "0420",
                    "menuname": "内部商品类型",
                    "url": "UI/BasicData/GoodsTypeList.html"
                }, {
                    "menuid": "0421",
                    "menuname": "库房损耗类型",
                    "url": "UI/BasicData/StoreHouseLossTypeList.html"
                },{
                    "menuid": "0422",
                    "menuname": "批量审批日志",
                    "url": "UI/BasicData/AuditLogList.html"
                },]

            }]
        }, {
            "menuid": "5",
            "menuname": "基础设置",
            "icon": "icon-usermanagement",
            "menus": [{
                "menuid": "051",
                "menuname": "用户权限",
                "menus": [{
                    "menuid": "0512",
                    "menuname": "角色管理",
                    "url": "UI/RoleManager/RoleManagerList.html"
                }, {
                    "menuid": "0513",
                    "menuname": "用户管理",
                    "url": "UI/UserManager/UserList.html"
                }, {
                    "menuid": "0513",
                    "menuname": "微信用户管理",
                    "url": "UI/WechatUser/List.html"
                }, {
                    "menuid": "0415",
                    "menuname": "部门信息",
                    "url": "UI/Department/DepartmentList.html"
                }, {
                    "menuid": "0521",
                    "menuname": "菜单配置",
                    "url": "UI/Menu/MenuList.html"
                }, {
                    "menuid": "0415",
                    "menuname": "系统设置",
                    "url": "UI/Common/Set/Set.html"
                },{
                    "menuid": "0423",
                    "menuname": "基础数据管理",
                    "url": "UI/BasicData/SystemSetList.html"
                }]
            }, {
                "menuid": "052",
                "menuname": "数据同步",
                "menus": [{
                    "menuid": "0521",
                    "menuname": "同步基础数据",
                    "url": "UI/DataSynch/GetDataSync.html"
                }, {
                    "menuid": "0521",
                    "menuname": "同步采购数据",
                    "url": "UI/DataSynch/PushPurchaseOrderToServer.html"
                }, {
                    "menuid": "0521",
                    "menuname": "同步结算数据",
                    "url": "UI/DataSynch/PushSettlementOrderToServer.html"
                },]
            }]
        },
    ]
};

var gRequestHandle = new RequestHandle();
var gApiKey = "PERMISSION";


// 接口parent,getchrild获取菜单数据
// CreatMenu_1();
function CreatMenu_1() {
    var _menu = {};
    var _menu_basic = [];
    GetParentMenuData();
    setTimeout(function () {
        _menu.basic = constructMenuTreeData2(_menu_basic);
        CreateMenu(_menu);
    }, 1600);

    function GetParentMenuData() {
        gRequestHandle.getRemoteData(gApiKey, "parents").done(function (result) {
            var _data = result.data;
            if (_data) {
                _data.forEach(function (item) {
                    _menu_basic.push(item);
                    GetChrildMenuData(item);
                });
            }

        });
    }

    function GetChrildMenuData(Parent_data) {
        var Send_id = {
            id: Parent_data.id,
        };
        gRequestHandle.getRemoteData(gApiKey, "getchild", Send_id).done(function (result) {
            var _data = result.data;
            if (_data) {
                _data.forEach(function (item) {
                    _menu_basic.push(item);
                    GetChrildMenuData(item);
                });
            }
        });
    }

    function constructMenuTreeData2(data, parentId = 0) {
        var tree = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].parentId == parentId) {
                var obj = data[i];
                var temp = constructMenuTreeData2(data, data[i].id);
                if (temp.length > 0) {
                    obj.menus = temp;
                    if (obj.parentId == 0) {
                        tree.push({
                            menuid: obj.id,
                            menuname: obj.name,
                            icon: obj.icon,
                            menus: obj.menus,
                        });
                    } else {
                        tree.push({
                            menuid: obj.id,
                            menuname: obj.name,
                            menus: obj.menus,
                        });
                    }
                } else {
                    tree.push({
                        menuid: obj.id,
                        menuname: obj.name,
                        url: obj.route,
                    });
                }
            }
        }
        return tree;
    }
}

// 接口current/list获取所有菜单数据，接口无数据
// CreatMenu_2();
function CreatMenu_2() {
    var _menu = {};
    var _menu_basic = [];
    gRequestHandle.getRemoteData("BASECODE", "current/list").done(function (result) {
        var _data = result.data;
        _menu.basic = constructMenuTreeData2(_data);

        function constructMenuTreeData2(data, parentId = 0) {
            var tree = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].parentId == parentId) {
                    var obj = data[i];
                    var temp = constructMenuTreeData2(data, data[i].id);
                    if (temp.length > 0) {
                        obj.menus = temp;
                        if (obj.parentId == 0) {
                            tree.push({
                                menuid: obj.id,
                                menuname: obj.name,
                                icon: obj.icon,
                                menus: obj.menus,
                            });
                        } else {
                            tree.push({
                                menuid: obj.id,
                                menuname: obj.name,
                                menus: obj.menus,
                            });
                        }
                    } else {
                        tree.push({
                            menuid: obj.id,
                            menuname: obj.name,
                            url: obj.route,
                        });
                    }
                }
            }
            return tree;
        }
    });
}

// 接口menu/tree获取所有菜单数据
// CreatMenu_3();
function CreatMenu_3() {
    var _menu = {};
    var _menu_basic = [];
    gRequestHandle.getRemoteData(gApiKey, "menu/tree").done(function (result) {
        var _data = result.data;
        clear_attr(_data);

        function clear_attr(chrild_menu) {
            if (!chrild_menu) {
                return;
            }
            chrild_menu.forEach(function (item) {
                item.menus = item.child;
                item.menuid = item.id;
                item.menuname = item.name;
                item.url = item.route;
                delete item.route;
                delete item.name;
                delete item.id;
                delete item.child;
                delete item.mpid;
                delete item.bpid;
                delete item.sort;
                delete item.type;
                clear_attr(item.menus);
            });
        }

        _menu.basic = _data;
        CreateMenu(_menu);
    });
}

function CreateMenu(_data) {
    /////构建第一级菜单
    var s = _data.basic;
    var content = "";
    content += "<ul id='menus'>";
    s.forEach((item, index) => {
        content += "<li class='menu-btn'><span class='menu_icon " + item.icon + "'></span><p>";
        content += item.menuname + "</p>";
        if (item.menus) {
            //一级菜单
            content += "<ul class='menus_first'>";
            item.menus.forEach((item, index) => {
                content += "<li><a href='#' name='" + item.menuname + "' rel='" + item.url + "' onclick='addnav(this.rel,this.name)'>";
                content += item.menuname;
                content += "</a>";
                if (item.menus) {
                    content += "<ul class='menus_second'>";
                    item.menus.forEach((item, index) => {
                        content += "<li><a href='#' name='" + item.menuname + "' rel='" + item.url + "' onclick='addnav(this.rel,this.name)'>";
                        content += item.menuname;
                        content += "</a></li>";
                    });
                }
                content += "</ul></li>";
            });
            content += "</ul>";
        }
        content += "</li>";
    });
    content += "</ul>";
    $("#td_menu").append(content);
    $('.menus_first').find('ul').parent().attr("class", "menusFirst_btn");
    addMenuEvent();
}

function addMenuEvent() {
    $(".menu-btn").mouseover((e) => {
        var _ele = e.target;
        if (_ele.parentElement.id == "menus") {
            _ele.id = "menus_on";
        } else if (_ele.parentElement.className == "menu-btn") {
            _ele.parentElement.id = "menus_on";
        }
    });
    $(".menu-btn").mouseleave(() => {
        $("#menus_on").removeAttr("id");
    });
    $(".menusFirst_btn").mouseover((e) => {
        var _ele = e.target;
        if (_ele.parentElement.className == "menusFirst_btn") {
            _ele.parentElement.id = "menusFirst_on";
        } else if (_ele.className == 'menusFirst_btn') {
            _ele.id = "menusFirst_on";
        }
    });
    $('.menusFirst_btn').mouseleave(() => {
        $("#menusFirst_on").removeAttr("id");
    });
}

function addnav(_url, _name) {
    AddTabIn(_name, $("#ifrmList")[0].contentWindow.$('#tabs'), _url);
    localStorage.setItem("dataType",_name)
    //       $("#ifrmList")[0].contentWindow.$('#dg')
}