// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Carousel Navigation
    const carousels = document.querySelectorAll('.products-carousel');
    const prevButtons = document.querySelectorAll('.carousel-button.prev');
    const nextButtons = document.querySelectorAll('.carousel-button.next');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    carousels.forEach((carousel, index) => {
        const prevButton = prevButtons[index];
        const nextButton = nextButtons[index];
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
            });
            
            nextButton.addEventListener('click', () => {
                carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            });
        }
    });

    // Dots Navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const activeDot = dot.parentElement.querySelector('.dot.active');
            if (activeDot) {
                activeDot.classList.remove('active');
            }
            dot.classList.add('active');
            
            // Scroll to corresponding product set
            const carousel = dot.closest('.products-section').querySelector('.products-carousel');
            if (carousel) {
                carousel.scrollTo({ left: index * carousel.offsetWidth, behavior: 'smooth' });
            }
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResult = document.getElementById('search-result');
    
    if (searchButton && searchInput && searchResult) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            // Simulate search results
            const results = [
                { name: 'Camiseta Básica Branca', price: 'R$ 79,90', image: 'images/product-tshirt.jpg' },
                { name: 'Caneca AVANTI', price: 'R$ 49,90', image: 'images/mug.jpg' }
            ].filter(item => item.name.toLowerCase().includes(query));
            
            displaySearchResults(results);
        } else {
            searchResult.style.display = 'none';
        }
    }

    function displaySearchResults(results) {
        searchResult.innerHTML = '';
        
        if (results.length === 0) {
            searchResult.innerHTML = '<p>Nenhum resultado encontrado para sua busca.</p>';
        } else {
            const resultsList = document.createElement('div');
            resultsList.className = 'search-results-list';
            
            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="search-result-info">
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                    </div>
                `;
                resultsList.appendChild(resultItem);
            });
            
            searchResult.appendChild(resultsList);
        }
        
        searchResult.style.display = 'block';
    }

    // Categories Menu Functionality
    const categoriesToggleBtn = document.getElementById('categories-toggle-btn');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const departmentItems = document.querySelectorAll('.department-item');

    if (categoriesToggleBtn && categoriesDropdown) {
        // For mobile: Toggle categories dropdown
        categoriesToggleBtn.addEventListener('click', function() {
            if (window.innerWidth <= 576) {
                categoriesDropdown.style.display = categoriesDropdown.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Close dropdown when clicking outside (for mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 576 && 
                !categoriesToggleBtn.contains(event.target) && 
                !categoriesDropdown.contains(event.target)) {
                categoriesDropdown.style.display = 'none';
            }
        });
    }

    // For mobile: Handle department item clicks
    if (window.innerWidth <= 576) {
        departmentItems.forEach(item => {
            const departmentLink = item.querySelector('.department-link');
            if (departmentLink) {
                departmentLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all items
                    departmentItems.forEach(di => di.classList.remove('active'));
                    
                    // Add active class to current item
                    item.classList.add('active');
                });
            }
        });
    }
});
