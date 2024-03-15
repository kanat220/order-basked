let menu_list = document.getElementById("menu_list");
let orders_list = document.getElementById("orders_list");
let sum = document.getElementById("sum");
let count = document.getElementById("count");

const renderMenuItem = (product) => {
  return `
            <div class="card" data-product='${JSON.stringify(
              product
            )}' onclick="AddProduct(event)" >
              <img src="${product.img}" alt="">
              <h1>${product.name}</h1>
              <br>
              <p>${product.price}som</p>
            </div>
    `;
};

const renderMenuList = (List) => {
  let items = [];
  List.map((el, id) => {
    items.push(renderMenuItem(el));
  });
  menu_list.innerHTML = items.join("");
};

const renderOrderItem = (orderItem) => {
  return `
  <div class="product">
   <li> ${orderItem.name}</li>
  <li> Саны ${orderItem.count}</li>
  <li> Суммасы ${orderItem.price}</li> 
  <span class="delete" data-order='${JSON.stringify(orderItem)}'onclick="onDelete(event)">x</span>
  </div>
  `;
};

const RenderOrder = () => {
  let items = [];

  orders_basked.map((el, id) => {
    items.push(renderOrderItem(el));
  });
  orders_list.innerHTML = items.join("");
};

const AddProduct = (event) => {
  let card = JSON.parse(event.target.dataset.product);
  // orders_basked.push(card);
  // console.log(orders_basked);

  let currentIndex = orders_basked.findIndex((el) => el.id == card.id);
  if (currentIndex == -1) {
    orders_basked.push({
      ...card,
      count: 1,
    });
  } else {
    orders_basked[currentIndex].count++;
    orders_basked[currentIndex].price += card.price;
  }
  RenderOrder(orders_basked);
  solvesum();
  totaIl()
};
const solvesum = () => {
  sum.innerHTML = orders_basked.reduce((el,{price})=> el+price,0)
}
const totaIl = () => {
  count.innerHTML = orders_basked.reduce((el,{count})=> el+count,0)
}

const onDelete = (event) => {
  let current_order = JSON.parse(event.target.dataset.order);

  let currentIndex = orders_basked.findIndex((el) => el.id == current_order.id);
  let item_price = menu_listArray.find((el) => el.id == current_order.id).price;

  if (current_order.count > 1){
    orders_basked[currentIndex].count--;
    orders_basked[currentIndex].price -= item_price;
    RenderOrder(orders_basked);
  } else {
    orders_basked.splice(currentIndex, 1);
    RenderOrder(orders_basked);
  }
  solvesum();
  totaIl();
};
renderMenuList(menu_listArray);
