# 🏥 PharmaCare - Nhà Thuốc Trực Tuyến Hiện Đại (Frontend Project)

<!-- Optional: Thêm logo hoặc banner ấn tượng ở đây -->
<!-- Ví dụ: -->
<!-- ![PharmaCare Banner](link_den_banner.png) -->

<p align="center">
  <em>Dự án website Frontend mô phỏng nhà thuốc trực tuyến với giao diện hiện đại, responsive và nhiều tính năng tương tác.</em>
</p>

<p align="center">
  <!-- Badges: Thay Rio-RFT và NhathuocPharmaCare bằng tên tài khoản và repo của bạn -->
  <a href="https://github.com/Rio-RFT/NhathuocPharmaCare/stargazers"><img src="https://img.shields.io/github/stars/Rio-RFT/NhathuocPharmaCare?style=flat-square" alt="GitHub stars"></a>
  <a href="https://github.com/Rio-RFT/NhathuocPharmaCare/network/members"><img src="https://img.shields.io/github/forks/Rio-RFT/NhathuocPharmaCare?style=flat-square" alt="GitHub forks"></a>
  <a href="https://github.com/Rio-RFT/NhathuocPharmaCare/issues"><img src="https://img.shields.io/github/issues/Rio-RFT/NhathuocPharmaCare?style=flat-square" alt="GitHub issues"></a>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License MIT">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome">
  <img src="https://img.shields.io/badge/SweetAlert2-850000?style=for-the-badge&logo=sweetalert2&logoColor=white" alt="SweetAlert2">
</p>

---

## 📜 Giới Thiệu Dự Án

**PharmaCare** là dự án được xây dựng trong khuôn khổ môn học **Thiết kế Web**, nhằm mục tiêu tạo ra một giao diện người dùng (Frontend) hoàn chỉnh cho một website nhà thuốc trực tuyến. Dự án tập trung vào việc áp dụng các kiến thức HTML, CSS, JavaScript và các thư viện hiện đại để xây dựng một trang web:

*   **Thân thiện người dùng (User-Friendly):** Giao diện trực quan, dễ dàng tìm kiếm và mua sắm sản phẩm.
*   **Đáp ứng (Responsive):** Hiển thị tốt trên mọi kích thước màn hình (PC, Tablet, Mobile).
*   **Tương tác cao (Interactive):** Sử dụng JavaScript để tạo các hiệu ứng động, xử lý form, cập nhật giỏ hàng, hiển thị thông báo...

---

## ✨ Tính Năng Nổi Bật

Dự án PharmaCare (Frontend) bao gồm các chức năng chính sau:

*   🛒 **Giao diện Mua sắm:**
    *   Hiển thị sản phẩm dạng lưới (grid), card chi tiết với đầy đủ thông tin (ảnh, tên, giá, giá cũ, giảm giá, đơn vị).
    *   Phân loại sản phẩm theo danh mục đa cấp trong menu dropdown.
    *   Hiển thị sản phẩm bán chạy, sản phẩm nổi bật.
    *   Nút "Xem thêm" để tải thêm sản phẩm.
*   🔍 **Tìm kiếm Thông minh:**
    *   Ô tìm kiếm ở header cho phép tìm theo tên hoặc danh mục.
    *   Kết quả tìm kiếm hiển thị động (live search suggestions).
    *   Hiệu ứng hover trên kết quả tìm kiếm, hiển thị nút "Thêm vào giỏ hàng".
*   🛍️ **Giỏ hàng Linh hoạt (`/giohang/`):**
    *   Hiển thị danh sách sản phẩm đã thêm.
    *   Cho phép cập nhật số lượng (tăng, giảm, nhập trực tiếp).
    *   Xóa sản phẩm khỏi giỏ.
    *   Hiển thị tóm tắt đơn hàng (tạm tính, phí vận chuyển, tổng cộng).
    *   Áp dụng mã giảm giá (mô phỏng logic kiểm tra và cập nhật giá).
    *   Popup yêu cầu đăng nhập nếu truy cập giỏ hàng khi chưa đăng nhập.
