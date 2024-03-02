## Getting Started

First, run the development server:

```bash
npm run build
# then
npm run dev
```

Script to load the file Test_task.xlsx

```bash
curl -X POST "http://localhost:3000/upload?invoicingMonth=2024-03" -F "file=@/Users/<YOUR USER>/<YOUR PATH>/Test_task.xlsx
```
