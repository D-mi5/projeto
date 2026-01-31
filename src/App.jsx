import React from "react";
import ListaDeCompras from "./ListaDeCompras.jsx";

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 32,
        background:
          "radial-gradient(circle at top left, #bc94b5, #e0bfd5 40%, #dcd9d1)",
      }}
    >
      <ListaDeCompras />
    </main>
  );
}

