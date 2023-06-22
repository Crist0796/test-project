import { useForm, usePage } from "@inertiajs/react"
import React from "react"
import { FaSave } from "react-icons/fa"

const CreateForm = () => {
    const { documentTypes, process } = usePage().props
    const { data, setData, errors, post} = useForm({
        doc_nombre : '',
        doc_contenido : '',
        doc_id_tipo : '',
        doc_id_proceso : '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('documents.store'), data)
    }

    const onChangeHandle = (e) => {
        setData(e.target.name, e.target.value)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex-auto p-6 w-8/12">
            <form role="form" onSubmit={submit}>
                <div className="mb-6">
                    <label htmlFor="doc_nombre">Nombre del documento</label>
                    <input type="text" placeholder="Ejemplo: Instructivo de Desarrollo" name="doc_nombre" id="doc_nombre" onChange={onChangeHandle} className="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-500 focus:outline-none" />
                    <p className='text-red-500'>{errors.doc_nombre}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="doc_contenido">Contenido del documento</label>
                    <textarea type="text" placeholder="Contenido del documento" name="doc_contenido" id="doc_contenido" onChange={onChangeHandle} className="focus:shadow-primary-outline resize-none dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-500 focus:outline-none">
                    </textarea>
                    <p className='text-red-500'>{errors.doc_contenido}</p>
                </div>
                <div className="flex gap-4 mb-4">
                <div>
                    <select name="doc_id_tipo" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-4 rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 mx-1">
                        <option value="">-- Tipo Documento --</option>
                        {documentTypes.map((documentType, index) => {
                            return  <option key={index} value={documentType.tip_id}>{documentType.tip_nombre}</option>
                        })}
                    </select>
                    <p className='text-red-500'>{errors.doc_id_tipo}</p>
                </div>
                <div>
                    <select name="doc_id_proceso" onChange={onChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-4 rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 mx-1">
                        <option value="">-- PROCESO --</option>
                        {process.map((process, index) => {
                            return  <option key={index} value={process.pro_id}>{process.pro_nombre}</option>
                        })}
                    </select>
                    <p className='text-red-500'>{errors.doc_id_proceso}</p>
                </div>
                </div>
                      {/* <div className="flex items-center pl-12 mb-0.5 text-left min-h-6">
                        <input id="rememberMe" name="remember" value={data.remember} onChange={onChangeHandle} className="mt-0.5 rounded-10 duration-250 ease-in-out after:rounded-circle after:shadow-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-zinc-700/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-white checked:bg-orange-500 checked:bg-none checked:bg-right" type="checkbox" />
                        <label className="ml-2 font-normal cursor-pointer select-none text-size-sm text-slate-700" htmlFor="rememberMe">Recordarme</label>
                      </div> */}
                 {/*Botoón guardar*/ }
                <div className="text-center">
                  <button type="submit"className="group relative h-12 w-80 overflow-hidden rounded-lg bg-white text-lg shadow mt-3">
                    <div className="absolute inset-0 w-3 bg-orange-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-black group-hover:text-white">GUARDAR DOCUMENTO</span>
                    <FaSave className="relative text-black group-hover:text-white text-5 m-2"/>
                  </button>
                </div>
                {/*Fin -- Botoón guardar*/ }
            </form>
         </div>
        </div>
    )
}
export default CreateForm
