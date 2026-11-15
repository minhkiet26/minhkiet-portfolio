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
- Dock tham khảo https://demos.gsap.com/demo/macos-dock-effect/. Năm mục Trang chủ, Dự án, Về mình, Kỹ năng, Liên hệ là năm section riêng, mỗi section cao 100svh. Nội dung dài cuộn trong section, có khoảng đệm tránh Dock. Khi có JavaScript, cuộn ngoài dừng tại đầu mỗi màn hình (scroll snap); chỉ mục đang xem hiện nội dung. Mục kế tiếp chỉ lộ và dựng lại khi đã cuộn tới đúng vị trí, tránh nhìn thấy hai phần cùng lúc khi đang cuộn dở. Không JavaScript và bản in vẫn hiện đủ nội dung.
- Swarm tự viết bằng GSAP, dùng 7 con trỏ và một timeline 4,5 giây cho mỗi màn hình. Ban đầu khóa cuộn, người xem tự chọn mục qua Dock; không tự chuyển màn hình sau animation. Một mục được tính đã xem khi dựng xong; xem đủ 5 mục hoặc Bỏ qua/Escape thì mở cuộn. Link trực tiếp chỉ mở mục được trỏ tới. Replay dựng lại mục hiện tại và không xóa tiến độ đã xem; sau khi mở cuộn, quay lại bằng Dock hoặc cuộn sẽ dựng lại mục đó mà không khóa cuộn.
- Focus vào nội dung, resize, ẩn tab, in trang và reduced motion phục hồi nội dung/khóa cuộn. Reduced motion và không JavaScript luôn đọc được nội dung; nút replay ẩn khi không dùng được. Đợi font sẵn sàng trước khi đo vị trí con trỏ. Swarm dựng cả dải mint bằng hiệu ứng hiện dần và một con trỏ đi theo dải; chữ bên trong vẫn chạy ngang nối vòng. Dải có hàng riêng phía trên khoảng trống dành cho Dock nên nằm trong khung Trang chủ, không cần cuộn xuống để thấy. Header và phần giới thiệu nằm trong vùng cuộn riêng khi nội dung dài; viewport thấp có bố cục gọn hơn. Reduced motion tắt chuyển động. Không dùng mã extension.
- Hình project hiện là minh họa nhận diện/hệ thống, không phải screenshot thật.
- `src/pages/index.astro`: bố cục, tiếng Việt, link và ảnh.
- `src/scripts/main.ts`: tiếng Anh, dialog VI/EN, persistence, phóng Dock và khởi tạo Swarm.
- `src/scripts/scroll-rebuild.ts`: lượt giới thiệu, khóa cuộn, trạng thái Dock, dựng lại mỗi lần quay về, cleanup/focus/reduced motion.
- `src/styles/global.css`: typography, theme, responsive/reduced motion.
- `src/components/Icon.astro`: SVG icon. `public/images/minh-kiet.png`: ảnh gốc chưa tối ưu dung lượng.
- Build Astro tĩnh vào `dist/`; không có Backend riêng/database/secret. Xem package/lockfile để biết version thực tế.
