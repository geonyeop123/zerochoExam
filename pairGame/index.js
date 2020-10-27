'use strict';
const width = 3;
const height = 4;
function makeCard(width,height){
    for(let i = 0;i < width;i++){
    const body = document.body;
    const column = document.createElement('div');
    column.className = 'column';
    for(let j=0;j < height;j++){
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    card.appendChild(cardInner);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    (function(c){
        card.addEventListener('click',()=>{
        c.classList.toggle('flipped');
    })
    })(card);
    column.appendChild(card);
    }
    body.appendChild(column);
}
}
makeCard(width,height);
