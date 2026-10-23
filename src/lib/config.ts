export const siteConfig = {
  name: "MARA",
  // TODO: reemplazar por el número real, con código de país y sin "+" (ej. 51999999999)
  whatsappNumber: "51999999999",
  // TODO: reemplazar por el usuario real de Instagram
  instagramUser: "mara.accesorios",
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const instagramUrl = `https://instagram.com/${siteConfig.instagramUser}`;
