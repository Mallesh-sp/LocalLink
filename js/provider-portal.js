/**
 * LocalLink - Service Provider Portal JavaScript
 * Enables service professionals (electricians, plumbers, etc.) to view assigned jobs,
 * confirm bookings, and mark work completed.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('providerPortalContainer');
  if (!container) return;

  const currentUser = getCurrentUser();

  // 1. Verify Provider Authorization
  if (!currentUser || currentUser.role !== 'provider') {
    container.innerHTML = `
      <div class="form-card" style="max-width: 500px; margin: 2rem auto; text-align: center;">
        <svg style="width: 56px; height: 56px; color: var(--primary); margin: 0 auto 1rem auto;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        <h2 style="font-size: 1.4rem; color: var(--text-dark); margin-bottom: 0.5rem;">Service Partner Login Required</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
          Sign in with your technician account to view assigned customer job requests.
        </p>

        <div style="background-color: var(--primary-light); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-dark); margin-bottom: 1.5rem; text-align: left;">
          <strong>Sample Provider Login Credentials:</strong><br>
          Electrician (Arun): <code style="font-weight: 700;">arun@locallink.com</code> / <code style="font-weight: 700;">provider123</code><br>
          Plumber (Karthik): <code style="font-weight: 700;">karthik@locallink.com</code> / <code style="font-weight: 700;">provider123</code><br>
          AC Specialist (Suresh): <code style="font-weight: 700;">suresh@locallink.com</code> / <code style="font-weight: 700;">provider123</code>
        </div>

        <a href="login.html" class="btn btn-primary btn-block">Sign In to Provider Portal</a>
      </div>
    `;
    return;
  }

  // 2. Render Provider Jobs Dashboard
  function renderProviderJobs() {
    const allBookings = getBookings();

    // Filter jobs assigned to this provider by providerId, name, or service category
    const assignedJobs = allBookings.filter(b => {
      if (currentUser.providerId && parseInt(b.providerId, 10) === parseInt(currentUser.providerId, 10)) return true;
      if (b.providerName && b.providerName.toLowerCase().includes(currentUser.name.split(' ')[0].toLowerCase())) return true;
      if (currentUser.service && b.serviceName === currentUser.service) return true;
      return false;
    });

    const pendingJobs = assignedJobs.filter(j => j.status === 'Pending').length;
    const activeJobs = assignedJobs.filter(j => j.status === 'Confirmed').length;
    const completedJobs = assignedJobs.filter(j => j.status === 'Completed').length;

    container.innerHTML = `
      <a href="index.html" class="back-nav-link">&larr; Back to Platform Home</a>

      <!-- Welcome Banner Card -->
      <div class="profile-banner-card" style="margin-bottom: 2rem;">
        <div class="profile-main-info">
          <h1>Welcome, ${currentUser.name}</h1>
          <div class="profile-service-title">${currentUser.service || 'Service'} Specialist Partner</div>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">
            Mobile: <strong>${currentUser.mobile}</strong> &bull; Registered Email: <strong>${currentUser.email}</strong>
          </p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Total Assigned Jobs</div>
          <div class="admin-stat-val">${assignedJobs.length}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">New Requests</div>
          <div class="admin-stat-val" style="color: var(--warning);">${pendingJobs}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Active Visits</div>
          <div class="admin-stat-val" style="color: var(--info);">${activeJobs}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Completed Jobs</div>
          <div class="admin-stat-val" style="color: var(--success);">${completedJobs}</div>
        </div>
      </div>

      <!-- Assigned Jobs Directory -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem;">
        <h2 style="font-size: 1.3rem; color: var(--text-dark); margin-bottom: 1.25rem;">Your Service Appointments</h2>

        ${assignedJobs.length === 0 ? `
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <h3>No assigned jobs yet</h3>
            <p>New customer doorstep requests for ${currentUser.service || 'your service category'} will appear here automatically.</p>
          </div>
        ` : assignedJobs.map(j => `
          <div class="booking-card" style="margin-bottom: 1.25rem;">
            <div class="booking-header">
              <div>
                <span class="booking-id">${j.id}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">Requested on ${j.createdAt || 'Recent'}</span>
              </div>
              <span class="badge ${j.status === 'Completed' ? 'badge-success' : (j.status === 'Confirmed' ? 'badge-info' : (j.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'))}">
                ${j.status}
              </span>
            </div>

            <div class="booking-details-grid">
              <div class="info-item">
                <span class="info-label">Customer Name</span>
                <span class="info-value">${j.customerName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Customer Contact</span>
                <span class="info-value"><a href="tel:${j.mobile}">${j.mobile}</a> (${j.email})</span>
              </div>
              <div class="info-item">
                <span class="info-label">Appointment Schedule</span>
                <span class="info-value">${j.date} (${j.timeSlot})</span>
              </div>
              <div class="info-item">
                <span class="info-label">Doorstep Address</span>
                <span class="info-value">${j.houseNo}, ${j.street}, ${j.city} - ${j.pincode}</span>
              </div>
            </div>

            <div style="background-color: var(--bg-main); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-main);">
              <strong>Customer Problem Description:</strong> ${j.description}
            </div>

            <div class="booking-footer">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Status: <strong>${j.status}</strong></span>
              <div style="display: flex; gap: 0.5rem;">
                ${j.status === 'Pending' ? `
                  <button onclick="updateJobStatusByProvider('${j.id}', 'Confirmed')" class="btn btn-sm btn-primary">Accept & Confirm Visit</button>
                  <button onclick="updateJobStatusByProvider('${j.id}', 'Cancelled')" class="btn btn-sm btn-danger">Decline</button>
                ` : ''}
                ${j.status === 'Confirmed' ? `
                  <button onclick="updateJobStatusByProvider('${j.id}', 'Completed')" class="btn btn-sm btn-primary" style="background-color: var(--success); border-color: var(--success);">Mark Job Completed</button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Global Provider Status Updater
  window.updateJobStatusByProvider = function(bookingId, newStatus) {
    const allBookings = getBookings();
    const updatedBookings = allBookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });

    saveBookings(updatedBookings);
    showToast(`Job ${bookingId} updated to ${newStatus}.`, 'success');
    renderProviderJobs();
  };

  // Initial Render
  renderProviderJobs();
});
