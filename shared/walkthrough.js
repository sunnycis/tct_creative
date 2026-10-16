/**
 * Design Creative — HTML Walkthrough Interactive Helpers
 * Standalone zero-dependency utility for modal popups, step transitions, hero image crossfading, and walkthrough navigation.
 */

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// Close modal on clicking backdrop
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Storefront Hero Background Cross-Fade Switcher
function switchHeroTab(tabKey) {
  // Update Tab Buttons
  const tabConfig = {
    flights: { activeBorder: 'border-sky-400', activeText: 'text-sky-300', activeBg: 'bg-sky-500/20' },
    hotels: { activeBorder: 'border-amber-400', activeText: 'text-amber-300', activeBg: 'bg-amber-500/20' },
    cars: { activeBorder: 'border-emerald-400', activeText: 'text-emerald-300', activeBg: 'bg-emerald-500/20' },
    pnr: { activeBorder: 'border-sky-400', activeText: 'text-sky-300', activeBg: 'bg-sky-500/20' }
  };

  ['flights', 'hotels', 'cars', 'pnr'].forEach(k => {
    const btn = document.getElementById(`tab-btn-${k}`);
    const content = document.getElementById(`tab-content-${k}`);
    const img = document.getElementById(`hero-bg-${k}`);

    if (btn) {
      btn.className = (k === tabKey)
        ? `pb-3 px-4 font-extrabold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${tabConfig[k].activeBorder} ${tabConfig[k].activeText} ${tabConfig[k].activeBg} rounded-t-xl`
        : `pb-3 px-4 font-extrabold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer border-transparent text-slate-300 hover:text-white hover:bg-white/10 rounded-t-xl`;
    }

    if (content) {
      if (k === tabKey) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    }

    if (img) {
      if (k === tabKey) {
        img.classList.remove('opacity-0', 'scale-105', 'pointer-events-none');
        img.classList.add('opacity-100', 'scale-100');
      } else {
        img.classList.remove('opacity-100', 'scale-100');
        img.classList.add('opacity-0', 'scale-105', 'pointer-events-none');
      }
    }
  });

  // Dynamic Headlines
  const headlines = {
    flights: {
      badge: '✈️ Aviation Fleet & Global GDS Inventory — Travel CARE Trip',
      title: 'Discover New Horizons',
      sub: 'Search live rates across global airlines, premium nonstop routes, and instant e-tickets. No account required.'
    },
    hotels: {
      badge: '🏨 5-Star Concierge & Verified Luxury Stays — Travel CARE Trip',
      title: 'Experience World-Class Hospitality',
      sub: 'Curated 5-star luxury stays, boutique resort retreats, and exclusive suites with best rate guarantees.'
    },
    cars: {
      badge: '🚗 Executive Fleet & Chauffeur Services — Travel CARE Trip',
      title: 'Verified Fleet & Dedicated Chauffeurs',
      sub: 'Comfortable intercity transit, corporate sedans, and airport chauffeur transfers at transparent per-km rates.'
    },
    pnr: {
      badge: '🎫 Real-Time Itinerary & PNR Vault — Travel CARE Trip',
      title: 'Manage & Retrieve Your Booking',
      sub: 'Instantly access confirmed flight tickets, hotel vouchers, passenger details, and printable itineraries.'
    }
  };

  const badgeEl = document.getElementById('hero-badge-text');
  const titleEl = document.getElementById('hero-headline');
  const subEl = document.getElementById('hero-subtitle');

  if (badgeEl && headlines[tabKey]) badgeEl.innerText = headlines[tabKey].badge;
  if (titleEl && headlines[tabKey]) titleEl.innerText = headlines[tabKey].title;
  if (subEl && headlines[tabKey]) subEl.innerText = headlines[tabKey].sub;
}

// Toast Notification
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-sky-600';
  toast.className = `${bg} text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-4 opacity-0`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