*   💳 **Quy trình Thanh toán Chi tiết (`/thanhtoan/`):**
    *   Layout 2 cột khoa học (Thông tin giao hàng & Tóm tắt đơn hàng).
    *   Form nhập thông tin giao hàng đầy đủ, có validation HTML5 & JavaScript.
    *   **Tích hợp API địa chỉ hành chính Việt Nam:** Chọn Tỉnh/Thành, Quận/Huyện, Phường/Xã dễ dàng với ô tìm kiếm (Select2).
    *   Lựa chọn phương thức vận chuyển (Tiêu chuẩn, Nhanh, Trong ngày) với logic tính phí tự động và miễn phí vận chuyển.
    *   Lựa chọn nhiều phương thức thanh toán: COD, Chuyển khoản ngân hàng, Ví MoMo, ZaloPay.
    *   **Hiển thị mã QR thanh toán động:** Tự động tạo mã QR tương ứng khi chọn phương thức thanh toán online (sử dụng API VietQR, Momo).
    *   **Tóm tắt đơn hàng "dính" (Sticky Sidebar):** Phần thông tin đơn hàng cuộn theo màn hình, giúp người dùng tiện theo dõi.
    *   Modal thông báo đặt hàng thành công.
*   👤 **Xác thực Người dùng (Mô phỏng):**
    *   Trang đăng nhập (`/dangnhap/`) và đăng ký (`/dangky/`).
    *   Lưu trạng thái đăng nhập và thông tin cơ bản của người dùng (tên, sđt, email, địa chỉ) vào `localStorage`.
    *   Tự động điền thông tin người dùng đã lưu vào form thanh toán.
    *   Hiển thị tên người dùng và menu tài khoản trên header khi đã đăng nhập.
*   📱 **Thiết kế Responsive:**
    *   Giao diện tự động thích ứng tốt trên PC, Tablet và Mobile.
    *   Sử dụng hiệu quả Bootstrap 5 Grid System và Flexbox.
    *   CSS Media Queries được áp dụng để tinh chỉnh giao diện trên từng kích thước màn hình.
    *   Menu chính chuyển thành dạng Hamburger Menu trên màn hình nhỏ.
*   🎨 **Giao diện & Hiệu ứng:**
    *   Giao diện sáng sủa, màu sắc chủ đạo nhất quán.
    *   Sử dụng Font Awesome cho các biểu tượng.
    *   Slider banner tự động chạy (Bootstrap Carousel).
    *   Menu dropdown hiển thị mượt mà khi hover.
    *   Menu chính sticky khi cuộn trang.
    *   Hiệu ứng hover trên các nút bấm, link, sản phẩm.
    *   Thông báo pop-up chuyên nghiệp bằng SweetAlert2.
    *   Hiệu ứng loading khi tải dữ liệu địa chỉ.

---

## 💻 Công Nghệ Sử Dụng

*   **Ngôn ngữ nền tảng:**
    *   ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
    *   ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) (Flexbox, Grid, Media Queries, Animations)
    *   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) (ES6+, DOM Manipulation, Events, localStorage, Fetch/Axios)
