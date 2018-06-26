
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
        return this.items.length;
    }

    popAll()
    {
        for(let i = 0; i < this.items.length; ++i)
        {
            this.items.pop();
        }
    }
}

let time = 0;
let startingTime = 0;

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

let stack = new Stack();


function arrangeDeck()
{
    time = performance.now();
    startingTime = performance.now();

    const cards_array = shuffle([].slice.call(document.body.querySelectorAll('.deck .card')));

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 16; i++)
    {
        cards_array[i].addEventListener('click',cardOpen);
        cards_array[i].className = "card";
        fragment.appendChild(cards_array[i]);
    }

    document.querySelector('.deck').appendChild(fragment);

    // document.querySelector('.finish-msg').style.display = "none";
}

let counter = 0;
let card1 = null, card2 = null;
let moves = 0;

document.querySelector('span.moves').innerHTML = moves;

document.querySelector('.restart').addEventListener('click', restartGame);

function cardOpen()
{
    updateTimer();

    this.className += " open show";
    counter++;

    if (counter % 2 == 0)
    {
        setClickAbility(false); //disable pointer-click events

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
                setClickAbility(true); //anable pointer-click events
            }, 600);

        }

        updateStatus(); //update my moves and stars

        if (stack.size() == 16)
        {
            setClickAbility(false);

            setTimeout(function(){
            showSuccessDialog();
        }, 300);
        }

    }

    else
    {//in case it's the first card push to stack
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


function updateTimer()
{
    time = performance.now();

    document.querySelector('.timer span').innerHTML = generateTime(time, startingTime);

    if (stack.size() < 16)
    {
        setTimeout(updateTimer, 0);
    }

}

function generateTime(end, start)
{
    const time_in_ms = end - start;
    const minutes = Math.floor(time_in_ms / 60000);
    const seconds = ((time_in_ms % 60000) / 1000).toFixed(0);

    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function showSuccessDialog()
{
    document.querySelector('span.finish_stars').innerHTML = num_of_stars;
    document.querySelector('span.finish_time').innerHTML = document.querySelector('.timer span').innerHTML;
    document.querySelector('.finish-msg').style.display = "block";
}

function restartGame()
{
    arrangeDeck();
    document.querySelector('.finish-msg').style.display = "none";
    document.querySelector('span.moves').innerHTML = 0;
    stack.popAll();
    setClickAbility(true);

    const stars = document.querySelector('.stars');
    const star_item = document.querySelector('.stars li').cloneNode(true);

    while (stars.firstChild)
    {
        stars.removeChild(stars.firstChild);
    }

    for (let i = 0; i < 3; ++i)
    {
        document.querySelector('.stars').appendChild(star_item.cloneNode(true));
    }

    num_of_stars = 3;
    moves = 0;

}
