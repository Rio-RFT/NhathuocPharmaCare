// Hàm để định dạng giá tiền sang VNĐ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

// Hàm để chuyển đổi chuỗi giá tiền thành số
function parsePrice(priceString) {
    return parseInt(priceString.replace(/\D/g, ''));
}

// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    // Kiểm tra thông tin đăng nhập từ localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Nếu chưa đăng nhập, hiển thị popup xác nhận
    if (!isLoggedIn) {
        // Lưu URL hiện tại để sau khi đăng nhập có thể quay lại
        localStorage.setItem('redirectAfterLogin', window.location.href);

        // Hiển thị popup xác nhận
        Swal.fire({
            title: 'Bạn chưa đăng nhập',
            html: `
                <div class="text-center">
                    <p class="mb-3">Bạn cần đăng nhập để xem giỏ hàng của mình.</p>
                    <p class="text-sm text-gray-600">Bạn muốn đăng nhập ngay bây giờ hoặc tiếp tục xem sản phẩm?</p>
                </div>
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Đăng nhập ngay',
            cancelButtonText: 'Xem sản phẩm',
            confirmButtonColor: 'hsl(var(--primary))',
            cancelButtonColor: '#6c757d',
            reverseButtons: true,
            allowOutsideClick: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Nếu user chọn đăng nhập, chuyển đến trang đăng nhập
                window.location.href = '../dangnhap/';
            } else {
                // Nếu user chọn xem sản phẩm, chuyển về trang chủ
                window.location.href = '../';
            }
        });

        return false;
    }

    // Hiển thị thông tin người dùng nếu đã đăng nhập
    updateUserInfo();

    return true;
}

// Cập nhật thông tin người dùng trong header
function updateUserInfo() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.getElementById('login-button');
    const loginRegister = document.querySelector('.login-register');

    if (loginButton) {
        if (isLoggedIn) {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            loginButton.innerHTML = `<img src="../images/user.svg" alt="User"> ${userData.name || 'Tài khoản'}`;
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

// Hàm khởi tạo trang giỏ hàng
function initializeCartPage() {
    // Kiểm tra trạng thái đăng nhập trước
    if (!checkLoginStatus()) {
        return; // Dừng việc khởi tạo nếu chưa đăng nhập
    }

    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('pharmacareCart')) || {
        items: [],
        totalPrice: 0,
        totalItems: 0,
        discount: 0,
        couponCode: ''
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount(cart.totalItems);

    // Hiển thị sản phẩm trong giỏ hàng
    renderCart(cart);

    // Thiết lập sự kiện cho nút thanh toán
    setupCheckoutButton();

    // Thiết lập sự kiện cho form mã giảm giá
    setupCouponForm();
}

// Cập nhật số lượng sản phẩm hiển thị
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    const cartCountDisplayElement = document.getElementById('cart-count-display');

    if (cartCountElement) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'block' : 'none';
    }

    if (cartCountDisplayElement) {
        cartCountDisplayElement.textContent = count;
    }
}

// Hiển thị sản phẩm trong giỏ hàng
function renderCart(cart) {
    const cartEmptyElement = document.getElementById('cart-empty');
    const cartItemsElement = document.getElementById('cart-items');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const totalElement = document.getElementById('total');

    // Nếu giỏ hàng trống, hiển thị thông báo
    if (cart.items.length === 0) {
        cartEmptyElement.style.display = 'block';
        cartItemsElement.style.display = 'none';

        subtotalElement.textContent = '0đ';
        shippingFeeElement.textContent = '0đ';
        totalElement.textContent = '0đ';

        return;
    }

    // Nếu giỏ hàng có sản phẩm, ẩn thông báo và hiển thị danh sách
    cartEmptyElement.style.display = 'none';
    cartItemsElement.style.display = 'block';

    // Xóa nội dung cũ
    cartItemsContainer.innerHTML = '';

    // Tính toán phí vận chuyển (miễn phí vận chuyển cho đơn hàng trên 300.000đ)
    const shippingFee = cart.totalPrice >= 300000 ? 0 : 30000;

    // Lấy giảm giá từ coupon (nếu có)
    const discount = cart.discount || 0;

    // Tính tổng tiền sau khi trừ giảm giá
    const total = cart.totalPrice + shippingFee - discount;

    // Hiển thị tổng tiền
    subtotalElement.textContent = formatCurrency(cart.totalPrice);
    shippingFeeElement.textContent = formatCurrency(shippingFee);

    // Thêm dòng hiển thị giảm giá nếu có
    const cartSummary = document.querySelector('.cart-summary');
    let discountRow = document.querySelector('.discount-row');

    if (discount > 0) {
        if (!discountRow) {
            discountRow = document.createElement('div');
            discountRow.className = 'cart-summary-row discount-row';
            discountRow.innerHTML = `
                <span>Giảm giá (${cart.couponCode})</span>
                <span id="discount">-${formatCurrency(discount)}</span>
            `;

            // Chèn trước dòng tổng cộng
            const totalRow = document.querySelector('.cart-summary-total');
            cartSummary.insertBefore(discountRow, totalRow);
        } else {
            discountRow.innerHTML = `
                <span>Giảm giá (${cart.couponCode})</span>
                <span id="discount">-${formatCurrency(discount)}</span>
            `;
        }
    } else if (discountRow) {
        cartSummary.removeChild(discountRow);
    }

    totalElement.textContent = formatCurrency(total);

    // Tạo HTML cho từng sản phẩm
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id = item.id;

        const subtotal = item.price * item.quantity;

        itemElement.innerHTML = `
            <div class="cart-item-product">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-unit">${item.unitDetail || item.unit}</div>
                </div>
            </div>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
            <div class="cart-item-quantity">
                <div class="quantity-control">
                    <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" data-id="${item.id}" min="1" max="99">
                    <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="cart-item-subtotal">${formatCurrency(subtotal)}</div>
            <div class="cart-item-remove">
                <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    // Thiết lập sự kiện cho nút tăng, giảm số lượng và xóa sản phẩm
    setupCartItemEvents();
}

// Thiết lập sự kiện cho các nút trong giỏ hàng
function setupCartItemEvents() {
    // Nút tăng số lượng
    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.id;
            updateItemQuantity(itemId, 1);
        });
    });

    // Nút giảm số lượng
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.id;
            updateItemQuantity(itemId, -1);
        });
    });

    // Input số lượng
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const itemId = this.dataset.id;
            const newQuantity = parseInt(this.value);

            if (isNaN(newQuantity) || newQuantity < 1) {
                this.value = 1;
                updateItemQuantityAbsolute(itemId, 1);
            } else if (newQuantity > 99) {
                this.value = 99;
                updateItemQuantityAbsolute(itemId, 99);
            } else {
                updateItemQuantityAbsolute(itemId, newQuantity);
            }
        });
    });

    // Nút xóa sản phẩm
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.id;
            removeCartItem(itemId);
        });
    });
}

