let promise = document.documentElement.requestFullscreen();

        var url = "url.txt";
        var portfolio = "https://a.a";
        var isOnline = false;
        var items = {};
        const alwaysOnline = ['Contato', 'Github', 'Linkedin', 'Instagram'];
        $('.card').each(function (index) {
            var delay = (index + 1) * 0.2;
            $(this).css('animation-delay', delay + 's');
        });


        showToast("Verificando Status...")
        $(document).on('click', '.swal2-image', function() {
            $(this).toggleClass('zoomed');
        });

        $(document).ready(function () {

            $('.carousel img').click(function() {
                Swal.fire({
                    imageUrl: $(this).attr('src'),
                    imageAlt: $(this).attr('alt'),
                    imageWidth: '100%',
                    imageHeight: '100%',
                    footer: false,
                    imageClassList: ['zoomable-image'],
                    showConfirmButton: false,
                    allowOutsideClick: true
                });
            });

            if (window.location.hash) {
                var target = $(window.location.hash);

                if (target.length) {
                    /*var offsetTop = target.offset().top;

                    $('html, body').animate({
                        scrollTop: offsetTop
                    }, 1000);*/

                    target.addClass('highlight');

                    setTimeout(function () {
                        target.removeClass('highlight');
                    }, 3000);
                }
            }
            setInterval(function () {
                fetch(url)
                    .then(response => {
                        if (response.status === 301) {
                            return response.text().then(newUrl => {
                                return fetch(newUrl);
                            });
                        }
                        if (!response.ok) {
                            throw new Error('Erro ao obter o arquivo');
                        }
                        return response.text();
                    })
                    .then(texto => {
                        portfolio = texto;
                        fetch(portfolio + "/healthcheck/index.php")
                            .then(response => {
                                if (response.ok) {
                                    isOnline = true;
                                    updateIndicators();
                                } else {
                                    isOnline = false;
                                    updateIndicators();
                                }
                            })
                            .catch(error => {
                                console.error('Erro no fetch do healthcheck:', error);
                                isOnline = false;
                                updateIndicators();
                            });
                    })
                    .catch(erro => {
                        console.error('Erro:', erro);
                        isOnline = false;
                        updateIndicators();
                    });
            }, 5000);
        });

        function updateIndicators() {

            $('.indicator').each(function () {
                var cardTitle = $(this).closest('.card-body').find('.card-title').text().trim();
                if (alwaysOnline.includes(cardTitle)) {
                    items[cardTitle] = "online";
                    $(this).text('Online').removeClass('offline').addClass('online').fadeIn();
                } else {
                    if (isOnline) {
                        items[cardTitle] = "online";
                        $(this).text('Online').removeClass('offline').addClass('online').fadeIn();
                        $(this).closest('.card-body').find('.btn').fadeIn();
                        if (cardTitle == "Portfólio") {
                            $(this).closest('.card-body').find('.btn').attr('href', portfolio);
                        }
                        if (cardTitle == "Loja") {
                            $(this).closest('.card-body').find('.btn').attr('href', portfolio + "/shop.php");
                        }
                        $(this).closest('.card-body').fadeIn();
                    } else {
                        $(this).text('Offline').removeClass('online').addClass('offline').fadeIn();
                        $(this).closest('.card-body').find('.btn').fadeOut();
                        $(this).closest('.card-body').fadeOut();
                        items[cardTitle] = "offline";
                    }
                }
            });
        }


        function showToast(text = "Carregando", icon = "", time = 5000) {
            sound = false;
            switch (icon) {
                case "success":
                    icon = "assets/success-icon.png";
                    sound = "assets/fx-success.mp3";
                    break;
                case "error":
                    icon = "assets/error-icon.png";
                    sound = "assets/fx-error.mp3";
                    break;
                default:
                    icon = false;
            }

            Toastify({
                text: text,
                duration: time,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                avatar: icon,
                style: {
                    background: "#010C22",
                    color: "#fff",
                    borderRadius: "20px",
                    border: "2px solid #55D0D7",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    padding: "1vh",
                    fontFamily: "Pixel, sans-serif",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    fontSize: "0.8rem",
                }
            }).showToast();

            if (sound) {
                reproduzirSom(sound);
            }

        }

        function reproduzirSom(url) {
            let audio = new Audio(url);
            audio.play();

            audio.addEventListener('ended', function () {
                audio.pause();
                audio.currentTime = 0;
                audio.removeEventListener('ended', arguments.callee);
            });
        }

        function verificarMudanca(objetoAntigo, objetoNovo) {
            var time = 1000;
            for (let chave in objetoNovo) {
                if (objetoNovo.hasOwnProperty(chave)) {
                    if (objetoAntigo[chave] !== objetoNovo[chave]) {
                        console.log(chave + " está " + objetoNovo[chave]);
                        if (objetoNovo[chave] == "online") {
                            showToast(chave.toUpperCase() + " FICOU ONLINE", "success", time)
                        }
                        else {
                            showToast(chave.toUpperCase() + " FICOU OFFLINE", "error", time)
                        }
                        time += 1000;
                    }
                }
            }
        }

        function observarMudancas(objeto) {
            let objetoAntigo = Object.assign({}, objeto);

            setInterval(function () {
                verificarMudanca(objetoAntigo, objeto);
                objetoAntigo = Object.assign({}, objeto);
            }, 1000);
        }

        observarMudancas(items);

        $('.carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 1500,
            dots: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                        dots: true
                    }
                }
            ]
        });

