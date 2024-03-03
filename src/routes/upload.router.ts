import { post } from "../controllers/upload.controller";
import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

export const uploadRouter = router.post("/", upload.single("file"), post);
