import React, { useMemo, useState } from "react";

/**
 * @typedef {Object} ShoppingItem
 * @property {string} name - Nome do item.
 * @property {number} price - Preço unitário (>= 0).
 * @property {number} quantity - Quantidade (inteiro >= 1).
 */

/**
 * Componente de lista de compras.
 * - Gerencia itens com `useState`
 * - Atualiza estado de forma imutável
 * - Calcula total com `reduce`
 *
 * @returns {JSX.Element}
 */
export default function ListaDeCompras() {
  /** @type {[ShoppingItem[], Function]} */
  const [items, setItems] = useState([
    { name: "Arroz", price: 20, quantity: 2 },
    { name: "Feijão", price: 8, quantity: 3 },
    { name: "Macarrão", price: 5, quantity: 1 },
  ]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Calcula o total (soma de price * quantity).
   * @param {ShoppingItem[]} list
   * @returns {number}
   */
  const calculateTotal = (list) =>
    list.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = useMemo(() => calculateTotal(items), [items]);

  /**
   * Adiciona um item validado na lista (imutável).
   * @param {ShoppingItem} item
   */
  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  /**
   * Remove um item pelo índice (imutável).
   * @param {number} index
   */
  const removeItemByIndex = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  /**
   * Normaliza e valida dados de entrada do formulário.
   * @returns {ShoppingItem | null}
   */
  const buildValidatedItemFromForm = () => {
    const name = newItemName.trim();
    const price = Number(newItemPrice);
    const quantity = Number.parseInt(newItemQuantity, 10);

    if (!name) return null;
    if (!Number.isFinite(price) || price < 0) return null;
    if (!Number.isInteger(quantity) || quantity < 1) return null;

    return { name, price, quantity };
  };

  /**
   * Handler do submit: valida, adiciona e limpa o form.
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleAddSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    const item = buildValidatedItemFromForm();
    if (!item) {
      setErrorMessage(
        "Preencha um nome, um preço válido (>= 0) e uma quantidade inteira (>= 1)."
      );
      return;
    }

    addItem(item);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemQuantity("1");
  };

  return (
    <section style={{ maxWidth: 640, padding: 16, fontFamily: "system-ui" }}>
      <header style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Lista de Compras</h2>
        <p style={{ margin: "6px 0 0", opacity: 0.8 }}>
          Total: <strong>R$ {total.toFixed(2)}</strong>
        </p>
      </header>

      <form
        onSubmit={handleAddSubmit}
        style={{ display: "grid", gap: 8, marginBottom: 12 }}
      >
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "2fr 1fr 1fr" }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Item</span>
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Ex.: Leite"
              autoComplete="off"
            />
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span>Preço</span>
            <input
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              inputMode="decimal"
              placeholder="Ex.: 6.50"
            />
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span>Qtd</span>
            <input
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              inputMode="numeric"
              placeholder="1"
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="submit">Adicionar</button>
          {errorMessage ? (
            <span role="alert" style={{ color: "#b00020" }}>
              {errorMessage}
            </span>
          ) : null}
        </div>
      </form>

      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} style={{ marginBottom: 6 }}>
            <span>
              {item.name} — R$ {item.price.toFixed(2)} × {item.quantity} ={" "}
              <strong>R$ {(item.price * item.quantity).toFixed(2)}</strong>
            </span>{" "}
            <button type="button" onClick={() => removeItemByIndex(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}