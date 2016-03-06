import React from 'react'

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
                <input className="form-control" ref={node => {
                    input = node
                }} placeholder="Add todo..." />
                <button type="submit" hidden />
            </form>
        </div>
    )
}

export default AddTodo
