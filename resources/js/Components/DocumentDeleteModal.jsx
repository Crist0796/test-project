import { useForm, Link, router } from "@inertiajs/react";
import React, {useState, useEffect} from "react";

export default function DocumentDeleteModal({deleteData}) {

  const [showModal, setShowModal] = useState(false);
  const { data, setData, post } = useForm({
    doc_id : deleteData.id
  })

  useEffect(() => {
    setShowModal(deleteData.show)
    if(deleteData.document.doc_id){
        setData({
            doc_id : deleteData.document.doc_id
        })
    }
  }, [deleteData]);

  const sendDeleteData = (e) => {
    e.preventDefault()
    router.post('documents.delete', data)
    setShowModal(false)
  }

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
                  <h3 className="text-3xl font-semibold">
                    Eliminar Documento
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <i className="fas fa-x fs-4 text-black"></i>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="p-6">
                    <p className="text-center text-size-xl">¿Estás seguro que deseas eliminar este documento (ID : {deleteData.document.doc_id})?</p>
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
                  <button formMethod="post"
                    onClick={sendDeleteData}
                    className="bg-blue-900 text-white active:bg-blue-600 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

                  >
                    <span> Eliminar </span>
                    <i className="fas fa-trash text-4 mx-2"></i>
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
