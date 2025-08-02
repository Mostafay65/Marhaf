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
    const { phoneNumber, otp, message } = req.body;

    if (!phoneNumber) {
        return next(new appError("Phone number is required.", 400));
    }

    if (message) {
        await whatsAppService.sendMessage(phoneNumber, message);
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: `Message sent successfully. "${message}"`,
        });
    }

    if (!otp) {
        return next(new appError("OTP is required.", 400));
    }

    await whatsAppService.sendMessage(phoneNumber, `Your OTP for Marhaf Application: ${otp}`);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Message sent successfully.",
    });
});
