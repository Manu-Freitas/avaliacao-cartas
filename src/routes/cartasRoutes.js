import express from "express";
import {
  getAllCartas,
  getCartasById,
  createCartas,
  deleteCartas, 
  updateCarta } from "../controllers/cartasController.js";

const router = express.Router();

router.get("/", getAllCartas);
router.get("/:id", getCartasById);
router.post("/", createCartas);
router.delete("/:id", deleteCartas);
router.put("/:id", updateCarta);

export default router;

