'use client';

import AdminShell from './AdminShell';

export default function AdminHome() {
  return (
    <AdminShell>
      <div className="admin-card">
        <h2 style={{ marginTop: 0 }}>Dashboard</h2>
        <p className="admin-muted">Use the sidebar to add products, view the list, and manage orders.</p>
      </div>
    </AdminShell>
  );
}


