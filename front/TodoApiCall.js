GetTodo()
async function GetTodo() {
    const todo = await fetch('http://127.0.0.1:8000/tasks')
        .then(response => response.json())


    // HTMLの要素を取得する
    const TodoListBody = document.getElementById('TodoList-body');

    console.log(todo);

    while (TodoListBody.firstChild) {
        TodoListBody.removeChild(TodoListBody.firstChild);
    }


    todo.forEach(TodoItem => {
        // console.log(TodoItem.id);


        const TodoListElement = document.createElement('tr');

        const tdId = document.createElement('th');
        const tdTitle = document.createElement('td');
        const tdDescription = document.createElement('td');
        const tdCheckbox = document.createElement('td');
        const checkbox = document.createElement('input');
        const tdDeleteButton = document.createElement('td');
        const DeleteButton = document.createElement('button');

        this.scope = "row";
        tdId.textContent = TodoItem.id;
        tdTitle.textContent = TodoItem.title;
        tdDescription.textContent = TodoItem.detail;
        checkbox.type = "checkbox";
        checkbox.name = "checkbox";
        checkbox.id = "checkbox-" + TodoItem.id;
        tdCheckbox.appendChild(checkbox);
        DeleteButton.textContent = "Delete";
        DeleteButton.type = "button";
        DeleteButton.name = "DeleteButton";
        DeleteButton.id = "DeleteButton-" + TodoItem.id;
        DeleteButton.value = TodoItem.id;
        DeleteButton.className = "btn btn-outline-danger btn-sm"
        tdDeleteButton.appendChild(DeleteButton);
        if (TodoItem.complete) {
            checkbox.checked = true;
        }

        checkbox.value = TodoItem.id;

        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                console.log(`Task ID ${event.target.value} is checked`);
                FlipDonePending(event.target.value);
            } else {
                console.log(`Task ID ${event.target.value} is unchecked`);
                FlipDonePending(event.target.value);
            }
        });

        DeleteButton.addEventListener('click', (event) => {
            console.log(`Task ID ${event.target.value} is deleted`);
            DeleteTask(event.target.value);
        }
        );



        TodoListElement.appendChild(tdId);
        TodoListElement.appendChild(tdCheckbox);
        TodoListElement.appendChild(tdTitle);
        TodoListElement.appendChild(tdDescription);
        TodoListElement.appendChild(tdDeleteButton);

        TodoListBody.appendChild(TodoListElement);




    });



}

async function AddTodo() {

    const title = document.getElementById('todo-title').value;
    const detail = document.getElementById('todo-detail').value;
    let body = {
        title: title,
        detail: detail
    }

     console.log(body)



    const todo = await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    }
    ).then(response => response.json())
        //.then(data => console.log(data));
        .then(data => GetTodo());


    // 送信後フォームをクリア

    var form = document.getElementById("AddTodo");
    form.reset();


}

async function FlipDonePending(taskid) {
    const checkbox = document.getElementById('checkbox');


    console.log("http://127.0.0.1:8000/tasks/" + taskid);
    const todo = await fetch("http://127.0.0.1:8000/tasks/" + taskid, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    }
    ).then(response => response.json())
        //.then(data => console.log(data));
        .then(data => GetTodo());

}

async function DeleteTask(taskid) {
    const checkbox = document.getElementById('checkbox');


    console.log("http://127.0.0.1:8000/tasks/" + taskid)
    const todo = await fetch("http://127.0.0.1:8000/tasks/" + taskid, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    ).then(response => response.json())
        .then(data => GetTodo());

}