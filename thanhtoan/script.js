const accounts = [
    {
        method: 'bank-transfer',
        name: 'NGUYEN QUOC LAM',
        bank: 'VPBANK',
        PID: '970432',
        number: '327442888'
    },
    {
        method: 'momo',
        name: 'NGUYEN QUOC LAM',
        number: '0328575437'
    },
    {
        method: 'zalopay',
        name: 'NGUYEN QUOC LAM',
        bank: 'ZALOPAY',
        PID: '970416',
        number: '0328575437'
    },
];

document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo trang thanh toán
    initCheckout();
    // Khởi tạo địa chỉ
    initializeAddress();
    // Khởi tạo sticky sidebar
    initStickySidebar();
    // Khởi tạo mobile interactions
    initMobileInteractions();
});

// Khởi tạo trang thanh toán
function initCheckout() {
    // Cập nhật thông tin người dùng
    updateUserInfo();

    // Lấy thông tin giỏ hàng
    loadCartItems();

    // Tải địa chỉ đã lưu (nếu có)
    loadSavedAddress();

    // Thiết lập các sự kiện
    setupEventListeners();

    // Khởi tạo sticky sidebar
    initStickySidebar();
}

// Cập nhật thông tin người dùng trên header
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
// Thiết lập các sự kiện
function setupEventListeners() {
    // Form submission
    document.querySelector('.place-order-btn').addEventListener('click', handleFormSubmit);

    // Quay lại giỏ hàng
    document.querySelector('.back-to-cart-btn').addEventListener('click', backToCart);

    // Xử lý sự kiện phương thức vận chuyển
    setupShippingMethods();

    // Xử lý sự kiện phương thức thanh toán
    setupPaymentMethods();

    // Xử lý sự kiện validate input
    setupInputValidation();

    // Thêm sự kiện cuộn trang để xử lý sticky sidebar
    window.addEventListener('scroll', handleStickyScroll);
    window.addEventListener('resize', handleStickyScroll);
}

// Tải thông tin giỏ hàng
function loadCartItems() {
    const cartData = JSON.parse(localStorage.getItem('pharmacareCart') || '{}');
    const cart = cartData.items || [];

    if (cart.length === 0) {
        // Redirect về giỏ hàng nếu không có sản phẩm
        window.location.href = '../giohang/';
        return;
    }

    // Render sản phẩm trong đơn hàng
    renderOrderItems(cart);

    // Tính toán và hiển thị tổng đơn hàng
    calculateTotals(cartData);
}

// Tải địa chỉ đã lưu
function loadSavedAddress() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (isLoggedIn && userData) {
        // Điền sẵn thông tin người dùng vào form
        if (userData.name) {
            document.getElementById('fullName').value = userData.name;
        }
        if (userData.phone) {
            document.getElementById('phone').value = userData.phone;
        }
        if (userData.email) {
            document.getElementById('email').value = userData.email;
        }
        if (userData.address) {
            document.getElementById('address').value = userData.address;
        }
        // Thêm các trường địa chỉ khác nếu có
    }
}

