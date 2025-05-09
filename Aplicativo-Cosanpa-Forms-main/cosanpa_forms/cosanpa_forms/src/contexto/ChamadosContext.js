import React, { createContext, useState } from 'react';

export const ChamadosContext = createContext();

export const ChamadosProvider = ({ children }) => {
  const [chamados, setChamados] = useState([]);

  const adicionarChamado = (chamado) => {
    setChamados((prev) => [...prev, chamado]);
  };

  const finalizarChamado = (chamadoFinalizado) => {
    setChamados((prev) =>
      prev.map((c) =>
        c.id === chamadoFinalizado.id ? chamadoFinalizado : c
      )
    );
  };

  return (
    <ChamadosContext.Provider value={{ chamados, adicionarChamado, finalizarChamado }}>
      {children}
    </ChamadosContext.Provider>
  );
};
