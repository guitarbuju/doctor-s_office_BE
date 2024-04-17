import express from "express";
import { createCollaborator } from "../../Controllers/PartnershipHub.controllers/PartnershipHub.Controllers.js";

const collaboratorRouter =express.Router();

// doctorsRouter.get('/collaborators',getAllDoctors);
collaboratorRouter.post('/collaborators',createCollaborator);


export default collaboratorRouter;