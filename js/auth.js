// Dữ liệu tài khoản mẫu
const accounts = [
    {
        "email": "nguyenvana@mail.com",
        "phone": "0987654321",
        "name": "Nguyễn Văn A",
        "Địa Chỉ": "95/13, Đ.Huy Quốc, P.4",
        "password": "1234"
    },
    {
        "email": "nguyenvanb@mail.com",
        "phone": "0987654333",
        "name": "Nguyễn Văn B",
        "Địa Chỉ": "95/13, Đ.Huy Quốc, P.8",
        "password": "4321"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const supportsSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
    if (!supportsSVG) {
        const waves = document.querySelectorAll('.wave, .curved-line');
        waves.forEach(wave => {
            wave.style.display = 'none';
        });
    }

    // Thêm hiệu ứng ripple cho nút
    const addRippleEffect = (button) => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    };

    // Thêm hiệu ứng cho tất cả các nút
    const buttons = document.querySelectorAll('.btn-auth-primary, .social-btn');
    buttons.forEach(button => {
        addRippleEffect(button);
    });

    // Thêm hiệu ứng chuyển động cho phần tử khi trang tải xong
    const formElements = document.querySelectorAll('.auth-logo, .auth-title, .form-field, .btn-auth-primary, .demo-credentials, .alternative-login');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    // Login Form
    const loginForm = document.getElementById('loginForm');
    const phoneInput = document.getElementById('phone');
    let isPasswordFieldAdded = false;

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phone = phoneInput.value.trim();

            // Tìm tài khoản theo số điện thoại
            const account = accounts.find(acc => acc.phone === phone);

            if (account) {
                if (!isPasswordFieldAdded) {
                    // Thêm trường mật khẩu nếu chưa có
                    const passwordField = document.createElement('div');
                    passwordField.className = 'form-field';
                    passwordField.innerHTML = `
                        <label for="password">Mật khẩu *</label>
                        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
                    `;

                    // Chèn trường mật khẩu trước nút submit
                    const submitButton = loginForm.querySelector('button[type="submit"]');
                    loginForm.insertBefore(passwordField, submitButton);

                    // Đổi text nút submit
                    submitButton.textContent = 'Đăng nhập';

                    // Focus vào ô mật khẩu
                    setTimeout(() => {
                        document.getElementById('password').focus();
                    }, 100);

                    isPasswordFieldAdded = true;
                } else {
                    // Nếu đã có trường mật khẩu, kiểm tra đăng nhập
                    const password = document.getElementById('password').value;

                    if (password === account.password) {
                        // Lưu thông tin đăng nhập
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userData', JSON.stringify({
                            name: account.name,
                            phone: account.phone,
                            email: account.email,
                            address: account["Địa Chỉ"]
                        }));

                        // Thông báo thành công và chuyển hướng
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng nhập thành công',
                            text: 'Đang chuyển hướng...',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = '/';
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Mật khẩu không đúng'
                        });
                    }
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Số điện thoại không tồn tại trong hệ thống'
                });
            }
        });
    }

    // Thêm trường mật khẩu vào form sau khi nhập số điện thoại
    function addPasswordField() {

        // Thêm trường mật khẩu
        const passwordField = document.createElement('div');
        passwordField.className = 'form-field';
        passwordField.innerHTML = `
            <label for="password">Mật khẩu *</label>
            <div class="password-input-wrapper">
                <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
                <button type="button" class="toggle-password">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            <a href="#" class="forgot-password">Quên mật khẩu?</a>
        `;

        // Thêm các phần tử mới vào form
        const submitButton = document.querySelector('.btn-auth-primary');
        loginForm.insertBefore(userInfoDiv, submitButton);
        loginForm.insertBefore(passwordField, submitButton);

        // Cập nhật nút submit
        submitButton.textContent = 'Đăng nhập';
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            Swal.fire({
                title: 'Đang phát triển',
                text: 'Chức năng đăng nhập bằng tài khoản xã hội đang được phát triển',
                icon: 'info',
                confirmButtonColor: 'var(--primary)',
                confirmButtonText: 'Đã hiểu'
            });
        });
    });
});