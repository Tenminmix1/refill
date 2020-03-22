import * as nodemailer from 'nodemailer';

export class Mailer {
  // to: 'bar@example.com, baz@example.com', // list of receivers
  static async sendMail(to: string, subject: string, body: string) {
    return new Promise(async (resolve, reject) => {
      console.log('Start Mailing');
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `"Refill" <${process.env.EMAIL_USER}>`, // sender address
        bcc: to,
        subject: subject, // Subject line
        html: body // html body
      }).catch(e => { console.log(e); reject(); });
      console.log('Message sent: %s', info.messageId);

      resolve();
    });
  }
}
