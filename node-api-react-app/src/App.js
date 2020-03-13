import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Projects from './components/Projects.js';

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    console.log("hit use effect")

    axios.get("http://localhost:5000/api/projects")
      .then(response => {
        setProjects(response.data);
        console.log(response)
        // response.data.map(project => {
        //   axios.get(`http://localhost:5000/api/projects/${project.id}`)
        //     .then(response => {
        //       console.log(response)
        //     })
        //     .catch(error => {
        //       console.log(error)
        //     })
      
        // })
        
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


  return (
    <div className="App">

      <Projects projects={projects}/>

    </div>
  );
}

export default App;
