import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head} from '@inertiajs/react';
export default function Dashboard() {
    return (
        <>
        <Head title='Dashboard'/>
            <DashboardLayout>
                <h1 className='text-center text-white mt-5 mb-3 text-8'>Gestión de documentos</h1>
            </DashboardLayout>
        </>
    );
}
