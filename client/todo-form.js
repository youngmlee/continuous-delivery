import React, { Component } from 'react'

export default function TodoForm({ handleSubmit }) {
  return (
    <form onSubmit={ handleSubmit }>
      <div className='form-group'>
        <label htmlFor='task'>My to-do list!</label>
        <input name='task' id='task' type='text' className='form-control form-control-lg' placeholder='Enter new task' required />
        <div className="invalid-feedback">
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
}
