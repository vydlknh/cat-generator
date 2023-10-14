import { useState } from 'react'

const APIForm = ({inputs, handleChange}) => {

  return (
    <div>
      <form className='form-container'>
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <li key={index}>
              <button
                type='attribute'
                onClick={handleChange}
                className='attribute-button'>
                  {category}
              </button>
              <input type="text" name={category} value={value} />
            </li>
          ))
        }
      </form>
    </div>
  )
}

export default APIForm