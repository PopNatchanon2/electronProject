function addItem() {
    var item = document.getElementById("InputItem").value;
    var id = document.getElementsByClassName("list-group-item").length;
    if (item) {
        var li_item = `
        <li class="list-group-item clearfix" id="todo-${id}">
            <div class="form-check form-group float-left">
                <input class="form-check-input" id="todo-item-${id}" type="checkbox">
                <label class="form-check-label" for="todo-item-${id}">${item}</label>
            </div>
            <div class="float-right" onclick="deleteItem('todo-${id}')"><i class="fas fa-times"></i></div>
        </li>`;
        document.getElementById("todolist-item").insertAdjacentHTML('beforeend', li_item);
        document.getElementById("InputItem").value = '';
        document.getElementById(`todo-${id}`).addEventListener("click", checkitem);
    }
}
function clearItem() {
    document.getElementById("InputItem").value = '';
}
function deleteItem(val) {
    document.getElementById(val).remove();
}
var checkitem = function () {
    if (this.childNodes[1].childNodes[1].checked) {
        this.classList.add('done');
    } else {
        this.classList.remove('done');
    }
}