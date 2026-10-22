/**
 * LocalLink - Booking Logic & Form Validation JavaScript
 * Handles URL parameter pre-filling, dynamic provider dropdowns,
 * robust inline field validation, and localStorage saving with confirmation modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const serviceSelect = document.getElementById('bookingService');
  const providerSelect = document.getElementById('bookingProvider');
  const dateInput = document.getElementById('bookingDate');

  // Set minimum date to today (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today; // default to today
  }

  // 1. Populate Service Select Dropdown
  if (serviceSelect) {
    SERVICE_CATEGORIES.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.name;
      option.textContent = cat.name;
      serviceSelect.appendChild(option);
    });
  }

  // Populate Providers Dropdown based on selected Service
  function updateProvidersDropdown(selectedService, preSelectProviderId = null) {
    if (!providerSelect) return;

    providerSelect.innerHTML = '<option value="">-- Any Available Professional --</option>';

    const matchingProviders = PROVIDERS_DATA.filter(p => !selectedService || p.service === selectedService);

    matchingProviders.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.name} (${p.rating}★ - Starting ₹${p.price})`;
      if (preSelectProviderId && p.id === parseInt(preSelectProviderId, 10)) {
        option.selected = true;
      }
      providerSelect.appendChild(option);
    });
  }

  // Auto-fill customer info if logged in
  const activeUser = getCurrentUser();
  if (activeUser) {
    const nameEl = document.getElementById('customerName');
    const mobileEl = document.getElementById('customerMobile');
    const emailEl = document.getElementById('customerEmail');

    if (nameEl && !nameEl.value) nameEl.value = activeUser.name;
    if (mobileEl && !mobileEl.value) mobileEl.value = activeUser.mobile;
    if (emailEl && !emailEl.value) emailEl.value = activeUser.email;
  }

  // 2. Parse URL Parameters (?providerId=X or ?service=Y)
  const urlParams = new URLSearchParams(window.location.search);
  const paramProviderId = urlParams.get('providerId');
  const paramService = urlParams.get('service');

  if (paramProviderId) {
    const targetProvider = PROVIDERS_DATA.find(p => p.id === parseInt(paramProviderId, 10));
    if (targetProvider) {
      if (serviceSelect) serviceSelect.value = targetProvider.service;
      updateProvidersDropdown(targetProvider.service, targetProvider.id);
    }
  } else if (paramService) {
    if (serviceSelect) serviceSelect.value = paramService;
    updateProvidersDropdown(paramService);
  } else {
    updateProvidersDropdown('');
  }

  // Service change listener updates provider list
  if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
      updateProvidersDropdown(e.target.value);
    });
  }

  // Helper function to toggle error state on input field
  function setError(inputId, errId, isValid, customMsg = null) {
    const inputEl = document.getElementById(inputId);
    const errEl = document.getElementById(errId);
    if (!inputEl || !errEl) return isValid;

    if (!isValid) {
      inputEl.classList.add('is-invalid');
      errEl.classList.add('visible');
      if (customMsg) errEl.textContent = customMsg;
    } else {
      inputEl.classList.remove('is-invalid');
      errEl.classList.remove('visible');
    }
    return isValid;
  }

  // Real-time input error removal on typing
  const fields = ['customerName', 'customerMobile', 'customerEmail', 'bookingService', 'problemDescription', 'houseNo', 'streetArea', 'city', 'pincode', 'bookingDate', 'timeSlot'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
      el.addEventListener('change', () => el.classList.remove('is-invalid'));
    }
  });

  // Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Field Values
    const name = document.getElementById('customerName').value.trim();
    const mobile = document.getElementById('customerMobile').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const service = document.getElementById('bookingService').value;
    const providerIdVal = document.getElementById('bookingProvider').value;
    const problem = document.getElementById('problemDescription').value.trim();
    const houseNo = document.getElementById('houseNo').value.trim();
    const street = document.getElementById('streetArea').value.trim();
    const city = document.getElementById('city').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const dateVal = document.getElementById('bookingDate').value;
    const timeSlotVal = document.getElementById('timeSlot').value;

    // Validation Flags
    const isNameValid = setError('customerName', 'errCustomerName', name.length >= 2, 'Please enter your full name (minimum 2 characters).');
    const isMobileValid = setError('customerMobile', 'errCustomerMobile', /^[6-9]\d{9}$/.test(mobile), 'Mobile number must be 10 digits starting with 6-9.');
    const isEmailValid = setError('customerEmail', 'errCustomerEmail', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), 'Please enter a valid email address (e.g. name@example.com).');
    const isServiceValid = setError('bookingService', 'errBookingService', service !== '');
    const isProblemValid = setError('problemDescription', 'errProblemDescription', problem.length > 0);
    const isHouseValid = setError('houseNo', 'errHouseNo', houseNo.length > 0);
    const isStreetValid = setError('streetArea', 'errStreetArea', street.length > 0);
    const isCityValid = setError('city', 'errCity', city.length > 0);
    const isPincodeValid = setError('pincode', 'errPincode', /^[1-9][0-9]{5}$/.test(pincode), 'Pincode must be a valid 6-digit postal code.');
    
    // Date validation (must not be in past)
    const selectedDateObj = new Date(dateVal);
    const todayObj = new Date(today);
    const isDateValid = setError('bookingDate', 'errBookingDate', dateVal !== '' && selectedDateObj >= todayObj);
    const isTimeValid = setError('timeSlot', 'errTimeSlot', timeSlotVal !== '');

    const formIsValid = isNameValid && isMobileValid && isEmailValid && isServiceValid &&
                        isProblemValid && isHouseValid && isStreetValid && isCityValid &&
                        isPincodeValid && isDateValid && isTimeValid;

    if (!formIsValid) {
      showToast('Please fix the errors in the form before submitting.', 'danger');
      return;
    }

    // Identify Provider details
    let selectedProviderName = 'Assigned Local Specialist';
    let pId = providerIdVal ? parseInt(providerIdVal, 10) : null;

    if (pId) {
      const foundProv = PROVIDERS_DATA.find(p => p.id === pId);
      if (foundProv) selectedProviderName = foundProv.name;
    } else {
      // Pick first available provider for service if unassigned
      const firstAvailable = PROVIDERS_DATA.find(p => p.service === service);
      if (firstAvailable) {
        selectedProviderName = firstAvailable.name;
        pId = firstAvailable.id;
      }
    }

    // Construct New Booking Object
    const newBookingId = generateBookingId();
    const newBooking = {
      id: newBookingId,
      customerName: name,
      mobile: mobile,
      email: email,
      serviceName: service,
      providerId: pId,
      providerName: selectedProviderName,
      description: problem,
      houseNo: houseNo,
      street: street,
      city: city,
      pincode: pincode,
      date: dateVal,
      timeSlot: timeSlotVal,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage
    const currentBookings = getBookings();
    currentBookings.unshift(newBooking);
    saveBookings(currentBookings);

    // Populate Modal Confirmation Content
    document.getElementById('confBookingId').textContent = newBooking.id;
    document.getElementById('confProviderName').textContent = newBooking.providerName;
    document.getElementById('confServiceName').textContent = newBooking.serviceName;
    document.getElementById('confSchedule').textContent = `${newBooking.date} (${newBooking.timeSlot})`;

    // Show Confirmation Modal Overlay
    const modal = document.getElementById('confirmationModal');
    if (modal) modal.classList.add('active');

    // Reset Form
    form.reset();
  });
});
