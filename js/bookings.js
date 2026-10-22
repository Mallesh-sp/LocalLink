/**
 * LocalLink - My Bookings Management JavaScript
 * Reads saved bookings from localStorage, filters by status,
 * renders booking cards, and handles order cancellations.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bookingsListContainer');
  const emptyState = document.getElementById('bookingsEmptyState');
  const cancelModal = document.getElementById('cancelModal');
  const cancelBookingIdText = document.getElementById('cancelBookingIdText');
  const btnConfirmCancel = document.getElementById('btnConfirmCancel');
  const btnKeepBooking = document.getElementById('btnKeepBooking');
  const tabs = document.querySelectorAll('.pill[data-status]');

  let currentStatusFilter = 'all';
  let targetCancelId = null;

  // Status Badge Class Helper
  function getBadgeClass(status) {
    switch (status) {
      case 'Confirmed': return 'badge-info';
      case 'Completed': return 'badge-success';
      case 'Cancelled': return 'badge-danger';
      case 'Pending':
      default: return 'badge-warning';
    }
  }

  // Render Bookings List Function
  function renderBookings() {
    if (!container) return;

    const allBookings = getBookings();
    
    // Filter by status tab
    const filtered = allBookings.filter(b => {
      if (currentStatusFilter === 'all') return true;
      return b.status === currentStatusFilter;
    });

    if (filtered.length === 0) {
      container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      container.style.display = 'block';
      if (emptyState) emptyState.style.display = 'none';

      container.innerHTML = filtered.map(b => `
        <div class="booking-card">
          <div class="booking-header">
            <div>
              <span class="booking-id">${b.id}</span>
              <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">Booked on ${b.createdAt || 'Recent'}</span>
            </div>
            <span class="badge ${getBadgeClass(b.status)}">${b.status}</span>
          </div>

          <div class="booking-details-grid">
            <div class="info-item">
              <span class="info-label">Service</span>
              <span class="info-value">${b.serviceName}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Professional</span>
              <span class="info-value">${b.providerName || 'Assigned Expert'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Date & Time</span>
              <span class="info-value">${b.date} (${b.timeSlot})</span>
            </div>
            <div class="info-item">
              <span class="info-label">Address</span>
              <span class="info-value">${b.houseNo}, ${b.street}, ${b.city} - ${b.pincode}</span>
            </div>
          </div>

          <div style="background-color: var(--bg-main); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-main);">
            <strong>Requirement:</strong> ${b.description}
          </div>

          <div class="booking-footer">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Customer: <strong>${b.customerName}</strong> (${b.mobile})</span>
            <div>
              ${b.status === 'Pending' ? `
                <button class="btn btn-sm btn-danger" onclick="promptCancelBooking('${b.id}')">Cancel Booking</button>
              ` : ''}
              ${b.status === 'Completed' ? `
                <a href="reviews.html?bookingId=${b.id}" class="btn btn-sm btn-outline">Submit Review</a>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Handle Tab Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.style.backgroundColor = '');
      tab.style.backgroundColor = 'var(--primary-light)';
      tab.style.color = 'var(--primary)';

      currentStatusFilter = tab.getAttribute('data-status');
      renderBookings();
    });
  });

  // Global Cancel Prompt
  window.promptCancelBooking = function(bookingId) {
    targetCancelId = bookingId;
    if (cancelBookingIdText) cancelBookingIdText.textContent = bookingId;
    if (cancelModal) cancelModal.classList.add('active');
  };

  // Close Cancel Modal
  if (btnKeepBooking) {
    btnKeepBooking.addEventListener('click', () => {
      if (cancelModal) cancelModal.classList.remove('active');
      targetCancelId = null;
    });
  }

  // Confirm Cancellation
  if (btnConfirmCancel) {
    btnConfirmCancel.addEventListener('click', () => {
      if (!targetCancelId) return;

      const allBookings = getBookings();
      const updatedBookings = allBookings.map(b => {
        if (b.id === targetCancelId) {
          return { ...b, status: 'Cancelled' };
        }
        return b;
      });

      saveBookings(updatedBookings);
      showToast(`Booking ${targetCancelId} has been cancelled.`, 'warning');

      if (cancelModal) cancelModal.classList.remove('active');
      targetCancelId = null;

      renderBookings();
    });
  }

  // Initial Execution
  renderBookings();
});