// Hiển thị danh sách sản phẩm trong đơn hàng
function renderOrderItems(cart) {
    const orderItemsContainer = document.querySelector('.order-items');
    orderItemsContainer.innerHTML = '';

    // Giới hạn số sản phẩm hiển thị ban đầu
    const maxVisibleItems = 3;
    const showAll = cart.length <= maxVisibleItems;
    const displayCount = showAll ? cart.length : maxVisibleItems;

    // Tạo và thêm các mục sản phẩm
    for (let i = 0; i < displayCount; i++) {
        const item = cart[i];
        addOrderItemElement(orderItemsContainer, item);
    }

    // Nếu có nhiều hơn 3 sản phẩm, thêm nút "Xem thêm" và phần còn lại
    if (!showAll) {
        // Tạo nút Xem thêm
        const showMoreBtn = document.createElement('div');
        showMoreBtn.className = 'order-show-more';
        showMoreBtn.innerHTML = `<button type="button">Xem thêm ${cart.length - maxVisibleItems} sản phẩm</button>`;
        orderItemsContainer.appendChild(showMoreBtn);

        // Tạo container cho các sản phẩm ẩn
        const hiddenItemsContainer = document.createElement('div');
        hiddenItemsContainer.className = 'order-hidden-items';
        hiddenItemsContainer.style.display = 'none';
        orderItemsContainer.appendChild(hiddenItemsContainer);

        // Thêm các sản phẩm còn lại vào container ẩn
        for (let i = maxVisibleItems; i < cart.length; i++) {
            const item = cart[i];
            addOrderItemElement(hiddenItemsContainer, item);
        }

        // Xử lý sự kiện khi click vào nút Xem thêm
        showMoreBtn.addEventListener('click', function() {
            if (hiddenItemsContainer.style.display === 'none') {
                hiddenItemsContainer.style.display = 'block';
                showMoreBtn.querySelector('button').textContent = 'Thu gọn';
            } else {
                hiddenItemsContainer.style.display = 'none';
                showMoreBtn.querySelector('button').textContent = `Xem thêm ${cart.length - maxVisibleItems} sản phẩm`;
            }
        });
    }
}

