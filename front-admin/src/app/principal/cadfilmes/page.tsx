'use client'
import './estilos.css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

import { useEffect, useState } from "react"
import NovoFilme from '../../components/NovoFilme'
import ItemFilme from '@/app/components/ItemFilme'

export interface filmeProps {
  id: number
  titulo: string
  genero: string
  duracao: number
  preco: number
  foto: string
  num: number
  total: number
  sinopse: string
  admin_id: number
  destaque: boolean
}

function CadFilmes() {
  const [filmes, setFilmes] = useState<filmeProps[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    async function getFilmes() {
      const response = await fetch("http://localhost:3004/filmes")
      const dados = await response.json()
      setFilmes(dados)
    }
    getFilmes()
  }, [])

  const listaFilmes = filmes.map((filme: filmeProps) => (
    <ItemFilme key={filme.id} filme={filme} filmes={filmes} setFilmes={setFilmes} />
  ))

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    <div className='m-4'>

      <Modal open={open} onClose={onCloseModal} center>
        <NovoFilme filmes={filmes} setFilmes={setFilmes}/>
      </Modal>

      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Filmes
        </h1>
        <button type="button" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={onOpenModal}>
          Novo Filme
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Título do Filme
              </th>
              <th scope="col" className="px-6 py-3">
                Gênero
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Avaliação
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaFilmes}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadFilmes