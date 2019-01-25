function CreatTable(_data, ModelArr, Table, id, row, col) {
    var _newTr;
    var _newTd;
    var index = 0;
    //匹配单双行和生成2对td
    for (var i = 0; i < row; i++) {
        _newTr = Table.insertRow();
        for(var j = 0; j < col; j++ ){
            _newTd = _newTr.insertCell();
            _newTd.innerHTML = ModelArr[index].value;
            _newTd = _newTr.insertCell();
            _newTd.innerHTML = _data[ModelArr[index].field] ? _data[ModelArr[index].field] : "";
            index++;
        }
    }
    $("#"+id+" tr:even").css("background", "#f5f5f5").css("border-style","solid").css("border-width",1);
    $("#"+id+" tr:odd").css("background", "#ffffff").css("border-style","solid").css("border-width",1);
}