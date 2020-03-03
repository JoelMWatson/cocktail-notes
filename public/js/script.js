(function() {
    // Menu open
    document.querySelector('.header__button').addEventListener('click', (e) => {
        document.querySelector('.navigation').classList.toggle('show-menu');
    });

    // Menu close
    document.querySelector('.navigation__button').addEventListener('click', (e) => {
        document.querySelector('.navigation').classList.toggle('show-menu');
    });



})();