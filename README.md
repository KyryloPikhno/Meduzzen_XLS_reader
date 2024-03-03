## Getting Started

First, run the development server:

```bash
npm run build
# then
npm run dev
```

Script to load the file Test_task.xlsx:

```bash
curl -X POST "http://localhost:3000/upload?invoicingMonth=2024-03" -F "file=@/Users/<YOUR USER>/<YOUR PATH>/Test_task.xlsx
```

or use this setup for Postman:

url:
```bash
http://localhost:3000/upload?invoicingMonth=2024-03
```
<img width="444" alt="Снимок экрана 2024-03-03 в 21 00 12" src="https://github.com/KyryloPikhno/Meduzzen_XLS_reader/assets/108829471/d1f4e99b-2ebe-4d24-9fa6-f497f5f119cb">

## 

File for uploading [Test_task.xlsx](https://github.com/KyryloPikhno/Meduzzen_XLS_reader/files/14474228/Test_task.xlsx)

Test task: https://docs.google.com/document/d/1AzzNz020jp5SwqVKkUviKBsAbnAM2s5aXyzaM6qqoH0/edit

