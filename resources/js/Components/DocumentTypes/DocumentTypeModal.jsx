import { useForm, usePage } from "@inertiajs/react";
import React, {useState, useEffect} from "react";
import { FaSave, FaTimes } from "react-icons/fa";

export default function DocumentModal({docData}) {

  const [showModal, setShowModal] = useState(false);

  const {data, setData, errors,  post} = useForm({
    tip_id : '',
    tip_nombre : '',
    tip_prefijo : ''
   })

   const onChangeHandle = (e) => {
    setData(e.target.name, e.target.value)
   }

   const sendData = (e) => {
    e.preventDefault()
    post(route('document-types.update', data))
   }

  useEffect(() => {
    setData('tip_id', docData.documentType.tip_id)
    setShowModal(docData.show)
  }, [docData]);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-180 my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-orange-600">
                    {docData.documentType.tip_nombre}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-gray-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FaTimes className="fas fa-x fs-4 text-gray-700"/>
                    </span>

                  </button>
                </div>
                {/*body*/}
                <div className="p-6">
                    <form>
                        <div className="m-3">
                            <input name="tip_nombre" placeholder="Nombre Tipo Documento" onChange={onChangeHandle} value={docData.doc_nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-size-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1"/>
                            {errors.tip_nombre &&  <p className="text-red-500">{errors.tip_nombre}</p> }
                        </div>
                        <div className="m-3">
                            <input name="tip_prefijo" placeholder="Prefijo opcional" onChange={onChangeHandle} value={docData.doc_nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-size-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1"/>
                            {errors.tip_prefijo &&  <p className="text-red-500">{errors.tip_prefijo}</p> }
                        </div>

                        {errors.prefijo &&  <p className="text-red-700 m-2">{errors.prefijo}</p> }

                    </form>
                    <p className="mt-4"> <strong>NOTA:</strong> Si no escribe nada en el prefijo, se tomara de las primeras tres letras del nombre.</p>
                    <p className="mt-4"> <strong>NOTA:</strong> Al actualizar el tipo de documento se modificara de todos los Documentos.</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={sendData}
                    formMethod="post"
                    className="bg-orange-600 text-white active:bg-orange-500 hover:bg-orange-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

                  >
                    <span> GUARDAR </span>
                    <FaSave className="fas fa-trash text-4 mx-2"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
