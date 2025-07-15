const produktyDiv = document.getElementById('produkty');
const koszykDiv = document.getElementById('koszyk');
const ukrytePole = document.getElementById('ukryte-zamowienie');
const potwierdzenie = document.getElementById('potwierdzenie');
let koszyk = [];

function wyswietlProdukty() {
    produkty.forEach((p, index) => {
        const el = document.createElement('div');
        el.className = 'produkt';
        el.innerHTML = `
            <img src="${p.obraz}" alt="${p.nazwa}">
            <h2>${p.nazwa}</h2>
            <p>${p.opis}</p>
            <p>${p.cena} zł</p>
            <button onclick="dodajDoKoszyka(${index})">Dodaj do koszyka</button>
        `;
        produktyDiv.appendChild(el);
    });
}

function dodajDoKoszyka(i) {
    koszyk.push(produkty[i]);
    aktualizujKoszyk();
}

function aktualizujKoszyk() {
    koszykDiv.innerHTML = '';
    let suma = 0;
    koszyk.forEach(p => {
        const item = document.createElement('div');
        item.textContent = `${p.nazwa} - ${p.cena} zł`;
        koszykDiv.appendChild(item);
        suma += p.cena;
    });
    const sumaEl = document.createElement('div');
    sumaEl.textContent = `Suma: ${suma} zł`;
    koszykDiv.appendChild(sumaEl);
    ukrytePole.value = koszyk.map(p => p.nazwa).join(', ');
}

document.getElementById('formularz').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const dane = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: dane,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.classList.add('ukryte');
            potwierdzenie.classList.remove('ukryte');
        }
    });
});

wyswietlProdukty();
