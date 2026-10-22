/**
 * LocalLink - Admin Portal JavaScript
 * System-wide booking management, status overrides, and user account directory.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('adminContainer');
  if (!container) return;

  const currentUser = getCurrentUser();

  // 1. Verify Admin Session
  if (!currentUser || currentUser.role !== 'admin') {
    container.innerHTML = `
      <div class="form-card" style="max-width: 500px; margin: 2rem auto; text-align: center;">
        <svg style="width: 56px; height: 56px; color: var(--danger); margin: 0 auto 1rem auto;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h2 style="font-size: 1.4rem; color: var(--text-dark); margin-bottom: 0.5rem;">Admin Authorization Required</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
          You must be signed in with an Administrator account to access the control panel.
        </p>
        
        <div style="background-color: var(--primary-light); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-dark); margin-bottom: 1.5rem; text-align: left;">
          <strong>Admin Login Credentials:</strong><br>
          Email: <code style="font-weight: 700;">admin@locallink.com</code><br>
          Password: <code style="font-weight: 700;">admin123</code>
        </div>

        <a href="login.html" class="btn btn-primary btn-block">Sign In as Admin</a>
      </div>
    `;
    return;
  }

  let activeTab = 'all';

  // 2. Render Full Admin Dashboard
  function renderAdminDashboard() {
    const allBookings = getBookings();
    const allUsers = getRegisteredUsers();

    const pendingCount = allBookings.filter(b => b.status === 'Pending').length;
    const confirmedCount = allBookings.filter(b => b.status === 'Confirmed').length;
    const completedCount = allBookings.filter(b => b.status === 'Completed').length;

    // Filter bookings by selected status tab
    const filteredBookings = allBookings.filter(b => {
      if (activeTab === 'all') return true;
      return b.status === activeTab;
    });

    container.innerHTML = `
      <a href="index.html" class="back-nav-link">&larr; Back to Platform Home</a>

      <!-- Overview Stats Cards -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Total Bookings</div>
          <div class="admin-stat-val">${allBookings.length}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Pending Requests</div>
          <div class="admin-stat-val" style="color: var(--warning);">${pendingCount}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Completed Jobs</div>
          <div class="admin-stat-val" style="color: var(--success);">${completedCount}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Registered Accounts</div>
          <div class="admin-stat-val" style="color: var(--primary);">${allUsers.length}</div>
        </div>
      </div>

      <!-- Master Bookings Control Section -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <h2 style="font-size: 1.3rem; color: var(--text-dark);">System Service Requests</h2>

          <!-- Status Tabs -->
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button class="pill ${activeTab === 'all' ? 'active-tab' : ''}" onclick="setAdminTab('all')">All (${allBookings.length})</button>
            <button class="pill ${activeTab === 'Pending' ? 'active-tab' : ''}" onclick="setAdminTab('Pending')">Pending (${pendingCount})</button>
            <button class="pill ${activeTab === 'Confirmed' ? 'active-tab' : ''}" onclick="setAdminTab('Confirmed')">Confirmed (${confirmedCount})</button>
            <button class="pill ${activeTab === 'Completed' ? 'active-tab' : ''}" onclick="setAdminTab('Completed')">Completed (${completedCount})</button>
          </div>
        </div>

        ${filteredBookings.length === 0 ? `
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <h3>No bookings found</h3>
            <p>There are no customer service requests matching status "${activeTab}".</p>
          </div>
        ` : `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Professional</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Admin Action</th>
                </tr>
              </thead>
              <tbody>
                ${filteredBookings.map(b => `
                  <tr>
                    <td><strong>${b.id}</strong></td>
                    <td>
                      <div><strong>${b.customerName}</strong></div>
                      <div style="font-size: 0.8rem; color: var(--text-muted);">${b.mobile}</div>
                    </td>
                    <td>${b.serviceName}</td>
                    <td>${b.providerName || 'Unassigned'}</td>
                    <td>${b.date}<br><span style="font-size: 0.8rem; color: var(--text-muted);">${b.timeSlot}</span></td>
                    <td>
                      <span class="badge ${b.status === 'Completed' ? 'badge-success' : (b.status === 'Confirmed' ? 'badge-info' : (b.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'))}">
                        ${b.status}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.4rem; align-items: center;">
                        <select id="statusSelect_${b.id}" class="form-control" style="padding: 0.25rem 0.5rem; font-size: 0.85rem; width: auto;">
                          <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
                          <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                          <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                          <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                        <button onclick="updateBookingStatusByAdmin('${b.id}')" class="btn btn-sm btn-primary" style="padding: 0.3rem 0.6rem;">Update</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- User Accounts Directory -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem;">
        <h2 style="font-size: 1.3rem; color: var(--text-dark); margin-bottom: 1.25rem;">Registered Platform Accounts</h2>
        <div class="admin-table-wrap" style="margin-bottom: 0;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Mobile</th>
                <th>Account Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              ${allUsers.map(u => `
                <tr>
                  <td>#${u.id}</td>
                  <td><strong>${u.name}</strong></td>
                  <td>${u.email}</td>
                  <td>${u.mobile}</td>
                  <td>
                    <span class="badge ${u.role === 'admin' ? 'badge-danger' : (u.role === 'provider' ? 'badge-info' : 'badge-success')}">
                      ${u.role || 'customer'}
                    </span>
                  </td>
                  <td>${u.createdAt || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Global Tab Switcher
  window.setAdminTab = function(tabName) {
    activeTab = tabName;
    renderAdminDashboard();
  };

  // Global Admin Status Update Handler
  window.updateBookingStatusByAdmin = function(bookingId) {
    const select = document.getElementById(`statusSelect_${bookingId}`);
    if (!select) return;

    const newStatus = select.value;
    const allBookings = getBookings();

    const updatedBookings = allBookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });

    saveBookings(updatedBookings);
    showToast(`Booking ${bookingId} status updated to ${newStatus}.`, 'success');
    renderAdminDashboard();
  };

  // Initial Render
  renderAdminDashboard();
});
