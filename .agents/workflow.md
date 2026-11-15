# Quy trình làm việc

1. Đọc AGENTS.md, context và yêu cầu mới. Kiểm tra git status/branch/HEAD, diff liên quan. Giữ thay đổi đang dở; không nhầm source chưa track với code đã commit.
2. Xác định nội dung, UI, interaction hoặc dependency bị tác động. Review chỉ đọc không tự trở thành sửa code. Tiếp tục quyết định kỹ thuật thường ngày; hỏi khi thiếu thông tin thật hoặc thay đổi sản phẩm lớn chưa chốt.
3. Dùng skill liên quan trong skills-inventory.md. Sửa nội dung phải đồng bộ VI/EN, kể cả dialog/alt/aria-label/metadata.
4. Với motion giữ trạng thái nội dung phục hồi sau skip/replay/Escape/cuộn/resize. Không để GSAP xóa transform thiết kế nó không sở hữu hoặc ẩn nội dung vĩnh viễn.
5. Thay source: chạy npm.cmd run check và npm.cmd run build. Nếu telemetry bị lỗi ghi sandbox, đặt ASTRO_TELEMETRY_DISABLED=1 trong phiên shell.
6. Khi có browser, kiểm tra phần đổi trên desktop/mobile, theme/VI/EN, keyboard, dialog và reduced motion. Báo riêng check/build/HTTP/browser/deploy; không gọi build là kiểm tra giao diện hoàn chỉnh.
7. Chỉ sửa tài liệu/skill thì kiểm tra link, frontmatter, diff/ignore. Không cần chạy app.
8. Kết thúc nêu kết quả và giới hạn. Theo quy ước làm việc VNZ, commit/push/PR/merge/deploy khi được giao việc đó. Handoff chỉ cung cấp bối cảnh.

Khi checkpoint/tiếp tục, dùng portfolio-handoff. `local/` là trạng thái máy được ignore. Không lưu transcript, credential hoặc tự ghi memory toàn cục. Không dùng audit fix --force để bỏ qua việc phân tích dependency.
