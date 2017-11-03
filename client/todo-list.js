import React from 'react'

const renderTask = ({ _id, task }) =>
  <li key={ _id }>{ task }</li>

export default function TodoList({ tasks }) {
  return (
    <ol>
      { tasks.map(renderTask) }
    </ol>
  )
}
