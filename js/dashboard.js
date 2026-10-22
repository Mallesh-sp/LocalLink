/**
 * LocalLink - Central User Dashboard JavaScript
 * Dynamically renders role-tailored dashboard overview for Customers, Service Professionals, and Administrators.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dashboardContainer');
  if (!container) return;

  // Fallback to active logged in user OR default customer profile so dashboard is never empty
  const currentUser = getCurrentUser() || {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    mobile: "9876543210",
    role: "customer"
  };

  // Determine user role with fallback to 'customer' if role is undefined
  const userRole = currentUser.role || 'customer';

  const allBookings = getBookings();
  const allReviews = getReviews();

  // 1. Customer Dashboard View (Default for all registered customers)
  if (userRole === 'customer') {
    const myBookings = allBookings.filter(b => b.email === currentUser.email || b.mobile === currentUser.mobile || b.customerName.toLowerCase() === currentUser.name.toLowerCase());
    const pendingCount = myBookings.filter(b => b.status === 'Pending').length;
    const completedCount = myBookings.filter(b => b.status === 'Completed').length;
    const myReviews = allReviews.filter(r => r.customerName.toLowerCase() === currentUser.name.toLowerCase());

    container.innerHTML = `
      <a href="index.html" class="back-nav-link">&larr; Back to Platform Home</a>

      <!-- Profile Header Card -->
      <div class="profile-banner-card">
        <div style="width: 72px; height: 72px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid #bfdbfe; flex-shrink: 0;">
          ${currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div class="profile-main-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <h1 style="margin-bottom: 0.2rem;">${currentUser.name}</h1>
              <span class="badge badge-success" style="font-size: 0.8rem;">Verified Customer</span>
            </div>
            <a href="booking.html" class="btn btn-primary btn-sm">+ Book New Service</a>
          </div>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">
            Email: <strong>${currentUser.email}</strong> &bull; Mobile: <strong>${currentUser.mobile}</strong>
          </p>
        </div>
      </div>

      <!-- Quick Action Navigation Shortcuts -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <a href="index.html" class="btn btn-secondary btn-sm">🏠 Home</a>
        <a href="my-bookings.html" class="btn btn-primary btn-sm">📅 My Bookings (${myBookings.length})</a>
        <a href="reviews.html" class="btn btn-outline btn-sm">⭐ Write Review</a>
        <a href="services.html" class="btn btn-secondary btn-sm">🔍 Explore Services</a>
      </div>

      <!-- Stats Grid -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Total Bookings</div>
          <div class="admin-stat-val">${myBookings.length}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Pending Requests</div>
          <div class="admin-stat-val" style="color: var(--warning);">${pendingCount}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Completed Visits</div>
          <div class="admin-stat-val" style="color: var(--success);">${completedCount}</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Reviews Submitted</div>
          <div class="admin-stat-val" style="color: var(--primary);">${myReviews.length}</div>
        </div>
      </div>

      <!-- Section 1: My Bookings Overview -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.25rem; color: var(--text-dark);">My Service Requests</h2>
          <a href="my-bookings.html" style="font-size: 0.85rem; font-weight: 600;">View All Bookings &rarr;</a>
        </div>

        ${myBookings.length === 0 ? `
          <div class="empty-state" style="padding: 2rem 1rem;">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <h3>No active bookings</h3>
            <p>You haven't placed any doorstep service orders yet. Select a service category to get started.</p>
            <a href="booking.html" class="btn btn-primary btn-sm">Book a Service Now</a>
          </div>
        ` : myBookings.map(b => `
          <div class="booking-card" style="margin-bottom: 1rem;">
            <div class="booking-header">
              <div>
                <span class="booking-id">${b.id}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">Schedule: <strong>${b.date} (${b.timeSlot})</strong></span>
              </div>
              <span class="badge ${b.status === 'Completed' ? 'badge-success' : (b.status === 'Confirmed' ? 'badge-info' : (b.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'))}">${b.status}</span>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-dark); margin: 0.4rem 0;">
              <strong>Service:</strong> ${b.serviceName} &bull; <strong>Professional:</strong> ${b.providerName || 'Assigned Expert'}
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Address: ${b.houseNo}, ${b.street}, ${b.city} - ${b.pincode}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Section 2: Submitted Reviews -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.25rem; color: var(--text-dark);">My Reviews & Feedback</h2>
          <a href="reviews.html" class="btn btn-sm btn-outline">+ Write Review</a>
        </div>

        ${myReviews.length === 0 ? `
          <p style="color: var(--text-muted); font-size: 0.9rem;">You haven't submitted any service reviews yet. <a href="reviews.html">Submit feedback here &rarr;</a></p>
        ` : myReviews.map(r => `
          <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${r.serviceName || 'Doorstep Service'}</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${r.date}</span>
            </div>
            <div style="margin: 0.2rem 0;">${renderStarRatingHtml(r.rating)}</div>
            <p style="font-size: 0.9rem; color: var(--text-main);">"${r.comment}"</p>
          </div>
        `).join('')}
      </div>

      <!-- Section 3: Recommended Home Services -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem;">
        <h2 style="font-size: 1.25rem; color: var(--text-dark); margin-bottom: 1.25rem;">Recommended Local Services</h2>
        <div class="services-grid">
          ${SERVICE_CATEGORIES.slice(0, 4).map(cat => `
            <div class="service-card" style="padding: 1.15rem;">
              <div class="service-icon-wrap" style="width: 44px; height: 44px; margin-bottom: 0.75rem;">
                ${SVG_ICONS[cat.iconKey] || SVG_ICONS.electrician}
              </div>
              <h3 style="font-size: 1.05rem;">${cat.name}</h3>
              <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">${cat.shortDesc}</p>
              <a href="booking.html?service=${encodeURIComponent(cat.name)}" class="btn btn-sm btn-primary btn-block">Book ₹${cat.startingPrice}</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return;
  }

  // 2. Service Professional Dashboard View
  if (userRole === 'provider') {
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

      <!-- Profile Header Card -->
      <div class="profile-banner-card">
        <div style="width: 72px; height: 72px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid #bfdbfe; flex-shrink: 0;">
          ${currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div class="profile-main-info">
          <h1>${currentUser.name}</h1>
          <span class="badge badge-info" style="font-size: 0.8rem;">${currentUser.service || 'Service Specialist'} Partner</span>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.4rem;">
            Email: <strong>${currentUser.email}</strong> &bull; Mobile: <strong>${currentUser.mobile}</strong>
          </p>
        </div>
      </div>

      <!-- Quick Action Shortcuts -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <a href="provider-portal.html" class="btn btn-primary">Open Service Provider Portal</a>
        <a href="providers.html" class="btn btn-secondary">Explore Professionals Directory</a>
      </div>

      <!-- Stats Grid -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Assigned Jobs</div>
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
          <div class="admin-stat-lbl">Completed Work</div>
          <div class="admin-stat-val" style="color: var(--success);">${completedJobs}</div>
        </div>
      </div>

      <!-- Assigned Jobs Quick Summary -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.25rem; color: var(--text-dark);">Recent Doorstep Appointments</h2>
          <a href="provider-portal.html" style="font-size: 0.85rem; font-weight: 600;">Manage All &rarr;</a>
        </div>

        ${assignedJobs.length === 0 ? `
          <div class="empty-state" style="padding: 2rem 1rem;">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <h3>No assigned jobs right now</h3>
            <p>New service requests for ${currentUser.service || 'your specialty'} will appear here automatically.</p>
          </div>
        ` : assignedJobs.slice(0, 3).map(j => `
          <div class="booking-card" style="margin-bottom: 1rem;">
            <div class="booking-header">
              <span class="booking-id">${j.id}</span>
              <span class="badge ${j.status === 'Completed' ? 'badge-success' : (j.status === 'Confirmed' ? 'badge-info' : 'badge-warning')}">${j.status}</span>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-dark); margin: 0.4rem 0;">
              <strong>Customer:</strong> ${j.customerName} (${j.mobile}) &bull; <strong>Schedule:</strong> ${j.date} (${j.timeSlot})
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Address: ${j.houseNo}, ${j.street}, ${j.city}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return;
  }

  // 3. Admin Dashboard View
  if (userRole === 'admin') {
    const allUsers = getRegisteredUsers();
    const pendingCount = allBookings.filter(b => b.status === 'Pending').length;
    const completedCount = allBookings.filter(b => b.status === 'Completed').length;

    container.innerHTML = `
      <a href="index.html" class="back-nav-link">&larr; Back to Platform Home</a>

      <!-- Profile Header Card -->
      <div class="profile-banner-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background-color: rgba(255,255,255,0.15); color: #ffffff; font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.3); flex-shrink: 0;">
          A
        </div>
        <div class="profile-main-info">
          <h1 style="color: #ffffff;">Platform Administrator</h1>
          <span class="badge badge-danger" style="font-size: 0.8rem;">System Admin</span>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 0.4rem;">
            Control Email: <strong>${currentUser.email}</strong> &bull; Access Level: <strong>Full Admin Control</strong>
          </p>
        </div>
      </div>

      <!-- Quick Action Shortcuts -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <a href="admin.html" class="btn btn-primary btn-lg">Open Administrative Control Panel</a>
        <a href="providers.html" class="btn btn-secondary">Browse All 15 Professionals</a>
      </div>

      <!-- Stats Grid -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-lbl">Total System Bookings</div>
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
          <div class="admin-stat-lbl">Registered Platform Accounts</div>
          <div class="admin-stat-val" style="color: var(--primary);">${allUsers.length}</div>
        </div>
      </div>
    `;
    return;
  }
});