// Hàm phụ trợ để tạo một phần tử sản phẩm
function addOrderItemElement(container, item) {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
        <div class="order-item-image">
            <img src="${item.image}" alt="${item.name}">
            <div class="order-item-quantity">${item.quantity}</div>
        </div>
        <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">${formatCurrency(item.price * item.quantity)}</div>
        </div>
    `;
    container.appendChild(orderItem);
}

// Thiết lập xác thực input
function setupInputValidation() {
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateInput(this);
        });

        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });
}

// Xác thực input
function validateInput(input) {
    if (!input.value.trim()) {
        input.classList.add('error');
        return false;
    }

    // Kiểm tra email
    if (input.type === 'email' && !isValidEmail(input.value)) {
        input.classList.add('error');
        return false;
    }

    // Kiểm tra số điện thoại
    if (input.id === 'phone' && !isValidPhone(input.value)) {
        input.classList.add('error');
        return false;
    }

    input.classList.remove('error');
    return true;
}

// Tính toán tổng đơn hàng
function calculateTotals(cartData) {
    // Tính tổng tiền hàng
    const subtotal = cartData.totalPrice || 0;

    // Lấy thông tin giảm giá (nếu có)
    const discount = cartData.discount || 0;

    // Phí vận chuyển mặc định
    let shippingFee = 30000; // 30,000đ

    // Lấy phương thức vận chuyển được chọn (nếu có)
    const selectedShippingMethod = document.querySelector('input[name="shipping-method"]:checked');
    if (selectedShippingMethod) {
        if (selectedShippingMethod.value === 'express') {
            shippingFee = 60000;
        } else if (selectedShippingMethod.value === 'same-day') {
            shippingFee = 100000;
        }
    }

    // Miễn phí vận chuyển nếu tổng đơn hàng > 500,000đ
    if (subtotal > 500000) {
        shippingFee = 0;
    }

    // Tính tổng đơn hàng
    const total = parseFloat(subtotal) - parseFloat(discount) + parseFloat(shippingFee);

    // Lưu thông tin để tính toán sau
    const orderData = {
        subtotal,
        discount,
        discountAmount: discount,
        shippingFee,
        total
    };
    sessionStorage.setItem('orderData', JSON.stringify(orderData));

    // Hiển thị thông tin
    document.getElementById('subtotal-value').textContent = formatCurrency(subtotal);

    // Hiển thị giảm giá nếu có
    const discountRow = document.getElementById('discount-row');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discount-value').textContent = `-${formatCurrency(discount)}`;
    } else {
        discountRow.style.display = 'none';
    }

    // Hiển thị phí vận chuyển
    document.getElementById('shipping-value').textContent = shippingFee > 0 ? formatCurrency(shippingFee) : 'Miễn phí';

    // Hiển thị tổng đơn hàng
    document.getElementById('total-value').textContent = formatCurrency(total);

    // Hiển thị thông tin miễn phí vận chuyển
    updateShippingInfo(subtotal);
}

// Kiểm tra email hợp lệ
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Kiểm tra số điện thoại hợp lệ
function isValidPhone(phone) {
    const re = /^(0|\+84)(\d{9,10})$/;
    return re.test(phone);
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(amount).replace('₫', 'đ');
}

// Xử lý đặt hàng
function handleFormSubmit(e) {
    if (e) e.preventDefault();

    // Xác thực form
    if (!validateForm()) {
        return;
    }

    // Thu thập dữ liệu đơn hàng
    const orderData = collectOrderData();

    // Lưu đơn hàng
    saveOrder(orderData);

    // Hiển thị thông báo thành công
    showOrderSuccessNotification(orderData);
}

// Xác thực form
function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!validateInput(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        // Sử dụng SweetAlert2 để hiển thị thông báo lỗi
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng điền đầy đủ thông tin bắt buộc',
            confirmButtonColor: 'hsl(var(--primary))'
        });
    }

    return isValid;
}

// Thu thập dữ liệu đơn hàng
function collectOrderData() {
    // Lấy thông tin giao hàng
    const shippingInfo = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
        ward: document.getElementById('ward').value,
        notes: document.getElementById('notes').value
    };

    // Lưu địa chỉ vào thông tin người dùng
    saveUserAddress(shippingInfo);

    // Lấy thông tin đơn hàng
    const orderData = JSON.parse(sessionStorage.getItem('orderData') || '{}');
    const cartData = JSON.parse(localStorage.getItem('pharmacareCart') || '{}');
    const cart = cartData.items || [];

    // Lấy phương thức vận chuyển và thanh toán
    const shippingMethod = document.querySelector('input[name="shipping-method"]:checked').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Tạo thông tin đơn hàng
    return {
        id: generateOrderId(),
        date: new Date().toISOString(),
        items: cart,
        shippingInfo,
        shippingMethod,
        paymentMethod,
        subtotal: orderData.subtotal,
        discount: orderData.discount || 0,
        discountAmount: orderData.discountAmount || 0,
        shippingFee: orderData.shippingFee || 0,
        total: orderData.total,
        status: 'pending'
    };
}

// Lưu địa chỉ vào thông tin người dùng
function saveUserAddress(shippingInfo) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.address = shippingInfo.address;
        userData.city = shippingInfo.city;
        userData.district = shippingInfo.district;
        userData.ward = shippingInfo.ward;
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Quay lại trang giỏ hàng
function backToCart() {
    window.location.href = '../giohang/';
}

// Thiết lập phương thức vận chuyển
function setupShippingMethods() {
    const shippingMethods = document.querySelectorAll('input[name="shipping-method"]');
    const orderData = JSON.parse(sessionStorage.getItem('orderData') || '{}');
    const subtotal = orderData.subtotal || 0;

    // Ẩn giao hàng trong ngày nếu đơn hàng > 1 triệu
    const sameDayShipping = document.querySelector('input[value="same-day"]');
    if (sameDayShipping && sameDayShipping.closest('.shipping-method')) {
        if (subtotal > 1000000) {
            sameDayShipping.closest('.shipping-method').style.display = 'none';
            // Nếu đang chọn giao trong ngày thì chuyển sang giao tiêu chuẩn
            if (sameDayShipping.checked) {
                const standardShipping = document.querySelector('input[value="standard"]');
                if (standardShipping) {
                    standardShipping.checked = true;
                    // Kích hoạt sự kiện change để cập nhật phí vận chuyển
                    standardShipping.dispatchEvent(new Event('change'));
                }
            }
        } else {
            sameDayShipping.closest('.shipping-method').style.display = 'block';
        }
    }

    shippingMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Cập nhật phí vận chuyển dựa trên phương thức được chọn
            const selectedMethod = this.value;
            let shippingFee = 30000; // Standard

            if (selectedMethod === 'express') {
                shippingFee = 60000;
            } else if (selectedMethod === 'same-day') {
                shippingFee = 100000;
            }

            // Kiểm tra miễn phí vận chuyển
            const orderData = JSON.parse(sessionStorage.getItem('orderData') || '{}');
            if (orderData.subtotal > 500000) {
                shippingFee = 0;
            }

            // Cập nhật thông tin đơn hàng
            orderData.shippingFee = shippingFee;
            orderData.total = parseFloat(orderData.subtotal) - parseFloat(orderData.discountAmount || 0) + parseFloat(shippingFee);
            sessionStorage.setItem('orderData', JSON.stringify(orderData));

            // Cập nhật hiển thị
            document.getElementById('shipping-value').textContent = shippingFee > 0 ? formatCurrency(shippingFee) : 'Miễn phí';
            document.getElementById('total-value').textContent = formatCurrency(orderData.total);

            // Highlight phương thức vận chuyển được chọn
            highlightSelectedShippingMethod(selectedMethod);
        });
    });

    // Highlight phương thức mặc định khi trang được tải
    const defaultMethod = document.querySelector('input[name="shipping-method"]:checked');
    if (defaultMethod) {
        highlightSelectedShippingMethod(defaultMethod.value);
    }
}

// Hàm highlight phương thức vận chuyển được chọn
function highlightSelectedShippingMethod(selectedMethod) {
    // Xóa highlight của tất cả các phương thức
    document.querySelectorAll('.shipping-method').forEach(method => {
        method.classList.remove('selected');
    });

    // Thêm highlight cho phương thức được chọn
    document.querySelector(`input[value="${selectedMethod}"]`).closest('.shipping-method').classList.add('selected');
}

// Thiết lập phương thức thanh toán
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const selectedMethod = this.value;
            const orderData = JSON.parse(sessionStorage.getItem('orderData') || '{}');
            orderData.paymentMethod = selectedMethod;
            sessionStorage.setItem('orderData', JSON.stringify(orderData));

            // Highlight phương thức thanh toán được chọn
            highlightSelectedPaymentMethod(selectedMethod);

            // Hiển thị QR code tương ứng
            showPaymentQR(selectedMethod);
        });
    });

    // Highlight và hiển thị QR cho phương thức mặc định
    const defaultMethod = document.querySelector('input[name="payment-method"]:checked');
    if (defaultMethod) {
        highlightSelectedPaymentMethod(defaultMethod.value);
        showPaymentQR(defaultMethod.value);
    }
}

// Hiển thị QR code thanh toán
function showPaymentQR(method) {
    console.log('Showing QR for method:', method);

    // Cập nhật nút đặt hàng
    updatePlaceOrderButton(method);

    // Xóa QR code cũ nếu có
    const existingQR = document.querySelector('.payment-qr-container');
    if (existingQR) {
        existingQR.remove();
    }

    // Nếu chọn COD, chỉ cần xóa QR và kết thúc
    if (method.toLowerCase() === 'cod') {
        return;
    }

    const selectedAccount = accounts.find(acc => acc.method.toLowerCase() === method.toLowerCase());
    console.log('Selected account:', selectedAccount);

    if (!selectedAccount) {
        console.log('Không tìm thấy tài khoản cho phương thức:', method);
        return;
    }

    // Lấy thông tin đơn hàng
    const orderData = JSON.parse(sessionStorage.getItem('orderData') || '{}');
    const amount = orderData.total || 0;
    const orderId = generateOrderId();

    // Tạo nội dung mô tả
    const description = `PharmaCare - ${orderId}`;

    // Tạo container QR mới
    const qrContainer = document.createElement('div');
    qrContainer.className = 'payment-qr-container';

    // Tạo URL QR code dựa trên phương thức thanh toán
    let qrUrl = '';
    let qrContent = '';

    switch (method.toLowerCase()) {
        case 'bank-transfer':
            qrUrl = `https://img.vietqr.io/image/${selectedAccount.PID}-${selectedAccount.number}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(selectedAccount.name)}`;
            qrContent = `
                <div class="qr-box">
                    <h3>Quét mã để thanh toán</h3>
                    <div class="qr-image">
                        <img src="${qrUrl}" alt="QR Code Ngân hàng" onload="this.parentElement.classList.add('loaded')">
                    </div>
                    <div class="bank-info">
                        <p><strong>Ngân hàng:</strong> ${selectedAccount.bank}</p>
                        <p><strong>Số tài khoản:</strong> ${selectedAccount.number}</p>
                        <p><strong>Chủ tài khoản:</strong> ${selectedAccount.name}</p>
                        <p><strong>Số tiền:</strong> ${formatCurrency(amount)}</p>
                        <p><strong>Nội dung:</strong> ${description}</p>
                    </div>
                </div>
            `;
            break;

        case 'momo':
            qrUrl = `https://momosv3.apimienphi.com/api/QRCode?phone=${selectedAccount.number}&amount=${amount}&note=${encodeURIComponent(description)}`;
            qrContent = `
                <div class="qr-box">
                    <h3>Quét mã để thanh toán qua Momo</h3>
                    <div class="qr-image">
                        <img src="${qrUrl}" alt="QR Code Momo" onload="this.parentElement.classList.add('loaded')">
                    </div>
                    <div class="momo-info">
                        <p><strong>Số điện thoại:</strong> ${selectedAccount.number}</p>
                        <p><strong>Chủ tài khoản:</strong> ${selectedAccount.name}</p>
                        <p><strong>Số tiền:</strong> ${formatCurrency(amount)}</p>
                        <p><strong>Nội dung:</strong> ${description}</p>
                    </div>
                </div>
            `;
            break;

        case 'zalopay':
            qrUrl = `https://img.vietqr.io/image/${selectedAccount.PID}-${selectedAccount.number}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(selectedAccount.name)}`;
            qrContent = `
                <div class="qr-box">
                    <h3>Quét mã để thanh toán qua ZaloPay</h3>
                    <div class="qr-image">
                        <img src="${qrUrl}" alt="QR Code ZaloPay" onload="this.parentElement.classList.add('loaded')">
                    </div>
                    <div class="zalopay-info">
                        <p><strong>Ví ZaloPay:</strong> ${selectedAccount.number}</p>
                        <p><strong>Chủ tài khoản:</strong> ${selectedAccount.name}</p>
                        <p><strong>Số tiền:</strong> ${formatCurrency(amount)}</p>
                        <p><strong>Nội dung:</strong> ${description}</p>
                    </div>
                </div>
            `;
            break;

        default:
            console.log('Phương thức thanh toán không hợp lệ:', method);
            return;
    }

    // Thêm nội dung vào container
    qrContainer.innerHTML = qrContent;

    // Chèn container vào sau phương thức thanh toán
    const paymentMethods = document.querySelector('.payment-methods');
    if (paymentMethods) {
        paymentMethods.insertAdjacentElement('afterend', qrContainer);

        // Thêm hiệu ứng fade in
        requestAnimationFrame(() => {
            qrContainer.style.opacity = '1';
        });
    } else {
        console.error('Không tìm thấy container payment-methods');
    }
}

