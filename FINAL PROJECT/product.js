import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
        apiKey:            "AIzaSyB2NBfJuwuFI2gabl3KppJyf8PC0wDqDpc",
        authDomain:        "favorites-716d6.firebaseapp.com",
        projectId:         "favorites-716d6",
        storageBucket:     "favorites-716d6.firebasestorage.app",
        messagingSenderId: "79630871536",
        appId:             "1:79630871536:web:ae298defa17cf3cc090b35",
        measurementId:     "G-D6DS6FG6C7"
      };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// API URL
const apiUrl = 'https://fakestoreapi.com/products';

//add a product by its id, name and price
async function addToCart(event) {
  const productId = event.target.dataset.productId; 
  const productName = event.target.dataset.productName;
  const productPrice = parseFloat(event.target.dataset.productPrice);

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cart.find(product => product.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;     //add 1 to the product
  } else {

    cart.push({              //if the product doesn't exist, push a new product
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1
    });
  }

  
  localStorage.setItem('cart', JSON.stringify(cart));     //take said item from storage and convert it to text


  try {
    await addDoc(collection(db, "cartItems"), {
      productId: productId,
      productName: productName,
      productPrice: productPrice,
      quantity: 1,
      timestamp: new Date()  //indicates the date and time when added to fire store
    });
    console.log('Product added to Firestore');
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
  }
  
  updateCart();
}

//
function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');

  if (!cartItems) return;

  cartItems.innerHTML = '';

  let total = 0;


  cart.forEach(product => {
    const row = document.createElement('tr');
    row.classList.add('product');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td><input type="number" value="${product.quantity}" min="0" /></td>
      <td>$${(product.price * product.quantity).toFixed(2)}</td>
      <td><button class="btn btn-remove">הסר</button></td>
    `;
    cartItems.appendChild(row);

    total += product.price * product.quantity;
  });


  document.getElementById('total-value').textContent =`סה"כ: $${total.toFixed(2)}`;


  document.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', removeProduct);
  });
}


function removeProduct(event) {
  const productName = event.currentTarget.closest('tr').querySelector('td').textContent;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(product => product.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}


async function fetchAndLoadProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    console.log(products);

    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


function displayProducts(products) {
  const productDetails = document.getElementById('product-details');
  productDetails.innerHTML = '';

  products.forEach(product => {
    productDetails.innerHTML += ` 
      <div class="product">
        <h2>${product.title}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <img src="${product.image}" alt="${product.title}">
        <button class="add-to-cart-btn" data-product-id="${product.id}" data-product-name="${product.title}" data-product-price="${product.price}">הוסף לעגלה</button>
      </div>
    `;
  });


  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  fetchAndLoadProducts();
  updateCart();
});

document.getElementById('darkModeToggle').addEventListener('click', function () {

  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    this.textContent = 'Light Mode';
  } else {
    this.textContent = 'Dark Mode'; // 
  }
});
document.getElementById('uploadButton').addEventListener('click', function () {
  this.style.display = 'none';
});