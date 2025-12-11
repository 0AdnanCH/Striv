import AdminSidebar from '../components/layout/AdminSidebar'; 
import AdminHeader from '../components/layout/AdminHeader';   
import { TrainerApplicationTable } from '../components/table/TrainerApplicationTable'; 
import { AdminPagination } from '../components/layout/AdminPagination'; 
import { AdminSearchFilter } from '../components/layout/AdminSearchFilter'; 

// Import the Hook
import { useAdminTrainerApplications } from '../hooks/useAdminTrainerApplications'; 
import { TrainerApplicationStatus } from '../../trainer/constants/trainerApplicationStatus.constant'; 

const TrainerApplicationsListPage = () => {
  const { data, meta, loading, actions } = useAdminTrainerApplications();

  // 2. Define Filter Options for the Search Bar
  const filterOptions = [
    { 
      label: 'Filter by Status', 
      key: 'status', 
      options: [
        TrainerApplicationStatus.REVISION_REQUIRED,
        TrainerApplicationStatus.COMPLETED,
        TrainerApplicationStatus.IN_PROGRESS,
        TrainerApplicationStatus.UNDER_REVIEW, 
        TrainerApplicationStatus.APPROVED, 
        TrainerApplicationStatus.REJECTED
      ] 
    }
  ];

  return (
    <div className="flex h-screen bg-[#E2E8F0] text-[#1E293B]">
      
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        
        {/* HEADER */}
        <AdminHeader 
          title="Trainer Verifications" 
          className="border-b border-[#64748B]/20"
        />

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* SEARCH & FILTER BAR */}
          <div className="mb-6">
            <AdminSearchFilter 
              placeholder="Search by name or email..."
              filters={filterOptions}
              // Connect Hook Actions directly to UI Events
              onSearch={actions.setSearch}
              onFilterChange={(key, value) => {
                if (key === 'status') actions.setStatus(value);
              }}
            />
          </div>

          {/* TABLE COMPONENT */}
          {/* We just pass the data; the table handles the columns & rendering */}
          <TrainerApplicationTable 
            data={data} 
            loading={loading} 
          /> 

          {/* PAGINATION COMPONENT */}
          {/* Only show if we have data and loading is finished */}
          {!loading && meta.total > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <p className="text-sm text-[#64748B] mb-4 sm:mb-0">
                Showing <span className="font-medium">{(meta.page - 1) * meta.limit + 1}</span> to <span className="font-medium">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-medium">{meta.total}</span> entries
              </p>
              
              <AdminPagination 
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={actions.setPage}
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default TrainerApplicationsListPage;