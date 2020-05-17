let flipCard = document.querySelector('.flip-card');
let isFlipped = false;

flipCard.addEventListener('click', function (e) {
    if (isFlipped) {
        return;
    }
    this.classList.toggle("not-flipped");
    isFlipped = true;

    setTimeout(() => {
        this.classList.toggle("not-flipped");
        isFlipped = false;
    }, 3000);
});
