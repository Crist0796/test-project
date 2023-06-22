import React, {useEffect, useState} from "react"
import Pagination from "@/Components/Pagination"
import Filters from "@/Components/Filters"
import DocumentModal from "@/Components/DocumentModal"
import DocumentDeleteModal from "./DocumentDeleteModal"
import { Link, usePage } from '@inertiajs/react'
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"


const DocumentsTable = () => {

    const {documents, filters, currentFilters, flash} = usePage().props

    //Pasa información de cada documento al modal al modal
    const [data, setData] = useState({document : '', show: false})
    const [deleteData, setDeleteData] = useState({document : '', show: false})
    const {  } = usePage().props

    console.log(currentFilters)

    /* ${parseInt(currentFilters.paginate) > 5 ? 'h-240 pb-116' : 'h-180 pb-50'} */
    const closeModalEditData = () => {
        setEditedData(false)
    }

    return (
        <>
            <Filters/>
            {documents.data.length === 0 ? <h2 className="text-center text-red-500">No hay documentos que cumplan ese criterio de búsquedad</h2> :
            <div className={`flex flex-wrap -mx-3 overflow-y-auto ${parseInt(currentFilters.paginate) > 5 ? 'h-135 pb-200' : 'h-125'}  scrollbar-thumb-orange-500 scrollbar-track-white scrollbar-thin mb-3`}>
              <div className="flex-none w-full max-w-full px-3">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-3xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="p-2 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <h6 className="dark:text-white">Tabla Documentos</h6>
                  </div>
                  <div className="flex-auto px-0 pt-0 pb-1">
                    <div className="p-0 overflow-x-auto">
                      <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                        <thead className="align-bottom">
                          <tr>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Documento ID</th>
                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nombre Documento</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Código Documento </th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tipo Documento</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Proceso</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.data.map((document, index) => {
                                return (
                                <tr key={index}>
                                    <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <div className="flex px-2 py-1">
                                        <div className="flex flex-col justify-center">
                                          <h6 className="mb-0 leading-normal dark:text-white text-size-sm text-center ml-4">{document.doc_id}</h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{document.doc_nombre}</p>
                                    </td>
                                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 text-size-sm whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{document.doc_codigo}</p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{document.document_type.tip_nombre}</p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{document.process.pro_nombre}</p>
                                    </td>
                                    <td className="p-2 bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <div className="flex-row flex-wrap text-center">
                                            <button className="p-2 bg-white"  onClick={() => setData({document, show: true})} >
                                                <FaEye className="fas fa-eye text-orange-600"/>
                                            </button>
                                            <Link href={route('documents.show', document.doc_id)} className="p-2 bg-white">
                                                <FaEdit className="fas fa-edit text-black"/>
                                            </Link>
                                            <button className="p-2 bg-white" onClick={() => setDeleteData({document, show: true})}>
                                                <FaTrash className="fas fa-trash text-red-700"/>
                                            </button>
                                      </div>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                      </table>
                      <Pagination className="mt-6" links={documents.links} currentFilters={currentFilters} />
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            <DocumentModal data={data} />
            <DocumentDeleteModal  deleteData={deleteData}  />
        </>
    )
}

export default DocumentsTable
