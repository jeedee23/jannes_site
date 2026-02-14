// 2026_02_15_@_00-33-58
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const searchInput = document.querySelector("#project-search");
const projectList = document.querySelector("#project-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#project-empty");

let activeFilter = "All";
let projects = [];

const statusClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const matchesSearch = (project, term) => {
  if (!term) {
    return true;
  }
  const haystack = [
    project.title,
    project.summary,
    project.location,
    project.client,
    project.category,
    project.status,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
};

const applyFilters = () => {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = projects
    .filter((project) => activeFilter === "All" || project.category === activeFilter)
    .filter((project) => matchesSearch(project, term))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  projectList.innerHTML = filtered
    .map(
      (project) => `
      <article class="project-card">
        <div class="project-card__header">
          <h3>${project.title}</h3>
          <span class="badge badge--${statusClass(project.status)}">${project.status}</span>
        </div>
        <p class="project-card__meta">
          ${project.category} · Updated ${formatDate(project.updatedAt)}
        </p>
        <p class="project-card__summary">${project.summary}</p>
        <div class="project-card__footer">
          <span class="status">${project.location}</span>
          <a class="project-card__link" href="project-${project.slug}.html">Open project</a>
        </div>
      </article>
    `
    )
    .join("");

  resultCount.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"} found`;
  emptyState.hidden = filtered.length !== 0;
};

const setActiveFilter = (filter) => {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });
  applyFilters();
};

const start = async () => {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) {
      throw new Error("Could not load projects");
    }
    projects = await response.json();
    applyFilters();
  } catch (error) {
    resultCount.textContent = "Projects unavailable";
    emptyState.hidden = false;
    emptyState.textContent = "Could not load projects. Check data/projects.json.";
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
});

searchInput.addEventListener("input", applyFilters);

start();
