import React, {useEffect, useState} from "react"
import DocumentModal from "./DocumentTypeModal"
import { usePage } from '@inertiajs/react'
import { FaEdit} from "react-icons/fa"

const DocumentTypeTable = () => {

    const {documentTypes } = usePage().props

    //Pasa información de cada tipo de documento al modal al modal
    const [data, setData] = useState({documentType : '', tip_id : '', show: false})
    const {  } = usePage().props

    useEffect(() => {
        setData({documentType : '', tip_id : '', show: false})
    }, [documentTypes])

    return (
        <>
            {documentTypes.data.length === 0 ? <h2 className="text-center text-red-500">No hay documentos que cumplan ese criterio de búsquedad</h2> :
            <div className={`flex flex-wrap -mx-3 overflow-y-auto h-135 pb-200  scrollbar-thumb-orange-500 scrollbar-track-white scrollbar-thin mb-3`}>
              <div className="flex-none w-full max-w-full px-3">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-3xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="p-2 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <h6 className="dark:text-white">Tabla Tipo Documentos</h6>
                  </div>
                  <div className="flex-auto px-0 pt-0 pb-1">
                    <div className="p-0 overflow-x-auto">
                      <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                        <thead className="align-bottom">
                          <tr>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tipo Documento ID</th>
                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nombre</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Prefijo </th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentTypes.data.map((documentType, index) => {
                                return (
                                <tr key={index}>
                                    <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <div className="flex px-2 py-1">
                                        <div className="flex flex-col justify-center">
                                          <h6 className="mb-0 leading-normal dark:text-white text-size-sm text-center ml-4">{documentType.tip_id}</h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{documentType.tip_nombre}</p>
                                    </td>
                                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 text-size-sm whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{documentType.tip_prefijo}</p>
                                    </td>
                                    <td className="p-2 bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <div className="flex-row flex-wrap text-center">
                                            <button className="p-2 bg-white" onClick={() => setData({documentType, tip_id : documentType.tip_id, show: true})}>
                                                <FaEdit className="fas fa-trash text-black"/>
                                            </button>
                                      </div>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            <DocumentModal docData={data}/>
        </>
    )
}

export default DocumentTypeTable
