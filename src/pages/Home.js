import React, { useState, useEffect } from "react";

import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ProjectList } from "../components/ProjectList";

import { getHomeProjects } from "../http/homeService";

export function Home() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getHomeProjects().then(response => setProjects(response.data));
    console.log(projects);
  }, []);

  return (
    <body>
      <Header isAccessWindow={false} isLoged={false} />
      <main className="home">
        <Filters />
        <section className="content">
          <ProjectList projects={projects} />
        </section>
      </main>
    </body>
  );
}
