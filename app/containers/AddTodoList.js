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
                <Row>
                    <Col md={10} xs={8}>
                        <input className="form-control" ref={node => {
                            input = node
                        }} placeholder="Directors..." />
                    </Col>
                    <Col md={2} xs={4}>
                        <button className="btn btn-default form-control" type="submit">Add Todolist</button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

AddTodoList = connect()(AddTodoList)

export default AddTodoList
