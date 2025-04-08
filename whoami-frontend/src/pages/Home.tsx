import { Input } from "../components/Input"; // Adiciona a importação

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-bold mb-8">Quem sou eu?</h1>
      <div className="bg-white/5 p-8 rounded-lg shadow-xl w-full max-w-md">
        <form className="space-y-6 w-full">
          <Input // Substitui o input original pelo componente
            type="text"
            placeholder="Digite seu nome"
            // A className já está definida dentro do componente, mas pode ser estendida se necessário
          />
          {/* ... restante do formulário ... */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold transition duration-200"
          >
            Iniciar Jogo
          </button>
        </form>
      </div>
    </div>
  );
}
