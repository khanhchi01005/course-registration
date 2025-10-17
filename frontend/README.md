// giải thích folder
- assets: chứa tài nguyên (ảnh, vid, font, ...)
- styles: chứa các file css/ cấu hình tailwind
- services: gọi API backend (fetch, axios,... )
- datatypes: chứa các kiểu dữ liệu
- pages: layout toàn cục chứa các component tương ứng
- components: các thành phần hiện hữu trong 1 page (button, navbar, ...) 
- Approuting file: điều hướng trang



// Cấu hình thêm sau khi pull mà không dùng Docker
# cài nodejs
- 1: tải nodejs 

# build node_modules (và các package)
- 1: mở terminal chọn cmd mode (bấm dấu + ở cạnh thùng rác của terminal rồi chọn cmd nếu là vscode)
- 2: gõ lệnh cd frontend => ~\course-registration\frontend
- 3: gõ lệnh npm install

# cài lại thêm các package (nếu build node_modules mà ko chạy được)
- 1: npm install tailwindcss @tailwindcss/vite 
- 2: npm install react-router-dom
- 3: npm install -D @types/react-router-dom
- 4: npm install dotenv
- 5: npm install axios
- 6: npm install -D @types/axios
- 7: npm install humps
- 8: npm install --save-dev @types/humps
- 9: npm install -g typescript
- 10: npm install --save-dev typescript 


// Chạy hệ thống dưới góc nhìn dev:
- 1: npm run dev 
- 2: chọn vào đường link hiện ra ở terminal



// build hệ thống (chưa cần)



// Lưu ý:
# cài đặt
- Tất cả command phải thực hiện ở terminal-cmd mode 
- Đã cấu hình sẵn rerender nên không cần re run, chỉ cần save là giao diện tự thay đổi

# cách đặt tên
- Định dạng camel
- Viết hoa chữ cái đầu
  + file để định nghĩa 1 Component/ React Dom 
  + tên hàm Component
  + tên kiểu dữ liệu
- Viết thường chữ cái đầu
  + folder viết thường chữ cái đầu
  + file không để định nghĩa 1 Component/ React Dom 
  + tên hàm không phải Component
  + biến