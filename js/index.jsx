import React from 'react';
import { render } from 'react-dom';
import TodoList from './TodoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      email: '',
      name: '',
      id: null,
      input: ''
    };
    this.fetchData = this.fetchData.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
    this.onInput = this.onInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  fetchData(email) {
    $.getJSON(`/api/v1/users/${email}`, (response) => {
      this.setState(response);
    });
  }

  componentDidMount() {
    $.getJSON('/user', (response) => {
      this.fetchData(response.email);
    });
  }

  onInput() {
    this.setState({'input': this.refs.input.value})
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addList(this.state.email, this.state.input);
      this.setState({'input': ''});
    }
  }

  addTodoItem(list_id, title) {
    $.ajax({
      url: `/api/v1/lists/${list_id}`,
      type: 'PUT',
      data: {title: title}
    }).then((response) => {
      console.log(response);
      this.fetchData(this.state.email);
    });
  }

  removeList(list_id) {
    $.ajax({
      url: `/api/v1/lists/${list_id}`,
      type: 'DELETE'
    }).then((response) => {
      console.log(response);
      this.fetchData(this.state.email);
    });
  }

  addList(email, name) {
    $.post('/api/v1/lists', {email: email, name: name}).then((response) => {
      console.log(response);
      this.fetchData(email);
    });
  }

  updateTodo(todo_id, is_checked) {
    $.ajax({
      url: `/api/v1/todos/${todo_id}`,
      type: 'PUT',
      data: {is_checked: is_checked}
    }).then((response) => {
      console.log(response);
      this.fetchData(this.state.email);
    });
  }

  render () {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                {this.state.name}
              </a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/logout">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {this.state.lists.map((item) => {
          return <TodoList key={item.id}
                           onAdd={this.addTodoItem}
                           onRemove={this.removeList}
                           onUpdateTodo={this.updateTodo}
                           id={item.id}
                           title={item.name}
                           todos={item.todos} />
        })}

        <input className="form-control" type="text" ref="input" onKeyPress={this.handleKeyPress} onChange={this.onInput} value={this.state.input} placeholder="New list" />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
