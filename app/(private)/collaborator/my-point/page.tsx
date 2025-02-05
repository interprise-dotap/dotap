"use client";

import { registerPoint } from "@/services/register-point";
import { useState } from "react";

export default function SimpleForm() {
  const [dateValue, setDateValue] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(false);

  // ************************************************************
  // Giiiiih mete bala! - deixei assim para testar  
  // ************************************************************

  // _/﹋\_
  // (҂`_´)
  // <,︻╦╤─ ҉ - -
  // _/﹋\_

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await registerPoint({ point: new Date().toISOString() })


      alert("Ponto registrado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao registrar ponto!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md max-w-sm bg-white"
    >
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Data ISO:
        <input
          type="text"
          value={dateValue}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded-lg mt-3 hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
