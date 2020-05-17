let flipCard = document.querySelector('.clickable-flipcard');
let isFlipped = false;

flipCard.addEventListener('click', function (e) {
    console.log(this, e.target);
    if (isFlipped) {
        return;
    }

    e.target.closest('.clickable-flipcard').classList.toggle("flipped");
    // this.classList.toggle("flipped");
    isFlipped = true;

    setTimeout(() => {
        this.classList.toggle("flipped");
        isFlipped = false;
    }, 3000);
});
