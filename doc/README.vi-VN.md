# Hestia
###### the front-end part of MIRAI

### Cài đặt
- Hestia được phân phối như là một phần của [Wafter](https://github.com/vnma0/wafter), vì thế bạn sẽ cần lấy một bản từ [đây](https://github.com/vnma0/wafter/releases).

### Cài đặt môi trường dành cho nhà phát triển
- ##### Yêu cầu
  Môi trường phát triển của bạn cần có những thứ sau : 
    - Node.js phiên bản 9 hoặc cao hơn, với Node Package Manager cài sẵn và có thể gọi từ `$PATH`
    - Git phiên bản 2 hoặc cao hơn, cũng trong` $PATH `
    - Mọi yêu cầu khác của [Create React App](https://github.com/facebook/create-react-app)
- ##### Cài đặt mọi thứ
  - `git clone` kho mã nguồn này, gọi một cửa sổ lệnh lên và chạy `npm install` để cài đặt các module cần thiết. Xem ở [đây](https://github.com/facebook/create-react-app#creating-an-app) để biết các lệnh có thể sử dụng khác.
  - Nếu bạn muốn có một phiên bản dùng cho việc phân phối, việc biên dịch có thể được bắt đầu bằng cách chạy `npm run build` hoặc `npx react-scripts build`.

### Đóng góp
Vui lòng sử dụng Prettier trước khi commit - `husky` (được ghi lại trong `package.json` như là một gói phụ thuộc) sẽ tạo một pre-commit hook cho bạn, nhưng cẩn thận thì vẫn hơn.

Gọi `npm run prettilint` để kiểm tra nếu bạn cần định dạng lại mã nguồn - nếu cần, `npm run format` sẽ làm điều đó đối với các file trong `src/`. `npx prettier` [cũng có thể được gọi](https://prettier.io/docs/en/cli.html) nếu cần thiết.

### Giấy phép 
Hestia được phân phối duới giấy phép MIT.
