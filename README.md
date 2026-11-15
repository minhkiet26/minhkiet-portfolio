# Minh Kiệt — Personal portfolio

Website cá nhân của Minh Kiệt, sinh viên năm 3 ngành Kỹ thuật phần mềm. Một góc nhỏ để giới thiệu bản thân, chia sẻ dự án và những công nghệ đã làm việc cùng.

**Website:** [minhkiet26.github.io/minhkiet-portfolio](https://minhkiet26.github.io/minhkiet-portfolio/)

## Công nghệ

- **Astro:** tạo website tĩnh, xuất bản build vào `dist/`.
- **TypeScript:** bật chế độ strict.
- **GSAP:** hiệu ứng con trỏ Swarm và phóng biểu tượng Dock.
- **CSS:** giao diện sáng/tối, responsive, dải chữ chạy ngang và cuộn theo màn hình.
- **npm:** quản lý dependency bằng `package-lock.json`.
- **GitHub Actions + GitHub Pages:** build và deploy website.

Website không có Backend hoặc database riêng. Phiên bản dependency được khóa trong [package-lock.json](package-lock.json).

## Nội dung và tương tác

Dock dẫn đến 5 màn hình riêng: **Trang chủ, Dự án, Về mình, Kỹ năng, Liên hệ**. Mỗi màn hình cao `100svh`; phần nội dung dài có vùng cuộn bên trong. Trang chủ dành một hàng riêng cho dải chữ chạy ngang phía trên Dock.

- **Song ngữ Việt–Anh:** nội dung mặc định là tiếng Việt, chuyển ngôn ngữ bằng nút VI/EN.
- **Giao diện sáng/tối:** lần đầu lấy theo hệ điều hành; lựa chọn theme và ngôn ngữ được lưu bằng `localStorage`.
- **Swarm:** 7 con trỏ dựng nội dung từng màn hình trong khoảng 4,5 giây. Trang chủ dựng cả dải chữ chạy ngang, có một con trỏ đi theo dải.
- **Người xem tự chuyển mục:** animation kết thúc vẫn giữ nguyên màn hình hiện tại. Lúc đầu cuộn bị khóa; chọn từng mục qua Dock và chờ dựng xong để được tính vào tiến độ. Xem đủ 5 mục thì mở cuộn, hoặc dùng **Bỏ qua/Escape** để mở ngay.
- **Dựng lại khi quay về:** vào lại một mục bằng Dock hoặc cuộn sẽ chạy lại Swarm. Sau khi mở cuộn, việc quay lại không khóa cuộn trở lại. Nút chạy lại ở Trang chủ dựng lại mục hiện tại và giữ tiến độ đã xem.
- **Cuộn theo màn hình:** khi có JavaScript, trang dừng tại đầu từng màn hình bằng scroll snap. Nội dung mục kế tiếp chỉ hiện và chạy Swarm khi đã cuộn tới đúng vị trí.
- **Dải chữ chạy ngang:** tiếp tục chạy sau khi được dựng; dừng khi rê chuột lên dải.
- **Chi tiết dự án:** nút trên mỗi thẻ mở dialog với mô tả, đóng góp và liên kết liên quan.

Focus vào nội dung đang được dựng, mở dialog, resize hoặc ẩn tab sẽ phục hồi nội dung và mở cuộn. Khi bật `prefers-reduced-motion`, Swarm, dải chữ chuyển động và hiệu ứng phóng Dock được tắt. Không có JavaScript vẫn đọc được nội dung chính; đổi ngôn ngữ, theme và mở dialog cần JavaScript. Bản in hiển thị đủ các mục.

## Dự án được giới thiệu

| Dự án | Nội dung | Công nghệ chính |
| --- | --- | --- |
| [VNZ-DNA](https://github.com/VNZ-DNA/BE-VNZ-DNA) | Backend cho website giới thiệu doanh nghiệp; dự án môn học, nhóm 3 người. | ASP.NET Core, EF Core, PostgreSQL, Docker, Render |
| [SEAL Hackathon](https://github.com/Seal-Manager-Hackathon/hkathon) | Backend quản lý cuộc thi hackathon; dự án môn học, nhóm 4 người. | .NET 8, EF Core, PostgreSQL, Clean Architecture |

Cả hai là dự án học tập, chưa có người sử dụng thực tế. Hình minh họa dự án trên portfolio là đồ họa giới thiệu, không phải ảnh chụp giao diện. Phần đóng góp được trình bày riêng trong dialog của từng dự án.

## Chạy trên máy

### Cài Node.js và npm

Cài **Node.js 24** để đồng bộ với workflow deploy. Bộ cài Node.js đi kèm npm. Kiểm tra trong terminal:

```powershell
node --version
npm.cmd --version
```

Trên Windows, dùng `npm.cmd` để tránh trường hợp PowerShell chặn `npm.ps1`; ở môi trường khác có thể dùng `npm`.

### Cài Astro và GSAP cho repo này

Astro và GSAP đã được khai báo trong [package.json](package.json):

| Package | Phiên bản khai báo | Vai trò |
| --- | --- | --- |
| `astro` | `^5.0.0` | Framework tạo trang và build website tĩnh. |
| `gsap` | `^3.13.0` | Thư viện animation cho Swarm và Dock. |
| `@astrojs/check` | `^0.9.4` | Công cụ kiểm tra file Astro. |
| `typescript` | `^5.7.0` | Hỗ trợ TypeScript và kiểm tra kiểu dữ liệu. |

Nếu chưa có source trên máy, tải repo về:

```powershell
git clone https://github.com/minhkiet26/minhkiet-portfolio.git
cd minhkiet-portfolio
```

Tại thư mục gốc của repo, chạy:

```powershell
npm.cmd ci
npm.cmd run dev
```

**`npm.cmd ci` đã cài cả Astro, GSAP và các package còn lại**, theo phiên bản cụ thể được khóa trong `package-lock.json`. Với repo này, chỉ cần lệnh đó; không cần cài Astro toàn cục hoặc chạy thêm lệnh cài GSAP riêng. `npm.cmd run dev` dùng Astro được cài trong project để khởi động server.

Mở URL terminal hiển thị. Vì project cấu hình `base: '/minhkiet-portfolio/'`, đường dẫn trang có tiền tố này. Khi dev server dùng cổng mặc định 4321, mở:

```text
http://127.0.0.1:4321/minhkiet-portfolio/
```

### Nếu tạo một project Astro mới từ đầu

Đây là cách khởi tạo một project khác, dành cho lúc muốn tự bắt đầu với Astro và GSAP. Chạy ngoài thư mục portfolio:

```powershell
npm.cmd create astro@latest
```

Trong trình cài đặt, chọn tên thư mục, mẫu khởi đầu và đồng ý cài dependency. Ví dụ chọn thư mục `my-astro-site`, rồi chạy:

```powershell
cd my-astro-site
npm.cmd install gsap
npm.cmd run dev
```

`my-astro-site` là tên thư mục ví dụ, có thể đổi theo tên đã chọn. Lệnh `create astro@latest` cài Astro thông qua trình khởi tạo; `npm.cmd install gsap` thêm GSAP vào project mới. Project mới dùng Astro mới nhất tại thời điểm tạo, còn portfolio này giữ phiên bản theo lockfile.

Để dùng GSAP trong script TypeScript, import như các file `src/scripts/main.ts` và `src/scripts/scroll-rebuild.ts`:

```ts
import { gsap } from 'gsap';
```

Xem hướng dẫn chính thức: [cài Astro](https://docs.astro.build/en/install-and-setup/) và [cài GSAP](https://gsap.com/docs/v3/Installation/).

### Kiểm tra và xem bản build

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

- `check`: kiểm tra Astro/TypeScript.
- `build`: tạo website tĩnh trong `dist/`.
- `preview`: phục vụ bản build để xem trên máy; mở URL terminal hiển thị, kèm đường dẫn `/minhkiet-portfolio/`.

Project hiện chưa khai báo script `lint` hoặc `test`. Khi sửa giao diện, kiểm tra thêm các màn hình ở 375/768/1280px, sáng/tối, VI/EN, bàn phím và reduced motion. `check`/`build` thành công không thay thế kiểm tra tương tác trên trình duyệt.

## Cấu trúc source

| Đường dẫn | Trách nhiệm |
| --- | --- |
| [src/pages/index.astro](src/pages/index.astro) | Bố cục 5 màn hình, nội dung tiếng Việt, ảnh, liên kết và Dock. |
| [src/scripts/main.ts](src/scripts/main.ts) | Bản tiếng Anh, theme/ngôn ngữ, dialog dự án, phóng Dock và khởi tạo Swarm khi font sẵn sàng. |
| [src/scripts/scroll-rebuild.ts](src/scripts/scroll-rebuild.ts) | Timeline Swarm, tiến độ đã xem, khóa/mở cuộn, chọn mục Dock và phục hồi nội dung khi ngắt hiệu ứng. |
| [src/styles/global.css](src/styles/global.css) | Token theme, typography, layout, breakpoint, scroll snap, dải chữ và reduced motion. |
| [src/components/Icon.astro](src/components/Icon.astro) | Các icon SVG dùng lại. |
| [public/](public/) | Favicon và ảnh tĩnh. |
| [astro.config.mjs](astro.config.mjs) | Chế độ static, địa chỉ website và đường dẫn gốc khi deploy. |
| [.github/workflows/deploy.yml](.github/workflows/deploy.yml) | Workflow build và deploy lên GitHub Pages. |

## Deploy lên GitHub Pages

Workflow [deploy.yml](.github/workflows/deploy.yml) chạy khi push lên `main` hoặc khi chạy thủ công bằng `workflow_dispatch`. Job `build` dùng Node.js 24 và action của Astro để cài dependency, build, tải kết quả lên; job `deploy` xuất bản kết quả qua GitHub Pages.

Thiết lập trên GitHub:

1. Mở repo **Settings → Pages**.
2. Trong **Build and deployment → Source**, chọn **GitHub Actions**.
3. Push thay đổi lên `main`, rồi mở tab **Actions** để kiểm tra cả job `build` và `deploy`.
4. Khi deploy thành công, mở [website](https://minhkiet26.github.io/minhkiet-portfolio/).

Cấu hình hiện tại trong `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://minhkiet26.github.io',
  base: '/minhkiet-portfolio/',
  trailingSlash: 'always',
});
```

Ảnh và favicon trong trang dùng `import.meta.env.BASE_URL` để giữ đúng tiền tố `/minhkiet-portfolio/`. Khi thêm tài nguyên tĩnh mới, dùng cùng cách để tránh lỗi đường dẫn trên Pages. Nếu đổi tên repo hoặc dùng tên miền riêng, cập nhật `site`, `base` và các URL liên quan.

Giữ `package-lock.json` trong Git. `dist/` và `node_modules/` đã được ignore; workflow tự tạo bản build. Cấu hình hiện tại không cần khai báo secret hoặc biến môi trường riêng cho ứng dụng.

Để hiện link website ở mục **About** bên phải trang repo: bấm bánh răng cạnh **About**, điền URL website vào ô **Website**, rồi chọn **Save changes**.

## Tham khảo

- [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).
- [GSAP macOS Dock demo](https://demos.gsap.com/demo/macos-dock-effect/): tham khảo tương tác Dock.
- [Swarm Rebuild](https://github.com/DhvanilPatel/swarm-cursors): tham khảo ý tưởng; hiệu ứng trong project được viết riêng bằng GSAP.
