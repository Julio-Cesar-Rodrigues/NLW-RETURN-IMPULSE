import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "742905e8361dbf",
    pass: "dfdb90d9003881"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData){
      await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Julio Cesar <juliocrod93@gmail.com>',
    subject,
    html: body,
  })
  }
}