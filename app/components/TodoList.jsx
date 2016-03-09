import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'
import Todo from './Todo'
import AddTodo from '../containers/AddTodo'

const TodoList = ({
    list_id,
    name,
    todos,
    onTodoClick,
    onAddTodo,
    onDelete,
    onDeleteTodo
}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            <strong>{name}</strong>

            <span className="badge pull-right">
                <span className="glyphicon glyphicon-remove"
                      onClick={onDelete}
                      style={{ cursor: 'pointer' }}></span>
            </span>
        </div>

        <ListGroup>
            {todos.map(todo =>
                <Todo
                    onClick={() => onTodoClick(list_id, todo.id)}
                    onDelete={() => onDeleteTodo(list_id, todo.id)}
                    key={todo.id}
                    {...todo}
                />
            )}
        </ListGroup>

        <div className="panel-footer">
            <AddTodo list_id={list_id} onAdd={onAddTodo} />
        </div>
    </div>
)

TodoList.propTypes = {
    list_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        done: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onAddTodo: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
}

export default TodoList
