import express from "express";
import { create, deleteFood, foodDetails, listFood, updateFood } from "../controllers/foodController.js";
import upload from "../middlewares/multer.js";

const foodRouter = express.Router();

foodRouter.post("/create",upload.single("image"), create);
foodRouter.get("/list-food", listFood)
foodRouter.get("/list-food/:foodId", foodDetails)
foodRouter.patch("/update-food/:foodId", upload.single(" image "), updateFood)
foodRouter.delete("/delete-food/:foodId",deleteFood)

export default foodRouter;
