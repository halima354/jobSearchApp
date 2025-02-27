import { Router } from "express";
const router= Router()
import *as userService from './services/user.service.js'
import { authentication} from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from './services/user.validation.js'
import { fileValidationTypes } from "../../utils/multer/cloud.multer.js";
import { uploadCloudFile } from "../../utils/multer/cloud.multer.js";
router.get('/profile',
    authentication(),
    userService.getProfile)

router.get('/:userId/antherProfile',
    validation(validators.getAntherProfile),
        authentication(),
        userService.getAntherProfile)

router.patch('/updateProfile',
    validation(validators.updateProfile),
    authentication(),
    userService.updateProfile)

router.patch('/updatePassword',
    validation(validators.updatePassword),
    authentication(),
    userService.updatePassword)

router.patch('/uploadImage',
    authentication(),
    uploadCloudFile(fileValidationTypes.image).single("image"),
    validation(validators.uploadImage),
    userService.uploadImage)

router.patch('/uploadCover',
    authentication(),
    uploadCloudFile( fileValidationTypes.image).array("image",5),
    validation(validators.coverImage),
    userService.coverImage)

router.patch('/deleteAccount',
    authentication(),
    userService.deleteAccount)

// router.patch('/deletePic',
//     authentication(),
//     userService.deleteProfilePic)

router.patch('/:userId/deletePic',
    validation(validators.deleteProfilePic),
    authentication(),
    userService.deleteProfilePic)

router.patch('/:userId/deleteCoverPic',
    validation(validators.deleteCover),
    authentication(),
    userService.deleteCoverPic
)
export default router