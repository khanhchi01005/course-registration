## Test Login API
```
curl -X POST http://127.0.0.1:5000/api/credentials/login \
     -H "Content-Type: application/json" \
     -d '{"student_code": "SV001", "password": "abc"}'
```
# trên là test với linux ae test thì đổi qua curl cho cmd hoặc pps lưu ý là password chưa xử lí hash nên vào db copy password_hash của students

It should returns:
```
{"data":{"user":{"full_name":"Nguyen Van A","student_code":"SV001"}},"status":"success"}
```