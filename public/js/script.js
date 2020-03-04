(function() {
    // Menu open
    $('.header__button').on('click', (e) => {
        $('.navigation').toggleClass('show-menu');
    });

    // Menu close
    $('.navigation__button').on('click', (e) => {
        $('.navigation').toggleClass('show-menu');
    });

    // Create Account
    $('#register').on('submit', (e) => {
        e.preventDefault();
        const data = {
            email: e.target.elements.email.value,
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
        };
        $.ajax({
            url: '/user/new',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json'
        }).done((result) => {
            console.log(result)
        })
    });

    // Login Account
    $('#login').on('submit', (e) => {
        e.preventDefault();
        const data = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        };
        $.ajax({
            url: '/user/login',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json'
        }).done((result) => {
            console.log(result)
        })
    });

})();