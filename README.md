# 🤖 Machine Learning

Repositório de estudos e experimentos de aprendizado de máquina. Os projetos exploram diferentes problemas, modelos e estratégias de avaliação por meio de notebooks independentes.

**[Acessar a página de Machine Learning Notebooks](https://joaopjpc.github.io/Machine-Learning/)**

## 📚 O que há nos notebooks

- **Diamonds:** engenharia de atributos, seleção de modelos e predição conforme para estimar preços.
- **A652:** classificação ordinal, classificação binária desbalanceada e um modelo de classificação + regressão em duas etapas.
- **Wine:** classificação com MLP em PyTorch e diagnóstico com Dataset Cartography.
- **California Housing:** regressão com MLP em PyTorch.
- **Loan Default:** seleção de modelos, calibração de probabilidades e escolha de limiar sensível a custo.

Entre os modelos e técnicas estudados estão regressão linear e logística, KNN, Gradient Boosting, redes MLP, validação cruzada, reamostragem e quantificação de incerteza.

## 🗂️ Estrutura

```text
.
├── notebooks/        # Notebooks dos experimentos
├── data/             # Datasets locais usados pelos notebooks
├── docs/             # Página estática do catálogo e sua documentação
│   ├── assets/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── projects.json
│   └── README.md
├── requirements.txt  # Dependências Python
└── README.md
```

## ▶️ Executar os notebooks

Crie e ative um ambiente virtual, instale as dependências e inicie o Jupyter:

```powershell
python -m venv .MLvenv
.\.MLvenv\Scripts\Activate.ps1
pip install -r requirements.txt
jupyter notebook
```

Os caminhos dos dados partem de `notebooks/`. Por isso, arquivos locais são carregados por caminhos como `../data/diamonds.csv`.

## 🌐 Sobre o catálogo web

A página é uma interface pequena, feita com HTML, CSS e JavaScript puro, para navegar e filtrar os projetos. As instruções de manutenção estão no **[README da pasta docs](docs/README.md)**.
