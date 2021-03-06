import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  await transport.sendMail({
    from: 'Bienes Raices',
    to: email,
    subject: 'Confirma tu cuenta en BinesRaices.com',
    text: 'Confirma tu cuenta en BienesRaices.com',
    html: `
      <p>Hola ${nombre}, confirma tu cuenta</p>
      <p>Tu cuenta esta lista, solo debes confirmarla en este enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT}/usuario/confirmar/${token}">Confirmar Cuenta</a> </p>
      <p>Si no creaste esta cuenta, ignora este mensaje</p>
    `,
  });
};

export const emailResetPassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  await transport.sendMail({
    from: 'Bienes Raices',
    to: email,
    subject: 'Restabece tu contraseña  en BinesRaices.com',
    text: 'Restabece tu contraseña en BienesRaices.com',
    html: `
      <p>Hola ${nombre}, Has solicitado retablacer tu contraseña</p>
      <p>Solo debes cambiar la contraseña con este enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT}/usuario/olvide-password/${token}">Restablecer Cuenta</a> </p>
      <p>Si no solicitaste este email, ignora este mensaje</p>
    `,
  });
};
