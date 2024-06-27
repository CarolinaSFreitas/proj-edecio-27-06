'use client'
import { filmeProps } from "../principal/cadfilmes/page"
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Swal from 'sweetalert2'
import Cookies from "js-cookie"

interface listaFilmeProps {
  filme: filmeProps,
  filmes: filmeProps[],
  setFilmes: Dispatch<SetStateAction<filmeProps[]>>
}

function ItemFilme({ filme, filmes, setFilmes }: listaFilmeProps) {

  async function excluirFilme() {

    const result = await Swal.fire({
      title: filme.titulo,
      text: `Confirma a Exclusão de ${filme.titulo}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    })

    if (result.isConfirmed) {

      const response = await fetch(`http://localhost:3004/filmes/${filme.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const filmes2 = filmes.filter(x => x.id != filme.id)
        setFilmes(filmes2)

        Swal.fire({
          title: "Filme Excluído com Sucesso",
          text: filme.titulo,
          icon: "success"
        })
      } else {
        Swal.fire({
          title: "Erro... Filme Não Excluído",
          text: "Pode haver comentários para este filme",
          icon: "error"
        })
      }
    }
  }

  async function alterarDestaque() {

    const response = fetch(`http://localhost:3004/filmes/destacar/${filme.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    const filmes2 = filmes.map(x => {
      if (x.id == filme.id) {
        return { ...x, destaque: !x.destaque }
      }
      return x
    })
    setFilmes(filmes2)
  }

  return (
    <tr key={filme.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={filme.foto} alt="Capa do Filme"
          className="foto-filme" />
      </th>
      <td className={`px-6 py-4 ${filme.destaque ? "font-extrabold" : ""}`}>
        {filme.titulo}
      </td>
      <td className={`px-6 py-4 ${filme.destaque ? "font-extrabold" : ""}`}>
        {filme.genero}
      </td>
      <td className={`px-6 py-4 ${filme.destaque ? "font-extrabold" : ""}`}>
        {Number(filme.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className={`px-6 py-4 ${filme.destaque ? "font-extrabold" : ""}`}>
        {filme.total} / {filme.num} =&nbsp;
        {filme.num == 0 ?
          0 :
          (filme.total / filme.num).toFixed(1)
        } estrelas
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirFilme} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemFilme