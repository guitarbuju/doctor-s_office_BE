import express from "express";
import { createCollaborator, getAllCollaborators } from "../../Controllers/PartnershipHub.controllers/PartnershipHub.Controllers.js";

const collaboratorRouter =express.Router();

collaboratorRouter.get('/collaborators',getAllCollaborators)
collaboratorRouter.post('/collaborators',createCollaborator);


export default collaboratorRouter;