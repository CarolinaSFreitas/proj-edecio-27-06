'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface filmeTipo {
  num: number
  estrelas: number
}

interface geralTipo {
  clientes: number
  filmes: number
  avaliacoes: number
  avaliacoes_dia: number
  precoMedio: number
}

export default function Home() {
  const [filmes, setFilmes] = useState<filmeTipo[]>([])
  const [geral, setGeral] = useState<geralTipo>({
    clientes: 0, filmes: 0, avaliacoes: 0, avaliacoes_dia: 0, precoMedio: 0
  })

  useEffect(() => {
    async function getDadosGrafico() {
      const response = await fetch("http://localhost:3004/avaliacoes/dados/estrelas")
      const dados = await response.json()
      setFilmes(dados)
    }
    getDadosGrafico()

    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dadosGerais")
      const dados = await response.json()
      setGeral(dados)
    }
    getDadosGerais()
  }, [])

  const data = [
    ["Num", "Estrelas", { role: "style" }],
    ["1", 0, "#ff0000"], // RGB value
    ["2", 0, "yellow"], // English color name
    ["3", 0, "green"],
    ["4", 0, "color: #0000ff"], // CSS-style declaration
    ["5", 0, "color: #00ffff"]
  ];
  
  let somaAvaliacoes = 0
  filmes.forEach(filme => {
    somaAvaliacoes += filme.num
  })

  filmes.forEach(filme => {
    data[filme.estrelas][1] = (filme.num / somaAvaliacoes) * 100
  })

  return (
    <div className="container">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">{geral.clientes}</span>
          <p className="font-bold mt-2">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">{geral.filmes}</span>
          <p className="font-bold mt-2">Nº Filmes</p>
        </div>
        <div className="border-green-600 border rounded p-6">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">R$: {geral.precoMedio.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <p className="font-bold mt-2 text-center">Preço Médio</p>
        </div>
        <div className="border-purple-600 border rounded p-6">
          <span className="bg-purple-100 text-purple-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-purple-900 dark:text-purple-300">{geral.avaliacoes}</span>
          <p className="font-bold mt-2">Nº Avaliações</p>
        </div>
        <div className="border-pink-600 border rounded p-6">
          <span className="bg-pink-100 text-pink-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-pink-900 dark:text-pink-300">{geral.avaliacoes_dia}</span>
          <p className="font-bold mt-2">Nº Avaliações no Dia</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Estrelas dadas pelos clientes para os filmes cadastrados (em %)</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data} />

    </div>
  )
}
