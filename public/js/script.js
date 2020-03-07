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
                window.location.replace(window.location.origin + "/notes");
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
                window.location.replace(window.location.origin + "/notes");
            },
            error: (xhr,status,error) => {
                console.log(xhr, status, error);
            }
        })
    });

    // Search Recipe
    $('#search').on('submit', (e) => {
        e.preventDefault();
        const data = {
            search: e.target.elements.search.value,
        };
        $.ajax({
            url: '/api',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (result,status,xhr) => {
                result.forEach(current => {
                    let html =
                        `<a href="#modal-${current.idDrink}" rel="modal:open"><div class="search__item">
                            <img src="${current.strDrinkThumb}" alt="${current.strDrink}" class="search__img">
                            <h3 class="tertiary-heading">${current.strDrink}</h3>
                        </div></a>
                        <div id="modal-${current.idDrink}" class="modal">
                            <div class="recipe">
                                <h2 class="heading-secondary">${current.strDrink}</h2>
                                <ul class="recipe__list">`;
                    for (let i = 1; i <= 15; i++) {
                        if (current['strIngredient' + (i + 1)] ==  null) {
                            break;
                        }
                        html += `<li class="recipe__ingredients">${current['strIngredient' + i]} - ${current['strMeasure' + i]}</li>`;
                    }
                    html +=     `</ul>
                                <p class="recipe__instructions">${current.strInstructions}</p>
                            </div>                            
                        </div>`;

                    $(".search__list").append(html);
                });
            },
            error: (xhr,status,error) => {
                console.log(error);
            }
        })
    });

    // create new note
    $('#new-note').on('submit', (e) => {
        e.preventDefault();
        const data = {
            name: e.target.elements.name.value,
            rating: e.target.elements.rating.value,
            description: e.target.elements.description.value
        };
        $.ajax({
            url: '/note',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (note,status,xhr) => {
                let html = `
                <div class="note">
                    <div class="note__side">
                        <h3 class="note__name">${ note.name }</h3>
                        <p class="note__rating">`;
                for (let i=0; i < note.rating; i++) {
                    html += `<ion-icon name="star"></ion-icon>`;
                }
                html +=`</p>
                        <p class="note__text">${ note.description }</p>
                    </div>
                </div>`
                $('.notes__box').append(html);
                $('#new-note').find('input, textarea').val('')
            },
            error: (xhr,status,error) => {
                console.log(xhr, status, error);
            }
        })
    });

    // // turn over notes on click
    // $.each($('.note'), (index, note) => {
    //     note.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         e.target.closest(".note").classList.toggle("turn");
    //     });
    // });


})();