// Cập nhật số lượng sản phẩm (tương đối)
function updateItemQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('pharmacareCart'));
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) return;

    const currentItem = cart.items[itemIndex];
    const newQuantity = currentItem.quantity + change;

    // Kiểm tra xem có sản phẩm cùng tên không
    const sameNameItems = cart.items.filter((item, index) =>
        item.name === currentItem.name && index !== itemIndex
    );

    if (sameNameItems.length > 0) {
        // Nếu có sản phẩm cùng tên, gộp số lượng
        const totalQuantity = sameNameItems.reduce((sum, item) => sum + item.quantity, 0) + newQuantity;

        // Xóa các sản phẩm cùng tên
        cart.items = cart.items.filter((item, index) =>
            item.name !== currentItem.name || index === itemIndex
        );

        // Cập nhật số lượng cho sản phẩm gốc
        if (totalQuantity < 1) {
            cart.items[itemIndex].quantity = 1;
        } else if (totalQuantity > 99) {
            cart.items[itemIndex].quantity = 99;
        } else {
            cart.items[itemIndex].quantity = totalQuantity;
        }

        // Hiển thị thông báo gộp sản phẩm
        showMessage('Đã gộp các sản phẩm cùng tên', 'success');
    } else {
        // Nếu không có sản phẩm cùng tên, cập nhật số lượng bình thường
        if (newQuantity < 1) {
            cart.items[itemIndex].quantity = 1;
        } else if (newQuantity > 99) {
            cart.items[itemIndex].quantity = 99;
        } else {
            cart.items[itemIndex].quantity = newQuantity;
        }
    }

    // Cập nhật tổng tiền và số lượng
    updateCartTotals(cart);

    // Lưu vào localStorage
    localStorage.setItem('pharmacareCart', JSON.stringify(cart));

    // Hiển thị lại giỏ hàng
    renderCart(cart);
}

