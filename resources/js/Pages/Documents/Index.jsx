import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { FaFileMedical } from 'react-icons/fa';
import DocumentsTable from '@/Components/Documents/DocumentsTable';
import Filters from '@/Components/Documents/Filters';
import toast, { Toaster } from 'react-hot-toast';
import { showToast } from '@/Helpers/helpers';
import { useEffect } from 'react';
export default function Index({documents, flash}) {



    useEffect(() => {
        if(flash.document_created){
            showToast(flash.document_created, toast)
        }else if(flash.document_deleted){
            showToast(flash.document_deleted, toast)
        }else{
            toast.remove()
        }
    }, [flash])

    return (
        <>
        <Head title='Documents'/>
            <DashboardLayout>
                <Toaster/>
                <h1 className='text-center text-white mt-5 mb-3 text-8'>Gestión de documentos</h1>
                {
                    documents.data.length ?
                    <DocumentsTable/>
                    :
                    <>
                    <Filters/>
                    <div className='flex justify-center p-2 mt-4 items-center'>
                        <h3 className='text-center pt-2'> NO HAY DOCUMENTOS </h3>
                        <Link className=' p-2 ml-4 rounded-full border-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all'>
                            <FaFileMedical className='text-6'/>
                        </Link>
                    </div>
                    </>
                }
            </DashboardLayout>
        </>
    );
}
