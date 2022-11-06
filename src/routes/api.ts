import express from 'express';
import {characterContinentApiHandler} from "../handlers/characterContinentApiHandler";

const router = express.Router();

router.get("/character-continent/list", characterContinentApiHandler);

export default router;