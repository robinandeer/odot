import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveLists } from '../actions'
import AddTodoList from './AddTodoList'
import VisibleTodoLists from './VisibleTodoLists'
import LoadedHeader from './LoadedHeader'
import DevTools from './DevTools';


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(receiveLists())
    }

    render() {
        return (
            <div className="container">
                <LoadedHeader />
                <VisibleTodoLists />
                <AddTodoList />

                <DevTools />
            </div>
        )
    }
}

App = connect()(App)

export default App
