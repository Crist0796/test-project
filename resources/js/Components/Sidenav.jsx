import React from "react"
import { Link } from "@inertiajs/react"
import logo from '/resources/img/logo.png'
const Sidenav = ({active, onChangeAct}) => {
    const onHandleClick = () => {
        onChangeAct()
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
          <li className="mt-0.5 w-full mb-3">
            <Link className="py-2.7 mt-3 bg-blue-500/13 dark:text-white dark:opacity-80 text-size-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors" href={route('dashboard')}>
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i className="relative top-0 leading-normal text-blue-600 fa-solid fa-gas-pump text-size-xl"></i>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Despachos</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
    )
}

export default Sidenav