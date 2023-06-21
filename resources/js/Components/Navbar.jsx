import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { FaSignOutAlt } from "react-icons/fa"
/* import { Inertia } from "@inertiajs/react"; */
const Navbar = ({onChangeAct}) => {



    var root_html = document.querySelector('html')

    const onChangeHandle = (e) => {
        e.target.checked ? root_html.classList.add("dark") : root_html.classList.remove("dark")
    }
    return (
        <div className="fixed z-10 bg-transparent w-full ml-6">
        <nav className=" bg-transparent flex flex-wrap items-center justify-between px-0 py-2 ml-6 transition-all ease-in shadow-none duration-250 lg:flex-nowrap lg:justify-start w-3/4 ">
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>

            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="leading-normal text-size-sm">
                <Link className="text-white opacity-50" href={route('dashboard')}>INNCLOUD</Link>
              </li>
              <li className="text-size-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']">DOCUMENTOS</li>
            </ol>
            <h6 className="mb-0 font-bold text-white capitalize">{}</h6>
          </nav>
          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <div className="flex items-center md:ml-auto md:pr-4">
            </div>
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
              <li className="flex items-center px-4">
                <Link href={route('logout')} method="post" type="button" className="p-0 text-white transition-all text-size-sm ease-nav-brand flex flex-row justify-center">
                <FaSignOutAlt className="cursor-pointer text-white text-size-xl ml-3 fas fa-right-from-bracket hover:text-black dark:hover:text-white transition-all"></FaSignOutAlt>
                <p className="ml-2">Cerrar sesión</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    )
}

export default Navbar