// Cập nhật text nút đặt hàng
function updatePlaceOrderButton(method) {
    const placeOrderBtn = document.querySelector('.place-order-btn');
    if (!placeOrderBtn) return;

    if (['bank-transfer', 'momo', 'zalopay'].includes(method.toLowerCase())) {
        placeOrderBtn.innerHTML = 'Đã thanh toán <i class="fas fa-check"></i>';
        placeOrderBtn.classList.add('paid');
    } else {
        placeOrderBtn.innerHTML = 'Đặt hàng <i class="fas fa-arrow-right"></i>';
        placeOrderBtn.classList.remove('paid');
    }
}

// Hàm highlight phương thức thanh toán được chọn
function highlightSelectedPaymentMethod(selectedMethod) {
    // Xóa highlight của tất cả các phương thức
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });

    // Thêm highlight cho phương thức được chọn
    document.querySelector(`input[value="${selectedMethod}"]`).closest('.payment-method').classList.add('selected');
}

// Tạo mã đơn hàng
function generateOrderId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `PC-${timestamp}-${random}`;
}

// Lưu đơn hàng
function saveOrder(order) {
    // Lấy danh sách đơn hàng đã có (nếu có)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    // Thêm đơn hàng mới
    orders.push(order);

    // Lưu vào localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    // Xóa giỏ hàng
    localStorage.removeItem('pharmacareCart');
    sessionStorage.removeItem('orderData');
}

