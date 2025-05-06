let total = 0;
function removeProduct(event) {
  const productRow = event.currentTarget.closest('.product');
  const productName = productRow.querySelector('.name span').textContent;


  let cart = JSON.parse(localStorage.getItem('cart')) || [];


  cart = cart.filter(product => product.name !== productName);


  localStorage.setItem('cart', JSON.stringify(cart));


  updateCart();
}

function updateCart() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];


  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';


  total = 0;


  cart.forEach(product => {
    const row = document.createElement('tr');
    row.classList.add('product');

    row.innerHTML = `
      <td class="name"><span>${product.name}</span></td>
      <td class="price">$<span>${product.price.toFixed(2)}</span></td>
      <td class="quantity"><input type="number" value="${product.quantity}" min="0" /></td>
      <td class="subtotal">$<span>${(product.price * product.quantity).toFixed(2)}</span></td>
      <td class="action"><button class="btn btn-remove">הסר</button></td>
    `;
    cartItems.appendChild(row);


    total += product.price * product.quantity;
  });


  const totalElement = document.getElementById('total-value');
  totalElement.textContent =` סה"כ: $${total.toFixed(2)};`


  document.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', removeProduct);
  });
}


window.addEventListener('DOMContentLoaded', updateCart);
paypal.Buttons({
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2)
        }
      }]
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      alert('Payment has been made.' + details.payer.name.given_name);
    });
  },
  onError: function (err) {
    console.error("error", err);
    alert("Payment error try again later.");
  }
}).render('#paypal-button-container');