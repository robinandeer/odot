import React from 'react'
import { Row, Col } from 'react-bootstrap'

let AddTodo = ({ list_id, onAdd }) => {
    let input

    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                onAdd(list_id, input.value)
                input.value = ''
            }}>
                <Row>
                    <Col md={10} xs={8}>
                        <input className="form-control" ref={node => {
                            input = node
                        }} placeholder="Learn spacetravel..." />
                    </Col>
                    <Col md={2} xs={4}>
                        <button className="btn btn-default form-control" type="submit">Add Todo</button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default AddTodo
