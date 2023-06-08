# Sử dụng image node phiên bản 14.16.1
FROM node:18
# Thiết lập thư mục làm việc trong container
WORKDIR /app
# Copy toàn bộ source code vào container
COPY . .
# Cài đặt các package cần thiết và build ứng dụng ReactJS
RUN npm install
# Expose cổng 3000 để cho phép truy cập vào ứng dụng
EXPOSE 3000
# Thiết lập lệnh chạy ứng dụng trong container
CMD ["npm", "start"]

