$(document).ready(function () {
    gsap.set('#wrapper-ajustado', { x: -250 });
    gsap.set('#btn-prev', { scale: 0 });

    gsap.registerPlugin();

    const datosOrganos = {
        rinones: {
            titulo: "Los Riñones",
            color: "#ff6e79",
            descripcion: "Son dos órganos simétricos con forma de frijol ubicados en la parte posterior del abdomen. Actúan como potentes estaciones de filtrado continuo: procesan toda la sangre de nuestro cuerpo unas 40 veces al día para remover toxinas, urea y sustancias de desecho, mezclándolas con agua para dar origen a la orina.",
            imagenes: ["assets/images/rinon_completo.png", "assets/images/rinon_mitad.png"]
        },
        urete: {
            titulo: "Los Uréteres",
            color: "#ffcc00",
            descripcion: "Son dos conductos delgados y musculosos que miden aproximadamente entre 25 y 30 centímetros de longitud. Conectan la pelvis renal de cada riñón con la base de la vejiga. Su función es propulsar de forma segura la orina hacia abajo mediante contracciones rítmicas automáticas llamadas movimientos peristálticos.",
            imagenes: ["assets/images/ureteres.png"]
        },
        uretra: {
            titulo: "Vejiga y Uretra",
            color: "#1dd1a1",
            descripcion: "La vejiga es un órgano muscular hueco y altamente distensible que almacena temporalmente la orina hasta alcanzar su capacidad óptima (aprox. 300-500 ml). Al llenarse, el sistema nervioso activa el reflejo de micción. Finalmente, la uretra es el conducto terminal que evacua la orina hacia el exterior del organismo.",
            imagenes: ["assets/images/vejiga_uretra.png"]
        }
    };

    let organoActivoKey = null;
    let slideIndexActivo = 0;
    let simuladorInicializado = false;

    const rinonDerecho = document.querySelector("#rinon_derecho");
    const rinonIzquierdo = document.querySelector("#rinon_izquierdo");
    const arterias = document.querySelector("#arterias");
    const titulo = document.querySelector(".portada-titulo");
    const subtitulo = document.querySelector(".portada-subtitulo");

    const tl = gsap.timeline();

    tl.from([arterias, rinonDerecho, rinonIzquierdo, titulo, subtitulo], {
        scale: 0.85,
        duration: 0.7,
        ease: "back.out(1.7)",
        transformOrigin: "50% 50%",
        stagger: 0.1
    })
        .add(() => {
            gsap.to(rinonDerecho, {
                rotation: 4,
                duration: 1.8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                transformOrigin: "50% 50%"
            });

            gsap.to(rinonIzquierdo, {
                rotation: -4,
                duration: 2.1,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                transformOrigin: "50% 50%",
                delay: 0.3
            });
        });

    gsap.to('#rinon_derecho_p5', {
        rotation: -4,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%"
    });

    gsap.to('#rinon_izquierdo_p5', {
        rotation: 4,
        duration: 1.7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
        delay: 0.2
    });

    $('#libro').turn({
        width: 1000,
        height: 600,
        autoCenter: false,
        acceleration: true,
        gradients: true,
        elevation: 50
    });

    $('#libro').bind('turning', function (event, page, view) {

        if (page === 1) {
            gsap.to('#wrapper-ajustado', { x: -250, duration: 0.5, ease: 'power2.inOut' });
            $('#sombra-libro').css({ left: '500px', width: '500px' });
            gsap.to('#btn-prev', { scale: 0, duration: 0.3, ease: 'back.in(1.7)' });
            gsap.to('#btn-next', { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });

        } else if (page === $('#libro').turn('pages')) {
            gsap.to('#wrapper-ajustado', { x: 250, duration: 0.5, ease: 'power2.inOut' });
            $('#sombra-libro').css({ left: '0px', width: '500px' });
            gsap.to('#btn-prev', { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
            gsap.to('#btn-next', { scale: 0, duration: 0.3, ease: 'back.in(1.7)' });

        } else {
            gsap.to('#wrapper-ajustado', { x: 0, duration: 0.5, ease: 'power2.inOut' });
            $('#sombra-libro').css({ left: '0px', width: '1000px' });
            gsap.to('#btn-prev', { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
            gsap.to('#btn-next', { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
            if (page === 4 || page === 5) {
                gsap.fromTo('.burbuja-comic',
                    { scale: 0 },
                    { scale: 1, duration: 0.6, ease: "back.out(2)", delay: 0.4 }
                );
            }
            if ((page === 8 || page === 9) && !simuladorInicializado) {

                simuladorInicializado = true;
                gsap.to("#svg-sistema-excretor", { y: -14, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
                gsap.to("#sombra-sistema-3d", { scale: 0.75, opacity: 0.05, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

                $(document).on("mouseenter", ".organo-interactivo", function () {
                    const idOrgano = $(this).attr("id");
                    const info = datosOrganos[idOrgano];
                    if (info) {
                        $("#tooltip-mapa span").text(info.titulo);
                        $("#tooltip-mapa").css("background-color", info.color);
                        gsap.to("#tooltip-mapa", { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(1.5)" });
                    }
                });

                $(document).on("mousemove", ".organo-interactivo", function (e) {
                    const contenedorOffset = $(".contenido-mapa-interactivo").offset();
                    const posicionX = e.pageX - contenedorOffset.left;
                    const posicionY = e.pageY - contenedorOffset.top;
                    gsap.to("#tooltip-mapa", { left: posicionX, top: posicionY - 15, duration: 0.05, ease: "power1.out" });
                });

                $(document).on("mouseleave", ".organo-interactivo", function () {
                    gsap.to("#tooltip-mapa", { scale: 0, opacity: 0, duration: 0.1 });
                });

                $(document).on("click", ".organo-interactivo", function () {
                    const idOrgano = $(this).attr("id");
                    const info = datosOrganos[idOrgano];
                    if (!info) return;

                    organoActivoKey = idOrgano;
                    slideIndexActivo = 0;

                    $("#pantalla-espera-panel").addClass("oculto");
                    $("#contenido-organo-panel").removeClass("oculto");
                    $("#panel-titulo-organo").text(info.titulo).css("color", info.color);
                    $("#panel-texto-descripcion").text(info.descripcion);

                    renderizarSlideOrgano(info);

                    gsap.fromTo("#contenido-organo-panel", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
                });
            }
        }
    });


    function renderizarSlideOrgano(info) {
        const totalSlides = info.imagenes.length;
        $("#panel-imagen-organo").attr("src", info.imagenes[slideIndexActivo]);
        if (totalSlides > 1) {
            $(".flecha-slider").removeClass("oculto");
            $("#indicador-slide-vista").text(`Vista ${slideIndexActivo + 1} de ${totalSlides}`).removeClass("oculto");
        } else {
            $(".flecha-slider").addClass("oculto");
            $("#indicador-slide-vista").addClass("oculto");
        }
    }

    $(document).on("click", "#slider-btn-next", function() {
        const info = datosOrganos[organoActivoKey];
        slideIndexActivo = (slideIndexActivo < info.imagenes.length - 1) ? slideIndexActivo + 1 : 0;
        gsap.fromTo("#panel-imagen-organo", { opacity: 0.3, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power1.out" });
        renderizarSlideOrgano(info);
    });

    $(document).on("click", "#slider-btn-prev", function() {
        const info = datosOrganos[organoActivoKey];
        slideIndexActivo = (slideIndexActivo > 0) ? slideIndexActivo - 1 : info.imagenes.length - 1;
        gsap.fromTo("#panel-imagen-organo", { opacity: 0.3, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power1.out" });
        renderizarSlideOrgano(info);
    });

    $('#btn-next').click(function () {
        $('#libro').turn('next');
    });

    $('#btn-prev').click(function () {
        $('#libro').turn('previous');
    });

});