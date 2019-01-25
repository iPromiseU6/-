function CreatTable(_data, ModelArr, Table) {
    var _newTr = [];
    var _newTd = [];
    //匹配单双行和生成2对td
    var TdName_1 = 0;
    var TdName_2 = 1;
    for (var i = 0; i < ModelArr.length / 2; i++) {
        _newTr[i] = Table.insertRow();
        _newTd[TdName_1] = _newTr[i].insertCell();
        _newTd[TdName_1].innerHTML = ModelArr[i*2].value;
        _newTd[TdName_1 + 1] = _newTr[i].insertCell();
        _newTd[TdName_1 + 1].innerHTML = _data[ModelArr[i*2].field] ? _data[ModelArr[i*2].field] : "";
        _newTd[TdName_2 * 2] = _newTr[i].insertCell();
        _newTd[TdName_2 * 2].innerHTML = ModelArr[i * 2 + 1].value;
        _newTd[TdName_2 * 2 + 1] = _newTr[i].insertCell();
        _newTd[TdName_2 * 2 + 1].innerHTML = _data[ModelArr[i * 2 + 1].field] ? _data[ModelArr[i * 2 + 1].field] : "";
    }
    $("#Table tr:even").css("background", "#f5f5f5");
    $("#Table tr:odd").css("background", "#ffffff");
}