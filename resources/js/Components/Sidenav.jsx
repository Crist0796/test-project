import React from "react"
import { Link } from "@inertiajs/react"
import logo from '/resources/img/logo.png'
import { FaCopy, FaFileAlt, FaFileMedical, FaUserTie } from "react-icons/fa"
const Sidenav = ({active, onChangeAct, module}) => {
    const onHandleClick = () => {
        onChangeAct()
    }

    const getActiveModule = (str) => {
        return str == module ? 'bg-orange-500' : ''
    }

    let cN
    active === 1 ? cN = 'fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-3xl dark:shadow-none dark:bg-slate-850 max-w-50 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0'
           : cN = 'fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-3xl dark:shadow-none dark:bg-slate-850 max-w-50 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0 ml-6 translate-x-0'
    return(
        <aside className={cN}>
      <div className="h-19" onClick={() => {onHandleClick()}}>
        <i className="absolute top-0 right-0 p-4 opacity-100 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden" >
        </i>
        <a className="block px-8 py-6 m-0 text-size-sm whitespace-nowrap dark:text-white text-slate-700">
          <img src={logo} className="inline h-full w-85 max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-15 mb-3" alt="main_logo" />
          <img src={logo} className="hidden h-full w-85 max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-15" alt="main_logo" />
        </a>
      </div>
      <hr className="h-px mt-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
      <div className="items-center mt-10 block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <Link className={`py-2.7 ${getActiveModule('Documentos')} hover:bg-orange-500 dark:text-white dark:opacity-80 text-size-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`} href={route('documents')}>
                <FaFileAlt/>
              <span className="ml-3 duration-300 opacity-100 pointer-events-none ease">Documentos</span>
            </Link>
          </li>
          <li className="mt-0.5 w-full">
            <Link className={`py-2.7 ${getActiveModule('Tipos de documento')} hover:bg-orange-500 dark:text-white dark:opacity-80 text-size-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`} href={route('document-types')}>
                <FaCopy/>
              <span className="ml-3 duration-300 opacity-100 pointer-events-none ease">Tipos de documento</span>
            </Link>
          </li>
          <li className="mt-0.5 w-full">
            <Link className={`py-2.7 ${getActiveModule('Procesos')} hover:bg-orange-500 dark:text-white dark:opacity-80 text-size-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`} href={route('process')}>
                <FaUserTie/>
              <span className="ml-3 duration-300 opacity-100 pointer-events-none ease">Procesos</span>
            </Link>
          </li>
          <li className="mt-0.5 w-full">
            <Link className={`py-2.7 ${getActiveModule('Nuevo Documento')} hover:bg-orange-500 dark:text-white dark:opacity-80 text-size-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`} href={route('documents.create')}>
                <FaFileMedical/>
              <span className="ml-3 duration-300 opacity-100 pointer-events-none ease">Nuevo Documento</span>
            </Link>
          </li>


        </ul>
      </div>
    </aside>
    )
}
export default Sidenav
