import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <div className="flex gap-6">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="w-20 hover:drop-shadow-[0_0_20px_#646cffaa] transition"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            alt="React logo"
            className="w-20 hover:drop-shadow-[0_0_20px_#61dafbaa] transition animate-spin-slow"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold mt-8">Vite + React</h1>

      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-300 text-sm">
          Edit <code className="text-indigo-400">src/App.jsx</code> and save to
          test HMR
        </p>
      </div>

      <p className="mt-6 text-gray-400 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
