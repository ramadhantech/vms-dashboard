"use client";

import VisitsTable from "@/components/visits/VisitsTable";
import VisitFilters from "@/components/visits/VisitFilters";
import Pagination from "@/components/visits/Pagination";
import { useVisits } from "@/app/hooks/useVisits";


export default function VisitsPage() {
  
  const {
    currentData,

    department,
    departments,
    changeDepartment,

    currentPage,
    totalPages,

    nextPage,
    prevPage,
  } = useVisits();

 
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Visits</h1>

    
      
       <VisitFilters
  department={department}
  departments={departments}
  onChangeDepartment={changeDepartment}
/>

       

     <VisitsTable data={currentData} />
      
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  nextPage={nextPage}
  prevPage={prevPage}
/>
      </div>
    
  );
}