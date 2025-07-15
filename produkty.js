const produkty = [
  {
    id: 1,
    nazwa: "Koszulka URBEX CLASSIC",
    opis: "Czarna koszulka z białym nadrukiem ExploRide, 100% bawełna.",
    cena: 79,
    zdjecie: "img/koszulka1.jpg"
  },
  {
    id: 2,
    nazwa: "Kubek Emaliowany",
    opis: "Kubek z grafiką opuszczonego budynku. Idealny na wyprawy.",
    cena: 39,
    zdjecie: "img/kubek1.jpg"
  },
  {
    id: 3,
    nazwa: "Album Fotograficzny 2025",
    opis: "80 stron zdjęć z najlepszych eksploracji ExploRide.",
    cena: 129,
    zdjecie: "img/album1.jpg"
  },
  {
    id: 4,
    nazwa: "Kalendarz ścienny Urbex 2026",
    opis: "12 miesięcy – 12 opuszczonych miejsc. Format A3.",
    cena: 59,
    zdjecie: "img/kalendarz1.jpg"
  }
];

const kontener = document.getElementById("produkty");

produkty.forEach(produkt => {
  const el = document.createElement("div");
  el.className = "produkt";
  el.innerHTML = `
    <h3>${produkt.nazwa}</h3>
    <img src="${produkt.zdjecie}" alt="${produkt.nazwa}" style="width:100%; border-radius:6px" />
    <p>${produkt.opis}</p>
    <strong>${produkt.cena} zł</strong><br />
    <button onclick="dodajDoKoszyka(${produkt.id})">Dodaj do koszyka</button>
  `;
  kontener.appendChild(el);
});
