import express from "express";
import { ColumnController } from "../../controllers/column.controller.js";
import { ColumnValidation } from "../../validations/column.validation.js";

const router = express.Router();

router.route("/").post(ColumnValidation.createNew, ColumnController.createNew);

router.route("/:id").put(ColumnValidation.update, ColumnController.update);

export const columnRoutes = router;
