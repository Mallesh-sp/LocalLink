/**
 * LocalLink - Service Professional Partner Account Registration JavaScript
 * Handles technician signup, password strength evaluation, and registers provider in directory.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('partnerRegForm');
  const alertEl = document.getElementById('partnerRegAlert');
  const passwordInput = document.getElementById('pPassword');
  const confirmInput = document.getElementById('pConfirmPassword');
  const strengthWrap = document.getElementById('pStrengthWrap');
  const strengthFill = document.getElementById('pStrengthFill');
  const strengthText = document.getElementById('pStrengthText');
  const matchText = document.getElementById('pMatchText');

  if (!form) return;

  // 1. Real-time Password Strength Calculator
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      if (!val) {
        strengthWrap.style.display = 'none';
        return;
      }

      strengthWrap.style.display = 'block';
      let score = 0;
      if (val.length >= 6) score++;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (score <= 2) {
        strengthFill.style.width = '33%';
        strengthFill.style.backgroundColor = 'var(--danger)';
        strengthText.textContent = 'Strength: Weak (Add numbers or uppercase)';
        strengthText.style.color = 'var(--danger)';
      } else if (score <= 4) {
        strengthFill.style.width = '66%';
        strengthFill.style.backgroundColor = 'var(--warning)';
        strengthText.textContent = 'Strength: Medium (Good password)';
        strengthText.style.color = 'var(--warning)';
      } else {
        strengthFill.style.width = '100%';
        strengthFill.style.backgroundColor = 'var(--success)';
        strengthText.textContent = 'Strength: Strong (Excellent password)';
        strengthText.style.color = 'var(--success)';
      }

      checkMatch();
    });
  }

  // 2. Real-time Confirm Password Matcher
  function checkMatch() {
    if (!confirmInput || !confirmInput.value) {
      matchText.style.display = 'none';
      return;
    }

    matchText.style.display = 'block';
    if (confirmInput.value === passwordInput.value) {
      matchText.textContent = 'Passwords match ✓';
      matchText.className = 'pwd-match-text match';
    } else {
      matchText.textContent = 'Passwords do not match ✗';
      matchText.className = 'pwd-match-text no-match';
    }
  }

  if (confirmInput) {
    confirmInput.addEventListener('input', checkMatch);
  }

  // 3. Form Submission Logic
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('pName').value.trim();
    const service = document.getElementById('pCategory').value;
    const email = document.getElementById('pEmail').value.trim();
    const mobile = document.getElementById('pMobile').value.trim();
    const city = document.getElementById('pCity').value.trim();
    const rate = document.getElementById('pRate').value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    const errName = document.getElementById('errPName');
    const errCategory = document.getElementById('errPCategory');
    const errEmail = document.getElementById('errPEmail');
    const errMobile = document.getElementById('errPMobile');
    const errCity = document.getElementById('errPCity');
    const errRate = document.getElementById('errPRate');
    const errPassword = document.getElementById('errPPassword');
    const errConfirm = document.getElementById('errPConfirmPassword');

    let isValid = true;

    // Full Name
    if (!name || name.length < 2) {
      errName.classList.add('visible');
      isValid = false;
    } else {
      errName.classList.remove('visible');
    }

    // Category
    if (!service) {
      errCategory.classList.add('visible');
      isValid = false;
    } else {
      errCategory.classList.remove('visible');
    }

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      errEmail.classList.add('visible');
      isValid = false;
    } else {
      errEmail.classList.remove('visible');
    }

    // Mobile
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
      errMobile.classList.add('visible');
      isValid = false;
    } else {
      errMobile.classList.remove('visible');
    }

    // City
    if (!city) {
      errCity.classList.add('visible');
      isValid = false;
    } else {
      errCity.classList.remove('visible');
    }

    // Rate
    if (!rate || parseInt(rate, 10) < 50) {
      errRate.classList.add('visible');
      isValid = false;
    } else {
      errRate.classList.remove('visible');
    }

    // Password
    if (!password || password.length < 6) {
      errPassword.classList.add('visible');
      isValid = false;
    } else {
      errPassword.classList.remove('visible');
    }

    // Confirm Password
    if (confirmPassword !== password) {
      errConfirm.classList.add('visible');
      isValid = false;
    } else {
      errConfirm.classList.remove('visible');
    }

    if (!isValid) return;

    // Check if email already registered
    const users = getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      alertEl.textContent = 'An account with this email address already exists. Please login.';
      alertEl.style.display = 'flex';
      return;
    }

    const newProviderId = Date.now();

    // Create New Provider User Account
    const newProviderUser = {
      id: newProviderId,
      name: name,
      email: email.toLowerCase(),
      mobile: mobile,
      password: password,
      role: 'provider',
      providerId: newProviderId,
      service: service,
      city: city,
      rate: parseInt(rate, 10),
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Save to users array
    users.push(newProviderUser);
    saveRegisteredUsers(users);

    // Save active session
    setCurrentUser(newProviderUser);

    // Add entry to Providers Directory in localStorage if initialized
    let activeProviders = getProviders();
    const newProviderDirectoryEntry = {
      id: newProviderId,
      name: name,
      serviceCategory: service,
      title: `${service} Specialist`,
      experienceYears: 3,
      rating: 4.8,
      reviewCount: 1,
      startingPrice: parseInt(rate, 10),
      hourlyRate: parseInt(rate, 10),
      availability: "Available Today",
      location: city,
      isVerified: true,
      bio: `Professional ${service} expert offering doorstep repair and installation services in ${city}.`,
      skills: [`${service} Repair`, "Doorstep Visit", "Same Day Service"],
      completedJobsCount: 0
    };

    activeProviders.push(newProviderDirectoryEntry);
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(activeProviders));

    showToast(`Partner Account Created! Welcome, ${name}`, 'success');

    // Redirect to Provider Portal
    setTimeout(() => {
      window.location.href = 'provider-portal.html';
    }, 800);
  });
});
