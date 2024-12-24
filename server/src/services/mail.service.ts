import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const nodemailerOptions = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

class MailService {
  transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(nodemailerOptions);
  }

  async sendForgotPasswordMail(email: string, activationLink: string) {
    try {
      await this.transporter.sendMail({
        from: `Dilshod Rofiyev ${process.env.SMTP_USER!}`,
        to: email,
        subject: `Forgot Password! This email can be used during 15 minutes!`,
        html: `<div>
                <br/>
                <h1>Dilshod R. Advanced Backend course Forgot Password Link</h1>
                <div>
                  <p> Dear, <span class="">${email}</span></p>
                <div>
                  <p>Click the link below to change your account:</p>
                  <a href="${activationLink}" class="activation__btn">Your account will be changed here.</a>
                </div>
              </div>`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendActivationMail(email: string, activationLink: string) {
    try {
      await this.transporter.sendMail({
        from: `Dilshod Rofiyev ${process.env.SMTP_USER!}`,
        to: email,
        subject: `Hello Dear, Your activation link here!`,
        html: `<div>
                <br/>
                <h1>Dilshod R. Advanced Backend course Activation Link</h1>
                <div>
                  <p> Dear, <span class="">${email}</span></p>
                <div>
                  <p>Click on the following link to activate your account:</p>
                  <a href="${activationLink}" class="activation__btn">Activate your account here</a>
                </div>
              </div>`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MailService();
