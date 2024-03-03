import { uploadFileController } from "../controllers/uploadFile.controller";
import { fileMiddleware } from "../middlewares/file.middleware";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

export const uploadFileRouter = router.post(
  "/",
  upload.single("file"),
  fileMiddleware.checkFileExistence,
  uploadFileController.post,
);
