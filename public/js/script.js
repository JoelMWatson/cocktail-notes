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
            url: '/user',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (result,status,xhr) => {
                window.location.replace(window.location.origin + "/dashboard");
            },
            error: (xhr,status,error) => {
                console.log(xhr, status, error);
            }
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
            url: '/login',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (result,status,xhr) => {
                window.location.replace(window.location.origin + "/dashboard");
            },
            error: (xhr,status,error) => {
                console.log(xhr, status, error);
            }
        })
    });

    // Search Recipe


})();