import { uploadFileController } from "../controllers/uploadFile.controller";
import { Router } from "express";
import multer from "multer";
import { fileMiddleware } from "../middlewares/file.middleware";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

export const uploadFileRouter = router.post(
  "/",
  upload.single("file"),
  fileMiddleware.checkFileExistence,
  uploadFileController.post,
);
