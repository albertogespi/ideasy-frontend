import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { Header } from "../components/Header";
import { Selects } from "../components/Selects";
import { ProjectList } from "../components/ProjectList";

import { getHomeProjects } from "../http/homeService";
import { Footer } from "../components/Footer";

import CircularProgress from "@material-ui/core/CircularProgress";

const MOST_RECENT_BUTTON = true;
const MOST_FOLLOWED_BUTTON = false;

export function Home() {
  const [selectsState, setselectsState] = useState({
    category: "",
    complexity: ""
  });

  const [projects, setProjects] = useState(undefined);

  const [buttonSelected, setButtonSelected] = useState(MOST_RECENT_BUTTON);

  const history = useHistory();

  let historyQuery = "";
  const updateQuery = () => {
    console.log(selectsState);
    if (selectsState.category !== "") {
      historyQuery += `/?category=${selectsState.category}`;
    }

    if (selectsState.complexity !== "") {
      if (historyQuery === "") {
        historyQuery += `/?complexity=${selectsState.complexity}`;
      } else {
        historyQuery += `&complexity=${selectsState.complexity}`;
      }
    }

    history.push(historyQuery);
  };

  useEffect(() => {
    updateQuery();
    getHomeProjects(historyQuery).then(response => setProjects(response.data));
  }, [selectsState, buttonSelected]);

  if (projects !== undefined) {
    console.log(projects);
    return (
      <section className="container" id="home">
        <Header isAccessWindow={false} />
        <section className="home-body">
          <section className="home-image">
            <p className="first">
              Únete ya a Ideasy, el portal de ideas de software y diseño
            </p>
            <p className="second">
              Regístrate como desarrollador u organización, participa en
              proyectos innovadores o publica las necesidades tecnológicas de tu
              organización
            </p>
          </section>
          <main className="projects">
            <Selects
              isFilters={true}
              selectsState={selectsState}
              setSelectsState={setselectsState}
            />
            <section className="projects-container">
              <section className="selectors">
                <button
                  id={
                    buttonSelected === MOST_RECENT_BUTTON
                      ? "is-selected-line"
                      : ""
                  }
                  onClick={() => {
                    setButtonSelected(MOST_RECENT_BUTTON);
                  }}
                >
                  Más recientes
                </button>
                <button
                  id={
                    buttonSelected === MOST_FOLLOWED_BUTTON
                      ? "is-selected-line"
                      : ""
                  }
                  onClick={() => {
                    setButtonSelected(MOST_FOLLOWED_BUTTON);
                  }}
                >
                  Más populares
                </button>
              </section>
              <ProjectList
                projects={
                  buttonSelected === MOST_RECENT_BUTTON
                    ? projects
                    : sortByMostPopular(projects)
                }
              />
            </section>
          </main>
        </section>
        <Footer />
      </section>
    );
  } else {
    return (
      <div className="centered-container" id="spinner">
        <CircularProgress size={"4rem"} />
      </div>
    );
  }
}

function sortByMostPopular(projects) {
  return projects.sort((a, b) =>
    a.number_of_followers > b.number_of_followers ? -1 : 1
  );
}
