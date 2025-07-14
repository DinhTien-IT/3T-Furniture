document.addEventListener("DOMContentLoaded", function () {
  const accountBtn = document.getElementById("account-btn");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Nếu đã đăng nhập, hiển thị menu tài khoản
  if (accountBtn && currentUser) {
    accountBtn.innerHTML = `
      <div class="relative group">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" class="w-6 h-6 rounded-full inline-block" alt="avatar">
        <div class="absolute hidden group-hover:block bg-white border rounded shadow right-0 mt-2 w-48 z-50 text-sm">
          <a href="account.html" class="block px-4 py-2 hover:bg-gray-100">Thông tin tài khoản</a>
          <a href="address.html" class="block px-4 py-2 hover:bg-gray-100">Sổ địa chỉ</a>
          <a href="orders.html" class="block px-4 py-2 hover:bg-gray-100">Đơn hàng</a>
          ${currentUser.role === 'admin' ? '<a href="admin/dashboard.html" class="block px-4 py-2 hover:bg-gray-100">Trang quản trị</a>' : ''}
          <button onclick="logout()" class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Đăng xuất</button>
        </div>
      </div>
    `;
  }

  updateCartCount(); // Cập nhật số lượng giỏ hàng
});

// Đăng xuất
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Nếu đang ở trang admin, kiểm tra quyền
if (location.pathname.includes("/admin/")) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "admin") {
    alert("Bạn không có quyền truy cập khu vực quản trị.");
    window.location.href = "/index.html";
  }
}

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.querySelector('a[href="cart.html"]');
  if (icon && count > 0) {
    const badge = document.createElement("span");
    badge.className = "bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-1";
    badge.innerText = count;
    icon.appendChild(badge);
  }
}
