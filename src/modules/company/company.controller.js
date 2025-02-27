import { Router } from "express";
import * as companyService from './services/company.service.js'
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from '../company/services/company.validation.service.js'
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import jobController from '../jop/jop.controller.js'
import { fileValidationTypes, uploadCloudFile } from "../../utils/multer/cloud.multer.js";
import { endPoint } from "./services/company.authrorization.js";
const router= Router()
router.use("/:companyId/job", jobController);

router.post("/addCompany",
    authentication(),
    authorization(endPoint.addCompany),
    uploadCloudFile(fileValidationTypes.document).single("doc"),
    validation(validators.addCompany),
    companyService.addCompany
)

router.patch("/:companyId",
    validation(validators.updateCompany),
    authentication(),
    companyService.updateCompany
)

router.patch("/:companyId/delete",
    validation(validators.deleteCompany),
    authentication(),
    authorization(endPoint.deleteCompany),
    companyService.deleteCompany
)

router.get("/search",
    validation(validators.searchCompany),
    authentication(),
    authorization(endPoint.searchCompany),
    companyService.search
)

router.patch("/:companyId/uploadLogo",
    authentication(),
    authorization(endPoint.uploadLogo),
    uploadCloudFile(fileValidationTypes.image).single("logo"),
    validation(validators.uploadLogo),
    companyService.uploadLogo
)

router.patch("/:companyId/uploadCoverPic",
    authentication(),
    authorization(endPoint.uploadCoverPic),
    uploadCloudFile(fileValidationTypes.image).array("image",3),
    validation(validators.uploadCoverImage),
    companyService.uploadCoverImage
)

router.patch("/:companyId/deleteLogo",
    validation(validators.deleteLogo),
    authentication(),
    authorization(endPoint.deleteLogo),
    companyService.deleteLogo
)

router.patch("/:companyId/deleteCoverPic",
    validation(validators.deleteCoverPic),
    authentication(),
    authorization(endPoint.deleteCoverPic),
    companyService.deleteCoverPic
)

router.get('/:companyId',
    validation(validators.getCompany),
    authentication(),
    authorization(endPoint.getCompany),
    companyService.getCompany)
export default router