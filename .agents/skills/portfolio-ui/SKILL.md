---
name: portfolio-ui
description: Sửa nội dung song ngữ hoặc giao diện Astro/GSAP của Minh Kiệt Portfolio, gồm sáng tối, Dock, Swarm và dialog dự án. Không dùng cho deploy hay Backend VNZ.
---

# Sửa giao diện Portfolio

Đọc [AGENTS.md](../../../AGENTS.md), [context](../../context.md), [quy ước code](../../coding-style.md).

- Xác định phần index.astro, main.ts hoặc global.css cần đổi. Cập nhật cả VI/EN khi đổi text, dialog, alt, aria-label và metadata.
- Giữ mục đích giới thiệu cá nhân. Không thêm CV, người dùng thực tế, thành tích hoặc dòng định hướng chưa chốt. Đóng góp dự án lấy từ diff/PR hoặc xác nhận, không từ tên người merge.
- Với motion, giữ nội dung đọc được khi JS không chạy; replay không chồng timeline, skip/Escape/cuộn/resize phục hồi nội dung. Reduced motion tắt Swarm/phóng Dock. Kiểm tra cleanup nếu đổi vòng đời component.
- Giữ token theme, focus và responsive. Minh họa project không được giới thiệu thành screenshot thật.
- Chạy check/build cho source; browser kiểm tra phần đổi khi công cụ sẵn sàng. Nói rõ phần chưa kiểm tra; không tự push/publish.
