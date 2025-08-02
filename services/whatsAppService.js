import appError from "../utilities/appError.js";
import venom from "venom-bot";
import fs from "fs";
import path from "path";

class WhatsAppService {
    static instance;

    constructor() {
        if (WhatsAppService.instance) {
            return WhatsAppService.instance;
        }
        this.clientInstance = null;
        WhatsAppService.instance = this;
    }

    async initialize() {
        if (this.clientInstance) return;

        try {
            this.clientInstance = await venom.create(
                "sessionName",
                async (base64Qr, asciiQR, attempts) => {
                    console.log(asciiQR);
                },
                (statusSession) => {
                    console.log("Session status:", statusSession);
                },
                {
                    headless: "new",
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    logQR: false,
                }
            );
            console.log("WhatsApp session initialized successfully.");
        } catch (error) {
            throw new appError(`Failed to initialize WhatsApp session. ${error}`, 500);
        }
    }

    async sendMessage(phoneNumber, message) {
        if (!this.clientInstance) {
            const sessionPath = path.resolve(`./tokens/sessionName`);
            const sessionExists = fs.existsSync(sessionPath);

            if (sessionExists) {
                await this.initialize();
            } else {
                throw new appError("WhatsApp client is not initialized. Call initialize() first.", 500);
            }
        }

        try {
            const chatId = `${phoneNumber}@c.us`;
            await this.clientInstance.sendText(chatId, message);
        } catch (error) {
            throw new appError(`Failed to send OTP. ${error.message}`, 500);
        }
    }
}

const whatsAppService = new WhatsAppService();
export default whatsAppService;
