import {React,useEffect} from "react";

export default function Pagination(props){

    const {pagination,onPageChange} = props;
    const {current_page,per_page,total} = pagination;

    const totalPage = Math.ceil(total/per_page);

    return(
        <>
        {/* <div>
        <button  className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none" >Previous</button>
           
        <button  className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none" >Next</button>
         </div>  */}
        <div className="flex justify-center">
        <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">
            <li className="page-item"><button disabled={current_page <= 1} onClick={() => onPageChange(current_page - 1)} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none" href="#">Previous</button></li>
 
            <li className="page-item"><button disabled={current_page >= totalPage} onClick={() => onPageChange(current_page + 1)} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" href="#">Next</button></li>
            </ul>
        </nav>
        </div>
</>
    );
}