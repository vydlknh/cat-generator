import { useState } from 'react'
import APIForm from "./components/APIForm";
import './App.css'

const App = () => {

  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  const [inputs, setInputs] = useState({
    id: "",
    url: "",
    breeds: [{
      name: "",
      weight: "",
      origin: "",
      life_span: "",
    }],
  });

  const [currentImage, setCurrentImage] = useState("");

  const submitForm = () => {
    callAPI(`https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${ACCESS_KEY}`)
  }

  const callAPI = async(query) => {
    const response = await fetch(query);
    const json = await response.json();
    setCurrentImage(json[0].url);
    setInputs({
      id: json[0].id,
      url: json[0].url,
      breeds: [{
        name: json[0].breeds[0].name,
        weight: json[0].breeds[0].weight.metric,
        origin: json[0].breeds[0].origin,
        life_span: json[0].breeds[0].life_span,
      }],
    })
  }

  return (
    <div className='whole-page'>
      <h1>Cat generator</h1>
      <APIForm 
        inputs={inputs.breeds[0]}
        handleChange={(e) => 
          setInputs((prevState) => ({
            ...prevState, [e.target.name]: e.target.value.trim(),
          }))
        }
      />
      {currentImage ? (
        <img 
          className='screenshot'
          src={currentImage} 
          alt="Cat image returned" />
      ) : (<div></div>)}
      <div>
        <button type="submit" className='submit' onClick={submitForm}>
          Generate
        </button>
      </div>
      </div>
  )
}

export default App
