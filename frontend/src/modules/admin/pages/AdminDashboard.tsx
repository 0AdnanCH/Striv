import AdminSidebar from '../components/layout/AdminSidebar';
import AdminHeader from '../components/layout/AdminHeader';

export default function AdminDashboard() {
  // const handleAddNew = () => {
  //   console.log('Add new item clicked');
  // };

  return (
    <div className="flex h-screen bg-admin-bg text-admin-primary">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <AdminHeader
          title='Dashboard Overview'
          // actionButton={{ label: "Add New", onClick: handleAddNew }}
        />

        {/* Content */}
        <div className="p-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white text-admin-primary p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-2">Card {i}</h3>
                <p className="text-sm text-admin-secondary">This is a demo content block for your admin dashboard. You can replace this with analytics, stats, or user info.</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}