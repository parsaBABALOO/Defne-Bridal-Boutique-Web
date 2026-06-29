// Central store holding all metadata and static information for the boutique
const DEFNE_STORE = {
    brand: { name: "DEFNE", sub: "HAUTE COUTURE", slogan: "Crafting Eternal Romance." },
    phone: "+1 (555) 165-5986",
    email: "info@defnebridal.com",
    instagram: "@defne_khoy",
    address: "First of Amir St, South Khomeini St, Khoy, Iran",
    workingHours: "Sat - Thu: 10:00 AM - 8:00 PM",
    
    // Smooth cinematic background rotators for the modern video-like hero block
    heroBackgrounds: [
        "linear-gradient(rgba(0,0,0,0.6), rgba(7,7,7,1)), url('https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1600')",
        "linear-gradient(rgba(0,0,0,0.6), rgba(7,7,7,1)), url('https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=1600')",
        "linear-gradient(rgba(0,0,0,0.6), rgba(7,7,7,1)), url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600')"
    ],

    navigation: [
        { label: "Home", url: "index.html" },
        { label: "Collection", url: "collection.html" },
        { label: "Book Appointment", url: "booking.html" },
        { label: "Contact Us", url: "contact.html" }
    ],

    // Complete stock registry for the heavy grid and pop-up modal cards
    dresses: [
        { id: 1, title: "The Royal Silhouette", category: "Ballgown", fabric: "Premium Silk & Imperial Lace", color: "#ffffff", details: "Hand-embroidered with micro-pearls, featuring a majestic 3-meter cathedral train." },
        { id: 2, title: "Ethereal Mermaid Gown", category: "Mermaid Tail", fabric: "French Silk Tulle", color: "#fcf9f2", details: "Sculpted corset design with cascading floral appliques and a dramatic flared tail." },
        { id: 3, title: "Vintage Lace Majesty", category: "A-Line", fabric: "Classic Guipure", color: "#f9f5eb", details: "Inspired by 1950s European royalty. Features delicate long lace sleeves and an open back." },
        { id: 4, title: "Princess Aurora Gown", category: "Ballgown", fabric: "Duchess Satin", color: "#ffffff", details: "Minimalist luxury with hidden pockets, off-the-shoulder neckline, and a high-gloss finish." },
        { id: 5, title: "Seraphina Tail Gown", category: "Mermaid Tail", fabric: "Embroidered Organza", color: "#fffefe", details: "Semi-transparent bodice with botanical lace patterns and a lightweight comfortable fit." },
        { id: 6, title: "Boho Classic Charm", category: "A-Line", fabric: "Chiffon Boho Lace", color: "#faf6f0", details: "Perfect for outdoor or destination weddings. Features a lightweight V-neck flowy skirt." }
    ]
};

class DefneBridalApp {
    constructor(store) {
        this.store = store;
        this.activePage = this.detectCurrentPage();
        this.currentBgIndex = 0;
    }

