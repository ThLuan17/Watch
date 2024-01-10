// Navbar Sticky
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 0) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });
    // Navbar Fade
    var previousScroll = 0;
    $(window).scroll(function(){
    var currentScroll = $(this).scrollTop();
    if (currentScroll > previousScroll){
            $('nav').fadeOut();
    } else {
            $('nav').fadeIn();
    }
    previousScroll = currentScroll;
    });

    // Side cart Active
    const cart = document.querySelector(".side-cart");
    const cartBtn = document.querySelector(".cart-icon");
    const closeCartBtn = document.querySelector(".close-cart");
    cartBtn.addEventListener("click", function(){
        cart.classList.toggle("open");
    });

    closeCartBtn.addEventListener("click", function(){
        cart.classList.remove("open");
    });
    // End Side cart Active

    // Side Search Active
    const search = document.querySelector(".side-search");
    const searchBtn = document.querySelector(".search-bar");
    searchBtn.addEventListener("click", function(){
        search.classList.toggle("open");
    });

    const closeSearchBtn = document.querySelector(".close-search");
    closeSearchBtn.addEventListener("click", function(){
        search.classList.remove("open");
    });
    // End Side Search Active

    // Side Navigation Active
    const sideNav = document.querySelector(".side-nav.main");
    const navBtn = document.querySelector(".navbar-toggler");
    navBtn.addEventListener("click", function(){
        sideNav.classList.toggle("open");
    });

    const closeNavBtn = document.querySelector(".close-nav");
    closeNavBtn.addEventListener("click", function(){
        sideNav.classList.remove("open");
    });

    // Side Navigation Product Active
    const sideNavProduct = document.querySelector(".side-nav.product");
    const navBtnProduct = document.querySelector(".nav-item.product");
    navBtnProduct.addEventListener("click", function(){
        console.log("click");
        sideNavProduct.classList.toggle("open");
    });

    const closeNavBtnProduct = document.querySelector(".close-nav.product");
    closeNavBtnProduct.addEventListener("click", function(){
        sideNavProduct.classList.remove("open");
    });

    // Function to filter the list based on the search input
    const searchInput = document.getElementById("searchInput")
    searchInput.addEventListener("keyup", function(event) {
        const searchValue = event.target.value.toLowerCase();
        const searchList = document.querySelectorAll(".search-list .list-item");
        searchList.forEach(function(item) {
            if (item.textContent.toLowerCase().indexOf(searchValue) > -1) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Cart Count
    const cartCount = document.querySelector(".cart-count");
    const cartItems = document.querySelectorAll(".cart-items .item");
    cartCount.textContent = cartItems.length;

    // Cart Total
    const cartTotal = document.querySelector(".cart-total .total-price");
    const itemPrices = document.querySelectorAll(".item-price");
    let total = 0;
    itemPrices.forEach(function(itemPrice) {
        let price = itemPrice.textContent.replace(/[^0-9.-]+/g,"").replace(/\./g, "");
        total += parseInt(price);
    });
    cartTotal.textContent = total.toLocaleString("vi-VN") + "đ";

    // Quantity total

    // Product Filter
    /// Get references to the filters
    const brandFilter = document.querySelector('.brand-filter');
    const priceFilter = document.querySelector('.price-filter');
    const ratingFilter = document.querySelector('.rating-filter');
    const sortFilter = document.querySelector('.sort-filter');

    // Home Product Tabs
    const productTabs = document.querySelectorAll('.product-list-tabs-item.sales');
    const productTabsNew = document.querySelectorAll('.product-list-tabs-item.new');
    const productTabContents = document.querySelectorAll('.product-list.sales .product-list-content');
    const productTabContentsNew = document.querySelectorAll('.product-list.new .product-list-content');
    productTabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            productTabs.forEach(function(tab) {
                tab.classList.remove('active');
            });
            // Add active class to the clicked tab
            tab.classList.add('active');
            // Remove active class from all tab contents
            productTabContents.forEach(function(content) {
                content.classList.remove('active');
            });
            // Add active class to the corresponding tab content
            productTabContents[index].classList.add('active');
        });
    });

    productTabsNew.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            productTabsNew.forEach(function(tab) {
                tab.classList.remove('active');
            });
            // Add active class to the clicked tab
            tab.classList.add('active');
            // Remove active class from all tab contents
            productTabContentsNew.forEach(function(content) {
                content.classList.remove('active');
            });
            // Add active class to the corresponding tab content
            productTabContentsNew[index].classList.add('active');
        });
    });

    // Function in Product Page
    if (window.location.pathname.includes('product.html')) {
        // Function to apply all filters
        const products = document.querySelectorAll('.product-list-item');
        function applyFilters() {
        const brand = brandFilter.value.toLowerCase();
        const Price = priceFilter.value
        const maxPrice = Price.split("-")[1].replace(/\./g, "");
        const minPrice = Price.split("-")[0].replace(/\./g, "");
        const minRating = ratingFilter.value;
        const sort = sortFilter.value;
        // Convert NodeList to Array
        let productsArray = Array.from(products);
    
            products.forEach(function(product) {
                const productBrand = product.querySelector('.product-list-item-brand').textContent.toLowerCase().replace(" ", "-")
                const price = Number(product.querySelector('.product-list-item-price').textContent.replace(/[^0-9.-]+/g,"").replace(/\./g, ""));
                const rating = product.querySelectorAll('.product-list-item-rating span.filled').length;
                if (
                    (Price === "all-all" || price >= minPrice && price <= maxPrice)
                    && (minRating === "all-all" || rating == minRating)
                    && ( brand === "all-all" || productBrand === brand)
                ) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
    
                // Sort products
                if (sort === 'price-asc') {
                    productsArray.sort((a, b) => {
                        const priceA = Number(a.querySelector('.product-list-item-price').textContent.replace(/[^0-9.-]+/g,"").replace(/\./g, ""));
                        const priceB = Number(b.querySelector('.product-list-item-price').textContent.replace(/[^0-9.-]+/g,"").replace(/\./g, ""));
                        return priceA - priceB;
                    });
                } else if (sort === 'price-desc') {
                    productsArray.sort((a, b) => {
                        const priceA = Number(a.querySelector('.product-list-item-price').textContent.replace(/[^0-9.-]+/g,"").replace(/\./g, ""));
                        const priceB = Number(b.querySelector('.product-list-item-price').textContent.replace(/[^0-9.-]+/g,"").replace(/\./g, ""));
                        return priceB - priceA;
                    });
                }
                // Remove all products from the DOM
                products.forEach(product => product.parentNode.removeChild(product));
                // Add sorted products back to the DOM
                const productContent = document.querySelector('.product-list-content');
                productsArray.forEach(product => productContent.appendChild(product));
            });
        };
        
        // Apply all filters when any filter changes
        brandFilter.addEventListener('change', applyFilters);
        priceFilter.addEventListener('change', applyFilters);
        ratingFilter.addEventListener('change', applyFilters);
        sortFilter.addEventListener('change', applyFilters);

        // News Watch Full
        const watchFullBtn = document.querySelector(".watch-full-btn");
        watchFullBtn.addEventListener("click", function(){
            const newsWatch = document.querySelector(".news .container");
            newsWatch.classList.toggle("full");
            watchFullBtn.textContent = newsWatch.classList.contains("full") ? "Thu gọn" : "Mở rộng";
        });

        // Add a click event listener to the reset filters button
        const resetFiltersButton = document.querySelector('#reset-filter');
        resetFiltersButton.addEventListener('click', resetFilters);


        // Save Product filters to localStorage
        const saveFiltersButton = document.querySelector('#save-filter');
        
        // Function to save filters
        function saveFilters() {
            // Select all filter inputs
            const filters = document.querySelectorAll('.filter-input');
            
            // Iterate over each filter input
            filters.forEach(function(filter) {
                // Save the filter value to localStorage
                localStorage.setItem(filter.id, filter.value);
            });
        }
        saveFiltersButton.addEventListener('click', saveFilters);
        
        //  Function to load filters
        function loadFilters() {
            // Select all filter inputs
            const filters = document.querySelectorAll('.filter-input');
            
            // Iterate over each filter input
            filters.forEach(function(filter) {
                // Load the filter value from localStorage
                const filterValue = localStorage.getItem(filter.id);
                
                // Set the value of the filter input
                filter.value = filterValue;
            });
            
            // Apply filters
            applyFilters();
        }

        // Load the filters when the page loads
        window.addEventListener('load', loadFilters);
    }

    // Function to reset all filters
    function resetFilters() {
        // Select all filter inputs
        const filters = document.querySelectorAll('.filter-input');
        
        // Iterate over each filter input
        filters.forEach(function(filter) {
            // Reset the filter value
            filter.value = 'all-all';
            localStorage.setItem(filter.id, filter.value)
        });
        
        // Apply filters
        applyFilters();
    }

    // Active Footer Collapse
    const footerHeading = document.querySelectorAll(".footer-heading");
    footerHeading.forEach(function(heading) {
        const footerList = heading.nextElementSibling;
        heading.addEventListener("click", function() {
            if (window.innerWidth < 768) {
                // Remove active class from all footer lists
                document.querySelectorAll('.footer-heading + ul').forEach(function(list) {
                    list.classList.remove('active');
                });

                // Add active class to the clicked footer list
                footerList.classList.add("active");
            }
        });
    });

    // Modal Product Deatails Active
    const modalProductDetails = document.querySelector("#productDetailsModal");
    const ProductDetailsBtn = document.querySelectorAll(".product-list-item .quick-views");
    const closeProductDetailsBtn = document.querySelector(".close-modal");
    const ProductDetailsTitle = modalProductDetails.querySelector(".modal-body-title");
    const ProductDetailsBrand= modalProductDetails.querySelector(".modal-body-brand");
    const ProductDetailsPrice = modalProductDetails.querySelector(".modal-body-price");
    const ProductDetailsOldPrice = modalProductDetails.querySelector(".modal-body-old-price");

    ProductDetailsBtn.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var ProductListItem = document.querySelector(".product-list-item");
            modalProductDetails.classList.add("open");
            ProductDetailsTitle.textContent = ProductListItem.querySelector(".product-list-item-name").textContent;
            ProductDetailsPrice.textContent = ProductListItem.querySelector(".product-list-item-price").textContent;
            ProductDetailsBrand.textContent = ProductListItem.querySelector(".product-list-item-brand").textContent;
            ProductDetailsOldPrice.textContent = ProductListItem.querySelector(".product-list-item-old-price").textContent;
            
        });
    });

    closeProductDetailsBtn.addEventListener("click", function() {
        modalProductDetails.classList.remove("open");
    });

    // Product Details Quantity 
    const quantityInput = document.querySelector(".quantity-input");
    const quantityMinusBtn = document.querySelector(".quantity-btn[data-type='minus']");
    const quantityPlusBtn = document.querySelector(".quantity-btn[data-type='plus']");

    quantityMinusBtn.addEventListener("click", function() {
        console.log("click");
        if (quantityInput.value > 1) {
            quantityInput.value--;
        }

        if (quantityInput.value == 1) {
            quantityMinusBtn.disabled = true;
        }

        quantityPlusBtn.disabled = false;
    });

    quantityPlusBtn.addEventListener("click", function() {

        if (quantityInput.value < 10) {
            quantityInput.value++;
        }

        if (quantityInput.value == 10) {
            quantityPlusBtn.disabled = true;
        }

        quantityMinusBtn.disabled = false;
    });

    // Scroll on top 
    const scrollOnTopBtn = document.querySelector(".btn.scroll-on-top");

    window.addEventListener('scroll', function() {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                scrollOnTopBtn.classList.add("active");
            } else {
                scrollOnTopBtn.classList.remove("active"); 
            }
        });

        scrollOnTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            scrollOnTopBtn.classList.remove("active");
        });