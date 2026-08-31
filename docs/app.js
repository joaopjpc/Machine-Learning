const tagColors = {
  // Problem — azuis
  Classification: "#dbeafe",
  Regression: "#e0f2fe",
  "Binary Classification": "#bfdbfe",
  "Multiclass Classification": "#c7d2fe",
  "Ordinal Classification": "#93c5fd",

  // Models — roxos
  MLP: "#ede9fe",
  "Gradient Boosting": "#ddd6fe",
  KNN: "#f3e8ff",
  "Linear Regression": "#e9d5ff",
  "Logistic Regression": "#e4ddea",

  // Techniques — verdes
  "Feature Engineering": "#d1fae5",
  "Model Selection": "#dcfce7",
  "Cross Validation": "#ccfbf1",
  "Nested Cross Validation": "#a7f3d0",
  Oversampling: "#e1f4dd",
  Undersampling: "#bbf7d0",
  "Threshold Selection": "#ccebdc",
  "Conformal Prediction": "#c7eee8",
  "Probability Calibration": "#bce5cf",
  "Platt Scaling": "#e5f5ec",

  // Concepts — laranjas
  "Class Imbalance": "#ffedd5",
  "Cost-sensitive Learning": "#fef3c7",
  "Uncertainty Quantification": "#fed7aa",
  "Dataset Cartography": "#fde4cf",
  "Two-stage Model": "#fdba74",
  "Hurdle Model": "#fbd0a5"
};

const defaultTagColors = {
  problem: "#dbeafe",
  models: "#ede9fe",
  techniques: "#d1fae5",
  concepts: "#ffedd5"
};

const categoryLabels = {
  problem: "Problema",
  models: "Modelo",
  techniques: "Técnica",
  concepts: "Conceito"
};

const grid = document.querySelector("#projects-grid");
const searchInput = document.querySelector("#search-input");
const resultCount = document.querySelector("#result-count");
const activeFilter = document.querySelector("#active-filter");
const clearButton = document.querySelector("#clear-filters");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const profileImage = document.querySelector(".profile-photo img");

let projects = [];
let selectedTag = "";

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function allTags(project) {
  return Object.values(project.tags).flat();
}

function createTag(tag, category) {
  const button = document.createElement("button");
  button.className = "tag";
  button.type = "button";
  button.textContent = tag;
  button.dataset.category = category;
  button.style.backgroundColor = tagColors[tag] || defaultTagColors[category];
  button.title = `${categoryLabels[category]}: ${tag}`;
  button.setAttribute("aria-label", `Filtrar por ${categoryLabels[category].toLowerCase()}: ${tag}`);
  button.setAttribute("aria-pressed", String(selectedTag === tag));
  button.addEventListener("click", () => {
    selectedTag = selectedTag === tag ? "" : tag;
    render();
  });
  return button;
}

function createCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const type = document.createElement("p");
  type.className = "project-type";
  type.textContent = project.type;

  const title = document.createElement("h2");
  title.textContent = project.title;

  const dataset = document.createElement("p");
  dataset.className = "dataset";
  const datasetLabel = document.createElement("strong");
  datasetLabel.textContent = "Dataset: ";
  dataset.append(datasetLabel, project.dataset);

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "tags";
  tags.setAttribute("aria-label", `Tags de ${project.title}`);
  Object.entries(project.tags).forEach(([category, values]) => {
    values.forEach((tag) => tags.append(createTag(tag, category)));
  });

  const link = document.createElement("a");
  link.className = "notebook-link";
  link.href = project.notebook;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Abrir notebook no GitHub";
  link.setAttribute("aria-label", `Abrir ${project.title} no GitHub`);

  article.append(type, title, dataset, description, tags, link);
  return article;
}

function matchesFilters(project) {
  const query = normalize(searchInput.value.trim());
  const searchableText = normalize([
    project.title,
    project.description,
    project.dataset,
    project.type,
    ...allTags(project)
  ].join(" "));

  const matchesSearch = !query || searchableText.includes(query);
  const matchesTag = !selectedTag || allTags(project).includes(selectedTag);
  return matchesSearch && matchesTag;
}

function render() {
  const visibleProjects = projects.filter(matchesFilters);
  grid.replaceChildren(...visibleProjects.map(createCard));

  const total = visibleProjects.length;
  resultCount.textContent = `${total} ${total === 1 ? "notebook" : "notebooks"}`;
  emptyState.hidden = total !== 0;

  activeFilter.hidden = !selectedTag;
  activeFilter.textContent = selectedTag ? `Tag: ${selectedTag}` : "";
  clearButton.disabled = !selectedTag && !searchInput.value.trim();
}

function clearFilters() {
  selectedTag = "";
  searchInput.value = "";
  render();
  searchInput.focus();
}

async function loadProjects() {
  try {
    const response = await fetch("projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    projects = await response.json();
    render();
  } catch (error) {
    console.error("Falha ao carregar projects.json:", error);
    resultCount.textContent = "Catálogo indisponível";
    errorState.hidden = false;
  }
}

searchInput.addEventListener("input", render);
clearButton.addEventListener("click", clearFilters);
profileImage.addEventListener("error", () => {
  profileImage.hidden = true;
});
loadProjects();
