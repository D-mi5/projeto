# 🛒 Lista de Compras (React)

Este projeto é uma aplicação de **Lista de Compras** desenvolvida em React. O objetivo é permitir o gerenciamento de itens (adicionar e remover), calculando automaticamente o valor total da compra com base no preço unitário e na quantidade.

O projeto demonstra o uso de conceitos fundamentais do React, como **Imutabilidade de Estado**, **Hooks (`useState`, `useMemo`)** e **Manipulação de Formulários**.

## 📋 Funcionalidades

- **Adicionar Itens:** Permite inserir nome, preço e quantidade.
- **Validação:** Impede a entrada de dados inválidos (preços negativos, nomes vazios).
- **Cálculo Automático:** O total é recalculado instantaneamente ao adicionar ou remover itens.
- **Remoção de Itens:** Exclusão de itens da lista individualmente.
- **Feedback Visual:** Exibe mensagens de erro caso o formulário seja preenchido incorretamente.

---

## 🛠️ Documentação das Funções

Abaixo está a explicação detalhada do que cada função e componente faz dentro do código:

### `ListaDeCompras()` (Componente Default)
É o componente principal da aplicação.
- **Responsabilidade:** Gerencia todo o estado da aplicação, incluindo a lista de itens (`items`), os campos do formulário (`newItemName`, `newItemPrice`, `newItemQuantity`) e as mensagens de erro.
- **Retorno:** Renderiza o JSX (interface visual) contendo o cabeçalho com o total, o formulário de adição e a lista de itens.

### `calculateTotal(list)`
- **Função:** Calcula o valor total monetário da lista de compras.
- **Lógica:** Utiliza o método `.reduce()` do JavaScript para iterar sobre o array de itens. Para cada item, multiplica o `preço` pela `quantidade` e soma ao acumulador.
- **Retorno:** Um número (`number`) representando o valor total.

### `total` (Variável via `useMemo`)
- **Função:** Armazena o resultado de `calculateTotal`.
- **Otimização:** Utiliza o hook `useMemo`. Isso garante que o cálculo matemático só seja executado quando a lista de `items` for alterada. Se o usuário estiver apenas digitando no formulário (o que causa re-renderizações), o cálculo não é refeito desnecessariamente.

### `addItem(item)`
- **Função:** Adiciona um novo objeto de item ao estado principal.
- **Imutabilidade:** Utiliza a função de atualização do `useState` (`setItems`) com o padrão de callback `(prevItems => [...prevItems, item])`. Isso cria um **novo array** contendo os itens antigos mais o novo, respeitando o princípio de imutabilidade do React.

### `removeItemByIndex(index)`
- **Função:** Remove um item da lista com base na sua posição (índice).
- **Lógica:** Utiliza o método `.filter()` para gerar um novo array que contém todos os itens, **exceto** aquele cujo índice corresponde ao índice clicado.

### `buildValidatedItemFromForm()`
- **Função:** Captura, converte e valida os dados dos inputs de estado.
- **Processo:**
    1.  Remove espaços em branco do nome (`.trim()`).
    2.  Converte preço para `Number` e quantidade para Inteiro.
    3.  Verifica se o nome não está vazio.
    4.  Verifica se o preço é válido (finito e positivo).
    5.  Verifica se a quantidade é um número inteiro maior ou igual a 1.
- **Retorno:** Retorna o objeto `item` formatado se for válido, ou `null` se houver erro.

### `handleAddSubmit(event)`
- **Função:** Gerencia o evento de envio do formulário (`onSubmit`).
- **Fluxo:**
    1.  Previne o recarregamento da página (`event.preventDefault()`).
    2.  Limpa mensagens de erro anteriores.
    3.  Chama `buildValidatedItemFromForm()` para pegar os dados.
    4.  Se os dados forem inválidos, define uma mensagem de erro (`setErrorMessage`).
    5.  Se válidos, chama `addItem()` e reseta os campos do formulário para os valores iniciais.

---

## 🚀 Como Rodar o Projeto

Como este é um componente React, certifique-se de ter um ambiente React configurado (como Create React App ou Vite).

1. Copie o código do componente para um arquivo (ex: `ListaDeCompras.js`).
2. Importe-o no seu `App.js`:

```jsx
import ListaDeCompras from "./ListaDeCompras";

function App() {
  return (
    <div className="App">
      <ListaDeCompras />
    </div>
  );
}

export default App;