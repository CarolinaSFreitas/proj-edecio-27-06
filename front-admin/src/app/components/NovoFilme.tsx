'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { filmeProps } from "../principal/cadfilmes/page"
import { Dispatch, SetStateAction, useEffect } from "react"
import { toast } from "sonner"

type Inputs = {
  titulo: string
  genero: string
  duracao: number
  preco: number
  foto: string
  sinopse: string
}

interface novoFilmeProps {
  filmes: filmeProps[],
  setFilmes: Dispatch<SetStateAction<filmeProps[]>>
}

function NovoFilme({ filmes, setFilmes }: novoFilmeProps) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  async function incluirFilme(data: Inputs) {

    const novoFilme: filmeProps = {
      id: 0,                        // para não dar erro dos atributos (typescript)
      titulo: data.titulo,
      genero: data.genero,
      duracao: Number(data.duracao),
      sinopse: data.sinopse,
      foto: data.foto,
      preco: Number(data.preco),
      admin_id: Number(Cookies.get("admin_logado_id")),
      num: 0,
      total: 0,
      destaque: true
    }

    const response = await fetch("http://localhost:3004/filmes",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoFilme)
      },
    )

    const filmes2 = [novoFilme, ...filmes]
    setFilmes(filmes2)

    if (response.status == 201) {
      toast.success("Ok! Filme cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Filme...")
    }
  }

  useEffect(() => {
    setFocus("titulo")
  }, [])

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Filmes
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirFilme)}>
        <div className="mb-5">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título do Filme</label>
          <input type="text" id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("titulo")}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gênero</label>
          <input type="text" id="genero"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("genero")}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="mb-5">
            <label htmlFor="duracao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Duração (min)</label>
            <input type="number" id="duracao"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("duracao")}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL da Foto</label>
          <input type="text" id="foto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("foto")}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sinopse do Filme</label>
          <textarea id="sinopse" rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("sinopse")}></textarea>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovoFilme