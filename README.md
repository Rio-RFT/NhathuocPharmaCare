# <div align="center">🏥 PharmaCare</div>
# <div align="center"><span style="background: linear-gradient(45deg, #0cce6b, #1e90ff); -webkit-background-clip: text; color: transparent; font-weight: bold;">NHÀ THUỐC TRỰC TUYẾN HIỆN ĐẠI</span></div>

<div align="center">

  ![PharmaCare Logo](https://raw.githubusercontent.com/Rio-RFT/NhathuocPharmaCare/1a87bc8acbb83e091ae5280e50f768b045b1ecd2/images/logo.svg)

  <p align="center">
    <em>Dự án website Frontend mô phỏng nhà thuốc trực tuyến với giao diện hiện đại, responsive và nhiều tính năng tương tác.</em>
  </p>

  [![GitHub stars](https://img.shields.io/github/stars/Rio-RFT/NhathuocPharmaCare?style=for-the-badge&color=00875f)](https://github.com/Rio-RFT/NhathuocPharmaCare/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/Rio-RFT/NhathuocPharmaCare?style=for-the-badge&color=00875f)](https://github.com/Rio-RFT/NhathuocPharmaCare/network/members)
  [![GitHub issues](https://img.shields.io/github/issues/Rio-RFT/NhathuocPharmaCare?style=for-the-badge&color=f97316)](https://github.com/Rio-RFT/NhathuocPharmaCare/issues)
  [![License MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&color=3b82f6)](https://opensource.org/licenses/MIT)

  <br>

  <a href="#-giới-thiệu-dự-án"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"></a>
  <a href="#-công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></a>
  <a href="#-công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
  <a href="#-công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5"></a>
  <a href="#-công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome"></a>
  <a href="#-công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/SweetAlert2-850000?style=for-the-badge&logo=sweetalert2&logoColor=white" alt="SweetAlert2"></a>
</div>

<hr style="background: linear-gradient(to right, #0cce6b, #1e90ff); height: 3px; border: none;">

## 📜 Giới Thiệu Dự Án

<img align="right" width="400" src="https://i.imgur.com/qcbZNXq.png">

**PharmaCare** là dự án được xây dựng trong khuôn khổ môn học **Thiết kế Web**, nhằm mục tiêu tạo ra một giao diện người dùng (Frontend) hoàn chỉnh cho một website nhà thuốc trực tuyến. Dự án tập trung vào việc áp dụng các kiến thức HTML, CSS, JavaScript và các thư viện hiện đại để xây dựng một trang web:

*   **🎯 Thân thiện người dùng:** Giao diện trực quan, dễ dàng tìm kiếm và mua sắm sản phẩm.
*   **📱 Đáp ứng đa thiết bị:** Hiển thị tốt trên mọi kích thước màn hình (PC, Tablet, Mobile).
*   **✨ Tương tác cao:** Sử dụng JavaScript để tạo các hiệu ứng động, xử lý form, cập nhật giỏ hàng, hiển thị thông báo...

<br clear="right"/>

<hr style="background: linear-gradient(to right, #0cce6b, #1e90ff, #0cce6b); height: 2px; border: none;">

## ✨ Tính Năng Nổi Bật

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">

<div>

### 🛒 Giao diện Mua sắm
* Hiển thị sản phẩm dạng lưới (grid), card chi tiết với đầy đủ thông tin
* Phân loại sản phẩm theo danh mục đa cấp trong menu dropdown
* Hiển thị sản phẩm bán chạy, sản phẩm nổi bật
* Nút "Xem thêm" để tải thêm sản phẩm

### 🔍 Tìm kiếm Thông minh
* Ô tìm kiếm ở header cho phép tìm theo tên hoặc danh mục
* Kết quả tìm kiếm hiển thị động (live search suggestions)
* Hiệu ứng hover trên kết quả tìm kiếm

### 🛍️ Giỏ hàng Linh hoạt (`/giohang/`)
* Hiển thị danh sách sản phẩm đã thêm
* Cập nhật số lượng (tăng, giảm, nhập trực tiếp)
* Xóa sản phẩm khỏi giỏ
* Tóm tắt đơn hàng (tạm tính, phí vận chuyển, tổng cộng)

</div>

<div>

### 💳 Quy trình Thanh toán (`/thanhtoan/`)
* Layout 2 cột khoa học (Thông tin giao hàng & Tóm tắt đơn hàng)
* **Tích hợp API địa chỉ hành chính Việt Nam**
* Nhiều phương thức thanh toán: COD, Chuyển khoản, MoMo, ZaloPay
* **Hiển thị mã QR thanh toán động**

### 👤 Xác thực Người dùng
* Trang đăng nhập (`/dangnhap/`) và đăng ký (`/dangky/`)
* Lưu trạng thái đăng nhập và thông tin người dùng
* Hiển thị menu tài khoản trên header khi đã đăng nhập

### 📱 Thiết kế Responsive & Hiệu ứng
* Giao diện tự động thích ứng tốt trên PC, Tablet và Mobile
* Menu chính sticky và chuyển thành Hamburger Menu trên mobile
* Hiệu ứng hover, transition và animation tạo trải nghiệm mượt mà

</div>

</div>

<hr style="background: linear-gradient(to right, #1e90ff, #0cce6b); height: 2px; border: none;">

## 💻 Công Nghệ Sử Dụng

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
  <img src="https://skillicons.dev/icons?i=html,css,js,bootstrap,git,github,vscode" alt="Tech Stack" />
</div>

<details>
  <summary><b>🔍 Chi tiết công nghệ</b></summary>
<br>

### Ngôn ngữ nền tảng:
* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) (Flexbox, Grid, Media Queries, Animations)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) (ES6+, DOM Manipulation, Events, localStorage)

### Framework & Thư viện:
* ![Bootstrap 5](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white)
* ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat-square&logo=fontawesome&logoColor=white)
* ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-850000?style=flat-square&logo=sweetalert2&logoColor=white)
* ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
* ![Select2](https://img.shields.io/badge/Select2-007BFF?style=flat-square)

### API Tích hợp:
* API Địa chỉ Hành chính Việt Nam (`provinces.open-api.vn`)
* API tạo QR Code (`vietqr.io`, `momosv3.apimienphi.com`)

</details>

<hr style="background: linear-gradient(to right, #0cce6b, #1e90ff); height: 2px; border: none;">

## 📸 Giao Diện Dự Án

<div align="center">
  <img src="https://i.imgur.com/XnY3pZ9.png" alt="PharmaCare Home" width="90%">
  <p><em>Trang chủ hiển thị sản phẩm dạng lưới với thiết kế hiện đại</em></p>

  <br>

  <div style="display: flex; gap: 15px; justify-content: center; margin: 20px 0;">
    <div style="flex: 1; max-width: 45%;">
      <img src="https://i.imgur.com/kYtd3F7.png" alt="PharmaCare Cart" width="100%">
      <p><em>Giỏ hàng với đầy đủ tính năng quản lý sản phẩm</em></p>
    </div>
    <div style="flex: 1; max-width: 45%;">
      <img src="https://i.imgur.com/cLRJXJM.png" alt="PharmaCare Checkout" width="100%">
      <p><em>Trang thanh toán với nhiều phương thức và mã QR</em></p>
    </div>
  </div>

  <br>

  <img src="https://i.imgur.com/oV9rk5Z.png" alt="PharmaCare Mobile" width="60%">
  <p><em>Giao diện responsive trên thiết bị di động</em></p>
</div>

<hr style="background: linear-gradient(to right, #1e90ff, #0cce6b); height: 2px; border: none;">

## 🛠️ Cài Đặt và Chạy Dự Án

<div style="background-color: #f0fff4; padding: 20px; border-radius: 10px; border-left: 4px solid #0cce6b;">

Do đây là dự án thuần Frontend, bạn có thể dễ dàng chạy nó trên máy tính của mình:

```bash
# Clone repository về máy
git clone https://github.com/Rio-RFT/NhathuocPharmaCare.git

# Di chuyển vào thư mục dự án
cd NhathuocPharmaCare

# Mở file index.html bằng trình duyệt
```

**Khuyến nghị:** Sử dụng VS Code với extension **Live Server** để tránh các vấn đề CORS khi gọi API.

</div>

<hr style="background: linear-gradient(to right, #0cce6b, #1e90ff, #0cce6b); height: 2px; border: none;">

## 📂 Cấu Trúc Thư Mục

<div style="background-color: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #1e90ff;">

```
.
├── 📁 css/              # CSS chung cho toàn trang
├── 📁 js/               # JavaScript chung
│   ├── 📄 main.js       # Script chính
│   └── 📄 product.js    # Dữ liệu sản phẩm
├── 📁 images/           # Thư mục chứa hình ảnh
├── 📁 dangnhap/         # Trang đăng nhập
├── 📁 dangky/           # Trang đăng ký
├── 📁 giohang/          # Trang giỏ hàng
├── 📁 thanhtoan/        # Trang thanh toán
├── 📄 index.html        # Trang chủ
└── 📄 README.md         # File này
```

</div>

<hr style="background: linear-gradient(to right, #1e90ff, #0cce6b); height: 2px; border: none;">

## 🎯 Định Hướng Phát Triển

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">

<div style="background-color: #f7fee7; padding: 15px; border-radius: 8px; border-top: 3px solid #84cc16;">
  <h4>🔄 Backend & Database</h4>
  <ul>
    <li>Xây dựng API với Node.js/PHP/Python</li>
    <li>Tích hợp cơ sở dữ liệu (MySQL, MongoDB)</li>
    <li>Hệ thống authentication đầy đủ</li>
  </ul>
</div>

<div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; border-top: 3px solid #3b82f6;">
  <h4>📋 Tính Năng Nâng Cao</h4>
  <ul>
    <li>Trang chi tiết sản phẩm</li>
    <li>Tài khoản người dùng và lịch sử đơn hàng</li>
    <li>Bình luận & đánh giá sản phẩm</li>
    <li>Cổng thanh toán thực tế</li>
  </ul>
</div>

<div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-top: 3px solid #ef4444;">
  <h4>⚙️ Admin & Tối Ưu</h4>
  <ul>
    <li>Admin Panel quản lý hệ thống</li>
    <li>Tối ưu hiệu năng (lazy loading, code splitting)</li>
    <li>PWA (Progressive Web App)</li>
    <li>Triển khai trên hosting/cloud</li>
  </ul>
</div>

</div>

<hr style="background: linear-gradient(to right, #0cce6b, #1e90ff, #0cce6b); height: 2px; border: none;">

## 🎮 Game Rắn Ăn Mồi

<div align="center">
  <h3>🐍 Giải Trí Cùng Rắn Săn Mồi</h3>
  <p><i>Thử tài nào! Dùng phím mũi tên ⬆️ ⬇️ ⬅️ ➡️ để điều khiển rắn ăn mồi 🍎</i></p>

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                               🍎                                ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                         🐍                                      ┃
┃                         🟢🟢                                     ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

  <details>
    <summary><b>👾 Xem mã nguồn game</b></summary>
    <p>Dưới đây là code JavaScript đơn giản để tạo game Snake:</p>

```javascript
// Cấu hình game
const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 150;

// Tạo canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

// Khởi tạo rắn
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = generateFood();
let score = 0;
let gameInterval;

// Vẽ lưới
function drawGrid() {
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 0.5;

  for (let i = 0; i <= ROWS; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(canvas.width, i * CELL_SIZE);
    ctx.stroke();
  }

  for (let i = 0; i <= COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, canvas.height);
    ctx.stroke();
  }
}

// Tạo thức ăn ngẫu nhiên
function generateFood() {
  return {
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS)
  };
}

// Vẽ rắn
function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#00a86b' : '#0cce6b';
    ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });
}

// Vẽ thức ăn
function drawFood() {
  ctx.fillStyle = '#ff6347';
  ctx.beginPath();
  const centerX = food.x * CELL_SIZE + CELL_SIZE / 2;
  const centerY = food.y * CELL_SIZE + CELL_SIZE / 2;
  ctx.arc(centerX, centerY, CELL_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  // Vẽ cuống táo
  ctx.fillStyle = '#754c24';
  ctx.fillRect(centerX - 2, centerY - CELL_SIZE / 2 + 2, 4, 4);
}

// Hiển thị điểm
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Điểm: ${score}`, 10, 30);
}

// Cập nhật trạng thái game
function update() {
  // Di chuyển rắn
  const head = { ...snake[0] };

  switch (direction) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }

  // Kiểm tra va chạm với tường
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    gameOver();
    return;
  }

  // Kiểm tra va chạm với thân
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Thêm đầu mới
  snake.unshift(head);

  // Kiểm tra nếu ăn được thức ăn
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    score++;
  } else {
    // Nếu không ăn được, rút đuôi
    snake.pop();
  }
}

