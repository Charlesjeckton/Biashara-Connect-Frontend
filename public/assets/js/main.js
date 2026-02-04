/**
 * BIASHARA CONNECT - MAIN JAVASCRIPT
 * Combined: Header, Listings, and Footer Logic
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Biashara Connect - Main JS Loaded");

  // ==========================================
  // 1. HEADER & NAVIGATION LOGIC
  // ==========================================
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  const body = document.body;

  // Toggle menu on button click
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      this.classList.toggle("active");
      body.classList.toggle("menu-open");

      // Change icon
      const icon = this.querySelector("i");
      if (mainNav.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!mobileMenuBtn || !mainNav) return;

    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnButton = mobileMenuBtn.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickOnButton &&
      mainNav.classList.contains("active")
    ) {
      mainNav.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
      body.classList.remove("menu-open");

      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        mainNav.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");

        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

  // ==========================================
  // 2. LISTINGS INTERACTION
  // ==========================================
  // Heart/Save Toggle
  document.querySelectorAll(".saved-icon").forEach((icon) => {
    icon.addEventListener("click", function () {
      const heartIcon = this.querySelector("i");
      heartIcon.classList.toggle("far");
      heartIcon.classList.toggle("fas");
      this.classList.toggle("active");
    });
  });

  // Contact Buttons
  document.querySelectorAll(".contact-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const listingTitle =
        this.closest(".listing-card").querySelector(
          ".listing-title",
        ).textContent;
      alert("Opening chat for: " + listingTitle);
    });
  });

  // ==========================================
  // 3. FOOTER UTILITIES
  // ==========================================
  // Set Current Year
  const yearElement = document.getElementById("current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Back to Top Logic
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Smooth Scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Payment/App Tracking Mockups
  document.querySelectorAll(".app-button").forEach((btn) => {
    btn.addEventListener("click", () => console.log("App Store Clicked"));
  });
});

// Global Helpers
window.updateContactInfo = function (phone, email) {
  const phoneEl = document.querySelector(".contact-item i.fa-phone + span");
  const emailEl = document.querySelector(".contact-item i.fa-envelope + span");
  if (phoneEl) phoneEl.textContent = phone;
  if (emailEl) emailEl.textContent = email;
};
