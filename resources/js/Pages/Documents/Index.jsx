import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { FaFileMedical } from 'react-icons/fa';
import DocumentsTable from '@/Components/DocumentsTable';

export default function Index({documents}) {
    return (
        <>
        <Head title='Documents'/>
            <DashboardLayout>
                <h1 className='text-center text-white mt-5 mb-3 text-8'>Gestión de documentos</h1>
                {
                    documents.data.length ?
                    <DocumentsTable/>
                    :
                    <div className='flex justify-center p-2 mt-4 items-center'>
                        <h3 className='text-center pt-2'> NO SE HA AGREGADO NINGÚN DOCUMENTO </h3>
                        <Link className=' p-2 ml-4 rounded-full border-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all'>
                            <FaFileMedical className='text-6'/>
                        </Link>
                    </div>
                }
            </DashboardLayout>
        </>
    );
}
