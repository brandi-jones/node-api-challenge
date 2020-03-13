import React from 'react';

function Projects(props) {


    return (
        <>
            <h1>Projects</h1>
            {props.projects.map(project => (
                <div className="projectCard">
                    <h2>{project.name}</h2>
                    <h3>{project.description}</h3>
                </div>
            ))}

        </>
    );

}

export default Projects;