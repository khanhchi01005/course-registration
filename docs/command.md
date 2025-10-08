## Test Login API
```
curl -X POST http://127.0.0.1:5000/api/credentials/login \
     -H "Content-Type: application/json" \
     -d '{"student_code": "SV001", "password_hash": "abc"}'
```

It should returns:
```
{"data":{"user":{"full_name":"Nguyen Van A","student_code":"SV001"}},"status":"success"}
```