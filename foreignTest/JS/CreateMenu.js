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
                "menuname": "传感器列表",
                "url": "UI/Sensor/SensorList.html",
                "icon": "icon-logistic",
                "menus": []
            },]
        }, {
            "menuid": "4",
            "menuname": "数据展示",
            "icon": "icon-information",
                "menus": [{
                    "menuid": "0411",
                    "menuname": "实时数据",
                    "url": "UI/Data/TimeData.html",
                    "menus": []
                }, {
                    "menuid": "0412",
                    "menuname": "历史数据",
                    "url": "UI/Data/HistoryData.html",
                    "menus": []
                }, {
                    "menuid": "0413",
                    "menuname": "数据分布统计",
                    "url": "UI/Data/DataDistribution.html",
                    "menus": []
                }, {
                    "menuid": "0414",
                    "menuname": "数据报警分析",
                    "url": "UI/Data/DataMonitor.html",
                    "menus": []
                },{
                    "menuid": "0415",
                    "menuname": "异常信息收集",
                    "url": "UI/Data/WarningData.html",
                    "menus": []
                },]

        }, {
            "menuid": "5",
            "menuname": "基础设置",
            "icon": "icon-usermanagement",
            "menus": [{
                    "menuid": "0411",
                    "menuname": "档位设置",
                    "url": "UI/Setting/GearSetting.html",
                    "menus": []
                    },]


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
                if(!item.url){
                    content += "<li><a href='#'>";
                }else{
                    content += "<li><a href='#' name='" + item.menuname + "' rel='" + item.url + "' onclick='addnav(this.rel,this.name)'>";
                }
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
