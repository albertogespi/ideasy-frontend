import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ProjectList } from "../components/ProjectList";

import { getHomeProjects } from "../http/homeService";

export function Home() {
  console.log(localStorage.getItem("currentUser"));
  const categories = [
    "Todas",
    "Blog",
    "e-Commerce",
    "e-Learning",
    "Corporativa",
    "Noticias",
    "Wikis"
  ];

  const complexities = ["Todas", "Fácil", "Medio", "Difícil"];

  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedComplexity, setSelectedComplexity] = useState(0);

  const history = useHistory();

  let historyQuery = "";
  const updateQuery = () => {
    if (selectedCategory !== 0) {
      historyQuery += `/?category=${categories[selectedCategory]}`;
    }

    if (selectedComplexity !== 0) {
      if (historyQuery === "") {
        historyQuery += `/?complexity=${selectedComplexity}`;
      } else {
        historyQuery += `&complexity=${selectedComplexity}`;
      }
    }

    history.push(historyQuery);
  };

<<<<<<< HEAD
	useEffect(() => {
		updateQuery();
		getHomeProjects(historyQuery).then((response) => setProjects(response.data));
	}, [selectedCategory, selectedComplexity]);
=======
  useEffect(() => {
    updateQuery();
    getHomeProjects(historyQuery).then(response => setProjects(response.data));
    console.log(projects);
  }, [selectedCategory, selectedComplexity]);
>>>>>>> a7b90c69778fc2f22ecbab29cebc8ae2ba6c81b7

  return (
    <section className="container">
      <Header isAccessWindow={false} />
      <section className="home-image">
        <div>
          <p className="first">
            Únete ya a nuestro Portal de Ideas como desarrollador u
            organización.
          </p>
          <p className="second">
            Participa en proyectos de software innovadores o publica las
            necesidades tecnológicas de tu organización.
          </p>
        </div>

        <div>
          <Link to="/access">
            <button className="access" renderAs="button">
              ACCEDE O REGÍSTRATE
            </button>
          </Link>
        </div>
      </section>
      <main className="home">
        <Filters
          categories={categories}
          complexities={complexities}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedComplexity={selectedComplexity}
          setSelectedComplexity={setSelectedComplexity}
        />
        <ProjectList projects={projects} />
      </main>
    </section>
  );
}
