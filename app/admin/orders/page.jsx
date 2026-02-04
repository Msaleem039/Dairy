'use client';

import { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');

  const fetchAllOrders = async () => {
    setStatus('Loading...');
    const res = await fetch(`${API_URL}/api/order/list`);
    const json = await res.json();
    setOrders(json.data || json?.data?.data || []);
    setStatus('');
  };

  useEffect(() => { fetchAllOrders(); }, []);

  const statusHandler = async (orderId, nextStatus) => {
    setStatus('Updating...');
    const res = await fetch(`${API_URL}/api/order/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: nextStatus }),
    });
    const json = await res.json();
    if (json.success) await fetchAllOrders();
    setStatus('');
  };

  return (
    <AdminShell>
      <div className="admin-card">
        <h2 style={{ marginTop: 0 }}>Orders</h2>
        {status && <div className="admin-muted">{status}</div>}

        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {orders.map((o) => (
            <div key={o._id} style={{ border: '1px solid rgba(102,126,234,0.14)', borderRadius: 14, padding: 12, background: 'rgba(255,255,255,0.75)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <img src="/order_icon.png" alt="" style={{ width: 26, height: 26 }} />
                  <div style={{ fontWeight: 700 }}>{o.address?.firstName} {o.address?.lastName}</div>
                </div>
                <select value={o.status} onChange={(e) => statusHandler(o._id, e.target.value)} style={{ padding: 10, borderRadius: 12, border: '1px solid rgba(102,126,234,0.25)' }}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="admin-muted" style={{ marginTop: 8 }}>
                Amount: <b>${o.amount}</b> • Items: {o.items?.length || 0} • Phone: {o.address?.phone}
              </div>
              <div style={{ marginTop: 8 }}>
                {o.items?.map((it, idx) => (
                  <span key={idx} className="admin-muted">
                    {it.name} x {it.quantity}{idx === o.items.length - 1 ? '' : ', '}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}



