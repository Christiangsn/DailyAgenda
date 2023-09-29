```json
{
    "id": "uuid",
    "fullName": "John Joe Smith",
    "email": "johnjoe@test.com",
    "password": "123456"
}
```

## Structure
```javascript
    USER: Aggregate Root

    id: ValueObject
    fullName: ValueObject
    email: ValueObject
    password: ValueObject
```