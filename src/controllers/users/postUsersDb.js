const { User } = require("../../db");
const nodemailer = require("nodemailer");



const postUser = async (name, surName, email, password, rol) => {
  try {
    const maxId = await User.max("id");
    const newId = maxId + 1;
    const user = await User.create({
      id: newId,
      name,
      surName,
      email,
      password,
      rol
    });

   

    await sendWelcomeEmail(name, surName, email);

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};


const sendWelcomeEmail = async (name, surName, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "hostelspremium@gmail.com",
      pass: "ldwy ozei rdof zikm",
    },
  });

  try {
    const message = {
      from: "hostelspremium@gmail.com",
      to: email,
      subject: "¡Bienvenido a Hostels Premium!",
      html: `
         
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
      
        <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Bienvenido a Hostel Premium, ${name} ${surName}!</h2>
        <p style="text-align: center; color: #555; font-size: 16px;">Gracias por unirte a nuestra comunidad. Estamos emocionados de tenerte como parte de Hostel Premium, donde encontrarás todo lo que necesitas para tus aventuras y escapadas.</p>
        <p style="text-align: center; color: #555; font-size: 16px;">Explora nuestras últimas ofertas, disfruta de reservas seguras y mantente al tanto de las últimas tendencias en destinos de viaje.</p>
        <p style="text-align: center; color: #555; font-size: 16px;">Si tienes alguna pregunta o necesitas asistencia, nuestro equipo de soporte está aquí para ayudarte. ¡Esperamos que disfrutes de tu experiencia en Hostel Premium!</p>
        <p style="text-align: center; color: #555; font-size: 16px;">¡Bienvenido y que comience la aventura!</p>
        <p style="text-align: center; color: #888; font-size: 14px;">Atentamente,<br>El equipo de Hostel Premium</p>
    </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log("Correo electrónico de bienvenida enviado:", info);
  } catch (error) {
    console.error("Error al enviar el correo electrónico de bienvenida:", error);
    throw error;
  } finally {
    transporter.close();
  }
};


module.exports = { postUser };