// Hiển thị thông báo đặt hàng thành công
function showOrderSuccessNotification(order) {
    // Cập nhật thông tin trong modal
    document.getElementById('order-id').textContent = order.id;

    // Hiển thị modal
    const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
    successModal.show();

    // Thêm sự kiện cho nút tiếp tục mua sắm
    document.querySelector('.btn-continue-shopping').addEventListener('click', function() {
        window.location.href = '/';
    });

    // Thêm sự kiện cho nút xem đơn hàng
    document.querySelector('.btn-view-order').addEventListener('click', function() {
        // Giả lập link đến trang đơn hàng (có thể phát triển sau)
        alert('Tính năng đang được phát triển');
        window.location.href = '/';
    });
}

// Cập nhật thông tin miễn phí vận chuyển
function updateShippingInfo(subtotal) {
    const shippingMethodsInfo = document.querySelectorAll('.shipping-method .method-info');
    const sameDayShipping = document.querySelector('input[value="same-day"]');

    if (subtotal > 500000) {
        shippingMethodsInfo.forEach(info => {
            info.textContent = 'Đơn hàng trên 500.000đ được miễn phí vận chuyển';
            info.style.color = '#4CAF50';
        });

        document.querySelectorAll('.shipping-method .method-price').forEach(price => {
            price.textContent = 'Miễn phí';
            price.style.color = 'hsl(var(--muted))';
        });
    }

    // Kiểm tra và ẩn giao hàng trong ngày cho đơn hàng lớn
    if (sameDayShipping && sameDayShipping.closest('.shipping-method')) {
        if (subtotal > 1000000) {
            sameDayShipping.closest('.shipping-method').style.display = 'none';
            // Thông báo cho người dùng
            const shippingMethods = document.querySelector('.shipping-methods');
            if (shippingMethods) {
                const notice = document.createElement('div');
                notice.className = 'shipping-notice';
                notice.innerHTML = '<i class="fas fa-info-circle"></i> Giao hàng trong ngày không khả dụng cho đơn hàng trên 1.000.000đ';
                shippingMethods.appendChild(notice);
            }
        } else {
            sameDayShipping.closest('.shipping-method').style.display = 'block';
            const notice = document.querySelector('.shipping-notice');
            if (notice) {
                notice.remove();
            }
        }
    }
}

