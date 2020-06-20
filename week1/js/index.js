let todoItems = [];
window.onload = () => {
	document.querySelector('.add').addEventListener('click', addTodo);
	document.querySelector('#removeAll').addEventListener('click', clearAllTodo);
<<<<<<< HEAD
	document.querySelectorAll('.list').forEach((list) => { list.addEventListener('click', actionFn); });
	todoItems.push({
			id: Math.floor(new Date().getTime()),
			title: 'new Task',
			completed: false
		}, {
			id: Math.floor(new Date().getTime()),
			title: 'new Task2',
			completed: false
		});
=======
	document.querySelectorAll('.list').forEach((list) => { list.addEventListener('click', actionFn)});
	todoItems.push({
		id: Math.floor(new Date().getTime()),
		title: 'new Task',
		completed: false
	}, {
		id: Math.floor(new Date().getTime()),
		title: 'new Task2',
		completed: false
	});
>>>>>>> gh-pages
	renderView();
}

const addTodo = () => {
	let val = document.querySelector('#new-todo').value.trim();
	if (val) {
		todoItems.push({
			id: new Date().getTime(),
			title: val,
			completed: false,
		})
		document.querySelector('#new-todo').value = "";
	}
	renderView();
}

const renderView = () => {
	let noFinishItems = '';
	let finishItems = '';
	
	todoItems.forEach((item, i) => {
		if (!item.completed) {
			noFinishItems +=  `<div class='item' data-id=${i}>
				<input type="checkbox" class="todo-item-chk[]" data-action="check">
				<label for='todo-item-chk[]' data-action="check">${item.title}</label>
				<button type="button" class="trash-btn" data-action="trash">
					<i class="fa fa-trash"></i>
				</button>
			</div>`;
		} else {
			finishItems += `<div class='item' data-id=${i}>
				<input type="checkbox" class="todo-item-chk[] hide" data-action="check" checked><i class="fa fa-check" data-action="check"></i>
				<label for='todo-item-chk[]' data-action="check">${item.title}</label>
				<button type="button" class="trash-btn" data-action="trash">
					<i class="fa fa-trash"></i>
				</button>
			</div>`;
		}	
	})
<<<<<<< HEAD
	let noTask = `<span> No Any Task!</span>`;
=======
	let noTask = `<span>No Any Task!</span>`;
>>>>>>> gh-pages
	document.querySelector('.todo-list').innerHTML = noFinishItems ||  noTask;
	document.querySelector('.done-list').innerHTML = finishItems || noTask;
	document.querySelector('#count').innerHTML = todoItems.filter((el) => !el.completed).length;
}

const actionFn = (e) => {
	let action = 
		e.target.parentNode.dataset.action || e.target.dataset.action;
	let id = 
		e.target.parentNode.parentNode.dataset.id || e.target.parentNode.dataset.id;
	switch(action) {
		case 'trash':
			trashTodo(id);
			break;
		case 'check':
			checkTodo(id);
			break;
	}
}

<<<<<<< HEAD
const trashTodo = (id) => { renderView(todoItems.splice(id, 1)); };
const checkTodo = (id) => { renderView(todoItems[id].completed = !todoItems[id].completed); };
=======
const trashTodo = (id) => { renderView( todoItems.splice(id, 1) ); }
const checkTodo = (id) => { renderView( todoItems[id].completed = !todoItems[id].completed ); }
>>>>>>> gh-pages
const clearAllTodo = () => { renderView( todoItems = [] ); };
