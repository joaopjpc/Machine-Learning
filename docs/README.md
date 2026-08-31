# 🌐 Catálogo web

Interface estática para visualizar e filtrar os notebooks de Machine Learning do repositório. A página usa somente HTML, CSS e JavaScript puro, sem frameworks, backend ou etapa de build.

**[Acessar a página de Machine Learning Notebooks](https://joaopjpc.github.io/Machine-Learning/)**

## 🧭 Como a página funciona

- `index.html` define a estrutura da interface.
- `style.css` contém o layout responsivo e a aparência dos cards e tags.
- `app.js` carrega os projetos, cria os cards e controla busca e filtros.
- `projects.json` é a única fonte dos dados exibidos no catálogo.
- `assets/images/` armazena a foto usada no cabeçalho.

O GitHub Pages serve diretamente o conteúdo desta pasta. Alterações enviadas para `docs/` passam a aparecer no catálogo depois da atualização automática do site.

## 🖥️ Visualizar localmente

Na raiz do repositório, execute:

```powershell
python -m http.server 8000 --directory docs
```

Depois, acesse `http://localhost:8000`. Também é possível usar uma extensão com live reload, como Live Server, durante a edição.

## ➕ Adicionar um notebook

1. Salve o arquivo `.ipynb` em `notebooks/`.
2. Coloque datasets locais em `data/`, quando necessário.
3. Dentro do notebook, acesse esses arquivos por caminhos como `../data/nome-do-arquivo`.
4. Adicione uma entrada correspondente em `docs/projects.json`.

Não mova um notebook sem verificar antes os caminhos relativos usados para carregar seus dados.

## 🗃️ Adicionar um projeto ao catálogo

Inclua um novo objeto no array de [`projects.json`](projects.json), mantendo as quatro categorias de tags:

```json
{
  "title": "Título do projeto",
  "dataset": "Nome do dataset",
  "type": "Classificação · descrição curta",
  "description": "Resumo do experimento.",
  "context": "Texto com o contexto do problema apresentado no botão expansível.",
  "notebook": "https://github.com/joaopjpc/Machine-Learning/blob/main/notebooks/arquivo.ipynb",
  "tags": {
    "problem": ["Classification"],
    "models": ["Gradient Boosting"],
    "techniques": ["Threshold Selection"],
    "concepts": ["Class Imbalance"]
  }
}
```

O card passa a ser criado automaticamente pelo JavaScript. Não é necessário editar o HTML para cada projeto.

O campo `description` deve conter apenas o resumo curto que fica sempre visível. O campo `context` aceita um texto maior e cria automaticamente o botão expansível **Contexto do problema**. Enquanto `context` estiver vazio (`""`), o botão não será exibido. O conteúdo do contexto também participa da busca textual do catálogo. Para separar parágrafos dentro da string JSON, use `\n\n`.

## 🎨 Cadastrar uma cor de tag

Adicione a nova tag ao objeto `tagColors`, no início de [`app.js`](app.js), usando um tom da família correspondente:

- `problem`: azul;
- `models`: roxo;
- `techniques`: verde;
- `concepts`: laranja.

Exemplo:

```javascript
const tagColors = {
  "Nova Técnica": "#d1fae5"
};
```

Tags sem cor cadastrada recebem automaticamente a cor padrão de sua categoria.

## 🖼️ Atualizar a foto de perfil

Substitua `assets/images/profile.jpg` por outra imagem com o mesmo nome. Prefira uma foto quadrada com pelo menos 400 × 400 pixels; o CSS fará o recorte circular automaticamente.
