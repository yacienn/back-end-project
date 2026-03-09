const button = document.getElementById("button");
const date  = document.getElementById("date");
const price = document.getElementById("price");
const client = document.getElementById("client");
const product = document.getElementById("product");
const orderList = document.getElementById("orderList");

let orders = [];

button.addEventListener("click", () => {
  let orderItem = {
      Ldate: date.value,
      Lprice: price.value,
      Lclient: client.value,
      Lproduct: product.value
  };

  orders.push(orderItem);

  orderList.innerHTML = ""; // clear previous list

  orders.forEach((order, index) => {
      let div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.margin = "5px 0";
      div.style.borderRadius = "5px";

      div.innerHTML = `
        <strong>Order ${index + 1}</strong><br>
        Client: ${order.Lclient}<br>
        Product: ${order.Lproduct}<br>
        Price: ${order.Lprice}<br>
        Date: ${order.Ldate}
      `;
      orderList.appendChild(div);
  });

  // Clear inputs
  date.value = "";
  price.value = "";
  client.value = "";
  product.value = "";
});