// Cập nhật số lượng sản phẩm (tuyệt đối)
function updateItemQuantityAbsolute(itemId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('pharmacareCart'));
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) return;

    const currentItem = cart.items[itemIndex];

    // Kiểm tra xem có sản phẩm cùng tên không
    const sameNameItems = cart.items.filter((item, index) =>
        item.name === currentItem.name && index !== itemIndex
    );

    if (sameNameItems.length > 0) {
        // Nếu có sản phẩm cùng tên, gộp số lượng
        const totalQuantity = sameNameItems.reduce((sum, item) => sum + item.quantity, 0) + newQuantity;

        // Xóa các sản phẩm cùng tên
        cart.items = cart.items.filter((item, index) =>
            item.name !== currentItem.name || index === itemIndex
        );

        // Cập nhật số lượng cho sản phẩm gốc
        if (totalQuantity < 1) {
            cart.items[itemIndex].quantity = 1;
        } else if (totalQuantity > 99) {
            cart.items[itemIndex].quantity = 99;
        } else {
            cart.items[itemIndex].quantity = totalQuantity;
        }

        // Hiển thị thông báo gộp sản phẩm
        showMessage('Đã gộp các sản phẩm cùng tên', 'success');
    } else {
        // Nếu không có sản phẩm cùng tên, cập nhật số lượng bình thường
        if (newQuantity < 1) {
            cart.items[itemIndex].quantity = 1;
        } else if (newQuantity > 99) {
            cart.items[itemIndex].quantity = 99;
        } else {
            cart.items[itemIndex].quantity = newQuantity;
        }
    }

    // Cập nhật tổng tiền và số lượng
    updateCartTotals(cart);

    // Lưu vào localStorage
    localStorage.setItem('pharmacareCart', JSON.stringify(cart));

    // Hiển thị lại giỏ hàng
    renderCart(cart);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('pharmacareCart'));
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) return;

    // Lấy tên sản phẩm để hiển thị thông báo
    const productName = cart.items[itemIndex].name;

    // Xóa sản phẩm khỏi mảng
    cart.items.splice(itemIndex, 1);

    // Cập nhật tổng tiền và số lượng
    updateCartTotals(cart);

    // Lưu vào localStorage
    localStorage.setItem('pharmacareCart', JSON.stringify(cart));

    // Hiển thị lại giỏ hàng
    renderCart(cart);

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount(cart.totalItems);

    // Hiển thị thông báo
    showRemoveNotification(productName);
}

// Cập nhật tổng tiền và số lượng sản phẩm
function updateCartTotals(cart) {
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Nếu có mã giảm giá, tính lại số tiền giảm giá dựa trên tổng tiền mới
    if (cart.couponCode) {
        // Tìm mã giảm giá trong danh sách coupon
        const validCoupon = coupon.find(c => c.code === cart.couponCode && c.isActive);
        if (validCoupon) {
            const discountPercent = validCoupon.discount;
            cart.discount = Math.round(cart.totalPrice * (discountPercent / 100));
        }
    }
}

// Hiển thị thông báo khi xóa sản phẩm
function showRemoveNotification(productName) {
    Swal.fire({
        icon: 'success',
        title: 'Đã xóa sản phẩm',
        text: `Đã xóa "${productName}" khỏi giỏ hàng`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

// Thiết lập sự kiện cho nút thanh toán
function setupCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-btn');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('pharmacareCart'));

            if (!cart || cart.items.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Giỏ hàng trống',
                    text: 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.',
                    confirmButtonColor: 'hsl(var(--primary))',
                    confirmButtonText: 'Đã hiểu'
                });
                return;
            }

            // Chuyển hướng đến trang thanh toán
            window.location.href = '../thanhtoan/';
        });
    }
}

