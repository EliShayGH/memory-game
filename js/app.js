
class Stack
{
    constructor()
    {
        this.items = [];
    }

    push(element)
    {
        this.items.push(element);
    }

    peek()
    {
        return this.items[this.items.length - 1];
    }

    pop()
    {
        if (this.items.length == 0)
        {
            return "Underflow";
        }

        return this.items.pop();
    }

    size()
    {
        return this.item.length;
    }
}

arrangeDeck();




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
* Create a list that holds all of your cards
*/
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

function arrangeDeck()
{

    const cards_array = shuffle([].slice.call(document.body.querySelectorAll('.deck .card')));

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 16; i++)
    {
        cards_array[i].addEventListener('click',cardOpen);
        fragment.appendChild(cards_array[i]);
    }

    document.querySelector('.deck').appendChild(fragment);
}


var stack = new Stack();
let counter = 0;
let card1 = null, card2 = null;
let moves = 0;

document.querySelector('span.moves').innerHTML = moves;

function cardOpen()
{
    this.className += " open show";
    counter++;
    console.log('conuter = '+counter);
    if (counter % 2 == 0)
    {
        setClickAbility(false);

        card1 = stack.peek();
        card2 = this;

        if (card1.querySelector('i').className === card2.querySelector('i').className)
        {
            card1.className = "card match";
            card1.removeEventListener('click',cardOpen);

            card2.className += "card match";
            card2.removeEventListener('click',cardOpen);

            stack.push(card2);

            setClickAbility(true);
        }

        else
        {
            setTimeout(function(){
                card1.className = "card";
                stack.pop();
                card2.className = "card";
                setClickAbility(true);
            }, 900);

        }

        updateStatus();

    }

    else
    {
        stack.push(this);
    }

}


let num_of_stars = 3;

function updateStatus()
{
    const stars = document.querySelector('.stars');
    document.querySelector('span.moves').innerHTML = ++moves;

    do
    {
        if (num_of_stars === 1)
            break;

        if ((num_of_stars === 3) && (moves < 15))
        {
            break;
        }

        if ((num_of_stars === 2) && (moves < 21))
        {
            break;
        }

    -- num_of_stars;

    stars.removeChild(document.querySelector('.stars li'));

    }while(false);
}

function setClickAbility(status)
{
    document.querySelector('.deck').className = (status) ? "deck" : "deck unclickable";
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */





// stack.push(10);
// stack.push(20);
// stack.push(30);
//
//
//
// delete stack;
