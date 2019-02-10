function RequestHandle() {
}

// 创建时间：2018.9.8
// 创建人：谢先博
// 功能说明：ajax get方法的封装，必须带有Token验证信息
// 参数说明：
// apiKey:类型为string,具体的值必须使用RequestUrl中的定义，否则找不到
// restMethod：类型为String,输入具体的API方法如'list',具体请参考后端的API
// param：类型为object，输入附加参数
// 返回：异步函数
RequestHandle.prototype.getRemoteData = function (apiKey, restMethod, param) {
    var _url;
    if (param) {
        _url = RequestUrl.constructURL(apiKey, restMethod, param);
    } else {
        _url = RequestUrl.constructURL(apiKey, restMethod);
    }
    return $.ajax({ //调用ajax方法，从服务器获取到该订单的所有数据
        type: "get",
        headers: {
            Authorization: sessionStorage.getItem("token"),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        url: _url,
        dataType: "json", //服务器返回的数据类型
    });
};

RequestHandle.prototype.putRemoteData = function (apiKey, restMethod, param) {
    var _url;
    _url = RequestUrl.constructURL(apiKey, restMethod);
    return $.ajax({ //调用ajax方法，从服务器获取到该订单的所有数据
        type: "put",
        headers: {
            Authorization: sessionStorage.getItem("token"),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        url: _url,
        data: param ? JSON.stringify(param) : JSON.stringify({}),
        dataType: "json", //服务器返回的数据类型
    });
};
// 创建时间：2018.9.8
// 创建人：谢先博
// 功能说明：ajax get 方法的封装,不需要带有Token
// 参数说明：
// apiKey:类型为string,具体的值必须使用RequestUrl中的定义，否则找不到
// restMethod：类型为String,输入具体的API方法如'list',具体请参考后端的API
// param：类型为object，输入附加参数
// 返回：异步函数
RequestHandle.prototype.getRemoteDataWithOutToken = function (apiKey, restMethod, param) {
    var _url;
    if (param) {
        _url = RequestUrl.constructURL(apiKey, restMethod, param);
    } else {
        _url = RequestUrl.constructURL(apiKey, restMethod);
    }
    return $.ajax({ //调用ajax方法，从服务器获取到该订单的所有数据
        type: "get",
        url: _url,
        dataType: "json", //服务器返回的数据类型
    });
};
// 创建时间：2018.9.8
// 创建人：谢先博
// 功能说明：ajax Post方法的封装,必须带有Token
// 参数说明：
// apiKey:类型为string,具体的值必须使用RequestUrl中的定义，否则找不到
// restMethod：类型为String,输入具体的API方法如'list',具体请参考后端的API
// param：类型为object，输入附加参数
// 返回：异步函数
RequestHandle.prototype.postRemoteData = function (apiKey, restMethod, sendData) {

    var _url = RequestUrl.constructURL(apiKey, restMethod);
    return $.ajax({
        dataType: 'JSON',
        url: _url,
        data:  sendData ? JSON.stringify(sendData) : JSON.stringify({}),
        type: "POST",
        headers: {
            Authorization: sessionStorage.getItem("token"),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }).complete(function (response) {
        if (response.status == 401) {
            var _urlToLocalLength = window.urlinfo.split("/").reverse().indexOf("UI");
            var _loginUrl = function () {
                var _dol = "";
                for (var _ = 0; _ < _urlToLocalLength; _++) {
                    _dol += "../";
                }
                return _dol + "UI/Login/Login.html";
            };
            window.location = _loginUrl();
        }
    });
};
RequestHandle.prototype.postWithOutData = function (apiKey, restMethod) {
    var _url = RequestUrl.constructURL(apiKey, restMethod);
    return $.ajax({
        dataType: 'JSON',
        url: _url,
        type: "POST",
        data:"",
        headers: {
            Authorization: sessionStorage.getItem("token"),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }).complete(function (response) {
        if (response.status == 401) {
            var _urlToLocalLength = window.urlinfo.split("/").reverse().indexOf("UI");
            var _loginUrl = function () {
                var _dol = "";
                for (var _ = 0; _ < _urlToLocalLength; _++) {
                    _dol += "../";
                }
                return _dol + "UI/Login/Login.html";
            };
            window.location = _loginUrl();
        }
    });
};
// 创建时间：2018.12.1
// 创建人：吴永佳
// 功能说明：ajax DELETE方法的封装,必须带有Token
// 参数说明：
// apiKey:类型为string,具体的值必须使用RequestUrl中的定义，否则找不到
// restMethod：类型为String,输入具体的API方法如'del',具体请参考后端的API
// param：类型为object，输入附加参数
// 返回：异步函数
RequestHandle.prototype.delRemoteData = function (apiKey, restMethod, sendData) {

    var _url = RequestUrl.constructURL(apiKey, restMethod);
    return $.ajax({
        dataType: 'JSON',
        url: _url,
        data: sendData,
        type: "DELETE",
        headers: {
            Authorization: sessionStorage.getItem("token"),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
};
// 创建时间：2018.9.8
// 创建人：谢先博
// 功能说明：ajax Post方法的封装,不需要带有Token
// 参数说明：
// apiKey:类型为string,具体的值必须使用RequestUrl中的定义，否则找不到
// restMethod：类型为String,输入具体的API方法如'list',具体请参考后端的API
// param：类型为object，输入附加参数
// 返回：异步函数
RequestHandle.prototype.postRemoteDataWithOutToken = function (apiKey, restMethod, sendData) {
    sendData = JSON.stringify(sendData);
    var _url = RequestUrl.constructURL(apiKey, restMethod);
    return $.ajax({
        dataType: 'JSON',
        url: _url,
        data: sendData,
        type: "POST",
        headers: {
            token: sessionStorage.getItem("token"),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        success: function(data, status, xhr) {

        }
    });
};

// 创建时间：2018.9.8
// 创建人：谢先博
// 功能说明：全局的API后端地址构建
// 参数说明：
// apiKey:类型为string,具体的值必须使用RequestUrl中的定义，否则找不到
// restMethod：类型为String,输入具体的API方法如'list',具体请参考后端的API
// param：类型为object，输入附加参数
// 返回：构建后的URL地址
var RequestUrl = {
    baseURL: GLOBAL_URL,
    API: {
        LOGIN: "/user/login",
        DEVICE:"/device",
        SENSOR:"/sensor"


},
    constructURL: function (apiKey, restMethod, paramObj) {
        console.log(apiKey)
        var _paramURL = "";
        if (arguments.length < 1) {
            console.log("此函数必须有一个参数");
            return "";
        }
        if (!this.API.hasOwnProperty(apiKey)) {
            console.log("apiKey输入错误，请在RequestUrl的API属性中找到具体的定义");
            return "";
        }
        if (paramObj) {
            if (paramObj instanceof Object) {
                for (o in paramObj) {
                    if (_paramURL == "") {
                        _paramURL = "?" + o + "=" + paramObj[o];
                    } else {
                        _paramURL += "&" + o + "=" + paramObj[o];
                    }
                }
                _paramURL = this.baseURL + this.API[apiKey] + (restMethod === "" ? "" : "/" + restMethod) + _paramURL;
            } else {
                console.log("参数应该为一个object");
            }
        } else {
            _paramURL = this.baseURL + this.API[apiKey] + (restMethod === "" ? "" : "/") + restMethod;
        }
        return _paramURL;
    },
};
