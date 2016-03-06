import React, { PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap'

const Todo = ({ text, done, onClick, onDelete }) => (
    <ListGroupItem
        onClick={onClick}
        style={{
            textDecoration: done ? 'line-through': 'none'
        }}
    >
        {text}

        <span className="badge pull-right">
            <span className="glyphicon glyphicon-remove"
                  onClick={onDelete}></span>
        </span>
    </ListGroupItem>
)

Todo.propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Todo
