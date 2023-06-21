import React, {useEffect, useState} from "react"
import Pagination from "@/Components/Pagination"
import Filters from "@/Components/Filters"
import DespachosModal from "../Modals/DespachoModal"
import DespachosModalEdit from "../Modals/DespachoModalEdit"
import Alert from '@/Components/Alert'
import { usePage } from '@inertiajs/react'
import DespachoModalDelete from "../Modals/DespachoModalDelete"




const DocumentsTable = () => {



    const {despachos, filters, currentFilters} = usePage().props

    //Estados para los Alerts
    const [ dataEdited, setEditedData ] = useState(false)
    const [ dataSyncroniced, setDataSyncronice ] = useState(false)
    const [ dataCreated, setDataCreated ] = useState(false)
    const [ dataDeleted, setDataDeleted ] = useState(false)

    //Pasa información de cada despacho al modal
    const [data, setData] = useState({title: 'funciona', despacho: 'Sí sirve', show: false})
    const [editData, setEditData] = useState({title: 'funciona', despacho: 'Sí sirve', show: false})
    const [deleteData, setDeleteData] = useState({title: 'Eliminar Despacho', id: '', show: false})
    const { flash } = usePage().props

    /* ${parseInt(currentFilters.paginate) > 5 ? 'h-240 pb-116' : 'h-180 pb-50'} */
    const closeModalEditData = () => {
        setEditedData(false)
    }

    useEffect(() => {
        flash.data_syncroniced ? setDataSyncronice(true) : setDataSyncronice(false)
        flash.data_edited ? setEditedData(true) : setEditedData(false)
        flash.data_created ? setDataCreated(true) : setDataCreated(false)
        flash.data_deleted ? setDataDeleted(true) : setDataDeleted(false)
        console.log(flash.data_syncroniced)
        console.log(flash.data_edited)
        console.log(dataCreated)
    },
    [despachos])

    const roundDecimal = (num) =>  parseFloat(num).toFixed(3)

    return (

        <>
            <Filters/>
            <Alert message={flash.data_syncroniced} state={dataSyncroniced} closeModal={() => setDataSyncronice(false)}/>
            <Alert message={flash.data_edited} state={dataEdited} closeModal={() => setEditedData(false)}/>
            <Alert message={flash.data_created} state={dataCreated} closeModal={() => setDataCreated(false)}/>
            <Alert message={flash.data_deleted} state={dataDeleted} closeModal={() => setDataDeleted(false)}/>
            {despachos.data.length === 0 ? <h2 className="text-center text-red-500">No hay despachos que cumplan ese criterio de búsquedad</h2> :
            <div className={`flex flex-wrap -mx-3 overflow-y-auto ${parseInt(currentFilters.paginate) > 5 ? 'h-240 pb-116' : 'h-180 pb-50'}  scrollbar-thumb-blue-900 scrollbar-track-white scrollbar-thin mt-3`}>
              <div className="flex-none w-full max-w-full px-3">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-3xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="p-2 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <h6 className="dark:text-white">Tabla Despachos</h6>
                  </div>
                  <div className="flex-auto px-0 pt-0 pb-1">
                    <div className="p-0 overflow-x-auto">
                      <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                        <thead className="align-bottom">
                          <tr>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Despacho ID</th>
                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Monto</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">LTS </th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Camión</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Kms Iniciales</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Kms Finales</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Rinde</th>
                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Fecha</th>
                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-collapse border-solid shadow-none dark:border-white/40 dark:text-white tracking-none whitespace-nowrap text-slate-400 opacity-70">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                            {despachos.data.map((despacho, index) => {
                                return (
                                <tr key={index}>
                                    <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <div className="flex px-2 py-1">
                                        <div className="flex flex-col justify-center">
                                          <h6 className="mb-0 leading-normal dark:text-white text-size-sm text-center ml-4">{despacho.despacho_id}</h6>
                                          {/* <p className="mb-0 leading-tight dark:text-white dark:opacity-80 text-size-xs text-slate-400">{despacho.email}</p> */}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{despacho.monto}</p>
                                    </td>
                                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 text-size-sm whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{despacho.volumen}</p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{despacho.vehiculo.matricula}</p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{despacho.kms_iniciales}</p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{despacho.kms_finales}</p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">
                                            {despacho.kms_iniciales && despacho.kms_finales ? roundDecimal((parseFloat(despacho.kms_finales) - parseFloat(despacho.kms_iniciales)) / despacho.volumen) : ''}
                                        </p>
                                    </td>
                                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-80 text-size-xxs">{despacho.fecha}</p>
                                    </td>
                                    <td className="p-2 bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                      <div className="flex-row flex-wrap text-center">
                                            <button className="p-2 bg-white"  onClick={() => setData({id: despacho.despacho_id, despacho: despacho, show: true})} >
                                                <i className="fas fa-eye text-blue-900"></i>
                                            </button>
                                            <button className="p-2 bg-white" onClick={() => setEditData({id: despacho.despacho_id, despacho: despacho, show: true})}>
                                                <i className="fas fa-edit text-black"></i>
                                            </button>
                                            <button className="p-2 bg-white" onClick={() => setDeleteData({id: despacho.despacho_id, show: true})}>
                                                <i className="fas fa-trash text-red-700"></i>
                                            </button>
                                      </div>
                                    </td>
                                </tr>

                                )
                            })}
                        </tbody>
                      </table>
                      <Pagination className="mt-6" links={despachos.links} currentFilters={currentFilters} />
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            <DespachosModal data={data} />
            <DespachosModalEdit desData={editData} />
            <DespachoModalDelete  deleteData={deleteData}  />
        </>

    )
}

export default DocumentsTable
