/**
 * LocalLink - Authentication & User Session Management
 * Handles login, registration, password check, session state in localStorage,
 * and updates header navbar dynamically across all pages.
 */

const AUTH_KEYS = {
  USERS: 'locallink_registered_users',
  CURRENT_USER: 'locallink_current_user'
};

// Seed default users (Customer, Provider, Admin) if empty
function initAuthStorage() {
  if (!localStorage.getItem(AUTH_KEYS.USERS)) {
    const defaultUsers = [
      // Admin Account
      {
        id: 999,
        name: "Platform Administrator",
        email: "admin@locallink.com",
        mobile: "9999999999",
        password: "admin123",
        role: "admin",
        createdAt: "2026-01-01"
      },
      // Service Professionals / Provider Accounts
      {
        id: 101,
        name: "Arun Kumar",
        email: "arun@locallink.com",
        mobile: "9876543210",
        password: "provider123",
        role: "provider",
        providerId: 1,
        service: "Electrician",
        createdAt: "2026-02-01"
      },
      {
        id: 102,
        name: "Karthik Raj",
        email: "karthik@locallink.com",
        mobile: "9876543211",
        password: "provider123",
        role: "provider",
        providerId: 2,
        service: "Plumber",
        createdAt: "2026-02-01"
      },
      {
        id: 103,
        name: "Suresh Babu",
        email: "suresh@locallink.com",
        mobile: "9876543212",
        password: "provider123",
        role: "provider",
        providerId: 3,
        service: "AC Repair",
        createdAt: "2026-02-01"
      },
      {
        id: 104,
        name: "Priya Devi",
        email: "priya@locallink.com",
        mobile: "9876543213",
        password: "provider123",
        role: "provider",
        providerId: 4,
        service: "Home Cleaning",
        createdAt: "2026-02-01"
      },
      // Customer Account
      {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        mobile: "9876543210",
        password: "password123",
        role: "customer",
        createdAt: "2026-07-01"
      }
    ];
    localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(defaultUsers));
  }
}

// Get all registered users
function getRegisteredUsers() {
  const users = localStorage.getItem(AUTH_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

// Save users array
function saveRegisteredUsers(users) {
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));
}

// Get currently logged-in user (returns null if logged out)
function getCurrentUser() {
  const user = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
}

// Set active session user
function setCurrentUser(user) {
  if (user) {
    // Storing session metadata (id, name, email, mobile, role, providerId, service)
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role || 'customer',
      providerId: user.providerId || null,
      service: user.service || null
    };
    localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(sessionData));
  } else {
    localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
  }
}

// Register new customer user
function registerUser(name, email, mobile, password) {
  const users = getRegisteredUsers();
  
  // Check if email already exists
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, message: 'Email address is already registered. Please login.' };
  }

  const newUser = {
    id: Date.now(),
    name: name,
    email: email.toLowerCase(),
    mobile: mobile,
    password: password,
    role: 'customer',
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  saveRegisteredUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

// Login user with email & password
function loginUser(email, password) {
  const users = getRegisteredUsers();
  const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!foundUser) {
    return { success: false, message: 'Account not found with this email address.' };
  }

  if (foundUser.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  setCurrentUser(foundUser);
  return { success: true, user: foundUser };
}

// Logout user
function logoutUser() {
  setCurrentUser(null);
  showToast('You have been logged out successfully.', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// Dynamic Header Navbar Auth UI Updater
function updateNavbarAuthUI() {
  const navAuthGroup = document.getElementById('navAuthGroup');
  const mobileNav = document.getElementById('mobileNav');
  const currentUser = getCurrentUser();

  if (navAuthGroup) {
    if (currentUser) {
      let roleBadgeText = currentUser.role === 'admin' ? 'Admin' : (currentUser.role === 'provider' ? 'Pro' : '');
      let portalLink = '';
      if (currentUser.role === 'admin') {
        portalLink = `<a href="admin.html" class="btn btn-sm btn-outline" style="font-size: 0.8rem;">Admin Portal</a>`;
      } else if (currentUser.role === 'provider') {
        portalLink = `<a href="provider-portal.html" class="btn btn-sm btn-outline" style="font-size: 0.8rem;">Pro Portal</a>`;
      }

      navAuthGroup.innerHTML = `
        <div class="user-profile-badge" style="display: flex; align-items: center; gap: 0.5rem;">
          ${portalLink}
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; border: 1px solid #bfdbfe;">
            ${currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-dark);">${currentUser.name.split(' ')[0]} ${roleBadgeText ? `(${roleBadgeText})` : ''}</span>
          <button onclick="logoutUser()" class="btn btn-sm btn-outline" style="margin-left: 0.25rem; font-size: 0.8rem;" title="Logout">
            Logout
          </button>
        </div>
      `;
    } else {
      navAuthGroup.innerHTML = `
        <a href="login.html" class="nav-link" style="font-weight: 600;">Login</a>
        <a href="register.html" class="btn btn-sm btn-outline">Register</a>
      `;
    }
  }

  // Also update mobile drawer menu if present
  if (mobileNav) {
    let mobileAuthBtn = document.getElementById('mobileAuthItem');
    if (!mobileAuthBtn) {
      mobileAuthBtn = document.createElement('div');
      mobileAuthBtn.id = 'mobileAuthItem';
      mobileAuthBtn.className = 'mobile-auth-item';
      mobileAuthBtn.style.padding = '0.5rem 0';
      mobileAuthBtn.style.borderTop = '1px solid var(--border-light)';
      mobileNav.appendChild(mobileAuthBtn);
    }

    if (currentUser) {
      mobileAuthBtn.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: var(--text-dark);">Logged in as ${currentUser.name}</span>
          <button onclick="logoutUser()" class="btn btn-sm btn-danger">Logout</button>
        </div>
      `;
    } else {
      mobileAuthBtn.innerHTML = `
        <div style="display: flex; gap: 0.5rem;">
          <a href="login.html" class="btn btn-secondary btn-sm btn-block">Login</a>
          <a href="register.html" class="btn btn-outline btn-sm btn-block">Register</a>
        </div>
      `;
    }
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  initAuthStorage();
  updateNavbarAuthUI();
});
