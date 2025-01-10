import React from 'react'

export const AddCategory = ({ handleForm }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        handleForm();
    }
  return (
      <div className='form'>
          <h2>Add Service Category</h2>
          <form onSubmit={handleSubmit} className='category'>
              <label>Category Title</label>
              <input></input>
              <label>Category Description</label>
              <input></input>
              <button type='submit'>Add Category</button>
          </form>
    </div>
  )
}
