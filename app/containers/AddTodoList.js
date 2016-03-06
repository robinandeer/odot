import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { addTodoList } from '../actions'

let AddTodoList = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addTodoList(input.value))
                input.value = ''
            }}>
                <input className="form-control" ref={node => {
                    input = node
                }} placeholder="Add todo list..." />
                <button type="submit" hidden />
            </form>
        </div>
    )
}

AddTodoList = connect()(AddTodoList)

export default AddTodoList
