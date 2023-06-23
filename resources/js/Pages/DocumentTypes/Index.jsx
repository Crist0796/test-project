import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { FaFileMedical } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { showToast } from '@/Helpers/helpers';
import { useEffect } from 'react';
import DocumentTypesTable from '@/Components/DocumentTypes/DocumentTypeTable';

export default function Index({documentTypes, flash}) {

    useEffect(() => {
        if(flash.document_type_updated){
            showToast(flash.document_type_updated, toast)
        }else{
            toast.remove()
        }
    }, [flash])

    return (
        <>
        <Head title='Tipos de documentos'/>
            <DashboardLayout module="Tipos de documento">
                <Toaster/>
                <h1 className='text-center text-white mt-5 mb-3 text-8'>Gestión de documentos</h1>
                {
                    documentTypes.data.length ?
                    <DocumentTypesTable/>
                    :
                    <>
                    <div className='flex justify-center p-2 mt-4 items-center'>
                        <h3 className='text-center pt-2'> NO HAY TIPOS DOCUMENTOS </h3>
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