// Thiết lập sự kiện cho form mã giảm giá
function setupCouponForm() {
    const couponForm = document.querySelector('.coupon-form');
    const couponInput = document.querySelector('.coupon-form input');
    const couponButton = document.querySelector('.coupon-form button');

    if (couponForm && couponInput && couponButton) {
        // Kiểm tra xem đã có mã giảm giá trong giỏ hàng chưa
        const cartData = JSON.parse(localStorage.getItem('pharmacareCart')) || {};
        if (cartData.couponCode) {
            couponInput.value = cartData.couponCode;
            couponInput.disabled = true;
            couponButton.textContent = 'Hủy mã';
        }

        // Xử lý submit form
        couponForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCouponSubmit();
        });

        // Xử lý click button
        couponButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleCouponSubmit();
        });

        // Xử lý nhấn Enter trong input
        couponInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleCouponSubmit();
            }
        });
    }

    // Hàm xử lý submit mã giảm giá
    function handleCouponSubmit() {
        // Đọc lại dữ liệu cart từ localStorage
        const cart = JSON.parse(localStorage.getItem('pharmacareCart')) || {};
        const couponCode = couponInput.value.trim().toUpperCase();

        // Nếu đang có mã giảm giá và nhấn nút Hủy
        if (cart.couponCode && couponButton.textContent === 'Hủy mã') {
            removeCoupon();
            return;
        }

        // Nếu không nhập mã
        if (!couponCode) {
            showMessage('Vui lòng nhập mã giảm giá', 'error');
            return;
        }

        applyCoupon(couponCode);
    }
}

// Áp dụng mã giảm giá
function applyCoupon(code) {
    let cart = JSON.parse(localStorage.getItem('pharmacareCart'));

    // Kiểm tra xem đã có mã giảm giá chưa
    if (cart.couponCode) {
        showMessage('Bạn đã áp dụng mã giảm giá rồi', 'error');
        return;
    }

    // Kiểm tra mã giảm giá có hợp lệ không
    const validCoupon = coupon.find(c => c.code === code && c.isActive);

    if (!validCoupon) {
        showMessage('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error');
        return;
    }

    // Áp dụng giảm giá
    const discountPercent = validCoupon.discount;
    const discountAmount = Math.round(cart.totalPrice * (discountPercent / 100));

    cart.discount = discountAmount;
    cart.couponCode = code;

    // Lưu vào localStorage
    localStorage.setItem('pharmacareCart', JSON.stringify(cart));

    // Hiển thị thông báo thành công
    Swal.fire({
        icon: 'success',
        title: 'Áp dụng mã giảm giá thành công',
        text: `Đã áp dụng mã "${code}" - Giảm ${discountPercent}% cho đơn hàng`,
        confirmButtonColor: 'hsl(var(--primary))',
        confirmButtonText: 'Tuyệt vời'
    });

    // Cập nhật UI
    const couponInput = document.querySelector('.coupon-form input');
    const couponButton = document.querySelector('.coupon-form button');

    if (couponInput && couponButton) {
        couponInput.disabled = true;
        couponButton.textContent = 'Hủy mã';
    }

    // Cập nhật lại giỏ hàng trên giao diện
    renderCart(cart);
}

// Hủy mã giảm giá
function removeCoupon() {
    Swal.fire({
        title: 'Xác nhận hủy mã',
        text: 'Bạn có chắc chắn muốn hủy mã giảm giá này?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'hsl(var(--primary))',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
        if (result.isConfirmed) {
            let cart = JSON.parse(localStorage.getItem('pharmacareCart'));

            // Xóa thông tin giảm giá
            cart.discount = 0;
            cart.couponCode = '';

            // Lưu vào localStorage
            localStorage.setItem('pharmacareCart', JSON.stringify(cart));

            // Hiển thị thông báo
            Swal.fire({
                icon: 'success',
                title: 'Đã hủy mã giảm giá',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

            // Cập nhật UI
            const couponInput = document.querySelector('.coupon-form input');
            const couponButton = document.querySelector('.coupon-form button');

            if (couponInput && couponButton) {
                couponInput.disabled = false;
                couponInput.value = '';
                couponButton.textContent = 'Áp dụng';
            }

            // Cập nhật lại giỏ hàng trên giao diện
            renderCart(cart);
        }
    });
}

// Hiển thị thông báo
function showMessage(message, type = 'success') {
    Swal.fire({
        icon: type,
        title: type === 'success' ? 'Thành công' : 'Lỗi',
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

// Khởi tạo trang khi tài liệu được tải
document.addEventListener('DOMContentLoaded', function() {
    initializeCartPage();
});