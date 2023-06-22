import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { setUrl } from '@/Helpers/helpers';

const Pagination = ({ links}) => {

    const { currentFilters } = usePage().props
    function getClassName(active) {
        if(active) {
            return "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-orange-500 text-white bg-orange-600";
        } else{
            return "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-orange-500 bg-white text-black hover:bg-orange-600 hover:text-white";
        }
    }

    const setLabel = (label) => {
        if(label == 'Next &raquo;'){
            return <span> <FaChevronRight className='fas text-size-xs-em fa-chevron-right'/></span>
        }else if (label == '&laquo; Previous'){
            return <span><FaChevronLeft className='fas text-size-xs-em fa-chevron-left'/> </span>
        }else{
            return label
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8 justify-center">
                    {links.map((link, key) => (
                        link.url === null ?
                            (<div key={key}
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500 bg-white text-gray-500">{setLabel(link.label)}</div>)
                            :
                            (<Link key={key} className={getClassName(link.active)}href={ setUrl(link.url, currentFilters ? currentFilters : false)   }>{setLabel(link.label)}</Link>)
                        ))}
                </div>
            </div>
        )
    );
}

export default Pagination

