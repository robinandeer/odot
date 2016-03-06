import React, { PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap'

const Todo = ({ text, done, onClick, onDelete }) => (
    <ListGroupItem>
        <div className="row">
            <div onClick={onClick}
                 className="col-xs-10"
                 style={{
                    textDecoration: done ? 'line-through': 'none'
                 }}>
                {text}
            </div>
            <div className="col-xs-2">
                <div className="badge">
                    <span className="glyphicon glyphicon-remove"
                          onClick={onDelete}></span>
                </div>
            </div>
        </div>
    </ListGroupItem>
)

Todo.propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Todo
