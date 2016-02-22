import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck() {
    this.props.onUpdate(this.props.id, !this.props.is_checked);
  }

  render() {
    if (this.props.is_checked) {
      var content = <s>{this.props.title}</s>
    } else {
      var content = this.props.title
    }

    return (
      <div className="list-group-item" onClick={this.onCheck}>
        {content}
      </div>
    );
  }
}

export default TodoItem;
