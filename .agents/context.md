# Bối cảnh Portfolio

## Nội dung được Minh Kiệt xác nhận

- Tên hiển thị Minh Kiệt; sinh viên năm 3 ngành Kỹ thuật phần mềm. Chưa xác nhận tên trường.
- Portfolio giới thiệu cá nhân, không phải ứng tuyển; không ghi dòng định hướng chuyên môn trên hero. Song ngữ Việt–Anh.
- C# là ngôn ngữ chính, ASP.NET Core. Đã làm qua HTML/CSS/Java; làm việc với MySQL/PostgreSQL; biết Docker, CI/CD và deploy VPS.
- Áp dụng Clean Architecture trong dự án nhóm; Unit Test đã học nhưng chưa nhiều thực hành; chưa học Microservices.
- Không lấy nội dung luyện tiếng Anh làm sự thật về cá nhân, công việc, quê quán, mục tiêu AI hoặc số năm kinh nghiệm.
- Chưa có CV. Ảnh trong `public/images/` do người dùng cung cấp. Liên kết công khai và email nằm trong nội dung trang; không cần chép lại vào ghi chú.

## Hai dự án nổi bật

### VNZ-DNA

- https://github.com/VNZ-DNA/BE-VNZ-DNA
- Dự án môn học, nhóm 3, 09/2026–10/2026; chưa có người dùng thực tế.
- ASP.NET Core, EF Core, PostgreSQL; API → Service → Repository/AppDbContext.
- Một số commit của minhkiet26 đã đối chiếu: rate limiting, Cloudinary upload, public content/slug, email mời phỏng vấn. Khi thêm chi tiết phải đọc diff, không gán mọi chức năng của repo cho cá nhân.
- Minh Kiệt xác nhận trực tiếp deploy Render. Workflow đã đọc build/push Docker image và gọi Render deploy hook. Không suy ra mọi lần deploy đã thành công chỉ từ cấu hình.
- Trang admin cần đăng nhập; không chia sẻ credential trong portfolio.

### SEAL Hackathon

- https://github.com/Seal-Manager-Hackathon/hkathon
- Dự án môn học, nhóm 4, 06/2026–08/2026; chưa có người dùng thực tế.
- .NET 8/EF Core/PostgreSQL; Domain/Application/Infrastructure/Presentation theo Clean Architecture.
- Lịch sử minhkiet26 có submission, leaderboard, notification, report và round. Đã đọc một số diff, chưa kiểm toán toàn bộ hoặc chạy dự án trong phiên portfolio.

Final2 không thuộc dự án nổi bật. PRJ_Final Java chỉ là ứng viên phụ nếu người dùng muốn thêm.

## Thiết kế và source

- Sáng/tối; mint chủ đạo, vàng/xanh lá/xanh biển làm điểm nhấn.
- Dock tham khảo https://demos.gsap.com/demo/macos-dock-effect/. Phần giới thiệu hiện sẵn khi mở; Swarm tự viết bằng GSAP ScrollTrigger dựng từng khối bên dưới khi cuộn tới. Nút replay chạy hiệu ứng phần đầu. Dải mint chạy ngang nối vòng; reduced motion tắt chuyển động. Không dùng mã extension.
- Hình project hiện là minh họa nhận diện/hệ thống, không phải screenshot thật.
- `src/pages/index.astro`: bố cục, tiếng Việt, link và ảnh.
- `src/scripts/main.ts`: tiếng Anh, dialog VI/EN, persistence, Dock và Swarm.
- `src/scripts/scroll-rebuild.ts`: dựng nội dung theo viewport khi cuộn tới, cleanup/focus/reduced motion.
- `src/styles/global.css`: typography, theme, responsive/reduced motion.
- `src/components/Icon.astro`: SVG icon. `public/images/minh-kiet.png`: ảnh gốc chưa tối ưu dung lượng.
- Build Astro tĩnh vào `dist/`; không có Backend riêng/database/secret. Xem package/lockfile để biết version thực tế.
