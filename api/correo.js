export default async function handler(req, res) {
  const { nombre, email } = req.body;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: white; padding: 40px; border-radius: 10px; text-align: center;">
        <h1 style="color: #ffffff; font-family: 'Playfair Display', serif;">SCENTIA</h1>
        <p style="color: #a1a1aa; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">El arte de lo esencial</p>
        <hr style="border-color: #333; margin: 20px 0;">
        <h2 style="color: #fce7f3;">¡Hola ${nombre}!</h2>
        <p style="color: #d1d5db; line-height: 1.6;">Gracias por unirte a nuestra comunidad. Estás a un paso de encontrar la fragancia perfecta para ti.</p>
        <p style="color: #d1d5db; line-height: 1.6;">Como regalo de bienvenida, aquí tienes un código de <strong>20% de descuento</strong> para tu primera compra:</p>
        <div style="background-color: #333; padding: 15px; border-radius: 5px; margin: 30px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 3px;">ESENCIA20</span>
        </div>
        <a href="[https://scentia.mx/](https://scentia.mx/)" style="background-color: #ffffff; color: #000000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">IR A LA TIENDA</a>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: `🖤 Tu acceso exclusivo a SCENTIA, ${nombre}!`,
        html: htmlContent
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar correo' });
  }
}
