import { useEffect, useState } from 'react'
import axios from 'axios'
export default function App() {

  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3066/category')
      .then((response) => {
        const result = response.data
        setCategories(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: name
    }
    axios.post('http://localhost:3066/category', formData)
      .then((response) => {
        const result = response.data
        const newArr = [...categories, result]
        setCategories(newArr)
        setName("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemove = (id) => {
    const userConfirm = window.confirm("Are you sure?")
    if (userConfirm) {
      axios.delete(`http://localhost:3066/category/${id}`)
        .then((response) => {
          const newArr = categories.filter((ele) => {
            return ele._id !== id})
          setCategories(newArr)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleEdit = (id)=>{
    const name = prompt("Enter category name")
    const formData = {
      name: name
    }
    if(name){
      axios.put(`http://localhost:3066/category/${id}` , formData)
      .then((response)=>{
        const result = response.data
        const newArr = categories.map((ele)=>{
          if(ele._id == result._id){
            return result
          } else{
            return ele
          }
        })
        setCategories(newArr)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  return (
    <div>
      <h2>Expense App</h2>
      <h3>Listing Categories:  {categories.length}</h3>
      <ul>
        {categories.map((ele) => {
          return <li key={ele._id}>{ele.name} 
          
          <button onClick={()=>{
            handleEdit(ele._id)
          }}>Edit</button>

          <button onClick={() => {
            handleRemove(ele._id)
          }}>remove</button>

          </li>
        })}
      </ul>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter name</label>
        <br />
        <input
          type="text"
          id='name'
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }} />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}