// Khởi tạo địa chỉ
function initializeAddress() {
    const host = "https://provinces.open-api.vn/api/";

    // Khởi tạo Select2 cho các select
    $('#city, #district, #ward').select2({
        theme: 'bootstrap4',
        language: {
            noResults: function() {
                return "Không tìm thấy kết quả";
            },
            searching: function() {
                return "Đang tìm...";
            }
        },
        placeholder: function() {
            return $(this).data('placeholder');
        },
        allowClear: true
    });

    // Thiết lập placeholder
    $('#city').data('placeholder', 'Tìm và chọn tỉnh/thành phố');
    $('#district').data('placeholder', 'Tìm và chọn quận/huyện');
    $('#ward').data('placeholder', 'Tìm và chọn phường/xã');

    // Gọi API lấy danh sách tỉnh/thành
    axios.get(host + '?depth=3')
        .then((response) => {
            renderAddressSelect(response.data, "city");
            // Refresh Select2 sau khi cập nhật dữ liệu
            $('#city').trigger('change');
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
            showMessage('Không thể tải danh sách tỉnh/thành. Vui lòng thử lại sau.', 'error');
        });

    // Sự kiện khi chọn tỉnh/thành
    $('#city').on('select2:select', function() {
        const selectedCity = $(this).find(':selected');
        const cityId = selectedCity.data('id');

        if (cityId) {
            // Reset và disable quận/huyện và phường/xã
            $('#district').prop('disabled', true).empty().append('<option value="">Đang tải...</option>');
            $('#ward').prop('disabled', true).empty().append('<option value="">Chọn phường/xã</option>');

            // Gọi API lấy danh sách quận/huyện
            axios.get(host + "p/" + cityId + "?depth=2")
                .then((response) => {
                    renderAddressSelect(response.data.districts, "district");
                    $('#district').prop('disabled', false).trigger('change');
                })
                .catch(error => {
                    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
                    showMessage('Không thể tải danh sách quận/huyện. Vui lòng thử lại sau.', 'error');
                    $('#district').prop('disabled', false);
                });
        }
    });

    // Sự kiện khi chọn quận/huyện
    $('#district').on('select2:select', function() {
        const selectedDistrict = $(this).find(':selected');
        const districtId = selectedDistrict.data('id');

        if (districtId) {
            // Reset và disable phường/xã
            $('#ward').prop('disabled', true).empty().append('<option value="">Đang tải...</option>');

            // Gọi API lấy danh sách phường/xã
            axios.get(host + "d/" + districtId + "?depth=2")
                .then((response) => {
                    renderAddressSelect(response.data.wards, "ward");
                    $('#ward').prop('disabled', false).trigger('change');
                })
                .catch(error => {
                    console.error('Lỗi khi lấy danh sách phường/xã:', error);
                    showMessage('Không thể tải danh sách phường/xã. Vui lòng thử lại sau.', 'error');
                    $('#ward').prop('disabled', false);
                });
        }
    });

    // Sự kiện khi chọn phường/xã
    $('#ward').on('select2:select', function() {
        updateFullAddress();
    });

    // Sự kiện khi xóa lựa chọn
    $('#city').on('select2:clear', function() {
        $('#district, #ward').empty().prop('disabled', true);
        $('#district').append('<option value="">Chọn quận/huyện</option>');
        $('#ward').append('<option value="">Chọn phường/xã</option>');
    });

    $('#district').on('select2:clear', function() {
        $('#ward').empty().prop('disabled', true).append('<option value="">Chọn phường/xã</option>');
    });
}

