/**
 * SHREE RADHA PEDA - VANILLA JAVASCRIPT
 * Premium Traditional Indian Sweets Brand
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Sticky Navbar Scroll Effect
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }
  });

  // 4. Highlight Active Navigation Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (href === 'index.html' && currentPath === '/')) {
      link.classList.add('active');
    } else if (href && currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    }
  });

  // 5. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 7. Product Catalog Filter & Search (For products.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  const searchInput = document.getElementById('product-search');

  function applyProductFilters() {
    const activeCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const searchQuery = searchInput?.value.toLowerCase().trim() || '';

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTitle = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = searchQuery === '' || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyProductFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyProductFilters);
  }

  // 8. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) otherItem.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    });
  }

  // 9. Order Form Calculation & Submission Validation
  const orderForm = document.getElementById('orderForm');
  const pedaSelect = document.getElementById('selectPeda');
  const qtySelect = document.getElementById('orderQuantity');
  const totalDisplay = document.getElementById('estimatedTotal');
  const dateInput = document.getElementById('deliveryDate');

  // Set Minimum Delivery Date to Today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Price dictionary for calculation
  const priceMap = {
    'milk-peda': 320,
    'kesar-peda': 380,
    'dryfruit-peda': 420,
    'elaichi-peda': 350,
    'chocolate-peda': 360,
    'mathura-peda': 340,
    'celebration-box': 750,
    'royal-gift-box': 1150
  };

  const productNames = {
    'milk-peda': 'Traditional Milk Peda (500g)',
    'kesar-peda': 'Royal Kesar Peda (500g)',
    'dryfruit-peda': 'Shahi Dry Fruit Peda (500g)',
    'elaichi-peda': 'Classic Elaichi Peda (500g)',
    'chocolate-peda': 'Artisanal Chocolate Peda (500g)',
    'mathura-peda': 'Authentic Mathura Peda (500g)',
    'celebration-box': 'Special Celebration Peda Box (1 Kg)',
    'royal-gift-box': 'Royal Heritage Sweets Hamper (1.5 Kg)'
  };

  function updateOrderCalculation() {
    if (!pedaSelect || !qtySelect || !totalDisplay) return;
    const selectedItem = pedaSelect.value;
    const quantity = parseInt(qtySelect.value, 10) || 1;
    const unitPrice = priceMap[selectedItem] || 320;
    const total = unitPrice * quantity;
    totalDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
    return total;
  }

  if (pedaSelect && qtySelect) {
    pedaSelect.addEventListener('change', updateOrderCalculation);
    qtySelect.addEventListener('change', updateOrderCalculation);
    updateOrderCalculation();
  }

  // Check URL query parameters for pre-selected product (e.g., contact.html?product=kesar-peda)
  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedProduct = urlParams.get('product');
  if (preSelectedProduct && pedaSelect) {
    if (priceMap[preSelectedProduct]) {
      pedaSelect.value = preSelectedProduct;
      updateOrderCalculation();
    }
  }

  // Form Validation & Modal Trigger
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const emailAddress = document.getElementById('emailAddress');
      const deliveryAddress = document.getElementById('deliveryAddress');

      // Helper validation
      const validateField = (input, condition, errorId, errorMsg) => {
        const errorEl = document.getElementById(errorId);
        if (!condition) {
          input.classList.add('error');
          if (errorEl) {
            errorEl.textContent = errorMsg;
            errorEl.classList.add('visible');
          }
          isValid = false;
        } else {
          input.classList.remove('error');
          if (errorEl) {
            errorEl.classList.remove('visible');
          }
        }
      };

      // Full Name
      validateField(
        fullName,
        fullName.value.trim().length >= 2,
        'nameError',
        'Please enter your valid full name.'
      );

      // Phone
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanPhone = phoneNumber.value.replace(/\D/g, '');
      validateField(
        phoneNumber,
        phoneRegex.test(cleanPhone) || phoneNumber.value.trim().length >= 10,
        'phoneError',
        'Please enter a valid 10-digit mobile number.'
      );

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(
        emailAddress,
        emailRegex.test(emailAddress.value.trim()),
        'emailError',
        'Please enter a valid email address.'
      );

      // Address
      validateField(
        deliveryAddress,
        deliveryAddress.value.trim().length >= 8,
        'addressError',
        'Please enter complete delivery address with PIN code.'
      );

      if (isValid) {
        const currentTotal = updateOrderCalculation();
        const selectedKey = pedaSelect.value;
        const selectedProductName = productNames[selectedKey] || 'Shree Radha Peda';
        const qtyVal = qtySelect.value;
        const customerName = fullName.value.trim();
        const customerPhone = phoneNumber.value.trim();
        const deliveryDateVal = dateInput?.value || 'Standard Dispatch (1-2 Days)';

        // Populate Success Modal
        const orderModal = document.getElementById('orderSuccessModal');
        const receiptDetails = document.getElementById('receiptDetails');

        if (receiptDetails) {
          const orderId = 'SRP-' + Math.floor(100000 + Math.random() * 900000);
          receiptDetails.innerHTML = `
            <div class="receipt-row"><span>Order ID:</span><strong>#${orderId}</strong></div>
            <div class="receipt-row"><span>Customer:</span><span>${customerName}</span></div>
            <div class="receipt-row"><span>Contact:</span><span>${customerPhone}</span></div>
            <div class="receipt-row"><span>Selected Sweet:</span><span>${selectedProductName}</span></div>
            <div class="receipt-row"><span>Quantity:</span><span>${qtyVal} Pack(s)</span></div>
            <div class="receipt-row"><span>Delivery Date:</span><span>${deliveryDateVal}</span></div>
            <div class="receipt-row total"><span>Estimated Amount:</span><span>₹${currentTotal.toLocaleString('en-IN')}</span></div>
          `;
        }

        // WhatsApp Share Link
        const whatsappBtn = document.getElementById('whatsappConfirmBtn');
        if (whatsappBtn) {
          const msg = encodeURIComponent(`Namaste Shree Radha Peda! I would like to confirm my order for ${qtyVal} pack(s) of ${selectedProductName}. Customer: ${customerName}, Phone: ${customerPhone}. Total: ₹${currentTotal}.`);
          whatsappBtn.setAttribute('href', `https://wa.me/919876543210?text=${msg}`);
        }

        if (orderModal) {
          orderModal.classList.add('active');
        }

        orderForm.reset();
        updateOrderCalculation();
      }
    });
  }

  // 10. Close Modal Handlers
  document.querySelectorAll('.modal-close, .btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.classList.remove('active');
      });
    });
  });

  // Close modal when clicking on backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
});
