'use client';

import { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminList() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');

  const getImageSrc = (image) => {
    if (!image) return '/upload_area.png';
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) return image;
    return `${API_URL}/images/${image}`;
  };

  const fetchList = async () => {
    setStatus('Loading...');
    const res = await fetch(`${API_URL}/api/food/list`);
    const json = await res.json();
    setItems(json.data || json?.data?.data || json?.data || []);
    setStatus('');
  };

  useEffect(() => { fetchList(); }, []);

  const removeFood = async (id) => {
    try {
      setStatus('Removing...');
      const res = await fetch(`${API_URL}/api/food/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      await fetchList();
      setStatus('Removed!');
    } catch (e) {
      setStatus(e?.message || 'Error');
    }
  };

  return (
    <AdminShell>
      <div className="admin-card">
        <h2 style={{ marginTop: 0 }}>Products List</h2>
        {status && <div className="admin-muted">{status}</div>}

        <div className="admin-table" style={{ marginTop: 12 }}>
          <div className="admin-table-head">
            <div>Image</div><div>Name</div><div>Category</div><div>Action</div>
          </div>
          {items.map((it) => (
            <div key={it._id || it.id} className="admin-table-row">
              <img src={getImageSrc(it.image)} alt={it.name || 'Product'} className="admin-thumb" />
              <div className="admin-cell" data-label="Name">{it.name}</div>
              <div className="admin-cell admin-muted" data-label="Category">{it.category}</div>
              <div className="admin-cell" data-label="Action">
                <button className="admin-btn" type="button" onClick={() => removeFood(it._id)} style={{ padding: '8px 10px' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}



