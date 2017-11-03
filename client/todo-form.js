import React, { Component } from 'react'

export default function TodoForm({ handleSubmit }) {
  return (
    <form onSubmit={ handleSubmit }>
      <div className='form-group'>
        <label htmlFor='task'>Task</label>
        <input name='task' id='task' type='text' className='form-control form-control-lg' placeholder='Enter new task' />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
}
