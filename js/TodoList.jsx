import React from 'react';
import TodoItem from './TodoItem.jsx';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: '',
    };
    this.onInput = this.onInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onInput() {
    this.setState({'input': this.refs.input.value})
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onAdd(this.props.id, this.state.input);
      this.setState({'input': ''});
    }
  }

  onRemove() {
    this.props.onRemove(this.props.id);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <strong>{this.props.title}</strong>
          <span className="badge pull-right">
            <span className="glyphicon glyphicon-remove" onClick={this.onRemove}></span>
          </span>
        </div>
        <ul className="list-group">
          {this.props.todos.map((item) => {
            return <TodoItem key={item.id} id={item.id} title={item.title} onUpdate={this.props.onUpdateTodo} is_checked={item.is_checked} />
          })}
        </ul>
        <div className="panel-footer">
          <input className="form-control" type="text" ref="input" onKeyPress={this.handleKeyPress} onChange={this.onInput} value={this.state.input} placeholder="New todo item" />
        </div>
      </div>
    );
  }
}

export default TodoList;
