import { Router } from "express";
import * as appService from '../App/service/app.service.js'
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import { uploadCloudFile, fileValidationTypes } from "../../utils/multer/cloud.multer.js";
import { endPoint } from "./service/app.authorization.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from './service/application.validation.js'
const router = Router()
router.post("/apply",
    authentication(),
    authorization(endPoint.applyJob),
    uploadCloudFile(fileValidationTypes.document).single("doc"),
    validation(validators.apply),
    appService.applyJob
)
router.patch("/:jobId/app/:applicationId",
    authentication(),
    validation(validators.changStatus),
    appService.changStatusApplication
)
router.get("/:jobId",
    authentication(),
    validation(validators.allApplications),
    appService.getAllApps
)
export default router