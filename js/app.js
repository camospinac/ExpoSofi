$(document).ready(function () {
    gsap.set('#wrapper-ajustado', { x: -250 });
    gsap.set('#btn-prev', { scale: 0 });

    gsap.registerPlugin();

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
        }
    });

    $('#btn-next').click(function () {
        $('#libro').turn('next');
    });

    $('#btn-prev').click(function () {
        $('#libro').turn('previous');
    });

});