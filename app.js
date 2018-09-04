
// reference to localStorage
let storage = window.localStorage;
let list = JSON.parse(storage.getItem('shopping-list'));
if (list === null) {
    storage.setItem('shopping-list', JSON.stringify([]));
}




var appendList = function (array, location) {
    if (array === null) {
        return '';
    }  
    var template = array.map(function (item, id) {
        return '<li class="item" id="' + id + '">' + item + '<button class="delete">delete</button><button class="check">check</button></li>';
    });
    $(location).html(template);
};

var deleteItem = function (array, itemToDelete) {
    array.splice(itemToDelete, 1);
    storage.setItem('shopping-list', JSON.stringify(array));
    appendList(array, $('.list'));
};

var addItem = function (item) {
    var itemToAdd = [];
    itemToAdd.push(item);
    var shoppingList = JSON.parse(storage.getItem('shopping-list'));
    shoppingList.push(itemToAdd);
    storage.setItem('shopping-list', JSON.stringify(shoppingList));
    
};

$(function () {

    appendList(list, $('.list'));

    $('.list').on('click', '.delete', function (ev) {
        var itemToDelete = $(ev.currentTarget).closest('li').attr('id');
        deleteItem(list, itemToDelete);
    });

    $('form').submit(function (event) {
        event.preventDefault();
        var item = $('input').val();
        addItem(item);
        list.push(item);
        appendList(list, $('.list'));
    });

    $('.list').on('click', '.check', function () {
        $(this).parent().toggleClass('checked');
    });

});