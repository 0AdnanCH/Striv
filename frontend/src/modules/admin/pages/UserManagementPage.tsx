import { useState } from 'react';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminHeader from '../components/layout/AdminHeader';
import { BaseTable, type BaseTableColumn } from '../../../components/base/table'; 
import { BaseSearchFilterBar } from '../../../components/base/search-filter'; 
import BasePagination from '../../../components/base/pagination/BasePagination';
import { BaseConfirmModal } from '../../../components/shared/modal'; 
import { useAdminUsers } from '../hooks/useAdminUsers';
import type { IAdminUser } from '../types/adminUser.types';
import { UserRole } from '../../../constants/userRole.constant';

export default function UserManagementPage() {
  const {
    users,
    total,
    page,
    loading,
    handlePageChange,
    handleSearch,
    handleFilterChange,
    handleBlockUser,
    handleUnblockUser
  } = useAdminUsers(1, 10);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);

  const confirmBlock = async () => {
    if(selectedUserId) {
      await handleBlockUser(selectedUserId);
      setIsBlockModalOpen(false);
    }
  };

  const confirmUnblock = async () => {
    if(selectedUserId) {
      await handleUnblockUser(selectedUserId);
      setIsUnblockModalOpen(false);
    }
  };

  const columns: BaseTableColumn<IAdminUser>[] = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'isVerified',
      label: 'Verified',
      render: (user) => <span className={user.isVerified ? 'text-green-600' : 'text-red-600'}>{user.isVerified ? 'Yes' : 'No'}</span>
    },
    {
      key: 'isBlocked',
      label: 'Status',
      render: (user) => <span className={user.isBlocked ? 'text-red-600' : 'text-green-600'}>{user.isBlocked ? 'Blocked' : 'Active'}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => (
        <div className="flex gap-2">
          { user.role === UserRole.ADMIN ? (
            <span className="text-xs text-admin-secondary italic">(Admin cannot be blocked)</span>
          ) : user.isBlocked ? (
            <button
              onClick={() => {
                setSelectedUserId(user._id);
                setIsUnblockModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 cursor-pointer transition-colors duration-200"
            >
              Unblock
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedUserId(user._id);
                setIsBlockModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 cursor-pointer transition-colors duration-200"
            >
              Block
            </button>
          )}
        </div>
      )
    }
  ];

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex h-screen bg-admin-bg text-admin-primary">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Reusable Admin Header */}
        <AdminHeader
          title="User Management"
          // actionButton={{
          //   label: 'Add User',
          //   onClick: () => console.log('Add user button clicked')
          // }}
        />

        <BaseSearchFilterBar
          searchPlaceholder="Search users..."
          filters={[
            { label: 'Role', key: 'role', options: Object.values(UserRole) },
            { label: 'Status', key: 'status', options: ['Verified', 'Unverified'] }
          ]}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          theme={{
            bg: 'bg-admin-bg',
            border: 'border-admin-secondary/40',
            text: 'text-admin-primary',
            accent: 'focus:ring-admin-accent/40'
          }}
        />

        {/* Page Content */}
        <div className="p-8">
          <BaseTable
            data={users}
            columns={columns}
            loading={loading}
            bordered
            striped
            theme={{
              headerBg: 'bg-admin-primary/90',
              headerText: 'text-white',
              rowHover: 'hover:bg-admin-secondary/10',
              border: 'border-admin-secondary/40',
              text: 'text-admin-primary',
              bg: 'bg-admin-bg'
            }}
          />

          {/* Pagination Info */}
          <div className="flex justify-end">
            <BasePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              theme={{
                primary: 'bg-admin-accent text-white hover:bg-admin-primary',
                accent: 'bg-admin-accent text-white',
                text: 'text-admin-text',
                bg: 'bg-admin-bg',
                border: 'border-admin-secondary/40'
              }}
            />
          </div>
        </div>
      </main>
      {/* Confirmation Modals */}
      <BaseConfirmModal
        isOpen={isBlockModalOpen}
        title="Block User"
        message="Are you sure you want to block this user? They will lose access to their account."
        confirmText="Block"
        onConfirm={confirmBlock}
        onCancel={() => setIsBlockModalOpen(false)}
        theme={{
          bg: 'bg-admin-bg',
          text: 'text-admin-text',
          border: 'border-admin-secondary/30',
          accent: 'bg-red-600 text-white hover:bg-red-700',
          cancelBg: 'bg-gray-100 hover:bg-gray-200'
        }}
      />

      <BaseConfirmModal
        isOpen={isUnblockModalOpen}
        title="Unblock User"
        message="Are you sure you want to unblock this user?"
        confirmText="Unblock"
        onConfirm={confirmUnblock}
        onCancel={() => setIsUnblockModalOpen(false)}
        theme={{
          bg: 'bg-admin-bg',
          text: 'text-admin-text',
          border: 'border-admin-secondary/30',
          accent: 'bg-green-600 text-white hover:bg-green-700',
          cancelBg: 'bg-gray-100 hover:bg-gray-200'
        }}
      />
    </div>
  );
}