// Render danh sách địa chỉ vào select
function renderAddressSelect(array, selectId) {
    let options = '<option value="">Chọn</option>';
    array.forEach(item => {
        options += `<option data-id="${item.code}" value="${item.name}">${item.name}</option>`;
    });
    $(`#${selectId}`).html(options).trigger('change');
}

// Cập nhật địa chỉ đầy đủ
function updateFullAddress() {
    const cityText = $("#city option:selected").text();
    const districtText = $("#district option:selected").text();
    const wardText = $("#ward option:selected").text();

    if (cityText && districtText && wardText &&
        cityText !== 'Chọn' && districtText !== 'Chọn' && wardText !== 'Chọn') {
        const fullAddress = `${wardText}, ${districtText}, ${cityText}`;
        // Lưu địa chỉ vào form
        const addressInput = document.getElementById('address');
        if (addressInput && addressInput.value) {
            // Nếu đã có địa chỉ chi tiết, thêm vào trước địa chỉ hành chính
            addressInput.value = addressInput.value.split(',')[0].trim() + ', ' + fullAddress;
        }
    }
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
        timerProgressBar: true
    });
}

// Khởi tạo sticky sidebar
function initStickySidebar() {
    const orderSummary = document.querySelector('.order-summary');
    if (!orderSummary) return;

    // Thiết lập các thông số ban đầu
    window.sidebarData = {
        headerHeight: 60, // Giảm chiều cao của header để hiển thị cao hơn
        parentElement: orderSummary.parentElement,
        sidebarWidth: orderSummary.offsetWidth,
        sidebarHeight: orderSummary.offsetHeight
    };

    // Lưu trữ nội dung ban đầu của order-summary
    window.originalOrderSummaryInnerHTML = orderSummary.innerHTML;

    // Áp dụng các CSS cần thiết thông qua inline style
    const style = document.createElement('style');
    style.textContent = `
        .order-summary.sticky {
            position: fixed !important;
            top: ${window.sidebarData.headerHeight}px !important;
            width: ${window.sidebarData.sidebarWidth}px !important;
            max-height: calc(100vh - ${window.sidebarData.headerHeight + 20}px);
            overflow: visible !important;
            z-index: 100;
            right: 5%;
            transform: translateY(-15px); /* Di chuyển lên trên thêm 15px */
        }
    `;
    document.head.appendChild(style);

    // Cập nhật khi cuộn trang
    window.addEventListener('scroll', handleStickyScroll);

    // Cập nhật khi resize cửa sổ
    window.addEventListener('resize', function() {
        const orderSummary = document.querySelector('.order-summary');
        if (!orderSummary) return;

        // Cập nhật lại các thông số khi resize
        window.sidebarData = {
            headerHeight: 60,
            parentElement: orderSummary.parentElement,
            sidebarWidth: orderSummary.parentElement.offsetWidth,
            sidebarHeight: orderSummary.offsetHeight
        };

        // Đặt lại width cho sidebar sticky
        if (orderSummary.classList.contains('sticky')) {
            orderSummary.style.width = `${window.sidebarData.sidebarWidth}px`;
        } else {
            orderSummary.style.width = '';
        }

        // Gọi lại hàm xử lý scroll để cập nhật vị trí
        handleStickyScroll();
    });

    // Khởi tạo ngay lập tức
    handleStickyScroll();
}

