let flipCard = document.querySelector('.card');
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
