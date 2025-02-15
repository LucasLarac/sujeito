const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


// abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

//fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    event.target === cartModal ? cartModal.style.display = "none" : null
})

//fechar o modal quando clicar no X
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton){ 
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute ("data-price"))

        addToCart(name, price)
    }
})

//função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 0;

    }else{
        cart.push({
        name,
        price,
        quantity: 1,
        })
        }
    
    updateCartModal()
    
}

function updateCartModal(){
    cartItemsContainer.innerHTML = '';
    let total = 0;


    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium"> ${item.name} </p>
                <br>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>

        </div>
        `


        total += item.price * item.quantity;



        cartItemsContainer.appendChild(cartItemElement)
    })

cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

cartCounter.innerHTML = cart.length;

}


//funcao para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
         const name = event.target.getAttribute("data-name")
    
    removeItemCart(name);
       }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)
    if(index !== -1){
       const item = cart[index]; 

       if(item.quantity > 1){
        item.quantity -= 1;
        updateCartModal();
        return;
       }

       cart.splice(index, 1);
       updateCartModal();
    }
}


addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function(){

    const isOpen = checkOpen();
    if (!isOpen){
        
        Toastify({
            text: "Ops, restaurante nao ta aberto",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();

        return;
    }


    if(cart.lenght === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    //enviar pro zap
    const cartItems = cart.map((item) => {
        return (
            ` ${item.name}  |`
        )
        
    }).join("")


    const message = `Oiee Gabi, tudo bom? aqui sou eu, ${addressInput.value}, escolhi te presentear com o item: ${cartItems} `
    const phone = "5511957455481"
   

    window.open(`https://wa.me/${phone}?text=${message}`, "/blank")

    cart = [];
    updateCartModal();

})

//verificar hora
function checkOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 0.0 && hora < 23.59; // true = restaurante aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}


var dataAtual = new Date();

var dataEvento = new Date(2024, 4, 18);


var diferencaEmMilissegundos = dataEvento - dataAtual;

// Convertendo a diferença de milissegundos para dias
var diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

// Selecione o elemento onde você deseja exibir a diferença em dias
var diferencaEmDiasElement = document.getElementById("diferencaEmDias");

// Defina o conteúdo do elemento como a diferença em dias
diferencaEmDiasElement.textContent = "Faltam " + diferencaEmDias + " dias";
