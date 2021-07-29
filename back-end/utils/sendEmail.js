import nodemailer from "nodemailer";
const sendEmail = (email, uniqueString) => {
  let Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shafiimam78@gmail.com",
      pass: "hcliyxinpjojsrvf",
    },
  });
  let mailOptions;
  let sender = "shafi imam";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Confirm Email Address",
    html: `please verify your email by clicking the link below:
    <a href=http://localhost:5000/api/v1/verify/${uniqueString}>here</a> to verify you email.
    thanks`,
  };

  Transport.sendMail(mailOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("message sent");
    }
  });
};

export default sendEmail;
