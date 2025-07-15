let koszyk = [];

function dodajDoKoszyka(id) {
  const produkt = produkty.find(p => p.id === id);
  koszyk.push(produkt);
  aktualizujKoszyk();
}

function aktualizujKoszyk() {
  const lista = document.getElementById("koszyk-lista");
  const sumaEl = document.getElementById("suma");
  lista.innerHTML = "";
  let suma = 0;
  koszyk.forEach((p, index) => {
    suma += p.cena;
    const item = document.createElement("li");
    item.textContent = `${p.nazwa} – ${p.cena} zł`;
    lista.appendChild(item);
  });
  sumaEl.textContent = `Suma: ${suma} zł`;
}

function pokazFormularz() {
  document.getElementById("formularz").style.display = "block";
  window.scrollTo({ top: document.getElementById("formularz").offsetTop, behavior: 'smooth' });
  const poleProdukty = document.getElementById("pole-produkty");
  const podsumowanie = koszyk.map(p => `${p.nazwa} (${p.cena} zł)`).join(", ");
  poleProdukty.value = podsumowanie;
}

const form = document.getElementById("zamowienie-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const dane = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: dane,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        form.style.display = "none";
        document.getElementById("potwierdzenie").style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Coś poszło nie tak. Spróbuj ponownie.");
      }
    })
    .catch(() => alert("Błąd sieci. Spróbuj później."));
  });
}
