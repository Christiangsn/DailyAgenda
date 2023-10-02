```json
{
    "id": "uuid",
    "title": "Task Name",
    "description": "Agend Daily",
    "dateTime": "'2023-03-12T16:12:21.136Z",
    "duration": "2 hours"
}
```

## Structure
```javascript
    USER: Aggregate Root

    title: string
    description: string
    duration: string

    dateTime: ValueObject
```