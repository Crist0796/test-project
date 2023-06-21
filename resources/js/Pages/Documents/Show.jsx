import React from "react"
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from "@inertiajs/react"
import ShowForm from "@/Components/ShowForm"

const Show = () => {
    return(
        <>
        <Head title='Documents Show'/>
        <DashboardLayout>
            <h1 className='text-center text-white mt-5 mb-3 text-8'>Ver / Modificar Documento</h1>
            <ShowForm/>
        </DashboardLayout>
        </>
    )
}
export default Show
