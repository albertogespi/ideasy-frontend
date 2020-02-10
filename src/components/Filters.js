import React, { useState } from "react";

export function Filters() {
  const [currentSelected, setSelected] = useState(0);

  const categories = [
    "Todos",
    "Blog",
    "e-Commerce",
    "e-Learning",
    "Corporativa",
    "Noticias",
    "Wikis"
  ];

  return (
    <section className="filters">
      <nav>
        <section id="category">
          <p>Categoría</p>
          <ul>
            {categories.map((cat, index) => (
              <li>
                <button
                  className="btn active"
                  id={currentSelected === index ? "is-selected" : ""}
                  onclick={() => {
                    setSelected(index);
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section id="complexity">
          <p>Complejidad</p>
          <ul>
            <li>
              <button className="btn" onclick="filterSelection('easy')">
                Fácil
              </button>
            </li>
            <li>
              <button className="btn" onclick="filterSelection('medium')">
                Media
              </button>
            </li>
            <li>
              <button className="btn" onclick="filterSelection('hard')">
                Difícil
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </section>
  );
}
