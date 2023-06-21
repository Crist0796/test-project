import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"

const Filters = () => {
    const {filters, currentFilters} = usePage().props

    const {data, setData, get} = useForm({

    })

    const paginate = [
        '10',
        '30',
        '50'
    ]

    const submit = (e) => {
        e.preventDefault()
        get(route('dashboard'), data)
    }
    const onChangeHandle = (e) => {
        setData(e.target.name, e.target.value)
    }

    const syncroniceData = (e) => {
        e.preventDefault()
        get(route('syncronice-data'), data)
    }
    const handleChageDate = (e) => {
        e.target.name == 'fecha_desde' ? setFromDate(e.target.value) : setToDate(e.target.value)
        onChangeHandle(e)
    }
    return (
        <>
        <form className="bg-white rounded-3 flex flex-row flex-wrap my-2 p-2 justify-center align-center" onSubmit={submit}>
            <div>
                <select name="chofer" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-size-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    <option value="">Chofer</option>
                    {filters.choferes.map((chofer, index) => {
                        return currentFilters.chofer == chofer.chofer_id ? <option key={index} value={chofer.chofer_id} selected>{chofer.nombre}</option> :
                            <option key={index} value={chofer.chofer_id}>{chofer.nombre}</option>;
                    })}
                </select>
            </div>

            <div>
                <select name="vehiculo" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    <option value="">Vehiculo</option>
                    {filters.vehiculo.map((vehiculo, index) => {
                        return currentFilters.vehiculo == vehiculo.vehiculo_id ? <option key={index} value={vehiculo.vehiculo_id} selected>{vehiculo.matricula}</option> :
                            <option key={index} value={vehiculo.vehiculo_id}>{vehiculo.matricula}</option>;
                    })}
                </select>
            </div>
            <div className="mb-4 mx-2 flex flex-row justify-center items-center">
                <label className="block text-gray-700 text-size-xs-em font-bold mr-2" htmlFor="fecha_desde">
                    Desde:
                </label>
                <input onChange={handleChageDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-size-xs-em" id="fecha_desde" name="fecha_desde" type="datetime-local" value={fromDate} />
            </div>
            <div className="mb-4 mx-2 flex flex-row justify-center items-center">
                <label className="block text-gray-700 text-size-xs-em font-bold mr-2" htmlFor="fecha_hasta">
                    Hasta:
                </label>
                <input onChange={handleChageDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-size-xs-em" id="fecha_hasta" name="fecha_hasta" type="datetime-local" value={toDate} />
            </div>
            <div>
                <select name="paginate" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1">
                    <option value="">Número de resultados</option>
                    {paginate.map((paginate, index) => {
                        return currentFilters.paginate === paginate ?
                            <option value={paginate} key={index} selected>{paginate}</option> :
                            <option value={paginate} key={index}>{paginate}</option>;
                    })}
                </select>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center">
                <button
                    type="submit"
                    className="text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i className="fas fa-search mr-2"></i>
                    Filtrar
                </button>
                <button
                    type="button"
                    onClick={() => setNewData({show:true})}
                    className="text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Nueva <i className="fas fa-plus"></i>
                </button>
                <button
                    type="button"
                    className="text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={syncroniceData}>
                    <i className="fas fa-redo mr-2"></i>
                    Sincronizar
                </button>
            </div>
        </form><DespachosModalNew newData={newData}/>
        </>
    )
}
export default Filters
