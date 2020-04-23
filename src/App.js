import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const request = {
      title: `Repositorio - ${Date.now()}`,
      url: "https://github.com/isaltino/#",
      techs: ["Tech 1", "Tech 2", "Tech 3"],
    };

    const response = await api.post("repositories", request);

    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = repository.findIndex(
        (respositorie) => respositorie.id === id
      );

      const repositoryNew = [...repository];
      repositoryNew.splice(repositoryIndex, 1);
      setRepository(repositoryNew);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
