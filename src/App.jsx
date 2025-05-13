import { useState } from "react";
import { motion } from "framer-motion";

const operations = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
  XNOR: (a, b) => ~(a ^ b),
  ADD: (a, b) => a + b,
  SUB: (a, b) => a - b,
};

export default function App() {
  const [inputA, setInputA] = useState("1010");
  const [inputB, setInputB] = useState("0101");
  const [operation, setOperation] = useState("AND");

  const parseBin = (bin) => parseInt(bin, 2);
  const formatBin = (num, size = 4) => (num >>> 0).toString(2).padStart(size, "0").slice(-size);

  const result = operations[operation](parseBin(inputA), parseBin(inputB));
  const resultBin = formatBin(result);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 font-sans">
      <h1 className="text-5xl font-extrabold text-center text-lime-400 mb-4">Simulador Visual da ULA</h1>
      <p className="text-center max-w-2xl mx-auto text-gray-300 mb-10">
        A ULA (Unidade Lógica e Aritmética) é responsável por realizar operações básicas em processadores. Neste simulador, você pode ver como cada bit das entradas é processado por operações lógicas e aritméticas.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-lime-300">Entradas</h2>
          <label className="block mb-2 ">Número A (binário):</label>
          <input
            className="text-black p-2 rounded w-full mb-4"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
          />
          <label className="block mb-2">Número B (binário):</label>
          <input
            className="text-black p-2 rounded w-full mb-4"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {Object.keys(operations).map((op) => (
              <button
                key={op}
                onClick={() => setOperation(op)}
                className={`px-4 py-2 rounded font-bold border transition duration-200 ${
                  operation === op
                    ? "bg-lime-500 text-black border-lime-300"
                    : "bg-gray-700 text-white border-gray-600 hover:bg-lime-600 hover:text-black"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-lime-300 mb-4">Resultado</h2>
          <p className="mb-2">Operação selecionada: <span className="text-lime-400 font-mono">{operation}</span></p>
          <p className="mb-2">Saída Binária: <span className="text-cyan-400 font-mono">{resultBin}</span></p>
          <p className="mb-4">Saída Decimal: <span className="text-cyan-300 font-mono">{result}</span></p>

          <h3 className="text-lg font-semibold text-lime-200 mb-2">Processo interno da ULA:</h3>
          <p className="text-sm text-gray-300 mb-4">Abaixo você pode ver como a ULA compara cada bit das entradas A e B, aplicando a operação selecionada bit a bit.</p>
          <div className="space-y-2 font-mono">
            {inputA.split("").map((bitA, idx) => {
              const bitB = inputB[idx] || "0";
              const r = operations[operation](parseInt(bitA), parseInt(bitB)) & 1;
              return (
                <motion.div
                  key={idx}
                  className="bg-gray-700 p-2 rounded flex items-center justify-between shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <span className="text-sm">Bit {idx + 1}</span>
                  <span>{bitA} {operation} {bitB} = <span className="text-lime-400 font-bold">{r}</span></span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        Desenvolvido para fins educacionais — ULA Visual 2025
      </footer>
    </main>
  );
}
