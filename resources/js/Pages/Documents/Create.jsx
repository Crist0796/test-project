import React from "react"
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from "@inertiajs/react"
import CreateForm from "@/Components/Documents/CreateForm"

const Create = () => {
    return(
        <>
        <Head title='Documents Create'/>
        <DashboardLayout>
            <h1 className='text-center text-white mt-5 mb-3 text-8'>Añadir Documento</h1>
            <CreateForm/>
        </DashboardLayout>
        </>
    )
}
export default Create