// Xử lý cuộn trang để cập nhật vị trí của sidebar
function handleStickyScroll() {
    // Kiểm tra nếu trên mobile thì không áp dụng sticky
    if (window.innerWidth <= 992) {
        const orderSummary = document.querySelector('.order-summary');
        if (orderSummary) {
            if (orderSummary.classList.contains('sticky')) {
                orderSummary.classList.remove('sticky');
                orderSummary.style.width = '';
                orderSummary.style.top = '';
            }
        }
        return;
    }

    const orderSummary = document.querySelector('.order-summary');
    if (!orderSummary || !window.sidebarData) return;

    // Lấy vị trí hiện tại của parent container và sidebar
    const parentRect = window.sidebarData.parentElement.getBoundingClientRect();

    // Tính toán vị trí của footer
    const footer = document.querySelector('footer');
    const footerTop = footer ? footer.getBoundingClientRect().top : Number.MAX_SAFE_INTEGER;
    const viewportHeight = window.innerHeight;

    // Giảm ngưỡng kích hoạt sticky để sidebar xuất hiện sớm hơn
    if (parentRect.top <= window.sidebarData.headerHeight + 30) {
        // Chỉ áp dụng sticky khi container cha còn hiển thị trong viewport
        if (parentRect.bottom > window.sidebarData.headerHeight + 50) {
            // Nếu chưa có class sticky, thêm vào
            if (!orderSummary.classList.contains('sticky')) {
                orderSummary.classList.add('sticky');
                orderSummary.style.width = `${window.sidebarData.sidebarWidth}px`;
            }

            // Kiểm tra nếu sidebar chạm footer
            if (footerTop <= viewportHeight) {
                // Tính toán khoảng cách để dịch chuyển lên khi chạm footer
                const diff = viewportHeight - footerTop;
                orderSummary.style.top = `${Math.max(0, window.sidebarData.headerHeight - diff)}px`;
            } else {
                orderSummary.style.top = `${window.sidebarData.headerHeight}px`;
            }
        } else {
            // Nếu container cha đã gần ra khỏi viewport, bỏ sticky
            if (orderSummary.classList.contains('sticky')) {
                orderSummary.classList.remove('sticky');
                orderSummary.style.width = '';
                orderSummary.style.top = '';
            }
        }
    } else {
        // Nếu parent chưa cuộn qua headerHeight, bỏ class sticky
        if (orderSummary.classList.contains('sticky')) {
            orderSummary.classList.remove('sticky');
            orderSummary.style.width = '';
            orderSummary.style.top = '';
        }
    }
}

// Khởi tạo tương tác mobile
function initMobileInteractions() {
    // Thêm class cho body để biết là mobile view
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
    }

    // Xử lý resize window
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    });

    // Scroll mượt khi click vào các phần
    document.querySelectorAll('.checkout-form-section h3').forEach(header => {
        header.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const section = this.closest('.checkout-form-section');
                const nextSection = section.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({behavior: 'smooth'});
                }
            }
        });
    });

    // Thêm indicator cho input focus
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group')?.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.closest('.form-group')?.classList.remove('focused');
        });
    });
}