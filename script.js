// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    // Function to filter projects
    function filterProjects(category) {
        projectItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.remove('hide');
                    item.classList.add('fade-in');
                }, 50);
            } else {
                item.classList.remove('fade-in');
                item.classList.add('hide');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Get the filter category from the button's data attribute
            const filterValue = button.getAttribute('data-filter');
            
            // Filter the projects
            filterProjects(filterValue);
        });
    });

    // Initialize all projects as visible
    filterProjects('all');

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector('.menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
        navbar.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menu.classList.remove('active');
            }

            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Add scroll event listener for navbar background
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});



