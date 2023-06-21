import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

const Filters = () => {
    const {currentFilters, documentTypes, process} = usePage().props
    const {data, setData, get} = useForm({
        tip_id : '',
        pro_id : '',
        paginate : currentFilters ? currentFilters.paginate : 10,

    })

    const paginate = [
        '10',
        '30',
        '50',
        '100'
    ]

    const submit = (e) => {
        e.preventDefault()
        get(route('dashboard'), data)
    }

    const onChangeHandle = (e) => {
        setData(e.target.name, e.target.value)
    }

    return (
        <>
        <form className="bg-white rounded-3 flex flex-row flex-wrap my-2 p-2 justify-center align-center" onSubmit={submit}>
            <div>
                <select name="chofer" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-size-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    <option value="">Tipo Documento</option>
                </select>
            </div>

            <div>
                <select name="vehiculo" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    <option value="">Proceso</option>
                </select>
            </div>

            <div>
                <select name="paginate" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    <option value="">Número de resultados</option>
                </select>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center">
                <button
                    type="submit"
                    className="text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Filtrar
                    <FaSearch className="fas fa-search ml-2"/>
                </button>
            </div>
        </form>
        </>
    )
}
export default Filters
