const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.todo_id,
                text: action.text,
                done: false
            }

        case 'TOGGLE_TODO':
            return {
                ...state,
                done: !state.done
            }

        default:
            return state
    }
}

const todolist = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {
                id: action.list_id,
                name: action.name,
                todos: []
            }

        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    todo(undefined, action),
                    ...state.todos
                ]
            }

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(item => {
                    if (item.id === action.todo_id) {
                        return todo(item, action)
                    } else {
                        return item
                    }
                })
            }

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(item => item.id !== action.todo_id)
            }

        default:
            return state
    }
}

const todolists = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return [
                ...state,
                todolist(undefined, action)
            ]

        case 'DELETE_TODOLIST':
            return state.filter(list => list.id !== action.list_id)

        case 'ADD_TODO':
        case 'TOGGLE_TODO':
        case 'DELETE_TODO':
            return state.map(list => {
                if (list.id === action.list_id) {
                    return todolist(list, action)
                } else {
                    return list
                }
            })

        default:
            return state
    }
}

const appdata = (state = {lists: [], username: ''}, action) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
        case 'DELETE_TODOLIST':
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
        case 'DELETE_TODO':
            return {
                ...state,
                lists: todolists(state.lists, action)
            }

        case 'RECEIVE_LISTS':
            return {
                username: action.username,
                lists: action.lists
            }

        default:
            return state
    }
}

export default appdata
