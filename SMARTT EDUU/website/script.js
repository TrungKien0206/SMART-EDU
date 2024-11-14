import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/App.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
function searchTutors() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const subjectFilter = document.getElementById("subject").value;
  const priceFilter = document.getElementById("price").value;

  // Giả lập danh sách gia sư từ một mảng (hoặc dữ liệu từ API)
  const tutors = [
    { name: "Gia sư A", subject: "math", price: 300 },
    { name: "Gia sư B", subject: "english", price: 400 },
    // Thêm các gia sư khác
  ];

  // Lọc và hiển thị gia sư
  let filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchInput) &&
      (subjectFilter === "all" || tutor.subject === subjectFilter)
  );

  // Sắp xếp theo giá
  if (priceFilter === "low") filteredTutors.sort((a, b) => a.price - b.price);
  if (priceFilter === "high") filteredTutors.sort((a, b) => b.price - a.price);

  // Hiển thị gia sư sau khi lọc
  const tutorList = document.getElementById("tutor-list");
  tutorList.innerHTML = "";
  filteredTutors.forEach((tutor) => {
    let tutorCard = `<div class="tutor-card">
                            <h3>${tutor.name}</h3>
                            <p>Giá: ${tutor.price} VND</p>
                         </div>`;
    tutorList.innerHTML += tutorCard;
  });
}

function openChat() {
  window.location.href = "chat.html";
}

function bookTutor() {
  alert("Bạn đã đặt lịch thành công!");
}
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value.trim();

  if (messageText) {
    // Tạo thẻ tin nhắn mới
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "sent");
    messageElement.textContent = messageText;

    // Thêm tin nhắn vào hộp chat
    const chatBox = document.getElementById("chat-box");
    chatBox.appendChild(messageElement);

    // Cuộn xuống cuối để hiển thị tin nhắn mới
    chatBox.scrollTop = chatBox.scrollHeight;

    // Xóa tin nhắn trong ô nhập liệu
    messageInput.value = "";

    // Giả lập phản hồi từ gia sư sau 1 giây
    setTimeout(() => {
      const replyMessage = document.createElement("div");
      replyMessage.classList.add("message", "received");
      replyMessage.textContent = "Cảm ơn bạn đã liên hệ! Tôi sẽ trả lời sớm.";
      chatBox.appendChild(replyMessage);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}
// Thông tin tài khoản mẫu
const userCredentials = {
  email: "user@example.com",
  password: "password123",
};

// Xử lý đăng nhập
function handleLogin(event) {
  event.preventDefault(); // Ngăn form reload trang

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("login-message");

  // Kiểm tra thông tin đăng nhập
  if (
    email === userCredentials.email &&
    password === userCredentials.password
  ) {
    loginMessage.textContent = "Đăng nhập thành công!";
    loginMessage.style.color = "green";

    // Lưu trạng thái đăng nhập vào sessionStorage
    sessionStorage.setItem("isAuthenticated", "true");

    // Chuyển hướng tới bảng điều khiển
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    loginMessage.textContent = "Email hoặc mật khẩu không đúng!";
    loginMessage.style.color = "red";
  }
}

// Kiểm tra trạng thái đăng nhập trên các trang yêu cầu đăng nhập
function checkAuthentication() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    alert("Bạn cần đăng nhập để truy cập trang này.");
    window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
  }
}

// Gọi hàm này trên các trang yêu cầu đăng nhập (vd: dashboard.html)
document.addEventListener("DOMContentLoaded", () => {
  const pageRequiresAuth = ["dashboard.html", "chat.html"]; // Các trang yêu cầu đăng nhập
  const currentPage = window.location.pathname.split("/").pop();

  if (pageRequiresAuth.includes(currentPage)) {
    checkAuthentication();
  }
});
function toggleRoleInput() {
  const role = document.getElementById("role").value;
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  if (role === "tutor" || role === "customer") {
    emailInput.style.display = "block";
    passwordInput.style.display = "block";
  } else {
    emailInput.style.display = "none";
    passwordInput.style.display = "none";
  }
}

function login() {
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Kiểm tra nếu người dùng chưa chọn vai trò hoặc chưa điền email/mật khẩu
  if (!role || !email || !password) {
    errorMessage.textContent =
      "Vui lòng điền đầy đủ thông tin và chọn vai trò!";
    return;
  }

  // Kiểm tra đăng nhập giả (bạn có thể thay thế phần này với API thực tế)
  if (
    role === "tutor" &&
    email === "tutor@example.com" &&
    password === "password123"
  ) {
    window.location.href = "tutor-dashboard.html"; // Điều hướng đến giao diện gia sư
  } else if (
    role === "customer" &&
    email === "customer@example.com" &&
    password === "password123"
  ) {
    window.location.href = "customer-dashboard.html"; // Điều hướng đến giao diện khách hàng
  } else {
    errorMessage.textContent = "Sai email hoặc mật khẩu!";
  }
}
// Giả sử người dùng đã đăng nhập và chúng ta biết họ là gia sư hay khách hàng.
const userType = "tutor"; // Thay đổi thành 'customer' nếu người dùng là khách hàng.
const tutorInfo = {
  name: "Nguyễn Văn A",
  subjects: ["Toán", "Lý"],
  schedule: "2-4-6",
};
const customerInfo = { name: "Trần Thị B", bookedTutor: "Nguyễn Văn A" };

// Function để hiển thị thông tin gia sư
function displayTutorInfo() {
  const tutorSection = document.getElementById("tutor-dashboard");
  tutorSection.style.display = "block";
  document.getElementById("tutor-name").textContent = tutorInfo.name;
  document.getElementById("tutor-info").innerHTML = `
        <p>Môn học: ${tutorInfo.subjects.join(", ")}</p>
        <p>Lịch học: ${tutorInfo.schedule}</p>
    `;
}

// Function để hiển thị thông tin khách hàng
function displayCustomerInfo() {
  const customerSection = document.getElementById("customer-dashboard");
  customerSection.style.display = "block";
  document.getElementById("customer-name").textContent = customerInfo.name;
  document.getElementById("tutor-list").innerHTML = `
        <p>Gia sư đã đặt: ${customerInfo.bookedTutor}</p>
    `;
}

// Kiểm tra người dùng và hiển thị thông tin phù hợp
if (userType === "tutor") {
  displayTutorInfo();
} else if (userType === "customer") {
  displayCustomerInfo();
}

// Xử lý đăng xuất
document.getElementById("logout-btn").addEventListener("click", () => {
  window.location.href = "login.html"; // Điều hướng về trang đăng nhập
});
// Kiểm tra xem người dùng đã đăng nhập chưa
let isLoggedIn = false; // Chỉnh giá trị này khi người dùng đăng nhập thành công

// Xử lý sự kiện nhấn vào các liên kết
document.querySelectorAll(".content-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      // Hiển thị thông báo yêu cầu đăng nhập
      document.getElementById("message").style.display = "flex";
    } else {
      // Chuyển hướng đến trang tương ứng
      alert(`Bạn đang xem: ${event.target.innerText}`);
    }
  });
});

// Xử lý sự kiện nhấn vào nút OK trong thông báo
document.getElementById("ok-btn").addEventListener("click", () => {
  document.getElementById("message").style.display = "none";
  window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
});

// Xử lý sự kiện nhấn vào nút đăng nhập
document.getElementById("login-btn").addEventListener("click", () => {
  window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
});
