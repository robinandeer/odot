import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoListWrapper from '../components/TodoListWrapper'

const mapStateToProps = (state) => {
    return {
        lists: state.lists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (list_id, todo_id) => {
            dispatch(actions.toggleTodo(list_id, todo_id))
        },

        onAddTodo: (list_id, text) => {
            dispatch(actions.addTodo(list_id, text))
        },

        onDeleteList: (list_id) => {
            dispatch(actions.deleteTodoList(list_id))
        },

        onDeleteTodo: (list_id, todo_id) => {
            dispatch(actions.deleteTodo(list_id, todo_id))
        }
    }
}

const VisibleTodoLists = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListWrapper)

export default VisibleTodoLists
