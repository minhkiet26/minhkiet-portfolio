# Quy ước code

- UTF-8, giữ dấu tiếng Việt. Viết rõ, tên biến/hàm mô tả hành vi; frontend không bắt chước máy móc pattern C#.
- Astro tạo HTML, TypeScript điều khiển tương tác, CSS xử lý theme/layout. Tách component/module khi có trách nhiệm rõ hoặc dùng lại; không refactor toàn file chỉ để đồng nhất style cho task nhỏ.
- Nội dung mặc định VI ở index.astro, EN/dialog ở main.ts. Giữ key data-i18n/data-project khớp. Dịch đúng ý, không nâng mức kinh nghiệm.
- innerHTML chỉ nhận nội dung tĩnh do project kiểm soát. Không chèn dữ liệu API/người dùng chưa xử lý vào HTML.
- Anchor cho điều hướng, button cho hành động. Giữ focus-visible, aria-label, alt theo ngôn ngữ; icon trang trí aria-hidden; link ngoài rel noopener noreferrer.
- Theme dùng CSS variables, kiểm tra tương phản cả hai theme. Responsive không tràn ngang; tránh animation che nút/link hoặc làm nội dung mất đọc.
- GSAP đo vị trí sau font/layout sẵn sàng; hủy timeline cũ trước replay; cleanup phục hồi opacity/visibility/clip-path. Tôn trọng reduced motion; quản lý listener/cleanup nếu thay đổi vòng đời Astro.
- Không đưa secret vào script/public. Không cài dependency/đổi major nếu task không cần. Giữ npm lockfile.
