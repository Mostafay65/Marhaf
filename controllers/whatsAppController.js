import whatsAppService from "../services/whatsAppService.js";
import catchAsync from "../utilities/catchAsync.js";
import httpStatusText from "../helpers/httpStatusText.js";
import appError from "../utilities/appError.js";

/**
 * Initialize WhatsApp session.
 */
export const initializeSession = catchAsync(async (req, res, next) => {
    await whatsAppService.initialize();

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "WhatsApp session initialized successfully.",
    });
});

export const sendMessage = catchAsync(async (req, res, next) => {
    const { phoneNumber, otp } = req.body;
    
    if (!phoneNumber || !otp) {
        return next(new appError("Phone number and OTP are required.", 400));
    }

    await whatsAppService.sendMessage(phoneNumber, otp);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Message sent successfully.",
    });
});
