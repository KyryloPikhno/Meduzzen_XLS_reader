import express, { Response } from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import bodyParser from 'body-parser';

interface MulterRequest extends express.Request {
  file?: Express.Multer.File;
  body: { invoicingMonth: string };
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

app.post(
  '/upload',
  upload.single('file'),
  (req: MulterRequest, res: Response) => {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const invoicingMonth = req.body.invoicingMonth;
    const currencyRates: Record<string, number> = {}; // Заполните курсы валют из файла

    const invoicesData = data
      .filter((row: any) => row.Status === 'ready' || row['Invoice #'])
      .map((row: any) => {
        const validationErrors: string[] = [];

        return { ...row, validationErrors };
      });

    res.json({
      InvoicingMonth: invoicingMonth,
      currencyRates,
      invoicesData,
    });
  },
);

app.listen(3000, () => console.log('Server started on port 3000'));
