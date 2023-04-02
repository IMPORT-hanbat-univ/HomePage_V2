import usePagination from '@/hooks/usePagination';
import { useRouter } from 'next/router';
import React from 'react';
import Pagination from '../Pagination';

export default function CardList({cardList}) {
    const router = useRouter();
    const { nowPage } = router.query;
    const currentPage = nowPage ? parseInt(nowPage) : 1;
    console.log("cardList", cardList)
    const { page, pageData, pageRangeArray } = usePagination(cardList, currentPage);

    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                
            </div>
            <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
        </section>
       
    );
}

