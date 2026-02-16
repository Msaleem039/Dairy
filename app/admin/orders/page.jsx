'use client';

import { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';
import './orders.css';
import { getApiBaseUrl } from '../../../src/utils/apiConfig';

const ITEMS_PER_PAGE = 10;

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'delivered'
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPendingOrders = async () => {
    setStatus('Loading pending orders...');
    try {
      const apiUrl = `${getApiBaseUrl()}/api/order/list`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      console.log('📦 All orders from API:', json);
      
      // Handle different response structures
      let allOrders = [];
      if (json.success && json.data) {
        allOrders = Array.isArray(json.data) ? json.data : [];
      } else if (Array.isArray(json)) {
        allOrders = json;
      } else if (json.data) {
        allOrders = Array.isArray(json.data) ? json.data : [];
      }
      
      console.log('📋 Parsed all orders:', allOrders);
      console.log('🔍 Order statuses:', allOrders.map(o => ({ id: o._id, status: o.status })));
      
      // Filter only pending orders - show orders with status "pending" or "Food Processing"
      const pending = allOrders.filter(order => {
        const orderStatus = (order.status || '').toString().trim();
        const statusLower = orderStatus.toLowerCase();
        const isPending = statusLower === 'pending' || statusLower === 'food processing';
        
        if (!isPending) {
          console.log(`❌ Order ${order._id} filtered out - status: "${orderStatus}"`);
        }
        
        return isPending;
      });
      
      console.log('✅ Filtered pending orders:', pending);
      console.log('📊 Pending count:', pending.length);
      
      setPendingOrders(pending);
      // Update pagination immediately if we're on the pending tab
      if (activeTab === 'pending') {
        const pages = Math.ceil(pending.length / ITEMS_PER_PAGE);
        setTotalPages(pages || 1);
        setCurrentPage(1);
        console.log('📄 Updated pagination - pages:', pages, 'currentPage:', 1, 'orders:', pending.length);
      }
      // Set status immediately
      setStatus(pending.length === 0 ? 'No pending orders found' : '');
    } catch (error) {
      console.error('❌ Error fetching pending orders:', error);
      setStatus(`Error loading orders: ${error.message}`);
      setPendingOrders([]);
    }
  };

  const fetchDeliveredOrders = async () => {
    setStatus('Loading delivered orders...');
    try {
      const apiUrl = `${getApiBaseUrl()}/api/order/delivered`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      
      // Handle different response structures
      let allOrders = [];
      if (json.success && json.data) {
        allOrders = Array.isArray(json.data) ? json.data : [];
      } else if (Array.isArray(json)) {
        allOrders = json;
      } else if (json.data) {
        allOrders = Array.isArray(json.data) ? json.data : [];
      }
      
      setDeliveredOrders(allOrders);
      if (activeTab === 'delivered') {
        setTotalPages(Math.ceil(allOrders.length / ITEMS_PER_PAGE));
        setCurrentPage(1);
      }
      setStatus('');
    } catch (error) {
      console.error('Error fetching delivered orders:', error);
      setStatus(`Error loading delivered orders: ${error.message}`);
      setDeliveredOrders([]);
    }
  };

  useEffect(() => { 
    fetchPendingOrders();
    fetchDeliveredOrders();
  }, []);

  useEffect(() => {
    // Update pagination when tab changes
    const currentOrders = activeTab === 'pending' ? pendingOrders : deliveredOrders;
    const pages = Math.ceil(currentOrders.length / ITEMS_PER_PAGE);
    setTotalPages(pages || 1);
    // Reset to page 1 when switching tabs or if current page is out of bounds
    if (currentPage > pages || currentPage < 1) {
      setCurrentPage(1);
    }
    console.log('🔄 Pagination updated from useEffect:', {
      activeTab,
      ordersCount: currentOrders.length,
      pages,
      currentPage,
      willReset: currentPage > pages || currentPage < 1
    });
  }, [activeTab]); // Only run when tab changes, not when orders change

  const statusHandler = async (orderId, nextStatus) => {
    setStatus('Updating...');
    try {
      const apiUrl = `${getApiBaseUrl()}/api/order/status`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchPendingOrders();
        await fetchDeliveredOrders();
      }
      setStatus('');
    } catch (error) {
      console.error('Error updating status:', error);
      setStatus('Error updating status');
    }
  };

  // Calculate pagination
  const currentOrdersList = activeTab === 'pending' ? pendingOrders : deliveredOrders;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = currentOrdersList.slice(startIndex, endIndex);
  
  // Debug logging
  useEffect(() => {
    console.log('🔄 Current state:', {
      activeTab,
      pendingOrdersCount: pendingOrders.length,
      deliveredOrdersCount: deliveredOrders.length,
      currentOrdersListCount: currentOrdersList.length,
      currentOrdersCount: currentOrders.length,
      currentPage,
      totalPages,
      startIndex,
      endIndex
    });
    if (pendingOrders.length > 0) {
      console.log('📋 Sample pending order:', pendingOrders[0]);
    }
  }, [activeTab, pendingOrders, deliveredOrders, currentOrders, currentPage, totalPages, startIndex, endIndex, currentOrdersList]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImageSrc = (image) => {
    if (!image) return '/upload_area.png';
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
      return image;
    }
    if (typeof image === 'string' && image.startsWith('/')) {
      return image;
    }
    return image?.src || image || '/upload_area.png';
  };

  return (
    <AdminShell>
      <div className="admin-card">
        <div className="admin-orders-header">
          <h2 style={{ marginTop: 0 }}>
            {activeTab === 'pending' 
              ? `Pending Orders (${pendingOrders.length})` 
              : `Delivered Orders (${deliveredOrders.length})`
            }
          </h2>
          {status && <div className="admin-muted">{status}</div>}
        </div>

        {/* Tabs */}
        <div className="admin-orders-tabs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`admin-orders-tab ${activeTab === 'pending' ? 'active' : ''}`}
          >
            Pending Orders ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`admin-orders-tab ${activeTab === 'delivered' ? 'active' : ''}`}
          >
            Delivered Orders ({deliveredOrders.length})
          </button>
        </div>

        {status && status.includes('Loading') ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            {status}
          </div>
        ) : currentOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            <p>{status || `No ${activeTab} orders found`}</p>
            <p style={{ fontSize: '12px', marginTop: '10px', color: '#999' }}>
              {activeTab === 'pending' 
                ? `Pending orders in state: ${pendingOrders.length}, Current page: ${currentPage}, Total pages: ${totalPages}, Start: ${startIndex}, End: ${endIndex}` 
                : `Delivered orders in state: ${deliveredOrders.length}, Current page: ${currentPage}, Total pages: ${totalPages}, Start: ${startIndex}, End: ${endIndex}`
              }
            </p>
            {pendingOrders.length > 0 && activeTab === 'pending' && (
              <p style={{ fontSize: '12px', marginTop: '10px', color: '#f59e0b', fontWeight: 600 }}>
                ⚠️ {pendingOrders.length} orders exist but not showing. Check pagination or console logs.
              </p>
            )}
            <button 
              onClick={activeTab === 'pending' ? fetchPendingOrders : fetchDeliveredOrders}
              className="admin-btn"
              style={{ marginTop: '20px' }}
            >
              Refresh {activeTab === 'pending' ? 'Pending' : 'Delivered'} Orders
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {currentOrders.map((o) => (
                <div key={o._id} className="admin-order-card">
                  <div className="admin-order-header">
                    <div className="admin-order-customer">
                      <img src="/order_icon.png" alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
                      <div className="admin-order-customer-info">
                        <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: 4 }}>
                          {o.address?.firstName} {o.address?.lastName}
                        </div>
                        <div className="admin-muted" style={{ fontSize: '13px', marginBottom: 4 }}>
                          📧 {o.address?.email || 'N/A'}
                        </div>
                        <div className="admin-muted" style={{ fontSize: '13px' }}>
                          📞 {o.address?.phone || 'N/A'}
                        </div>
                      </div>
                    </div>
                    {activeTab === 'pending' ? (
                      <select 
                        value={o.status} 
                        onChange={(e) => statusHandler(o._id, e.target.value)} 
                        className="admin-order-status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      <div style={{
                        padding: '8px 12px',
                        borderRadius: 12,
                        background: 'rgba(37, 211, 102, 0.1)',
                        color: '#25D366',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}>
                        ✓ Delivered
                      </div>
                    )}
                  </div>

                  <div className="admin-order-details-grid">
                    <div>
                      <div className="admin-muted" style={{ fontSize: '12px' }}>Amount</div>
                      <div style={{ fontWeight: 700, fontSize: '18px', color: '#667eea' }}>${o.amount}</div>
                    </div>
                    <div>
                      <div className="admin-muted" style={{ fontSize: '12px' }}>Items</div>
                      <div style={{ fontWeight: 600 }}>{o.items?.length || 0} items</div>
                    </div>
                    <div>
                      <div className="admin-muted" style={{ fontSize: '12px' }}>Date</div>
                      <div style={{ fontSize: '13px' }}>{formatDate(o.date)}</div>
                    </div>
                    <div>
                      <div className="admin-muted" style={{ fontSize: '12px' }}>Payment</div>
                      <div style={{ fontSize: '13px' }}>
                        {o.payment ? '✅ Paid' : '💵 Cash on Delivery'}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(102,126,234,0.1)' }}>
                    <div className="admin-muted" style={{ fontSize: '12px', marginBottom: 8 ,textcolor: 'white' }}>📍 Address</div>
                    <div style={{ fontSize: '13px', color: 'white' }}>
                      {o.address?.street}, {o.address?.city}, {o.address?.state}, {o.address?.zipcode}, {o.address?.country}
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div className="admin-muted" style={{ fontSize: '12px', marginBottom: 8 }}>🛒 Order Items</div>
                    <div className="admin-order-items">
                      {o.items?.map((it, idx) => (
                        <div key={idx} className="admin-order-item">
                          <img 
                            src={getImageSrc(it.image)} 
                            alt={it.name} 
                            style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                            onError={(e) => {
                              e.target.src = '/upload_area.png';
                            }}
                          />
                          <span style={{ fontWeight: 500 }}>{it.name}</span>
                          <span className="admin-muted">x {it.quantity}</span>
                          <span style={{ color: '#667eea', fontWeight: 600 }}>${it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  className="admin-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    padding: '10px 20px'
                  }}
                >
                  ← Previous
                </button>

                <div className="admin-pagination-buttons">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          style={{
                            padding: '10px 15px',
                            borderRadius: 12,
                            border: '1px solid rgba(102,126,234,0.25)',
                            background: currentPage === page 
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                              : 'white',
                            color: currentPage === page ? 'white' : '#333',
                            cursor: 'pointer',
                            fontWeight: currentPage === page ? 700 : 500,
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== page) {
                              e.currentTarget.style.background = 'rgba(102,126,234,0.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== page) {
                              e.currentTarget.style.background = 'white';
                            }
                          }}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} style={{ padding: '10px 5px' }}>...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  className="admin-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    padding: '10px 20px'
                  }}
                >
                  Next →
                </button>
              </div>
            )}

            <div style={{
              textAlign: 'center',
              marginTop: 15,
              fontSize: '14px',
              color: '#888'
            }}>
              Showing {startIndex + 1} - {Math.min(endIndex, currentOrdersList.length)} of {currentOrdersList.length} {activeTab} orders
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}



