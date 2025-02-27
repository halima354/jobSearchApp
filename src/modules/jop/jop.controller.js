import { Router } from "express";
import * as jopService from "./service/jop.service.js"
import * as validators from '../../modules/jop/service/jop.validation.js'
import { validation } from "../../middleware/validation.middleware.js";
import {authentication} from '../../middleware/auth.middleware.js'
const router = Router({mergeParams:true})

router.post("/addJop",
    validation(validators.addJob),
    authentication(),
    jopService.addJob
)

router.patch("/:jobId/updatedJob",
    validation(validators.updateJob),
    authentication(),
    jopService.updateJob
)

router.delete("/:jobId/deleteJob",
    validation(validators.deleteJob),
    authentication(),
    jopService.deleteJob
)

router.get("/",
    validation(validators.getJobs),
    authentication(),
    jopService.getJobs
)
router.get("/jobs",
    validation(validators.Jobs),
    authentication(),
    jopService.Jobs
)
export default router