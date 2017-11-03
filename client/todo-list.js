import React from 'react'

const renderTask = ({ _id, task }) =>
  <li className='list-group-item' key={ _id }>{ task }</li>

export default function TodoList({ tasks }) {
  return (
    <ol className='list-group'>
      { tasks.map(renderTask) }
    </ol>
  )
}
