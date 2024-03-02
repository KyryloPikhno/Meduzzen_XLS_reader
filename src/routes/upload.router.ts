import { post } from "../controllers/upload.controller";
import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads" });

export const uploadRouter = router.post("/", upload.single("file"), post);
