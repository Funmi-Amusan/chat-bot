import nodemailer from 'nodemailer';

 const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: 'maryamusan77@gmail.com', 
    pass: 'kzbvklpfxildhjv'
  }
});

export default transporter;
