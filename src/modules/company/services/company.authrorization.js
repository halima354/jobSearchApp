import { roleTypes } from "../../../DB/model/User.model.js";

export const endPoint = {
    deleteCompany :[roleTypes.admin, roleTypes.user],
    addCompany:[roleTypes.admin, roleTypes.user],
    searchCompany:[roleTypes.admin, roleTypes.user],
    updateCompany:[roleTypes.admin, roleTypes.user],
    uploadLogo:[roleTypes.admin, roleTypes.user],
    uploadCoverPic:[roleTypes.admin, roleTypes.user],
    deleteLogo:[roleTypes.admin, roleTypes.user],
    deleteCoverPic:[roleTypes.admin, roleTypes.user],
    getCompany:[roleTypes.admin, roleTypes.user],
}