// Vẽ game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawSnake();
  drawFood();
  drawScore();
}

// Vòng lặp game
function gameLoop() {
  update();
  draw();
}

// Khởi động game
function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  direction = 'right';
  food = generateFood();
  score = 0;
  gameInterval = setInterval(gameLoop, GAME_SPEED);
}

// Kết thúc game
function gameOver() {
  clearInterval(gameInterval);
  alert(`Game Over! Điểm của bạn: ${score}`);
  startGame();
}

// Xử lý phím
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Khởi chạy game khi trang đã sẵn sàng
document.addEventListener('DOMContentLoaded', startGame);
```

  </details>

  <div style="margin: 20px 0;">
    <a href="https://playsnake.org/" target="_blank">
      <img src="https://img.shields.io/badge/🎮_Chơi_Snake_Online-4CAF50?style=for-the-badge" alt="Chơi Snake">
    </a>
  </div>

  <p><i>Giải trí một chút sau khi đọc hết README này nhé! 🎮</i></p>
</div>

<hr style="background: linear-gradient(to right, #1e90ff, #0cce6b, #1e90ff); height: 3px; border: none;">

## 🤝 Đóng Góp

<div align="center">

Dự án này được thực hiện cho mục đích học tập.
Mọi đóng góp đều được trân trọng!

[![Báo cáo lỗi](https://img.shields.io/badge/Báo_cáo_lỗi-f97316?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rio-RFT/NhathuocPharmaCare/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D)
[![Góp ý tính năng](https://img.shields.io/badge/Góp_ý_tính_năng-3b82f6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rio-RFT/NhathuocPharmaCare/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)

</div>

<hr style="background: linear-gradient(to right, #1e90ff, #0cce6b); height: 2px; border: none;">

## 📄 Giấy Phép

<div align="center">

Dự án này được cấp phép dưới **Giấy phép MIT**

</div>

<hr style="background: linear-gradient(to right, #0cce6b, #1e90ff); height: 2px; border: none;">

## 📫 Liên Hệ

<div align="center">

**Sinh viên:** [Tên Của Bạn] | **MSSV:** [MSSV Của Bạn]
**Lớp:** [Lớp Của Bạn] | **Email:** [Email Của Bạn]

[![GitHub](https://img.shields.io/badge/GitHub-Rio--RFT-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rio-RFT)

</div>

<hr style="background: linear-gradient(to right, #1e90ff, #0cce6b, #1e90ff); height: 3px; border: none;">

<div align="center">

  ### 💚 Cảm ơn bạn đã ghé thăm dự án PharmaCare! 💚

  <img src="https://i.imgur.com/JTEKzLi.png" alt="PharmaCare Logo" width="150px">

</div>
