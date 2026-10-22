# 📍 LocalLink – Local Services Discovery & Booking Platform

**LocalLink** is a modern, responsive web application that connects customers with verified local service professionals for plumbing, electrical work, AC repairs, cleaning, carpentry, painting, and maintenance services.

---

## 🚀 Features

- **Service Catalog**: Browse categorized home services with transparent base pricing and detailed scope descriptions.
- **Service Providers Directory**: Find verified local experts with customer ratings, review counts, experience, and service areas.
- **Provider Profiles**: View detailed bios, list of services offered, operating hours, and verified customer testimonials.
- **Interactive Booking Flow**: Step-by-step booking system allowing customers to choose service type, preferred date/time slot, and service address.
- **User Dashboard & Bookings Management**: Track active, completed, and pending service requests.
- **Admin & Provider Portals**: Dedicated portals for managing bookings, tracking revenue, and updating service availability.
- **Customer Reviews & Ratings**: Submit ratings and feedback for completed jobs.
- **Authentication**: Built-in customer & provider login and registration interfaces.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom responsive grid & modern UI components), JavaScript (ES6+)
- **Icons**: Inline SVG Icons (feather/modern vector system)
- **Local Server**: Node.js HTTP server (`serve.js`)

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Mallesh-sp/LocalLink.git
cd LocalLink
```

### 2. Run locally
Start the local server using Node.js:
```bash
node serve.js
```
The application will automatically open in your browser at:
```
http://localhost:3000
```

Alternatively, open `index.html` directly in any modern browser.

---

## 📂 Project Structure

```
├── css/
│   ├── components.css     # Buttons, cards, modals, form controls
│   ├── responsive.css     # Mobile, tablet & desktop media queries
│   └── style.css          # Core variables, typography, layout
├── js/
│   ├── auth.js            # Login, registration & session handling
│   ├── booking.js         # Booking stepper & confirmation
│   ├── bookings.js        # My Bookings page controller
│   ├── data.js            # Mock providers, categories & SVG icons
│   ├── main.js            # Global navbar, helpers & search
│   └── ...                # Page-specific controllers
├── about.html             # About LocalLink mission & values
├── admin.html             # Platform administration dashboard
├── booking.html           # Service booking flow
├── contact.html           # Contact us & support form
├── dashboard.html         # User account overview
├── index.html             # Main landing page
├── login.html             # User login
├── my-bookings.html       # Customer bookings history
├── provider-details.html  # Detailed provider profile
├── provider-portal.html   # Service provider workspace
├── providers.html         # Provider search & filter directory
├── register.html          # Customer registration
├── register-provider.html # Service professional onboarding
├── reviews.html           # Verified customer reviews
├── services.html          # All service categories
├── serve.js               # Node.js local dev server
└── README.md
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
