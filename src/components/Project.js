import React from "react";

export function Project(project) {
  return (
    <React.Fragment>
      <section>
        <h2>{project.title}</h2>
        <textarea>{project.description}</textarea>
        <textarea>{project.details}</textarea>
        <div>
          <p>{project.created_at}</p>
          <p>{project.number_of_followers}</p>
          <p>{project.complexity}</p>
        </div>
      </section>
    </React.Fragment>
  );
}
