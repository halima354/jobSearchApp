import { EventEmitter } from "node:events";
import { nanoid, customAlphabet } from "nanoid";
import { sendEmail, subjectTypes } from "../email/send.email.js";
import { verificationEmailTemplate } from "../email/template/verfication.email.js";
import { generateHash } from "../security/hash.security.js";
import userModel from '../../DB/model/User.model.js'
import * as DBService from '../../DB/DBservice.js'

export const emailEvent = new EventEmitter({});

const sendCode = async ({data, subject = subjectTypes.confirmEmail} = {}) => {
    const {id, email} = data;
    const otp = customAlphabet("0123456789", 4)();
    const html = verificationEmailTemplate({code: otp});
    const text = `Your verification code is: ${otp}`;
    const hash = generateHash({plainText: otp});
    const OTPExpiry = Date.now() + 10 * 60 * 1000;

    let dataUpdate = {};
    switch (subject) {
        case subjectTypes.confirmEmail:
            dataUpdate = {emailOTP: hash, OTPExpiry};
            break;
        case subjectTypes.resetPassword:
            dataUpdate = {forgetPasswordOTP: hash};
            break;
        case subjectTypes.updateEmail:
            dataUpdate = {updateEmailOTP: hash};
            break;
        default:
            break;
    }

    await DBService.updateOne({
        model: userModel,
        filter: {_id: id},
        data: dataUpdate
    });

    await sendEmail({
        to: email,
        subject,
        text,
        html
    });

    console.log("Email sent");
}

emailEvent.on("sendConfirmEmail", async (data) => {
    await sendCode({data, subject: subjectTypes.confirmEmail});
    console.log("Confirmation email sent");
});

emailEvent.on("updateEmail", async (data) => {
    await sendCode({data, subject: subjectTypes.updateEmail});
    console.log("Update email sent");
});

emailEvent.on("sendForgetPassword", async (data) => {
    await sendCode({data, subject: subjectTypes.resetPassword});
    console.log("Password reset email sent");
});


emailEvent.on("sendAcceptedEmail", async(data)=>{
    const{id, email} =data
    const text = `Dear Applicant, your application  has been accepted.`;
    const html = `<p>Dear Applicant,</p><p>Your application <strong> </strong> has been accepted. Congratulations!</p>`;
    await sendEmail({to:email, subject: subjectTypes.acceptedEmail, text, html})
    console.log("email sent");
    
})

emailEvent.on("sendRejectedEmail", async(data)=>{
    const{id, email} =data
    const text = `Dear Applicant, your application has been rejected. We wish you the best of luck in your future endeavors.`;
    const html = `<p>Dear Applicant,</p><p>Your application <strong></strong> has been rejected. We wish you the best of luck in your future endeavors.</p>`;
    await sendEmail({to:email, subject: subjectTypes.rejectedEmail, text, html})
    console.log("email sent");
    
})

