# Minh Kiệt — Personal portfolio

Portfolio cá nhân song ngữ Việt–Anh, xây bằng Astro và GSAP. Chế độ sáng/tối, Dock tương tác và hiệu ứng con trỏ dựng phần giới thiệu.

## Chạy trên máy

Cần Node.js 22.12+ hoặc 24 LTS và npm.

```powershell
npm.cmd install
npm.cmd run dev
```

Mở URL localhost terminal hiển thị. Trên Windows dùng `npm.cmd` nếu PowerShell chặn `npm.ps1`.

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

`check` kiểm tra Astro/TypeScript, `build` xuất website tĩnh vào `dist/`, `preview` xem bản build.

## Cấu trúc

- `src/pages/index.astro`: giao diện và nội dung tiếng Việt.
- `src/styles/global.css`: responsive và theme.
- `src/scripts/main.ts`: bản tiếng Anh, chi tiết dự án và GSAP.
- `src/scripts/scroll-rebuild.ts`: Swarm dựng nội dung khi cuộn tới qua GSAP ScrollTrigger.
- `src/components/Icon.astro`: SVG icon.
- `public/images/`: ảnh cá nhân Minh Kiệt cung cấp.

Ngôn ngữ/theme lưu trong trình duyệt. Lần đầu chọn theme theo hệ điều hành. Phần giới thiệu hiện sẵn; khi cuộn xuống, Swarm dựng các khối nội dung mới vào màn hình một lần. Dải mint chạy ngang liên tục, dừng khi rê chuột. Nút chạy lại dùng cho hiệu ứng phần giới thiệu; Escape hiện ngay nội dung đã chuẩn bị để dựng, không khóa cuộn. `prefers-reduced-motion` tắt Swarm, marquee và phóng Dock. Nội dung chính vẫn đọc được khi tắt JavaScript; đổi ngôn ngữ, theme và chi tiết dự án cần JavaScript. Font tải từ Google Fonts, có font hệ thống dự phòng.

## Thông tin

- Minh Kiệt, sinh viên năm 3 ngành Kỹ thuật phần mềm; giới thiệu cá nhân.
- VNZ-DNA: môn học, nhóm 3, 09–10/2026; Backend và triển khai Render.
- SEAL Hackathon: môn học, nhóm 4, 06–08/2026; Clean Architecture.
- Cả hai chưa có người sử dụng thực tế. Hình dự án là đồ họa minh họa.
- Unit Test: đã học qua, chưa nhiều thực hành. Không ghi Microservices, CV hoặc thông tin từ bài luyện tiếng Anh.

Đóng góp tổng hợp từ commit của `minhkiet26` và chia sẻ được xác nhận. Không công khai thông tin đăng nhập admin.

## Deploy

Import repo vào Vercel với framework Astro, build `npm run build`, output `dist`. Không cần biến môi trường hoặc Backend riêng. Phiên triển khai local chưa tự động publish hoặc push.

## Tham khảo

- [GSAP macOS Dock demo](https://demos.gsap.com/demo/macos-dock-effect/).
- [Swarm Rebuild](https://github.com/DhvanilPatel/swarm-cursors): tham khảo ý tưởng. Hiệu ứng được viết mới bằng GSAP, không dùng mã nguồn extension.
