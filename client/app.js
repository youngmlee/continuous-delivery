import React, { Component } from 'react'
import TodoList from './todo-list'
import TodoForm from './todo-form'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { tasks: []}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const res = await fetch('/api/todos')
    const tasks = await res.json()
    this.setState({ tasks })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = JSON.stringify({
      task: formData.get('task')
    })
    event.target.reset()

    const res = await fetch('/api/todos', {
      method: 'POST',
      body: data,
      headers: { 'content-type': 'application/json' }
    })
    const task = await res.json()
    this.setState({
      tasks: this.state.tasks.concat(task)
    })
  }

  render() {
    return (
      <div className="container">
        <TodoForm handleSubmit={ this.handleSubmit }/>
        <TodoList tasks={ this.state.tasks }/>
      </div>
    )
  }
}
