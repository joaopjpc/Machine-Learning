# Machine Learning

Repositório de estudos e experimentos de aprendizado de máquina. Os notebooks cobrem classificação, regressão, seleção de modelos, redes neurais, dados desbalanceados e quantificação de incerteza.

O catálogo visual dos projetos fica em [`docs/`](docs/) e usa apenas HTML, CSS e JavaScript puro.

## Estrutura

```text
.
├── notebooks/        # Notebooks dos experimentos
├── data/             # Datasets locais usados pelos notebooks
├── docs/             # Página estática do catálogo
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── projects.json
├── requirements.txt  # Dependências Python
└── README.md
```

## Executar os notebooks

Crie e ative um ambiente virtual, instale as dependências e inicie o Jupyter:

```powershell
python -m venv .MLvenv
.\.MLvenv\Scripts\Activate.ps1
pip install -r requirements.txt
jupyter notebook
```

Os caminhos dos dados partem de `notebooks/`, por isso arquivos locais são carregados por caminhos como `../data/diamonds.csv`.

Para visualizar o catálogo localmente:

```powershell
python -m http.server 8000 --directory docs
```

Depois, acesse `http://localhost:8000`.

## Adicionar um notebook

1. Salve o arquivo `.ipynb` em `notebooks/`.
2. Coloque datasets locais em `data/` e use o caminho relativo `../data/nome-do-arquivo` no notebook.
3. Adicione o projeto ao catálogo em `docs/projects.json`.

## Adicionar um projeto ao catálogo

Inclua um novo objeto no array de [`docs/projects.json`](docs/projects.json), mantendo as quatro categorias de tags:

```json
{
  "title": "Título do projeto",
  "dataset": "Nome do dataset",
  "type": "Classificação · descrição curta",
  "description": "Resumo do experimento.",
  "notebook": "https://github.com/USUARIO/REPOSITORIO/blob/main/notebooks/arquivo.ipynb",
  "tags": {
    "problem": ["Classification"],
    "models": ["Gradient Boosting"],
    "techniques": ["Threshold Selection"],
    "concepts": ["Class Imbalance"]
  }
}
```

Esse arquivo é a única fonte dos dados exibidos nos cards.

## Cadastrar uma cor de tag

Adicione a nova tag ao objeto `tagColors`, no início de [`docs/app.js`](docs/app.js), usando um tom da família de sua categoria:

- `problem`: azul;
- `models`: roxo;
- `techniques`: verde;
- `concepts`: laranja.

Tags sem uma cor cadastrada recebem automaticamente a cor padrão da categoria.

## Publicar com GitHub Pages

1. Envie a pasta `docs/` para a branch `main`.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Selecione a branch `main`, a pasta `/docs` e salve.

Após o deploy, o catálogo ficará disponível em `https://USUARIO.github.io/REPOSITORIO/`. Consulte a [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) para detalhes.
