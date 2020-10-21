let coinArray = []
let selectedItems = [];
let newSelectedItem = null;
const maxItems = 5;
const infoData = {};
let open = false;
const target = document.getElementById('contect');

function init() {

    $("#about").on("click", rezome)
    $("#home").on("click", homeButon)
    $("#favorite").on("click", favorite)

}

function drawModal() {
    if (open) {
        return;
    }
    open = true;
    const modalDiv = document.createElement('div');
    const dialogDiv = document.createElement('div');
    const contentDiv = document.createElement('div');
    const bodyDiv = document.createElement('div');
    const headerDiv = document.createElement('div');
    const footerDiv = document.createElement('div');
    const oneLess = document.createElement('h5');
    oneLess.innerText = "you can select only 5! press close when you select your coins"
    dialogDiv.className = 'modal-dialog';
    contentDiv.className = 'modal-content';
    bodyDiv.className = 'modal-body';
    headerDiv.className = 'modal-header';
    footerDiv.className = 'modal-footer';
    headerDiv.appendChild(oneLess)
    // close modal btn
    const closeModalBtn = document.createElement('button');
    closeModalBtn.className = 'btn btn-primary';
    closeModalBtn.innerText = 'close';
    closeModalBtn.addEventListener('click', closeModal);

    dialogDiv.setAttribute('role', 'document');

    modalDiv.className = 'modal fade show';
    modalDiv.id = 'showSelecteds';
    // seleted items + new item
    const totalItems = selectedItems.concat([newSelectedItem]);
    creatingGoldCards(totalItems, bodyDiv, true);

    modalDiv.appendChild(dialogDiv);
    dialogDiv.appendChild(contentDiv);

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(bodyDiv);
    contentDiv.appendChild(footerDiv);
    headerDiv.appendChild(closeModalBtn);

    modalDiv.appendChild(dialogDiv);
    document.body.appendChild(modalDiv);
}

function closeModal() {
    open = false;
    const modal = document.querySelector('#showSelecteds');
    console.log('modal', modal);
    document.body.removeChild(modal);

    creatingGoldCards(coinArray, target);
}

const curenetCoinSearch = (document.getElementById("searchSymbol").oninput = e => {
    const searchValue = e.target.value;
    const searchData = coinArray.filter(item => item.symbol.includes(searchValue));
    console.log('searchData', searchData);
    creatingGoldCards(searchData, target);

})

function homeButon() {
    creatingGoldCards(coinArray, target)
}

const firstApi = api.getAllCoins();
if (coinArray.length === 0) {
    firstApi.then(coins => {
        

        coinArray = coins
        console.log(coinArray)
        creatingGoldCards(coinArray, target)

    }).catch(res => console.log(err))
}
else {
    creatingGoldCards(coinArray)
}

