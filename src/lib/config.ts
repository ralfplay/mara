export const siteConfig = {
  name: "MARA",
  city: "Trujillo",
  // Número con código de país y sin "+"
  whatsappNumber: "51963599694",
  instagramUser: "maraaccesorios.pe",
  deliveryHours: "de 10:00 a 18:00",
  carriers: ["Shalom", "Olva Courier"],
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const instagramUrl = `https://instagram.com/${siteConfig.instagramUser}`;
