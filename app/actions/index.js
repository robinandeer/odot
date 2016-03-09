export const receiveListsDefensive = (user) => {
    return {
        type: 'RECEIVE_LISTS',
        lists: user.lists,
        username: user.name
    }
}

export const receiveLists = () => {
    return function(dispatch) {
        $.get('/user').then(resp => {
            dispatch(receiveListsDefensive(resp))
        })
    }
}

export const addTodoListDefensive = (list_id, name) => {
    return {
        type: 'ADD_TODOLIST',
        list_id: list_id,
        name
    }
}

export const addTodoList = (name) => {
    return function(dispatch) {
        // notify server
        $.post('/api/v1/lists', { name: name }).then(resp => {
            // update UI
            dispatch(addTodoListDefensive(resp.id, name))
        })
    }
}

export const deleteTodoListDefensive = (list_id) => {
    return {
        type: 'DELETE_TODOLIST',
        list_id
    }
}

export const deleteTodoList = (list_id) => {
    return function(dispatch) {
        $.ajax({
            url: `/api/v1/lists/${list_id}`,
            type: 'DELETE'
        }).then((resp) => {
            console.log(resp)
            dispatch(deleteTodoListDefensive(list_id))
        })
    }
}

export const addTodoDefensive = (list_id, todo_id, text) => {
    return {
        type: 'ADD_TODO',
        todo_id: todo_id,
        list_id,
        text
    }
}

export const addTodo = (list_id, text) => {
    return function(dispatch) {
        $.post('/api/v1/todos', {
            list_id: list_id,
            text: text
        }).then(resp => {
            dispatch(addTodoDefensive(list_id, resp.id, text))
        })
    }
}

export const toggleTodoDefensive = (list_id, todo_id) => {
    return {
        type: 'TOGGLE_TODO',
        list_id,
        todo_id
    }
}

export const toggleTodo = (list_id, todo_id) => {
    return function(dispatch) {
        $.ajax({
            url: `/api/v1/todos/${todo_id}`,
            type: 'PUT',
        }).then(resp => {
            dispatch(toggleTodoDefensive(list_id, todo_id))
        })
    }
}

export const deleteTodoDefensive = (list_id, todo_id) => {
    return {
        type: 'DELETE_TODO',
        list_id,
        todo_id
    }
}

export const deleteTodo = (list_id, todo_id) => {
    return function(dispatch) {
        $.ajax({
            url: `/api/v1/todos/${todo_id}`,
            type: 'DELETE',
        }).then(resp => {
            dispatch(deleteTodoDefensive(list_id, todo_id))
        })
    }
}