*   **Framework & Thư viện:**
    *   ![Bootstrap 5](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white)
    *   ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat-square&logo=fontawesome&logoColor=white)
    *   ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-850000?style=flat-square&logo=sweetalert2&logoColor=white)
    *   ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
    *   ![Select2](https://img.shields.io/badge/Select2-007BFF?style=flat-square)
    *   *(jQuery có thể được sử dụng gián tiếp qua Bootstrap hoặc Select2)*
*   **API Tích hợp (Ví dụ):**
    *   API Địa chỉ Hành chính Việt Nam (`provinces.open-api.vn`)
    *   API tạo QR Code (`vietqr.io`, `momosv3.apimienphi.com`)
*   **Công cụ phát triển:**
    *   Visual Studio Code / Cursor
    *   Git & GitHub
    *   Trình duyệt web (Chrome DevTools, Firefox Developer Tools)

---

## 🚀 Demo Trực Tuyến

*(Hiện tại dự án chưa được triển khai trực tuyến)*

<!-- Khi có link demo, hãy bỏ comment dòng dưới và thay link: -->
<!-- ## [➡️ Xem Demo Tại Đây](LINK_DEN_DEMO_CUA_BAN) -->

---

## 📸 Hình Ảnh Giao Diện

*(Thêm một vài ảnh chụp màn hình tiêu biểu của website ở đây để README thêm phần sinh động)*

**1. Trang Chủ:**
<!-- ![Trang Chủ PharmaCare](link_hinh_anh_trang_chu.png) -->
*(Mô tả ngắn về ảnh trang chủ)*

**2. Giỏ Hàng:**
<!-- ![Giỏ Hàng PharmaCare](link_hinh_anh_gio_hang.png) -->
*(Mô tả ngắn về ảnh giỏ hàng)*

**3. Trang Thanh Toán (Với lựa chọn địa chỉ & QR Code):**
<!-- ![Thanh Toán PharmaCare](link_hinh_anh_thanh_toan.png) -->
*(Mô tả ngắn về ảnh thanh toán)*

**4. Giao diện Responsive (Mobile):**
<!-- ![Responsive PharmaCare](link_hinh_anh_responsive.png) -->
*(Mô tả ngắn về ảnh responsive)*

---

## 🛠️ Cài Đặt và Chạy Dự Án (Local)

Do đây là dự án thuần Frontend, bạn có thể dễ dàng chạy nó trên máy tính của mình:

1.  **Clone repository về máy:**
    ```bash
    git clone https://github.com/Rio-RFT/NhathuocPharmaCare.git
    ```
    *(Thay `Rio-RFT/NhathuocPharmaCare` bằng đường dẫn repo của bạn)*

2.  **Di chuyển vào thư mục dự án:**
    ```bash
    cd NhathuocPharmaCare
    ```

3.  **Mở file `index.html`:**
    *   Cách đơn giản nhất là nhấp đúp vào file `index.html` trong thư mục gốc để mở bằng trình duyệt mặc định.
    *   **Khuyến nghị:** Sử dụng một máy chủ cục bộ nhỏ để tránh các vấn đề liên quan đến CORS khi gọi API (ví dụ: API địa chỉ). Nếu bạn dùng VS Code, có thể cài đặt extension **Live Server** và chọn "Open with Live Server".

---

## 📂 Cấu Trúc Thư Mục Dự Án

```plaintext
.
├── css/              # CSS chung cho toàn trang
│   └── style.css
├── js/               # JavaScript chung cho toàn trang
│   └── main.js       # Script chính trang chủ, xử lý chung
│   └── product.js    # (Tùy chọn) Dữ liệu sản phẩm mẫu
├── images/           # Chứa tất cả hình ảnh
│   ├── logo/
│   ├── banner/
│   ├── nav/          # Ảnh sản phẩm trong menu
│   ├── payment/      # Icons phương thức thanh toán
│   ├── cert/         # Ảnh chứng nhận
│   └── ...           # Các ảnh khác
├── dangnhap/         # Trang và tài nguyên cho Đăng nhập
│   ├── index.html
│   └── style.css     # (Có thể có script riêng hoặc dùng chung)
├── dangky/           # Trang và tài nguyên cho Đăng ký
│   ├── index.html
│   └── style.css     # (Có thể có script riêng hoặc dùng chung)
├── giohang/          # Trang và tài nguyên cho Giỏ hàng
│   ├── index.html
│   ├── script.js
│   └── style.css
├── thanhtoan/        # Trang và tài nguyên cho Thanh toán
│   ├── index.html
│   ├── script.js
│   └── style.css
├── index.html        # File HTML trang chủ
└── README.md         # File này
```

---

## 🎯 Hướng Phát Triển Tương Lai

Dự án Frontend này là nền tảng vững chắc để phát triển thành một website nhà thuốc hoàn chỉnh. Các hướng phát triển tiềm năng bao gồm:

*   **Xây dựng Backend:** Sử dụng Node.js, PHP, Python... để xử lý logic nghiệp vụ, quản lý dữ liệu.
*   **Tích hợp Cơ sở dữ liệu:** Lưu trữ thông tin sản phẩm, người dùng, đơn hàng.
*   **Hoàn thiện Chức năng:**
    *   Trang chi tiết sản phẩm đầy đủ.
    *   Hệ thống quản lý tài khoản người dùng (profile, lịch sử đơn hàng).
    *   Chức năng bình luận, đánh giá sản phẩm.
    *   Tích hợp cổng thanh toán thực tế.
*   **Xây dựng Admin Panel:** Giao diện quản trị cho phép quản lý sản phẩm, đơn hàng, người dùng...
*   **Tối ưu hiệu năng:** Nén tài nguyên, lazy loading, code splitting...
*   **Triển khai (Deployment):** Đưa website lên hosting/cloud.

---

## 🤝 Đóng Góp

Dự án này được thực hiện cho mục đích học tập. Nếu bạn có bất kỳ ý tưởng cải thiện, góp ý hoặc phát hiện lỗi, vui lòng tạo một **[Issue](https://github.com/Rio-RFT/NhathuocPharmaCare/issues)** trên repository này. Mọi đóng góp đều được hoan nghênh!

---

## 📄 Giấy Phép

Dự án này được cấp phép dưới **Giấy phép MIT**. Xem chi tiết trong file `LICENSE` (Nếu bạn chưa có, có thể tạo một file LICENSE với nội dung của giấy phép MIT).

---

## 📫 Liên Hệ

*   **Sinh viên thực hiện:** Nguyễn Quốc Lâm
*   **MSSV:** 1923050046
*   **Lớp:** 23DTH1
*   **Email:** quoclam705@gmail.com
*   **GitHub:** https://github.com/Rio-RFT

---

***Cảm ơn bạn đã ghé thăm dự án PharmaCare!*** ✨
