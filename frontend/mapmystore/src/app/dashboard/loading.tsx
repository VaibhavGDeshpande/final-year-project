export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-gray-50 p-6 animate-pulse">
      <div className="w-64 bg-gray-200 rounded-xl mr-6 h-full flex-shrink-0 hidden md:block"></div>
      <div className="flex-1 flex flex-col gap-6">
        <div className="h-16 bg-gray-200 rounded-xl w-full"></div>
        <div className="h-[400px] bg-gray-200 rounded-xl w-full"></div>
        <div className="flex gap-6 h-64 flex-col lg:flex-row">
           <div className="flex-1 bg-gray-200 rounded-xl"></div>
           <div className="flex-1 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
