'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) router.push('/');
  }, [router]);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-topbar brand" style={{ position: 'relative', border: 'none', boxShadow: 'none', padding: 0, background: 'transparent' }}>
          <img src="/logo.png" alt="Dairy Delight" />
          <div>
            <div>Dairy Delight</div>
            <div className="admin-muted">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          <Link className={pathname === '/admin' ? 'active' : ''} href="/admin">Dashboard</Link>
          <Link className={pathname === '/admin/add' ? 'active' : ''} href="/admin/add">
            <img src="/add_icon.png" alt="" />
            Add
          </Link>
          <Link className={pathname === '/admin/list' ? 'active' : ''} href="/admin/list">
            <img src="/order_icon.png" alt="" />
            List
          </Link>
          <Link className={pathname === '/admin/orders' ? 'active' : ''} href="/admin/orders">
            <img src="/order_icon.png" alt="" />
            Orders
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="brand">
            <img src="/profile_image.png" alt="" style={{ borderRadius: 999 }} />
            <div>Welcome, Admin</div>
          </div>
          <button
            className="admin-btn"
            onClick={() => {
              localStorage.removeItem('isAdmin');
              router.push('/');
            }}
          >
            Logout
          </button>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}



