import express from 'express';
import { protectRoute } from "../middlewares/auth.middleware.js"
import { createEvent, deleteEvent, getEevents, updateEvent } from '../controllers/eventsControllers.js';
const router = express.Router();

router.get("/", protectRoute, getEevents)
router.post("/create", protectRoute, createEvent)
router.delete("/delete/:eventId", protectRoute, deleteEvent)
router.put("/update/:eventId", protectRoute, updateEvent)
export default router;