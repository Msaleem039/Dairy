'use client';

import { useState } from 'react';
import AdminShell from '../AdminShell';
import { menu_list } from '../../../src/assets/assets';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dairydelightcheese.com';

export default function AdminAdd() {
  const [image, setImage] = useState(null);
  const defaultCategory = menu_list?.[0]?.menu_name || 'Cheddar';
  const [data, setData] = useState({ name: '', description: '', price: '', category: defaultCategory });
  const [status, setStatus] = useState('');

  const onChangeHandler = (e) => setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('Please login first');
        return;
      }

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      if (image) formData.append('image', image);

      const res = await fetch(`${API_URL}/api/food/add`, {
        method: 'POST',
        headers: { token },
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');

      setData({ name: '', description: '', price: '', category: defaultCategory });
      setImage(null);
      setStatus('Added!');
    } catch (err) {
      setStatus(err?.message || 'Error');
    }
  };

  return (
    <AdminShell>
      <div className="admin-card">
        <h2 style={{ marginTop: 0 }}>Add Product</h2>
        <p className="admin-muted">Add a new product for Dairy Delight.</p>

        <form onSubmit={onSubmitHandler} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <label style={{ cursor: 'pointer' }}>
              <img
                src={image ? URL.createObjectURL(image) : '/upload_area.png'}
                alt=""
                style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 14, border: '1px solid rgba(102,126,234,0.18)' }}
              />
              <input type="file" hidden onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </label>
            <div className="admin-muted">Upload product image</div>
          </div>

          <input name="name" value={data.name} onChange={onChangeHandler} placeholder="Product name" required />
          <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Description" rows={4} required />
          <div style={{ display: 'flex', gap: 12 }}>
            <input name="price" value={data.price} onChange={onChangeHandler} placeholder="Price" type="number" required />
            <select name="category" value={data.category} onChange={onChangeHandler} style={{ width: '100%' }}>
              {(menu_list || []).map((c) => (
                <option key={c.menu_name} value={c.menu_name}>{c.menu_name}</option>
              ))}
            </select>
          </div>

          <button className="admin-btn" type="submit">Add</button>
          {status && <div className="admin-muted">{status}</div>}
        </form>
      </div>
    </AdminShell>
  );
}


