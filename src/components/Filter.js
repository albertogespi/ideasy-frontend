import React from 'react';

export function getProject() {
  return (
    <div id="filter">
      <p>Categorías</p>
      <button class="btn active" onclick="filterSelection('all')">
        Todos
      </button>
      <button class="btn" onclick="filterSelection('blog')">
        Blog
      </button>
      <button class="btn" onclick="filterSelection('e-commerce')">
        e-Commerce
      </button>
      <button class="btn" onclick="filterSelection('e-learning')">
        e-Learning
      </button>
      <button class="btn" onclick="filterSelection('corporate')">
        Corporativa
      </button>
      <button class="btn" onclick="filterSelection('news')">
        Noticias
      </button>
      <button class="btn" onclick="filterSelection('wikis')">
        Wikis
      </button>

      <p>Complejidad</p>
      <button class="btn" onclick="filterSelection('easy')">
        Fácil
      </button>
      <button class="btn" onclick="filterSelection('medium')">
        Media
      </button>
      <button class="btn" onclick="filterSelection('hard')">
        Difícil
      </button>
    </div>
  );
}
