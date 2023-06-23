import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { FaFileMedical } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { showToast } from '@/Helpers/helpers';
import { useEffect } from 'react';
import ProcessTable from '@/Components/Process/ProcessTable';

export default function Index({process, flash}) {

    useEffect(() => {
        if(flash.process_updated){
            showToast(flash.process_updated, toast)
        }else{
            toast.remove()
        }
    }, [flash])

    return (
        <>
        <Head title='Tipos de documentos'/>
            <DashboardLayout module="Procesos">
                <Toaster/>
                <h1 className='text-center text-white mt-5 mb-3 text-8'>Gestión de procesos</h1>
                {
                    process.data.length ?
                    <ProcessTable/>
                    :
                    <>
                    <div className='flex justify-center p-2 mt-4 items-center'>
                        <h3 className='text-center pt-2'> NO HAY PROCESOS </h3>
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
