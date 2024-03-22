import { useEffect, useState } from 'react'
import axios from 'axios'
export default function App() {

  const [categories, setCategories] = useState([])

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

  
  return (
    <div>
      <h2>Expense App</h2>
      <h3>Listing Categories:  {categories.length}</h3>
      <ul>
        {categories.map((ele) => {
          return <li key={ele._id}>{ele.name}</li>
        })}
      </ul>
    </div>
  )
}