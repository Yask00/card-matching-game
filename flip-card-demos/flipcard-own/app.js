let flipCard = document.querySelector('.flipcard-inner');
// very important click event is on inner not main

let isFlipped = false;

flipCard.addEventListener('click', function (e) {
    if (isFlipped) {
        return;
    }
    this.classList.toggle("flipped");
    isFlipped = true;

    setTimeout(() => {
        this.classList.toggle("flipped");
        isFlipped = false;
    }, 3000);
});
