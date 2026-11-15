# AGENTS.md — Minh Kiệt Portfolio

Website giới thiệu cá nhân, chia sẻ dự án và những công nghệ đã làm việc cùng.
Song ngữ Việt–Anh, có chế độ sáng/tối và chuyển động tương tác bằng GSAP.

## Đọc khi cần

- Nội dung, thiết kế và phạm vi đã chốt → `.agents/context.md`.
- Quy trình thực hiện task → `.agents/workflow.md`.
- Quy ước viết code → `.agents/coding-style.md`.
- Workflow dùng lại → `.agents/skills-inventory.md`.
- Công việc còn dở và kết quả kiểm tra gần nhất → `.agents/local/handoff.md`, nếu có.

Các đường dẫn trên là cấu trúc đích. Nếu `.agents/` chưa có nhưng `agents-setup/` còn tồn tại,
đọc file tương ứng trong đó và báo tình trạng; không coi việc chuyển thư mục đã hoàn tất.

## Stack

Astro (static) · TypeScript strict · GSAP · CSS · npm.
Lệnh và dependency thực tế xem `package.json`; phiên bản cài đặt xem `package-lock.json`.

## Cách làm việc

- Trao đổi bằng tiếng Việt. Người dùng duyệt nội dung và thiết kế; agent triển khai trong phạm vi đã giao.
- Đọc source và diff liên quan trước khi đề xuất thay đổi. Với thay đổi lớn về cấu trúc hoặc thiết kế chưa nằm trong yêu cầu, giải thích tác động và chốt hướng trước khi thực hiện.
- Khi review, nêu vấn đề và bằng chứng; chỉ sửa khi yêu cầu bao gồm việc sửa.
- Thông tin sản phẩm nằm trong context; không lặp hồ sơ cá nhân và mô tả từng dự án trong file hướng dẫn này.

## Quy tắc code

- `src/pages/index.astro`: bố cục và nội dung tiếng Việt.
- `src/scripts/main.ts`: bản dịch tiếng Anh, dialog dự án, theme, Dock và Swarm.
- `src/styles/global.css`: token theme, typography, layout và breakpoint.
- `src/components/`: component dùng lại; `public/`: tài nguyên tĩnh.
- Đồng bộ VI/EN khi đổi nội dung, gồm dialog, alt ảnh, nhãn truy cập và metadata liên quan.
- Trang đọc được khi tắt JavaScript; JS tăng cường tương tác. Ưu tiên component Astro, chỉ thêm framework/island khi có nhu cầu cụ thể.
- Màu và style dùng lại đi qua token CSS. Kiểm tra cả sáng/tối; giữ focus hiển thị, điều hướng bàn phím và bố cục không tràn ngang.
- Swarm giữ bỏ qua/chạy lại, Escape và cleanup khi cuộn/resize; tôn trọng `prefers-reduced-motion`. Không để animation ẩn nội dung vĩnh viễn hoặc tạo timeline chồng nhau.
- Giữ UTF-8. Không thêm dependency hoặc refactor ngoài phạm vi chỉ để đổi phong cách code. Không đưa credential vào source hay public asset.

## Kiểm tra trước khi bàn giao

1. Thay source: chạy `npm.cmd run check` và `npm.cmd run build`.
2. Thay UI: kiểm tra phần bị ảnh hưởng ở 375 / 768 / 1280px, cả sáng/tối và VI/EN khi có công cụ browser. Với tương tác, kiểm tra bàn phím và reduced motion khi liên quan.
3. Chỉ sửa tài liệu: kiểm tra liên kết, frontmatter skill và diff; không cần build lại ứng dụng.
4. Báo đúng kết quả và phần chưa kiểm tra. Build thành công không thay thế kiểm tra browser hoặc xác minh deploy.

Project hiện chưa khai báo script lint/test. Không ghi chúng đã chạy hoặc tự tạo bộ kiểm tra chỉ để khớp hướng dẫn từ dự án khác.

## Git

- Giữ thay đổi đang dở của người dùng; không tự reset, clean hoặc stash.
- Commit theo Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`.
- Commit, push, merge và deploy theo yêu cầu của người dùng. Handoff không phải quyền phát hành.
- Dùng npm, giữ `package-lock.json`; không trộn lockfile của package manager khác.

## Bảo trì bối cảnh

- Đổi cấu trúc, nội dung hoặc thiết kế đã chốt → cập nhật phần liên quan trong `.agents/context.md`.
- Checkpoint/bàn giao → ghi trạng thái và bằng chứng kiểm tra vào `.agents/local/handoff.md`; thư mục local phải được ignore.
- Chỉ ghi “đã xong” khi có bằng chứng. Không lưu transcript, credential hoặc sao chép thông tin liên hệ vào ghi chú bàn giao.
