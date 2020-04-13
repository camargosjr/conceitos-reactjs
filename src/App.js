import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(function(){
     api.get('repositories').then((response)=> setRepositories(response.data));
  },[]);

  async function handleAddRepository() {
    const title = `Repositorio ${Date.now()}`;
    const url = 'https.github.com';
    const techs = 'NodeJs, ReactJs';

    const response = await api.post('repositories', {
      title,
      url,
      techs
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    
    try {
      api.delete(`repositories/${id}`);

    } catch (error) {
      console.log(error);
    }
    
    const repository = repositories.filter(repository => repository.id !== id);
    setRepositories(repository);
  } 
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(function (repository) {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