function creatingGoldCards(coins, target, hideElements) {
    clearContectDiv()

    for (let index = 0; index < coins.length; index++) {
        const coin = coins[index]
        const id = coin.id;
        const cardsHolder = document.createElement("div");
        cardsHolder.setAttribute("class", "holder");


        cardsHolder.id = 'card' + id


        const cardname = document.createElement("h3");
        cardname.setAttribute("class", "coin");
        cardname.innerText = "coin name: " + coin.name
        cardsHolder.appendChild(cardname)

        const cardsymbol = document.createElement("h3");
        cardsymbol.setAttribute("class", "coin");
        cardsymbol.innerText = "coin symbol: " + coin.symbol
        cardsHolder.appendChild(cardsymbol)


        const divLabel = document.createElement('label');
        divLabel.classList.add('switch');

        const divSpan = document.createElement('span');
        divSpan.classList.add('slider');

        const toggleBtn = document.createElement('input');
        toggleBtn.type = 'checkbox';
        toggleBtn.checked = !!selectedItems.find(item => item.id === coin.id);
        toggleBtn.id = id;
        toggleBtn.addEventListener('click', onInput);

        function onInput(event) {
            console.log('coin', coin);
            // on toggle
            const currentIndex = selectedItems.findIndex(card => {
                console.log(card.id, coin.id);
                return card.id === coin.id;
            });
            if (currentIndex !== -1) {
                // found
                selectedItems = selectedItems.filter(card => card.id !== coin.id);
            } else {
                // not found
                console.log('a');
                if (selectedItems.length === maxItems) {
                    event.preventDefault();
                    newSelectedItem = coin;
                    drawModal();
                } else {
                    console.log('push', coin);
                    selectedItems.push(coin);
                }
            }
            console.log('selectedItems', selectedItems);
        }
        divLabel.append(toggleBtn);
        divLabel.appendChild(divSpan);
        cardsHolder.appendChild(divLabel)
        if (!hideElements) {
            const moreInfoButton = document.createElement("button");
            moreInfoButton.setAttribute("class", "btn btn-danger")
            moreInfoButton.innerText = "more info"
            moreInfoButton.addEventListener("click", () => onMoreIfno(id));
            cardsHolder.appendChild(moreInfoButton);

        }



        target.append(cardsHolder)

    }


}

function rezome() {
    clearContectDiv()
    const myImg = document.createElement("div")
    myImg.setAttribute("class", "mypic")
    const mainDiv = document.getElementById("contect");
    const myRezome = document.createElement("div");
    const myName = document.createElement("h2");
    const age = document.createElement("h4");
    const aboutMe = document.createElement("h4");
    const aboutTheProject = document.createElement("h4");
    aboutMe.innerText = "about me: living in tel-aviv and working in john bryce as a Study Advisor"
    aboutTheProject.innerText="on this app you can see all the coins in the world ,you can save 5 coins that you like and see all about them in favorite link. you can see the value of the coin by dolar,shekel and eru "
    age.innerText = "age: 26 ";
    myRezome.setAttribute("class", "rezome")
    myName.innerText = "Silvia Ashorov"
    myRezome.append(myName, age, aboutMe,aboutTheProject)

    mainDiv.append(myImg, myRezome)
}

function favorite () {
    creatingGoldCards(selectedItems, target)
}

function clearContectDiv() {
    const mainDiv = document.getElementById("contect")
    mainDiv.innerHTML = ""
}

function onMoreIfno(id) {
    if (infoData[id]) {

        let div = document.getElementById('collapse' + id);
        if (div.style.display === 'block') {
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
        }
    } else {
      
       
        const colapser = document.getElementById('card' + id);
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute("claas", "collapse")

        const loderDiv = document.createElement("div")
        loderDiv.setAttribute("class", "spinner-border")
        loderDiv.setAttribute("role", "status");

        const loderSpan = document.createElement("span");
        loderSpan.setAttribute("class", "sr-only")
        loderDiv.appendChild(loderSpan)
        colapser.appendChild(loderDiv);

        api.allCoinData(id).then(res => {
            console.log("sec", res)
            colapser.removeChild(loderDiv)
            console.log(colapser.id)
            mainDiv.id = 'collapse' + id;
            mainDiv.style.display = 'block';
            console.log(mainDiv.id)
            const img = document.createElement('img');
            img.src = res.image.small;
            img.width = 100;
            img.height = 100;

            const bydolar = document.createElement('p');
            bydolar.innerHTML = res.market_data.current_price.usd + "$";

            mainDiv.appendChild(bydolar);
            const byeru = document.createElement('p');
            byeru.innerHTML = res.market_data.current_price.eur + "€";
            mainDiv.appendChild(byeru);

            const byils = document.createElement('p');
            byils.innerText = res.market_data.current_price.ils + "₪";
            mainDiv.appendChild(byils);

            mainDiv.appendChild(img);
            console.log(infoData)


            colapser.appendChild(mainDiv);
            infoData[id] = true;

        });
    }
}



init()