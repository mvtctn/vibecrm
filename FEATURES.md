# 🚀 VibeCRM Solopreneur - Danh sách Tính Năng (Features List)

Dự án VibeCRM được thiết kế chuyên biệt dành cho các Solopreneur (người làm việc độc lập) hoặc các nhóm nhỏ, tận dụng tối đa sức mạnh của AI để tự động lý quy trình kinh doanh và chăm sóc khách hàng. Dưới đây là dánh sách toàn bộ các tính năng đã thực hiện.

---

## 🎨 1. Giao diện & Trải nghiệm Người dùng (UI/UX)
- **Thiết kế tối giản, hiện đại:** Giao diện Dark Mode mặc định mang phong cách Glassmorphism (hiệu ứng kính mờ). Sử dụng TailwindCSS, Shadcn UI và Framer Motion.
- **Theme System (Giao diện sáng / tối):** Hỗ trợ chuyển đổi nhanh chóng giữa giao diện Sáng/Tối/Hệ thống (Light/Dark/System) qua cài đặt trên Navbar hoặc Settings.
- **Global Search (Command Palette):** Thanh công cụ tìm kiếm và điều hướng toàn cục cực kỳ tiện dụng với tổ hợp phím `Ctrl + K` (hoặc `Cmd + K`), giúp tìm nhanh khách hàng và điều hướng hệ thống.
- **Role-based Access Control (RBAC):** Mô phỏng và thay đổi linh hoạt các quyền hạn truy cập (Owner, Manager, Viewer) ngay trên Sidebar để dễ dàng theo dõi phân quyền trong tương lai.
- **Micro-interactions:** Các nút bấm, hiệu ứng chuyển trang, trạng thái chờ load (loading state) đều được thiết kế tỉ mỉ với Framer Motion giúp hệ thống có độ phản hồi cao và mượt mà.

---

## 📇 2. Quản lý Khách hàng & Pipeline (Core CRM)
- **Bảng dữ liệu Khách hàng (Contacts Table) nâng cao:** 
  - Hiện thị toàn diện với `@tanstack/react-table`.
  - Hỗ trợ Đầy đủ: Phân trang trang (Pagination), Sắp xếp các cột (Sorting), Tìm kiếm toàn cục (Global Filter).
  - Lọc riêng khách hàng theo từng Giai đoạn kinh doanh (Lead, Qualified, Proposal, Negotiation,...).
- **Export to CSV:** Nút Download cho phép trích xuất báo cáo dữ liệu danh sách Contact (Giá trị deal, thông tin liên lạc, giai đoạn,...) ra file Excel/CSV chuẩn Unicode tiếng Việt.
- **Kanban Pipeline (Bảng Kéo & Thả Deals):** 
  - Hiển thị trực quan toàn bộ các cơ hội bán hàng (Deals) chia theo cột trạng thái.
  - Cập nhật quy trình chuyển giai đoạn bán hàng nhanh bằng thao tác Kéo và Thả mượt mà thông qua thư viện `@dnd-kit`.
  - Tự động call API liên kết cập nhật trạng thái mới nhất lên hệ thống Database ngay khi thả chuột (Real-time tracking).

---

## 🤖 3. Trợ lý AI Tiên tiến (Groq - Llama 3)
- **Inbox AI Tự động:** Các hộp thư hội thoại của khách hàng trên Zalo, Telegram, Email,... được chuyển tải qua API Serverless. Groq AI sẽ phân tích dựa trên prompt thiết lập sẵn để trích xuất:
  - *Intent* (Ý định chính của khách).
  - *Sản phẩm & Mức giá* mà khách quan tâm.
  - *Thái độ* (Cảm xúc: Tích cực, Tiêu cực, Khẩn cấp).
- **Smart Actions:** Từ nội dung trích xuất được ở hội thoại, AI sẽ tự động tạo Leads mới, tạo Lịch nhắc việc, hoặc chuyển giai đoạn bán hàng mà không cần thao tác tay của sale.
- **Voice to Task (Ghi âm thành việc):**
  - Hỗ trợ đọc giọng nói tự động (Web Speech API) trực tiếp từ Dashboard.
  - Ngay sau khi dừng thu, AI sẽ hiểu ý đồ và tự động lên lịch nhắc việc theo thông tin đã trình bày.
- **AI Activity Feed (Live tracking):** Panel cập nhật theo mốc thời gian tất cả những hành động tự động mà AI vừa thực hiện (Ví dụ: "AI mới phân tích và đẩy anh Hùng vào danh sách Khẩn cấp").

---

## 📅 4. Quản lý Nhắc việc (Follow-ups)
- Quản lý công việc và lịch sale follow khách hàng chuyên dụng với 3 bộ lọc chính:
  - Quá hạn (Overdue)
  - Cần làm hôm nay (Today)
  - Sắp tới (Upcoming)
- Thông tin đầy đủ tích hợp thẻ mini-card tại Dashboard. Gợi ý bản nháp nội dung tin nhắn cho người dùng ngay trên màn hình.

---

## 📊 5. Hệ thống Báo cáo - Dashboard Analytics
- Tổng hợp ngay cái nhìn đầu tiên bằng bộ chỉ số (Thống kê số Database thực): Tổng Contacts, Các Deals đang active, Doanh thu ước tính (Pipeline value).
- **Pipeline Funnel Chart:** Biểu đồ hình phễu trực quan biểu diễn giá trị tài sản rớt vào từng giao đoạn (bằng thư viện `Recharts`).
- **Lead Sources Pie Chart:** Cung cấp thông số phân bổ tỷ trọng lượng khách hàng đến từ các nguồn khác nhau (Zalo vs Email vs Telegram,...).
- **Tương tác Dashboard Dashboard:** Dashboard được kết nối thẳng với dữ liệu Supabase DB. Tất cả các thay đổi ở Backend đều ngay lập tức reflect ra bảng báo cáo khi F5.

---

## ⚙️ 6. Nền tảng Kỹ thuật Backend (Supabase)
- **Relational DB:** Trái tim lưu trữ dữ liệu CRM là hệ quản trị PostgreSQL (thông qua Supabase). Cấu trúc chuẩn 4 Table chuyên nghiệp: `Tenants`, `Contacts`, `Interactions`, và `Follow_ups`.
- **Bảo mật RLS:** Toàn bộ DB đều áp dụng luật dòng (Row Level Security), chỉ Tenant nào thì mới view và query đúng thông tin của Tenant đó.
- **Server Actions / API Routes:** Mọi cấu hình kết nối của hệ thống Groq AI và thay đổi CSDL đều có thể được ẩn an toàn tại API layer của môi trường NodeJS Next.js App Router.
