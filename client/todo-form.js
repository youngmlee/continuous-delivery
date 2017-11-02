import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      task: formData.get('task')
    }
    console.log(JSON.stringify(data))
    event.target.reset()
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <div className='form-group'>
          <label htmlFor='task'>Task</label>
          <input name='task' id='task' type='text' className='form-control' />
        </div>
      </form>
    )
  }
}
