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

    // Side Navigation Active
    const sideNavProduct = document.querySelector(".side-nav.product");
    const navBtnProduct = document.querySelector(".nav-item.product");
    console.log(navBtnProduct);
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

    
    if (window.location.pathname.includes('product.html')) {
        // Function to apply all filters
        function applyFilters() {
        const brand = brandFilter.value.toLowerCase();
        const Price = priceFilter.value
        const maxPrice = Price.split("-")[1].replace(/\./g, "");
        const minPrice = Price.split("-")[0].replace(/\./g, "");
        const minRating = ratingFilter.value;
        const products = document.querySelectorAll('.product-list-item');
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