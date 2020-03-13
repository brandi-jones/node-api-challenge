import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Projects(props) {

    const [actions, setActions] = useState([]);
    const [ID, setID] = useState(0)
    const [getActions, setGetActions] = useState(false);

    useEffect(() => {

        axios.get(`http://localhost:5000/api/projects/${ID}`)
          .then(response => {
            setActions(response.data.actions)
          })
          .catch(error => {
            console.log(error)
          })
          
    }, [ID])

    function setButton(id) {
        setGetActions(!getActions);
        console.log(getActions)
        console.log('this id', id)
        setID(id);
    }

    return (
        <>
            <h1>Projects</h1>
            {props.projects.map(project => (
                <div className="projectCard" onClick={() => setButton(project.id)} >
                    <h2>{project.name}</h2>
                    <h3>{project.description}</h3>
                </div>
            ))}

        </>
    );

}

export default Projects;