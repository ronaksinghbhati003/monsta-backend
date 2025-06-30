let nodemailer=require("nodemailer");

let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',//Gmail SMTP protocol
    port:587,
    secure:false,
    auth:{
        user:"singhbhatironak2004@gmail.com",
        pass:"ldszosxkfxjspluu"
    }
})


module.exports={transporter};