    // Checking the window path to find out which section we are dealing with
    detectCurrentPage() {
        const page = window.location.pathname.split("/").pop();
        if (page === "collection.html") return "collection";
        if (page === "booking.html") return "booking";
        if (page === "contact.html") return "contact";
        return "home";
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.renderSharedLayout();
            this.renderPageSpecificContent();
            this.setupScrollAnimations();
            this.createLightboxMarkup(); // Injects the blank popup modal structure on page build
        });
    }

    // Handles layout templates that remain constant everywhere
    renderSharedLayout() {
        const headerEl = document.getElementById("mainHeader");
        if (headerEl) {
            let navItemsHTML = "";
            this.store.navigation.forEach(item => {
                const isActive = (this.activePage === "home" && item.url === "index.html") || item.url.includes(this.activePage);
                navItemsHTML += '<li><a href="' + item.url + '"' + (isActive ? ' class="active"' : '') + '>' + item.label + '</a></li>';
            });
            headerEl.innerHTML = '<div class="logo-area"><div class="logo-text"><h1>' + this.store.brand.name + '</h1><p>' + this.store.brand.sub + '</p></div></div><nav class="nav-menu"><ul>' + navItemsHTML + '</ul></nav><div><a href="booking.html" class="btn btn-gold">Book Now</a></div>';
        }

        const footerEl = document.getElementById("mainFooter");
        if (footerEl) {
            footerEl.innerHTML = '<p>&copy; ' + new Date().getFullYear() + ' <span>' + this.store.brand.name + '</span>. All Rights Reserved.</p>';
        }
    }

    renderPageSpecificContent() {
        if (this.activePage === "home") this.buildHomePage();
        if (this.activePage === "collection") this.buildCollectionPage();
        if (this.activePage === "booking") this.buildBookingPage();
        if (this.activePage === "contact") this.buildContactPage();
    }

    // Long-form layout content injection for index page
    buildHomePage() {
        const heroEl = document.getElementById("homeHero");
        if (heroEl) {
            heroEl.innerHTML = '<div class="hero-video-overlay"></div><div class="hero-content"><h2>Where Luxury Meets <span>Forever</span></h2><p>Experience the absolute pinnacle of premium bridal fashion. Every gown in our showroom is a masterpiece crafted with pure devotion and timeless elegance.</p><div class="hero-buttons"><a href="collection.html" class="btn btn-gold">View Lookbook</a><a href="booking.html" class="btn btn-outline">Private Session</a></div></div>';
            this.startHeroVideoEffect(heroEl); // Starts switching up background plates
        }

        // Section: Brand heritage story details
        const storySection = document.getElementById("brandStorySection");
        if (storySection) {
            storySection.innerHTML = '<div class="story-wrapper"><div class="story-content reveal"><span>The Legacy</span><h2>Crafting Dreams Since Day One</h2><p>At Defne Bridal, we believe a wedding dress isn\'t just fabric; it is an emotion, a capsule of love, and a reflection of your true essence. Our boutique serves as a private sanctuary where brides are treated like royalty, ensuring a memories-over-transactions experience.</p></div><div class="story-metrics reveal"><div class="metric-card"><h4>100%</h4><p>Premium Fabrics</p></div><div class="metric-card"><h4>500+</h4><p>Happy Brides</p></div><div class="metric-card"><h4>01</h4><p>Exclusive Design Shop</p></div></div></div>';
        }

        // Section: Why us features layout
        const whySection = document.getElementById("whyChooseSection");
        if (whySection) {
            whySection.innerHTML = '<h2 class="section-title reveal">Why Brides Choose <span>Defne</span></h2><div class="why-grid"><div class="why-card reveal"><span>01</span><h3>Haute Couture Quality</h3><p>We work exclusively with elite fabrics, French lace, and premium silks imported globally to guarantee perfection.</p></div><div class="why-card reveal"><span>02</span><h3>One-on-One Showroom Experience</h3><p>The entire boutique is locked down just for you and your guests during your private consultation session.</p></div><div class="why-card reveal"><span>03</span><h3>Master Tailoring & Fit</h3><p>Our in-house master artisans alter every micro-inch to sculpt the gown flawlessly around your silhouette.</p></div></div>';
        }

        // Limited preview cards for the home loop
        const homeGallery = document.getElementById("homePreviewGallery");
        if (homeGallery) {
            this.store.dresses.slice(0, 3).forEach(item => {
                homeGallery.innerHTML += '<div class="gallery-item large reveal" data-id="' + item.id + '"><div class="dress-container"><svg class="dress-artwork" viewBox="0 0 100 200"><path d="M40,40 Q50,60 60,40 L55,80 Q75,180 90,190 L10,190 Q25,180 45,80 Z" fill="' + item.color + '" opacity="0.95" /><path d="M40,40 Q50,20 60,40 Q50,45 40,40" fill="#d4af37" /></svg><div class="hover-overlay"><span>Click to Inspect Gown</span></div></div><div class="item-info"><h3>' + item.title + '</h3><span class="item-tag">' + item.category + '</span></div></div>';
            });
            this.setupGalleryClickEvents(homeGallery);
        }
    }

    // Handles category toggle logic on collection view
    buildCollectionPage() {
        const filterWrapper = document.getElementById("filterContainer");
        if (filterWrapper) {
            filterWrapper.innerHTML = '<button class="btn-filter active" data-cat="all">All Styles</button><button class="btn-filter" data-cat="Ballgown">Ballgown</button><button class="btn-filter" data-cat="Mermaid Tail">Mermaid</button><button class="btn-filter" data-cat="A-Line">A-Line</button>';
            filterWrapper.querySelectorAll(".btn-filter").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    filterWrapper.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
                    e.target.classList.add("active");
                    this.renderGalleryGrid(e.target.getAttribute("data-cat"));
                });
            });
        }
        this.renderGalleryGrid("all");
    }

    renderGalleryGrid(category) {
        const grid = document.getElementById("galleryGrid");
        if (!grid) return;
        grid.innerHTML = "";

        const list = category === "all" ? this.store.dresses : this.store.dresses.filter(d => d.category === category);
        list.forEach(item => {
            grid.innerHTML += '<div class="gallery-item large reveal" data-id="' + item.id + '"><div class="dress-container"><svg class="dress-artwork" viewBox="0 0 100 200"><path d="M40,40 Q50,60 60,40 L55,80 Q75,180 90,190 L10,190 Q25,180 45,80 Z" fill="' + item.color + '" opacity="0.95" /><path d="M40,40 Q50,20 60,40 Q50,45 40,40" fill="#d4af37" /></svg><div class="hover-overlay"><span>Click to Inspect Gown</span></div></div><div class="item-info"><h3>' + item.title + '</h3><span class="item-tag">' + item.category + '</span><span class="item-fabric">' + item.fabric + '</span></div></div>';
        });

        this.setupGalleryClickEvents(grid);
    }

    // Sets up custom click bindings to pop open the modal detail layouts
    setupGalleryClickEvents(container) {
        container.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", () => {
                const id = parseInt(item.getAttribute("data-id"));
                const dressData = this.store.dresses.find(d => d.id === id);
                if (dressData) this.openLightbox(dressData);
            });
        });
    }

    // Creates the hidden popup markup containers dynamically at footer root
    createLightboxMarkup() {
        const modal = document.createElement("div");
        modal.id = "defneLightbox";
        modal.className = "lightbox-modal";
        modal.innerHTML = '<div class="lightbox-content"><button class="lightbox-close">&times;</button><div class="lightbox-body"><div class="lightbox-visual" id="modalVisual"></div><div class="lightbox-details" id="modalDetails"></div></div></div>';
        document.body.appendChild(modal);

        modal.querySelector(".lightbox-close").addEventListener("click", () => {
            modal.classList.remove("active");
        });
        modal.addEventListener("click", (e) => {
            if (e.target.id === "defneLightbox") modal.classList.remove("active");
        });
    }

    // Handles rendering specific stock parameters inside active modal display
    openLightbox(dress) {
        const modal = document.getElementById("defneLightbox");
        const visual = document.getElementById("modalVisual");
        const details = document.getElementById("modalDetails");

        visual.innerHTML = '<svg viewBox="0 0 100 200" style="width:100%; height:100%; max-height:450px;"><path d="M40,40 Q50,60 60,40 L55,80 Q75,180 90,190 L10,190 Q25,180 45,80 Z" fill="' + dress.color + '" opacity="0.95" /><path d="M40,40 Q50,20 60,40 Q50,45 40,40" fill="#d4af37" /></svg>';
        details.innerHTML = '<span>' + dress.category + '</span><h2>' + dress.title + '</h2><p class="mat"><strong>Fabrication:</strong> ' + dress.fabric + '</p><p class="desc">' + dress.details + '</p><div style="margin-top:30px;"><a href="booking.html" class="btn btn-gold">Request Fitting Session</a></div>';

        modal.classList.add("active");
    }

    // Fades hero slide textures back and forth to simulate luxury video frames
    startHeroVideoEffect(element) {
        element.style.backgroundImage = this.store.heroBackgrounds[0];
        element.style.backgroundSize = "cover";
        element.style.backgroundPosition = "center";
        element.style.transition = "background-image 2.5s ease-in-out";

        setInterval(() => {
            this.currentBgIndex = (this.currentBgIndex + 1) % this.store.heroBackgrounds.length;
            element.style.backgroundImage = this.store.heroBackgrounds[this.currentBgIndex];
        }, 6000); // Transitions background graphics roughly every 6 seconds
    }

    buildBookingPage() {
        const wrapper = document.getElementById("bookingFormContainer");
        if (wrapper) {
            wrapper.innerHTML = '<form class="booking-form reveal" id="bForm"><div class="form-group"><label>Full Name</label><input type="text" class="form-control" id="formName" required /></div><div class="form-group"><label>Phone Number</label><input type="tel" class="form-control" id="formPhone" required /></div><div class="form-group"><label>Preferred Date</label><input type="date" class="form-control" id="formDate" required /></div><button type="submit" class="btn btn-gold">Confirm Luxury Booking</button></form>';
            document.getElementById("bForm").addEventListener("submit", (e) => {
                e.preventDefault();
                alert("Thank you! Your private consultation has been submitted successfully.");
            });
        }
    }

    buildContactPage() {
        const grid = document.getElementById("contactInfoGrid");
        if (grid) {
            grid.innerHTML = '<div class="contact-card highlight reveal"><h3>Call Us</h3><div class="val">' + this.store.phone + '</div></div><div class="contact-card reveal"><h3>Instagram</h3><div class="val">' + this.store.instagram + '</div></div><div class="contact-card reveal"><h3>Boutique Address</h3><div class="val" style="font-size:14px;">' + this.store.address + '</div></div>';
        }
    }

    // Scroll checker loop using standard IntersectionObserver API for smooth transition triggers
    setupScrollAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }
}

// Initializing the application logic instance
const app = new DefneBridalApp(DEFNE_STORE);
app.init();

