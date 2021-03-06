var data = (localStorage.getItem('taskList')) ? JSON.parse(localStorage.getItem('taskList')): {
    task: [],
    completed: []
};


//imported remove and done icons in SVG format
var removeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>'
var doneSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>'

renderTaskList();

//created a function to track if the user clicked the add button
document.getElementById('addItem').addEventListener('click', function() {
    //creating a variable named value to store the data user inputed in the textarea and use it
    var value = document.getElementById('item').value;
    // console.log(value); to check if the given data is stored or not console log prints the log data that is not shown to the user
    if(value)
    { addItem(value); }

});

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if((e.code === 'Enter' || e.code === 'NumpadEnter') && value)
    { addItem(value); }
});

function addItem (value) {
    addItemToHTML(value);
    document.getElementById('item').value='';
    data.task.push(value);
    updatedData();
    
}

function renderTaskList()
{
    if(!data.task.length && !data.completed.length)
    return;
    for(var i = 0; i < data.task.length; i++)
    {
        var value = data.task[i];
        addItemToHTML(value);
    }
    for(var j=0; j < data.completed.length; j++)
    {
        var value = data.completed[i];
        addItemToHTML(value, true);
    }
}

function updatedData(){
    localStorage.setItem('taskList', JSON.stringify(data));
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    if(id == 'task')
    data.task.splice(data.task.indexOf(value), 1);
    else
    data.completed.splice(data.task.indexOf(value), 1);
    parent.removeChild(item);
    updatedData();
}

function doneItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    if(id === 'task')
    {
    data.task.splice(data.task.indexOf(value),1);
    data.completed.push(value);
    }
    else{
        data.completed.splice(data.task.indexOf(value),1);
        data.task.push(value);
    }
    //checking if the tasks added is completed or not using ternary operations
    var target = (id === 'task') ? document.getElementById('completed') : document.getElementById('task');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
    updatedData();
}

function addItemToHTML(text, completed){
    var list = (completed) ? document.getElementById('completed') : document.getElementById('task');

    var item=document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    //recording click when task is removed
    remove.addEventListener('click', removeItem);

    var done = document.createElement('button');
    done.classList.add('done');
    done.innerHTML = doneSVG;
    //recording click when task is completed
    done.addEventListener('click', doneItem);

    buttons.appendChild(remove);
    buttons.appendChild(done);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}