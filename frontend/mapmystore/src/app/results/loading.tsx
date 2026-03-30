export default function ResultsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-pulse">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-1/3 bg-gray-200 rounded-lg mb-8"></div>
        
        <div className="h-[300px] bg-gray-200 rounded-xl mb-10 w-full shadow-sm"></div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
             <div className="h-40 bg-white border border-gray-100 shadow-sm rounded-xl w-full p-4 flex flex-col gap-3">
               <div className="h-12 bg-gray-200 rounded w-24"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
               <div className="h-16 bg-gray-100 rounded w-full mt-2"></div>
             </div>
             <div className="h-40 bg-white border border-gray-100 shadow-sm rounded-xl w-full p-4 flex flex-col gap-3">
               <div className="h-12 bg-gray-200 rounded w-24"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
               <div className="h-16 bg-gray-100 rounded w-full mt-2"></div>
             </div>
             <div className="h-40 bg-white border border-gray-100 shadow-sm rounded-xl w-full p-4 flex flex-col gap-3">
               <div className="h-12 bg-gray-200 rounded w-24"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
               <div className="h-16 bg-gray-100 rounded w-full mt-2"></div>
             </div>
             <div className="h-40 bg-white border border-gray-100 shadow-sm rounded-xl w-full p-4 flex flex-col gap-3">
               <div className="h-12 bg-gray-200 rounded w-24"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
               <div className="h-16 bg-gray-100 rounded w-full mt-2"></div>
             </div>
          </div>
          <div className="h-[600px] rounded-xl bg-gray-200 shadow-sm w-full sticky top-6 border border-gray-100"></div>
        </div>
      </div>
    </div>
  );
}
