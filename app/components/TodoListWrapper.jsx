import React, { Component, PropTypes } from 'react'
import TodoList from './TodoList'


const TodoListWrapper = ({
    lists,
    onTodoClick,
    onAddTodo,
    onDeleteList,
    onDeleteTodo
}) => (
    <div>
        {lists.map(list =>
            <TodoList
                key={list.id}
                list_id={list.id}
                onTodoClick={onTodoClick}
                onAddTodo={onAddTodo}
                onDelete={() => onDeleteList(list.id)}
                onDeleteTodo={onDeleteTodo}
                {...list}
            />
        )}
    </div>
)

TodoListWrapper.propTypes = {
    lists: PropTypes.array.isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onAddTodo: PropTypes.func.isRequired,
    onDeleteList: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
}

export default TodoListWrapper
