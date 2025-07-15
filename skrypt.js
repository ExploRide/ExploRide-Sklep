function getCart() {
    return JSON.parse(localStorage.getItem('koszyk')) || [];
}

function saveCart(cart) {
    localStorage.setItem('koszyk', JSON.stringify(cart));
}

function addToCart(i) {
    const cart = getCart();
    const found = cart.find(item => item.index === i);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ index: i, qty: 1 });
    }
    saveCart(cart);
    renderCart();
}

function removeFromCart(i) {
    let cart = getCart();
    const found = cart.find(item => item.index === i);
    if (found) {
        found.qty -= 1;
        if (found.qty <= 0) {
            cart = cart.filter(item => item.index !== i);
        }
        saveCart(cart);
    }
    renderCart();
}

function renderProducts() {
    const produktyDiv = document.getElementById('produkty');
    if (!produktyDiv) return;
    produkty.forEach((p, index) => {
        const el = document.createElement('div');
        el.className = 'produkt';
        el.innerHTML = `
            <img src="${p.obraz}" alt="${p.nazwa}">
            <h2>${p.nazwa}</h2>
            <p>${p.opis}</p>
            <p>${p.cena} zł</p>
            <button onclick="addToCart(${index})">Dodaj do koszyka</button>
        `;
        produktyDiv.appendChild(el);
    });
}

function renderCart() {
    const lista = document.getElementById('koszyk-lista');
    const sumaDiv = document.getElementById('koszyk-suma');
    const btn = document.getElementById('btn-zamawiam');
    if (!lista) return;
    const cart = getCart();
    lista.innerHTML = '';
    let suma = 0;
    cart.forEach(item => {
        const p = produkty[item.index];
        const row = document.createElement('div');
        row.className = 'koszyk-item';
        row.innerHTML = `${p.nazwa} x ${item.qty} - ${p.cena * item.qty} zł <button onclick="removeFromCart(${item.index})">Usuń</button>`;
        lista.appendChild(row);
        suma += p.cena * item.qty;
    });
    sumaDiv.textContent = `Suma: ${suma} zł`;
    if (btn) btn.style.display = cart.length ? 'inline-block' : 'none';
}

function prepareOrderForm() {
    const ukrytePole = document.getElementById('ukryte-zamowienie');
    if (!ukrytePole) return;
    const cart = getCart();
    const summary = cart.map(item => `${produkty[item.index].nazwa} x ${item.qty}`).join(', ');
    ukrytePole.value = summary;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    prepareOrderForm();
});

const potwierdzenie = document.getElementById('potwierdzenie');
const form = document.getElementById('formularz');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
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
                if (potwierdzenie) potwierdzenie.classList.remove('ukryte');
                localStorage.removeItem('koszyk');
            }
        });
    });
}

