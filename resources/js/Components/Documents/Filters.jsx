import { useForm, usePage, Link } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"

const Filters = () => {

    const {currentFilters, documentTypes, process} = usePage().props

    const {data, setData} = useForm({
        doc_nombre : currentFilters.doc_nombre,
        tip_id : currentFilters.tip_id ,
        pro_id : currentFilters.pro_id,
        paginate : currentFilters.paginate

    })

    //Es para saber si algún filtro se modificó y así evitar mandar la data
    const [modifyData, setModifyData] = useState(false)
    useEffect(() => {
        if(data.doc_nombre || data.tip_id || data.pro_id || data.paginate != 5){
            setModifyData(true)
        }
    }, [])

    const paginate = [
        '5',
        '10',
        '30',
        '50',
        '100'
    ]

    const onChangeHandle = (e) => {
        setData(e.target.name, e.target.value)
        setModifyData(true)
    }

    return (
        <>
        <form className="bg-white rounded-3 shadow-xl mt-5 flex flex-row flex-wrap my-2 p-2 justify-center align-center">
            <div>
                <input name="doc_nombre" placeholder="Nombre Documento" onChange={onChangeHandle} value={data.doc_nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-size-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1"/>
            </div>
            <div>
                <select name="tip_id" onChange={onChangeHandle} defaultValue={data.tip_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-4 rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 mx-1">
                <option value="">-- Tipo de Documento --</option>
                    {documentTypes.map((documentType, index) => {
                        return <option key={index} value={documentType.tip_id}>{documentType.tip_nombre}</option>
                    })}
                </select>
            </div>

            <div>
                <select name="pro_id" onChange={onChangeHandle} defaultValue={data.pro_id}  className="bg-gray-50 border border-gray-300 text-gray-900 text-4 rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 mx-1">
                <option value="">-- Proceso --</option>
                    {process.map((process, index) => {
                        return  <option key={index} value={process.pro_id}>{process.pro_nombre}</option>
                    })}

                </select>
            </div>

            <div>
                <select name="paginate" onChange={onChangeHandle} defaultValue={data.paginate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    {paginate.map((paginate, index) => {
                        return <option value={paginate} key={index}>{paginate}</option>
                    })}
                </select>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center">
                {
                    modifyData ?
                        <Link
                            as="button"
                            href={route('documents', data)}
                            className="text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Filtrar
                            <FaSearch className="fas fa-search ml-2"/>
                        </Link> :
                        <Link
                            as="button"
                            href={route('documents')}
                            className="text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Filtrar
                            <FaSearch className="fas fa-search ml-2"/>
                        </Link>
                }

            </div>
        </form>
        </>
    )
}
export default Filters
