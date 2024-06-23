import React, { useState } from 'react'

function UpdateImage() {
    const [newImage, setNewImage] = useState(null)

    const handleNewImage = (e) =>{
        e.preventDefault()
        console.log(newImage)
    }
  return (
    <>
      <section id="todo-form">
        <h1>for now its not working try again later</h1>
        <form onSubmit={handleNewImage} className="registration-form">

        <div className='input-fields'>
            <label htmlFor="avatar">Avatar :</label>
            <input type="file" className="input-field" name="avatar" onChange={(e) => setNewImage(e.target.files[0])}  placeholder='Your Photo'
              id='avatar' required autoComplete='off' />
          </div>

          <button type='submit' className='btn submit-btn'>Update</button>
        </form>
      </section>
    </>
  )
}

export default UpdateImage
