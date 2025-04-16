document.addEventListener('DOMContentLoaded', () => {
    initializeUserMenu();
    initializeSlider();
    initializeViewMore();
    initializeMainNav();
    initializeUnitSelection();
    initializeBootstrapCarousel();

    // Tìm kiếm
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Dữ liệu mẫu cho sản phẩm (trong thực tế sẽ lấy từ API hoặc database)
    // Dữ liệu sản phẩm của nhà thuốc PharmaCare
    const sampleProducts = [
        // Sản phẩm bán chạy
        {
            id: 1,
            name: "Gel bôi Aloclair Plus Gel giảm đau hiệu quả, nhanh chóng",
            price: 195000,
            oldPrice: 230000,
            discount: "15%",
            unit: "Tuýp",
            unitDetail: "Tuýp 8ml",
            image: "./images/nav/sp bán chạy/",
            category: "Thuốc bôi",
            isBestSeller: true
        },
        {
            id: 2,
            name: "Thực phẩm bảo vệ sức khỏe NMN PQQ",
            price: 6675000,
            oldPrice: 8900000,
            discount: "25%",
            unit: "Hộp",
            unitDetail: "Hộp 60 Viên",
            image: "./images/nav/sp bán chạy/Thực phẩm bảo vệ sức khỏe NMN PQQ.webp",
            category: "Thực phẩm chức năng",
            isBestSeller: true
        },
        {
            id: 3,
            name: "Nhiệt kế hồng ngoại Yuwell YT-1C đo nhiệt độ cơ thể",
            price: 472000,
            oldPrice: 590000,
            discount: "20%",
            unit: "Hộp",
            unitDetail: "Hộp",
            image: "./images/nav/sp bán chạy/Nhiệt kế hồng ngoại Yuwell YT-1C đo nhiệt độ cơ thể.webp",
            category: "Thiết bị y tế",
            isBestSeller: true
        },
        {
            id: 4,
            name: "Siro Brauer Baby & Kids Liquid Zinc bổ sung kẽm, tăng sức đề kháng",
            price: 380000,
            oldPrice: 475000,
            discount: "20%",
            unit: "Hộp",
            unitDetail: "Hộp",
            image: "./images/nav/sp bán chạy/Siro Brauer Baby & Kids Liquid Zinc bổ sung kẽm, tăng sức đề kháng.webp",
            category: "Vitamin & Khoáng chất",
            isBestSeller: true
        },
        {
            id: 5,
            name: "Siro Bổ Phế Lábebé 120ml hỗ trợ bổ phế, giảm ho, giảm đờm",
            price: 60000,
            oldPrice: 75000,
            discount: "20%",
            unit: "Hộp",
            unitDetail: "Hộp",
            image: "./images/nav/sp bán chạy/Siro Bổ Phế Lábebé 120ml hỗ trợ bổ phế, giảm ho,.webp",
            category: "Thuốc ho",
            isBestSeller: true
        },
        {
            id: 6,
            name: "Sữa rửa mặt Reihaku Hatomugi Acne Care and Facial Washing Foam",
            price: 87200,
            oldPrice: 109000,
            discount: "20%",
            unit: "Tuýp",
            unitDetail: "Tuýp x 130g",
            image: "./images/nav/sp bán chạy/Sữa rửa mặt Reihaku Hatomugi Acne Care and.webp",
            category: "Chăm sóc da",
            isBestSeller: true
        },
        {
            id: 7,
            name: "Nước súc miệng Pearlie White Fluorinze Anti-bacterial Fluoride",
            price: 132000,
            oldPrice: 165000,
            discount: "20%",
            unit: "Chai",
            unitDetail: "Chai",
            image: "./images/nav/sp bán chạy/Nước súc miệng Pearlie White Fluorinze Anti-.webp",
            category: "Chăm sóc răng miệng",
            isBestSeller: true
        },
        {
            id: 8,
            name: "Hộp dịch uống men vi sinh Enterogermina Gut Defense Sanofi",
            price: 165000,
            oldPrice: 184000,
            discount: "10%",
            unit: "Hộp",
            unitDetail: "Hộp 2 Vỉ x 10 Ống",
            image: "./images/nav/sp bán chạy/Hộp dịch uống men vi sinh Enterogermina Gut Defense.webp",
            category: "Men vi sinh",
            isBestSeller: true
        },
        {
            id: 9,
            name: "Máy xông khí dung nén khí Yuwell 403M chuyển thuốc dạng lỏng",
            price: 1210000,
            oldPrice: 1350000,
            discount: "10%",
            unit: "Hộp",
            unitDetail: "Hộp",
            image: "./images/nav/sp bán chạy/Máy xông khí dung nén khí Yuwell 403M chuyển thuốc.webp",
            category: "Thiết bị y tế",
            isBestSeller: true
        },
        {
            id: 10,
            name: "Viên uống LéAna Ocavill hỗ trợ cân bằng nội tiết tố (60 viên)",
            price: 540000,
            oldPrice: 680000,
            discount: "20%",
            unit: "Hộp",
            unitDetail: "Hộp 60 Viên",
            image: "./images/nav/sp bán chạy/Viên uống LéAna Ocavill hỗ trợ cân bằng nội tiết tố (60.webp",
            category: "Thực phẩm chức năng",
            isBestSeller: true
        },
        {
            id: 11,
            name: "Sữa bột Glucerna Abbott bổ sung dinh dưỡng đặc biệt cho người đái tháo đường",
            price: 878000,
            oldPrice: 922000,
            discount: "44.000đ",
            unit: "Hộp",
            unitDetail: "Hộp",
            image: "./images/nav/sp bán chạy/Sữa bột Glucerna Abbott bổ sung dinh dưỡng đặc biệt.webp",
            category: "Sữa y tế",
            isBestSeller: true
        },
        {
            id: 12,
            name: "Men vi sinh BioGaia Protectis Baby Drops bổ sung lợi khuẩn cho trẻ sơ sinh",
            price: 460000,
            oldPrice: null,
            discount: null,
            unit: "Hộp",
            unitDetail: "Hộp x 5ml",
            image: "./images/nav/sp bán chạy/Men vi sinh BioGaia Protectis Baby Drops bổ.jpg",
            category: "Men vi sinh",
            isBestSeller: true
        },
        {
            id: 13,
            name: "Viên uống Omexxel Ginkgo 120 Excelfie tăng cường tuần hoàn não",
            price: 364000,
            oldPrice: null,
            discount: null,
            unit: "Hộp",
            unitDetail: "Hộp 2 Vỉ x 15 Viên",
            image: "./images/nav/sp bán chạy/Viên uống Omexxel Ginkgo 120 Excelfie tăng cường.webp",
            category: "Thực phẩm chức năng",
            isBestSeller: true
        },

        // Sản phẩm nổi bật
        {
            id: 14,
            name: "Viên uống Glucosamine And Chondroitin Jpanwell hỗ trợ xương khớp",
            price: 912000,
            oldPrice: 960000,
            discount: "5%",
            unit: "Hộp",
            unitDetail: "Hộp 120 Viên",
            image: "./images/nav/sp nổi bật/Viên uống Glucosamine And.webp",
            category: "Thực phẩm chức năng",
            isFeatured: true
        },
        {
            id: 15,
            name: "Dung dịch LineaBon K2+D3 EiPharm hỗ trợ bổ sung Vitamin D3 và K2",
            price: 295000,
            oldPrice: null,
            discount: null,
            unit: "Hộp",
            unitDetail: "Hộp",
            image: "./images/nav/sp nổi bật/Dung dịch LineaBon K2+D3 EiPharm hỗ trợ.webp",
            category: "Vitamin & Khoáng chất",
            isFeatured: true
        }
    ];

    // Xử lý tìm kiếm
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm.length === 0) {
            closeSearchResults();
            return;
        }

        // Tìm sản phẩm phù hợp
        const matchedProducts = sampleProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        // Hiển thị kết quả
        displaySearchResults(matchedProducts, searchTerm);
    }

    // Hiển thị kết quả tìm kiếm
    function displaySearchResults(products, searchTerm) {
        searchResults.innerHTML = '';

        if (products.length > 0) {
            // Có sản phẩm được tìm thấy
            products.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.dataset.productId = product.id;

                // Định dạng giá tiền
                const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price);

                resultItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="search-result-image">
                    <div class="search-result-info">
                        <div class="search-result-title">${product.name}</div>
                        <div class="search-result-price">${formattedPrice}đ / ${product.unit}</div>
            </div>
                    <button class="search-add-to-cart">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                `;

                // Xử lý click vào sản phẩm để xem chi tiết
                resultItem.addEventListener('click', (e) => {
                    // Nếu người dùng nhấp vào nút thêm vào giỏ hàng, không chuyển trang
                    if (e.target.closest('.search-add-to-cart')) {
                        e.stopPropagation();
                        return;
                    }
                    // Xử lý khi người dùng nhấp vào sản phẩm
                    window.location.href = `#product-${product.id}`;
                    closeSearchResults();
                });

                // Xử lý click vào nút thêm vào giỏ hàng
                const addToCartBtn = resultItem.querySelector('.search-add-to-cart');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Ngăn sự kiện click lan tỏa đến phần tử cha

                        // Tạo thông tin sản phẩm để thêm vào giỏ hàng
                        const productInfo = {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            unit: product.unit,
                            image: product.image,
                            unitDetail: product.unitDetail || ''
                        };

                        // Thêm sản phẩm vào giỏ hàng
                        addToCart(productInfo);
                    });
                }

                searchResults.appendChild(resultItem);
            });
        } else {
            // Không tìm thấy sản phẩm
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.innerHTML = `
                <p>Xin lỗi chúng tôi chưa có sản phẩm "${searchTerm}"</p>
                <button class="request-product-btn">Yêu cầu cung cấp sản phẩm này</button>
            `;

            const requestBtn = noResults.querySelector('.request-product-btn');
            requestBtn.addEventListener('click', () => {
                // Xử lý khi người dùng yêu cầu sản phẩm
                requestProduct(searchTerm);
            });

            searchResults.appendChild(noResults);
        }

        // Hiển thị kết quả
        searchResults.classList.add('show');

        // Thêm CSS cho nút add to cart
        const style = document.createElement('style');
        if (!document.getElementById('search-result-styles')) {
            style.id = 'search-result-styles';
            style.innerHTML = `
                .search-result-item {
                    position: relative;
                    overflow: hidden;
                }
                .search-add-to-cart {
                    position: absolute;
                    right: -50px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: hsl(var(--primary));
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: right 0.3s ease;
                    opacity: 0.9;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                .search-add-to-cart:hover {
                    opacity: 1;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                }
                .search-result-item:hover .search-add-to-cart {
                    right: 10px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Xử lý yêu cầu sản phẩm
    function requestProduct(productName) {
        Swal.fire({
            title: 'Đã gửi yêu cầu!',
            text: `Chúng tôi đã nhận được yêu cầu cung cấp sản phẩm "${productName}" của bạn. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!`,
            icon: 'success',
            confirmButtonColor: 'hsl(var(--primary))',
            confirmButtonText: 'Đã hiểu'
        });

        closeSearchResults();
        searchInput.value = '';
    }

    // Đóng kết quả tìm kiếm
    function closeSearchResults() {
        searchResults.classList.remove('show');
    }

    // Xử lý sự kiện khi người dùng nhấn enter hoặc nhấp vào nút tìm kiếm
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.target.value.trim().length > 2) {
            // Tự động tìm kiếm khi người dùng nhập ít nhất 3 ký tự
            handleSearch();
        } else if (e.target.value.trim().length === 0) {
            closeSearchResults();
        }
    });

    searchButton.addEventListener('click', handleSearch);

    // Đóng kết quả tìm kiếm khi người dùng nhấp vào bên ngoài
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
            closeSearchResults();
        }
    });

    // Banner Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideCount = sliderItems.length;

    // Khởi tạo slider
    function showSlide(index) {
        // Ẩn tất cả các slide
        sliderItems.forEach(item => {
            item.classList.remove('active');
        });

        // Xóa class active từ tất cả các dot
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Hiện slide hiện tại và kích hoạt dot hiện tại
        sliderItems[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    // Sự kiện click cho nút tiếp/trước
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slideCount - 1;
            }
            showSlide(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slideCount) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    }

    // Sự kiện click cho các dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Tự động chuyển slide
    function autoSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }

    // Bắt đầu tự động chuyển slide nếu có slide
    if (slideCount > 0) {
        // Hiện slide đầu tiên
        showSlide(0);

        // Tự động chuyển slide mỗi 5 giây
        setInterval(autoSlide, 5000);
    }

    // Giỏ hàng
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
            const cartCount = document.querySelector('.cart-count');

    let cartItems = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;

            // Hiệu ứng animation
            cartCount.classList.add('pulse');
            setTimeout(() => {
                cartCount.classList.remove('pulse');
            }, 300);
        });
    });

    // Xử lý click vào service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => {
            const serviceName = item.querySelector('.service-title').textContent;

            Swal.fire({
                title: '<span class="text-xl font-semibold">Thông báo hệ thống</span>',
                html: `
                    <div class="text-center mb-4">
                        <i class="fas fa-tools text-4xl text-blue-500 mb-3"></i>
                        <p class="text-lg mb-3">Tính năng <strong class="text-blue-600">"${serviceName}"</strong> đang được phát triển</p>
                        <p class="text-gray-600 text-sm mb-2">Chúng tôi đang nỗ lực hoàn thiện tính năng này để mang đến trải nghiệm tốt nhất cho quý khách.</p>
                        <p class="text-gray-600 text-sm">Vui lòng quay lại sau!</p>
                    </div>
                `,
                icon: 'info',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: 'hsl(var(--primary))',
                showCloseButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                customClass: {
                    container: 'font-sans',
                    popup: 'rounded-xl shadow-2xl',
                    header: 'border-b pb-2',
                    title: 'text-gray-800',
                    content: 'pt-4',
                    confirmButton: 'px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg',
                    closeButton: 'focus:outline-none hover:text-gray-600'
                }
            });
        });
    });
});

// Khởi tạo menu người dùng và xử lý đăng nhập/đăng xuất
function initializeUserMenu() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.getElementById('login-button');
    const userMenu = document.querySelector('.user-menu');

    if (isLoggedIn && loginButton && userMenu) {
        // Lấy thông tin người dùng từ localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
            // Cập nhật nút đăng nhập thành tên người dùng
            loginButton.textContent = userData.name;
            loginButton.href = '#';

            // Cập nhật thông tin trong user menu
            const userNameElement = document.querySelector('.user-name');
            const userPhoneElement = document.querySelector('.user-phone');
            const userAddressElement = document.querySelector('.user-address');

            if (userNameElement) userNameElement.textContent = userData.name;
            if (userPhoneElement) userPhoneElement.textContent = userData.phone;
            if (userAddressElement) userAddressElement.textContent = userData.address;

            // Thêm sự kiện click cho nút đăng nhập để hiển thị/ẩn menu
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                userMenu.classList.toggle('active');
            });

            // Thêm sự kiện click bên ngoài để ẩn menu
            document.addEventListener('click', (e) => {
                if (!loginButton.contains(e.target) && !userMenu.contains(e.target)) {
                    userMenu.classList.remove('active');
                }
            });

            // Xử lý đăng xuất
            const logoutButton = document.querySelector('.logout-button');
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    // Xóa thông tin đăng nhập
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userData');

                    // Hiển thị thông báo
                    Swal.fire({
                        icon: 'success',
                        title: 'Đã đăng xuất',
                        text: 'Hẹn gặp lại bạn!',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        // Reload trang
                        window.location.reload();
                    });
                });
            }
        }
    } else if (loginButton) {
        // Nếu chưa đăng nhập, cập nhật href cho nút đăng nhập
        loginButton.href = '/dangnhap/';
    }
}

// Khởi tạo slider banner
function initializeSlider() {
    const slides = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Nếu không có slides thì không cần khởi tạo
    if (!slides.length) return;

    let currentSlide = 0;
    const slideCount = slides.length;

    // Thay đổi nội dung của nút prev
    if (prevBtn) {
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    }

    // Hàm chuyển slide
    function goToSlide(n) {
        // Kiểm tra nếu không có slides
        if (!slides.length) return;

        slides.forEach(slide => slide.classList.remove('active'));
        if (dots.length) {
        dots.forEach(dot => dot.classList.remove('active'));
        }

        currentSlide = (n + slideCount) % slideCount;

        slides[currentSlide].classList.add('active');
        if (dots.length && dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
        }

        // Kiểm tra vị trí slide để điều chỉnh hiển thị nút
        if (currentSlide === 0) {
            // Ở slide đầu tiên, ẩn nút trở lại (prev) và hiện nút next
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'flex';
        } else if (currentSlide === slideCount - 1) {
            // Ở slide cuối cùng, hiện nút prev và ẩn nút next
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            // Ở các slide ở giữa, hiển thị cả hai nút
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        // Ẩn nút prev ban đầu khi ở slide đầu tiên
        prevBtn.style.display = 'none';
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    if (dots.length) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    }
}

// Khởi tạo nút xem thêm sản phẩm
function initializeViewMore() {
    const viewMoreButton = document.querySelector('.view-more-button');
    const productsGrid = document.querySelector('.products-grid');
    const hiddenProducts = document.querySelectorAll('.product-card:nth-child(n+7)');

    // Ẩn các sản phẩm ban đầu
    if (hiddenProducts.length) {
        hiddenProducts.forEach(product => {
            product.classList.add('hidden');
        });
    }

    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', () => {
            // Hiển thị tất cả các sản phẩm đã bị ẩn
            hiddenProducts.forEach(product => {
                product.classList.remove('hidden');
            });

            // Ẩn nút xem thêm
            viewMoreButton.style.display = 'none';
        });
    }
}

// Khởi tạo menu chính
function initializeMainNav() {
    const navItems = document.querySelectorAll('.main-nav li');

    // Xử lý sự kiện click vào các category
    const categoryItems = document.querySelectorAll('.category-panel-left-li, .category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Loại bỏ class active từ tất cả các item
            categoryItems.forEach(i => i.classList.remove('active'));

            // Thêm class active vào item được click
            this.classList.add('active');
        });
    });

    // Xử lý hover cho dropdown menu
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            // Khi hover vào menu item
            item.addEventListener('mouseenter', function() {
                document.body.classList.add('dropdown-active');

                // Nếu menu đang ở trạng thái sticky, điều chỉnh vị trí của dropdown
                if (document.querySelector('.main-nav').classList.contains('sticky')) {
                    dropdown.style.position = 'fixed';
                    dropdown.style.top = '44px';
                } else {
                    dropdown.style.position = 'absolute';
                    dropdown.style.top = '90%';
                }
            });

            // Khi rời khỏi menu item
            item.addEventListener('mouseleave', function() {
                document.body.classList.remove('dropdown-active');
            });
        }
    });

    // Xử lý dropdown-category khi hover và click
    const dropdownCategoryItems = document.querySelectorAll('.dropdown-category-panel-left-li');
    const productLists = document.querySelectorAll('.category-product-list');

    // Hàm xử lý khi chọn một danh mục
    function handleCategorySelection(index) {
        // Ẩn tất cả product-list
        productLists.forEach(list => {
            list.style.display = 'none';
        });

        // Loại bỏ trạng thái active cho tất cả mục
        dropdownCategoryItems.forEach(item => {
            item.classList.remove('active');
        });

        // Kích hoạt mục hiện tại và hiển thị product-list tương ứng
        dropdownCategoryItems[index].classList.add('active');
        if (productLists[index]) {
            productLists[index].style.display = 'flex';
        }
    }

    // Thiết lập sự kiện hover cho các mục danh mục
    dropdownCategoryItems.forEach((item, index) => {
        // Sự kiện hover
        item.addEventListener('mouseenter', () => {
            handleCategorySelection(index);
        });

        // Sự kiện click
        item.addEventListener('click', () => {
            handleCategorySelection(index);
        });
    });

    // Hiển thị product-list đầu tiên khi trang được tải
    if (dropdownCategoryItems.length > 0 && productLists.length > 0) {
        handleCategorySelection(0);
    }
}

// Xử lý khi scroll trang
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.main-nav');
    const activeDropdowns = document.querySelectorAll('.dropdown-menu[style*="display: block"]');

    if (window.scrollY > 100) {
        navbar.classList.add('sticky');

        // Cập nhật tất cả dropdown đang hiển thị
        activeDropdowns.forEach(dropdown => {
            dropdown.style.position = 'fixed';
            dropdown.style.top = '44px';
        });
    } else {
        navbar.classList.remove('sticky');

        // Cập nhật tất cả dropdown đang hiển thị
        activeDropdowns.forEach(dropdown => {
            dropdown.style.position = 'absolute';
            dropdown.style.top = '100%';
        });
    }
});

// Khởi tạo khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    initializeMainNav();

    // Khởi tạo slider Sản phẩm nổi bật hôm nay
    const prevBtn = document.getElementById('daily-prev-btn');
    const nextBtn = document.getElementById('daily-next-btn');

    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'flex';
});

// Hàm xử lý chuyển đổi slide trong phần Sản phẩm nổi bật hôm nay
let currentDailySlide = 0;
function switchDailySlide() {
    const slides = document.querySelectorAll('.daily-slide');
    // Nếu không có slides thì không cần chuyển
    if (!slides.length) return;
    // Chuyển đến slide tiếp theo theo vòng tròn
    showDailySlide((currentDailySlide + 1) % slides.length);
}

// Hàm xử lý hiển thị slide cụ thể
function showDailySlide(index) {
    const slides = document.querySelectorAll('.daily-slide');
    const dots = document.querySelectorAll('.daily-dot');
    const prevBtn = document.getElementById('daily-prev-btn');
    const nextBtn = document.getElementById('daily-next-btn');

    // Nếu không có slides hoặc index không hợp lệ thì return
    if (!slides.length || index < 0 || index >= slides.length) return;

    // Xác định hướng chuyển slide (trước hay sau)
    const direction = index > currentDailySlide ? 'next' : 'prev';
    const currentIndex = currentDailySlide;

    // Cập nhật currentDailySlide trước khi áp dụng hiệu ứng
    currentDailySlide = index;

    // Xóa các class trạng thái
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev-slide', 'next-slide');
    });

    // Thiết lập vị trí ban đầu của slide mới
    if (direction === 'next') {
        slides[currentIndex].classList.add('prev-slide');
        slides[index].classList.add('next-slide');
    } else {
        slides[currentIndex].classList.add('next-slide');
        slides[index].classList.add('prev-slide');
    }

    // Đảm bảo trình duyệt nhận diện sự thay đổi trước khi áp dụng transition
    setTimeout(() => {
        // Kích hoạt slide hiện tại
        slides[index].classList.remove('prev-slide', 'next-slide');
        slides[index].classList.add('active');

        // Cập nhật dots nếu có
        if (dots.length) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        // Hiển thị/ẩn nút điều hướng dựa vào slide hiện tại
        if (prevBtn && nextBtn) {
            if (index === 0) {
                // Ở slide đầu tiên, ẩn nút prev và hiện nút next
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'flex';
            } else if (index === slides.length - 1) {
                // Ở slide cuối cùng, hiện nút prev và ẩn nút next
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'none';
            } else {
                // Ở các slide ở giữa, hiển thị cả hai nút
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
        }
    }, 50);
}

// Hàm khởi tạo giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
function initializeCart() {
    if (!localStorage.getItem('pharmacareCart')) {
        localStorage.setItem('pharmacareCart', JSON.stringify({
            items: [],
            totalPrice: 0,
            totalItems: 0
        }));
    }
    updateCartIcon();
}

// Hàm cập nhật biểu tượng giỏ hàng (số lượng sản phẩm)
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('pharmacareCart'));
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement && cart) {
        cartCountElement.textContent = cart.totalItems;
        cartCountElement.style.display = cart.totalItems > 0 ? 'block' : 'none';
    }
}

// Hiển thị thông báo khi thêm sản phẩm vào giỏ hàng
function showAddToCartNotification(productName) {
    Swal.fire({
        title: 'Đã thêm vào giỏ hàng',
        text: `Sản phẩm "${productName}" đã được thêm vào giỏ hàng`,
        icon: 'success',
        confirmButtonColor: 'hsl(var(--primary))',
        confirmButtonText: 'Xem giỏ hàng',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInRight'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutRight'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = './giohang/';
        }
    });
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productInfo) {
    let cart = JSON.parse(localStorage.getItem('pharmacareCart'));

    // Tìm sản phẩm cùng tên trong giỏ hàng
    const existingItemIndex = cart.items.findIndex(item => item.name === productInfo.name);

    if (existingItemIndex > -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        const newQuantity = cart.items[existingItemIndex].quantity + 1;
        if (newQuantity <= 99) {
            cart.items[existingItemIndex].quantity = newQuantity;
        }
    } else {
        // Thêm sản phẩm mới vào giỏ hàng
        cart.items.push({
            ...productInfo,
            quantity: 1
        });
    }

    // Cập nhật tổng số lượng và tổng giá
    updateCartTotals(cart);

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('pharmacareCart', JSON.stringify(cart));

    // Cập nhật biểu tượng giỏ hàng
    updateCartIcon();

    // Hiển thị thông báo thành công
    showAddToCartNotification(productInfo.name);
}

// Cập nhật tổng số lượng và tổng giá trong giỏ hàng
function updateCartTotals(cart) {
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Khởi tạo các sự kiện cho nút "Chọn mua"
function initializeBuyButtons() {
    // Xử lý các nút mua trong phần sản phẩm nổi bật hôm nay
    const dailyBuyButtons = document.querySelectorAll('.daily-buy-button');
    dailyBuyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.daily-product-card');

            // Lấy giá từ data-price nếu có
            let price = this.getAttribute('data-price');
            let unit = this.getAttribute('data-unit');

            // Nếu không có data-price, lấy từ text hiển thị
            if (!price) {
                price = parsePrice(productCard.querySelector('.daily-current-price').textContent);
            } else {
                price = parseInt(price);
            }

            // Nếu không có data-unit, lấy từ text hiển thị
            if (!unit) {
                unit = productCard.querySelector('.daily-unit-text').textContent;
            }

            const productInfo = {
                id: 'product_' + Math.random().toString(36).substr(2, 9),
                name: productCard.querySelector('.daily-product-title').textContent,
                price: price,
                unit: unit,
                image: productCard.querySelector('.daily-product-image img').src,
                unitDetail: productCard.querySelector('.daily-product-unit') ? productCard.querySelector('.daily-product-unit').textContent : ''
            };

            addToCart(productInfo);
        });
    });

    // Xử lý các nút mua ở các phần khác của trang
    const otherBuyButtons = document.querySelectorAll('.product-buy-button, .popular-product-btn, .buy-button');
    otherBuyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card, .popular-product-item, .product-item');
            if (!productCard) return;

            const productTitle = productCard.querySelector('.product-title, .popular-product-title, .product-name');
            const productPrice = productCard.querySelector('.product-price, .popular-product-price, .price-current');
            const productImage = productCard.querySelector('img');

            if (!productTitle || !productPrice || !productImage) return;

            const productInfo = {
                id: 'product_' + Math.random().toString(36).substr(2, 9),
                name: productTitle.textContent,
                price: parsePrice(productPrice.textContent),
                unit: 'Hộp', // Mặc định
                image: productImage.src,
                unitDetail: ''
            };

            addToCart(productInfo);
        });
    });
}

// Hàm chuyển đổi chuỗi giá tiền thành số
function parsePrice(priceString) {
    return parseInt(priceString.replace(/\D/g, ''));
}

// Cập nhật thông tin người dùng trong header
function updateUserInfo() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.getElementById('login-button');
    const loginRegister = document.querySelector('.login-register');

    if (loginButton) {
        if (isLoggedIn) {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            loginButton.innerHTML = `<img src="./images/user.svg" alt="User"> ${userData.name || 'Tài khoản'}`;
            loginButton.href = '#'; // Đổi thành link đến trang tài khoản
            // Hiển thị menu người dùng
            if (loginRegister) {
                loginRegister.classList.add('logged-in');
            }
        } else {
            loginButton.innerHTML = `<i class="fa-solid fa-user"></i> Đăng nhập`;
            loginButton.href = '/dangnhap/';
            // Ẩn menu người dùng
            if (loginRegister) {
                loginRegister.classList.remove('logged-in');
            }
        }
    }
}

// Thiết lập trạng thái đăng nhập mặc định
function setupAuthStatus() {
    // Cập nhật hiển thị thông tin người dùng
    updateUserInfo();

    // Xử lý đăng xuất
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Xóa thông tin đăng nhập
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');

            // Hiển thị thông báo
            Swal.fire({
                icon: 'success',
                title: 'Đã đăng xuất',
                text: 'Hẹn gặp lại bạn!',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Reload trang
                window.location.reload();
            });
        });
    }
}

// Thêm vào phần khởi tạo khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Thiết lập trạng thái đăng nhập mặc định
    setupAuthStatus();

    initializeMainNav();

    // Khởi tạo slider Sản phẩm nổi bật hôm nay
    const prevBtn = document.getElementById('daily-prev-btn');
    const nextBtn = document.getElementById('daily-next-btn');
    if (prevBtn) prevBtn.style.display = 'none'; // Ẩn nút prev ban đầu
    if (nextBtn) nextBtn.style.display = 'flex'; // Hiện nút next ban đầu

    // Khởi tạo giỏ hàng và các nút mua hàng
    initializeCart();
    initializeBuyButtons();
});

// Khởi tạo chức năng chọn đơn vị tính
function initializeUnitSelection() {
    const unitButtons = document.querySelectorAll('.daily-product-btn-option');

    unitButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Tìm container cha của button
            const productCard = this.closest('.daily-product-card');
            if (!productCard) return;

            // Lấy thông tin từ data attributes
            const unit = this.getAttribute('data-unit');
            const price = this.getAttribute('data-price');
            const unitInfo = this.getAttribute('data-info');

            if (!unit || !price) return;

            // Xóa active từ tất cả buttons
            const siblingButtons = productCard.querySelectorAll('.daily-product-btn-option');
            siblingButtons.forEach(btn => btn.classList.remove('active'));

            // Thêm active cho button hiện tại
            this.classList.add('active');

            // Cập nhật giá và đơn vị
            const priceDisplay = productCard.querySelector('.daily-current-price');
            const unitTextDisplay = productCard.querySelector('.daily-unit-text');
            const unitInfoDisplay = productCard.querySelector('.daily-product-unit');

            if (priceDisplay) {
                // Định dạng giá tiền
                const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
                priceDisplay.textContent = `${formattedPrice}đ`;
            }

            if (unitTextDisplay) {
                unitTextDisplay.textContent = unit;
            }

            if (unitInfoDisplay && unitInfo) {
                unitInfoDisplay.textContent = unitInfo;
            }

            // Cập nhật data attribute cho nút Chọn mua
            const buyButton = productCard.querySelector('.daily-buy-button');
            if (buyButton) {
                buyButton.setAttribute('data-unit', unit);
                buyButton.setAttribute('data-price', price);
            }
        });
    });
}

// Khởi tạo Bootstrap Carousel
function initializeBootstrapCarousel() {
    // Bootstrap 5 Carousel tự động hoạt động với data-bs-ride="carousel"
    // Nhưng chúng ta có thể thêm một số tùy chỉnh
    const bannerCarousel = document.getElementById('bannerCarousel');

    if (bannerCarousel) {
        // Tạo instance của carousel từ Bootstrap
        const carousel = new bootstrap.Carousel(bannerCarousel, {
            interval: 3000,    // Thời gian chuyển đổi giữa các slide (3 giây)
            wrap: true,        // Cho phép quay vòng
            keyboard: true,    // Cho phép điều khiển bằng bàn phím
            pause: 'hover',    // Dừng khi hover
            touch: true        // Cho phép vuốt trên thiết bị cảm ứng
        });

        // Sự kiện khi slide bắt đầu chuyển đổi
        bannerCarousel.addEventListener('slide.bs.carousel', function () {
            // Thêm hiệu ứng mờ khi chuyển slide
            const activeItem = bannerCarousel.querySelector('.carousel-item.active');
            if (activeItem) {
                activeItem.style.opacity = '0.7';
            }
        });

        // Sự kiện khi slide chuyển đổi thành công
        bannerCarousel.addEventListener('slid.bs.carousel', function () {
            // Hiệu ứng hiển thị slide mới
            const activeItem = bannerCarousel.querySelector('.carousel-item.active');
            if (activeItem) {
                activeItem.style.opacity = '1';
            }
        });

        // Thêm hiệu ứng pulsate cho indicators khi active
        const indicators = bannerCarousel.querySelectorAll('.carousel-indicators button');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                this.classList.add('pulsate');
                setTimeout(() => {
                    this.classList.remove('pulsate');
                }, 500);
            });
        });
    }
}