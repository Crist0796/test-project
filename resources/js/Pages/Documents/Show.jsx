import React, { useEffect } from "react"
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from "@inertiajs/react"
import ShowForm from "@/Components/Documents/ShowForm"
import { Toaster, toast } from "react-hot-toast";
import { showToast } from "@/Helpers/helpers";

const Show = () => {

    const { flash } = usePage().props

    useEffect(() => {
        if(flash.document_updated){
            showToast(flash.document_updated, toast)
        }else{
            toast.remove()
        }
    }, [flash])

    return(
        <>
        <Head title='Documents Show'/>
        <DashboardLayout>
            <h1 className='text-center text-white mt-5 mb-3 text-8'>Ver / Modificar Documento</h1>
            <Toaster/>
            <ShowForm/>
        </DashboardLayout>
        </>
    )
}
export default Show
