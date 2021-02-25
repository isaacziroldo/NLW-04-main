import nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer';


class SendMailService {

    private client: Transporter

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
        })
    }
    
    async execute(){

    }
}

export { SendMailService }