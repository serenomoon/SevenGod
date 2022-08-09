import React from 'react'
import AOS from 'aos';
import { useEffect } from 'react';

export const Home = () => {

    'use strict'

    AOS.init({
		duration: 800,
		easing: 'slide',
		once: true
	});

    var preloader = function() {

		var loader = document.querySelector('.loader');
		var overlay = document.getElementById('overlayer');

		function fadeOut(el) {
			el.style.opacity = 1;
			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		};

		setTimeout(function() {
			fadeOut(loader);
			fadeOut(overlay);
		}, 200);
	};
	

    var tinySdlier = function() {

		var heroSlider = document.querySelectorAll('.hero-slide');
		var propertySlider = document.querySelectorAll('.property-slider');
		var imgPropertySlider = document.querySelectorAll('.img-property-slide');
		var testimonialSlider = document.querySelectorAll('.testimonial-slider');
		

		if ( heroSlider.length > 0 ) {
			var tnsHeroSlider = tns({
				container: '.hero-slide',
				mode: 'carousel',
				speed: 700,
				autoplay: true,
				controls: false,
				nav: false,
				autoplayButtonOutput: false,
			});
		}


		if ( imgPropertySlider.length > 0 ) {
			var tnsPropertyImageSlider = tns({
				container: '.img-property-slide',
				mode: 'carousel',
				speed: 700,
				items: 1,
				gutter: 30,
				autoplay: true,
				controls: false,
				nav: true,
				autoplayButtonOutput: false
			});
		}

		if ( propertySlider.length> 0 ) {
			var tnsSlider = tns({
				container: '.property-slider',
				mode: 'carousel',
				speed: 700,
				gutter: 30,
				items: 3,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#property-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}


		if ( testimonialSlider.length> 0 ) {
			var tnsSlider = tns({
				container: '.testimonial-slider',
				mode: 'carousel',
				speed: 700,
				items: 3,
				gutter: 50,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#testimonial-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}
	};


    /////////////////////////////////////////////////

    var siteMenuClone = function() {
        var jsCloneNavs = document.querySelectorAll('.js-clone-nav');
        var siteMobileMenuBody = document.querySelector('.site-mobile-menu-body');
        


        jsCloneNavs.forEach(nav => {
            var navCloned = nav.cloneNode(true);
            navCloned.setAttribute('class', 'site-nav-wrap');
            siteMobileMenuBody.appendChild(navCloned);
        });

        setTimeout(function(){

            var hasChildrens = document.querySelector('.site-mobile-menu').querySelectorAll('.has-children');

            var counter = 0;
            hasChildrens.forEach( hasChild => {
                
                var refEl = hasChild.querySelector('a');

                var newElSpan = document.createElement('span');
                newElSpan.setAttribute('class', 'arrow-collapse collapsed');

                // prepend equivalent to jquery
                hasChild.insertBefore(newElSpan, refEl);

                var arrowCollapse = hasChild.querySelector('.arrow-collapse');
                arrowCollapse.setAttribute('data-bs-toggle', 'collapse');
                arrowCollapse.setAttribute('data-bs-target', '#collapseItem' + counter);

                var dropdown = hasChild.querySelector('.dropdown');
                dropdown.setAttribute('className', 'collapse');
                dropdown.setAttribute('id', 'collapseItem' + counter);

                counter++;
            });

        }, 1000);


        // Click js-menu-toggle

        var menuToggle = document.querySelectorAll(".js-menu-toggle");
        var mTog;
        menuToggle.forEach(mtoggle => {
            mTog = mtoggle;
            mtoggle.addEventListener("click", (e) => {
                if ( document.body.classList.contains('offcanvas-menu') ) {
                    document.body.classList.remove('offcanvas-menu');
                    mtoggle.classList.remove('active');
                    mTog.classList.remove('active');
                } else {
                    document.body.classList.add('offcanvas-menu');
                    mtoggle.classList.add('active');
                    mTog.classList.add('active');
                }
            });
        })



        var specifiedElement = document.querySelector(".site-mobile-menu");
        var mt, mtoggleTemp;
        document.addEventListener('click', function(event) {
            var isClickInside = specifiedElement.contains(event.target);
            menuToggle.forEach(mtoggle => {
                mtoggleTemp = mtoggle
                mt = mtoggle.contains(event.target);
            })

            if (!isClickInside && !mt) {
                if ( document.body.classList.contains('offcanvas-menu') ) {
                    document.body.classList.remove('offcanvas-menu');
                    mtoggleTemp.classList.remove('active');
                }
            }

        });

    };

    //////////////////////////////////////////////

    // How long you want the animation to take, in ms
    const animationDuration = 2000;
    // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
    const frameDuration = 1000 / 60;
    // Use that to calculate how many frames we need to complete the animation
    const totalFrames = Math.round( animationDuration / frameDuration );
    // An ease-out function that slows the count as it progresses
    const easeOutQuad = t => t * ( 2 - t );


    const numberWithCommas = n => {
    	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');	
    }

    // The animation function, which takes an Element
    const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10 );
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = numberWithCommas(currentCount);
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

    // Run the animation on all elements with a class of ‘countup’
    const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
	countupEls.forEach( animateCountUp );
};




// In Viewed
    var elements;
    var windowHeight;
    
    function init() {
    	elements = document.querySelectorAll('.section-counter');
    	windowHeight = window.innerHeight;
    }
    
//     function checkPosition() {
// 	var i;
// 	for (i = 0; i < elements.length; i++) {
// 		var element = elements[i];
// 		var positionFromTop = elements[i].getBoundingClientRect().top;
// 		if (positionFromTop - windowHeight <= 0) {
// 			if( !element.classList.contains('viewed') ) {
// 				element.classList.add('viewed');
// 				runAnimations();
// 			} else {
// 				if ( element.classList.contains('viewed') ) {

// 				}
// 			}

// 		}
// 	}
// }

    // window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    // checkPosition();
    ///////////////////////////////////////////////
    useEffect(() => {
        siteMenuClone();
        tinySdlier();
        preloader();
        init();
        // checkPosition();
    }, [])
    
    
    return (
        <>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icofont-close js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>
        
            <nav className="site-nav">
              <div className="container">
                <div className="menu-bg-wrap">
                  <div className="site-navigation">
                    <a href="index.html" className="logo m-0 float-start">Seven God</a>
        
                    <ul
                      className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end"
                    >
                      <li className="active"><a href="index.html">Inicio</a></li>
                      <li className="has-children">
                        <a href="properties.html">Productos</a>
                        <ul className="dropdown">
                          <li><a href="#">Rosa Aromatica</a></li>
                          <li><a href="#">Cactus</a></li>
                          <li className="has-children">
                            <a href="#">Repuesto Unico</a>
                            <ul className="dropdown">
                              <li><a href="#">Jazmin</a></li>
                              <li><a href="#">Lavanda</a></li>
                              <li><a href="#">Rosa</a></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li><a href="services.html">Franquicia</a></li>
                      <li><a href="about.html">Aromas</a></li>
                      <li><a href="contact.html">Contacto</a></li>
                    </ul>
        
                    <a
                      href="#"
                      className="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none"
                      data-toggle="collapse"
                      data-target="#main-navbar"
                    >
                      <span></span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
        
            <div className="hero">
                <div className="hero-slide">
                    <div
                        className="img overlay"
                        style={{backgroundImage: "url('images/hero_bg_3.jpg')"}}>
                    </div>
                    <div
                        className="img overlay"
                        style={{backgroundImage: "url('images/hero_bg_2.jpg')"}}>
                    </div>
                    <div
                      className="img overlay"
                      style={{backgroundImage: "url('images/hero_bg_1.jpg')"}}>
                    </div>
                </div>
        
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-9 text-center">
                            <h1 className="heading" data-aos="fade-up">
                                El aroma que tu hogar necesita
                            </h1>
                            <form
                              action="#"
                              className="narrow-w form-search d-flex align-items-stretch mb-3"
                              data-aos="fade-up"
                              data-aos-delay="200"
                            >
                                <input
                                  type="text"
                                  className="form-control px-4"
                                  placeholder="¿Que estas buscando?"
                                />
                                <button type="submit" className="btn btn-primary">Buscar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="section">
                <div className="container">
                    <div className="row mb-5 align-items-center">
                        <div className="col-lg-6">
                            <h2 className="font-weight-bold text-primary heading">
                                Productos Populares
                            </h2>
                        </div>
                        <div className="col-lg-6 text-lg-end">
                            <p>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="btn btn-primary text-white py-3 px-4"
                                >
                                    Ver todos   
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="property-slider-wrap">
                                <div className="property-slider">
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_1.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">Pinche con silueta calada</span>
                                                <span className="city d-block mb-3">Pinche</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                >
                                                    Ver detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_2.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Rosa difusora tallada en piedra
                                                </span>
                                                <span className="city d-block mb-3">Rosa Cirse</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3">
                                                        Ver detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_3.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Cactus con maceta
                                                </span>
                                                <span className="city d-block mb-3">Cactus</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                >Ver detalles</a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_4.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Varilla de madera con flor tallada
                                                </span>
                                                <span className="city d-block mb-3">Varilla Flor</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                >
                                                    Ver detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_5.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Cuenco con piedras aromaticas
                                                </span>
                                                <span className="city d-block mb-3">Cuenco Aromatico</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                >
                                                    Ver detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                          <img src="images/img_6.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Flor con mecha absorbente
                                                </span>
                                                <span className="city d-block mb-3">Flor de Loto</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                >
                                                    Ver detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_7.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Extracto aromatico para recarga
                                                </span>
                                                <span className="city d-block mb-3">Repuesto Unico</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                    >
                                                        Ver detalles
                                                    </a>
                                            </div>
                                        </div>
                                    </div>
        
        
                                    <div className="property-item">
                                        <a href="property-single.html" className="img">
                                            <img src="images/img_8.jpg" alt="Image" className="img-fluid" />
                                        </a>
        
                                        <div className="property-content">
                                            <div className="price mb-2"><span>$1000</span></div>
                                            <div>
                                                <span className="d-block mb-2 text-black-50">
                                                    Aromatizante para telas
                                                </span>
                                                <span className="city d-block mb-3">Perfuminas</span>
        
                                                <a
                                                    href="property-single.html"
                                                    className="btn btn-primary py-2 px-3"
                                                >
                                                    Ver detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
        
                                </div>
        
                                <div
                                    id="property-nav"
                                    className="controls"
                                    tabIndex="0"
                                    aria-label="Carousel Navigation"
                                >
                                    <span
                                        className="prev"
                                        data-controls="prev"
                                        aria-controls="property"
                                        tabIndex="-1"
                                    >
                                        Ant
                                    </span>
                                    <span
                                        className="next"
                                        data-controls="next"
                                        aria-controls="property"
                                        tabIndex="-1"
                                    >
                                        Sig
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <section className="features-1">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-3 animate__animated animate__fadeInUp animate__delay-1s">
                            <div className="box-feature">
                                <i class="fa fa-globe" aria-hidden="true" style={{fontSize:"5vw",color:"#c5d23b"}}></i>
                                <h3 className="mb-3">Planet Friendly</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Voluptates, accusamus.
                                </p>
                                <p><a href="#" className="learn-more">Leer Mas</a></p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 animate__animated animate__fadeInUp animate__delay-1s">
                            <div className="box-feature">
                                <i class="fa fa-battery-quarter" aria-hidden="true" style={{fontSize:"5vw",color:"#c5d23b"}}></i>
                                <h3 className="mb-3">Recargan tu Energia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Voluptates, accusamus.
                                </p>
                                <p><a href="#" className="learn-more">Leer Mas</a></p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="box-feature">
                                <i class="fa fa-home" aria-hidden="true" style={{fontSize:"5vw",color:"#c5d23b"}}></i>
                                <h3 className="mb-3">Mejora tu Hogar</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Voluptates, accusamus.
                                </p>
                                <p><a href="#" className="learn-more">Leer Mas</a></p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="box-feature">
                                <i class="fa fa-car" aria-hidden="true" style={{fontSize:"5vw",color:"#c5d23b"}}></i>
                                <h3 className="mb-3">Para tu Vehiculo</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Voluptates, accusamus.
                                </p>
                                <p><a href="#" className="learn-more">Leer Mas</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <div className="section sec-testimonials">
                <div className="container">
                    <div className="row mb-5 align-items-center">
                        <div className="col-md-6">
                            <h2 className="font-weight-bold heading text-primary mb-4 mb-md-0">
                                Clientes Dicen
                            </h2>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <div id="testimonial-nav">
                                <span className="prev" data-controls="prev">Ant</span>
                                <span className="next" data-controls="next">Sig</span>
                            </div>
                        </div>
                    </div>
        
                    <div className="row">
                        <div className="col-lg-4"></div>
                    </div>
                    <div className="testimonial-slider-wrap">
                        <div className="testimonial-slider">
                            <div className="item">
                                <div className="testimonial">
                                    <img
                                        src="images/person_1-min.jpg"
                                        alt="Image"
                                        className="img-fluid rounded-circle w-25 mb-4"
                                    />
                                    <div className="rate">
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                    </div>
                                    <h3 className="h5 text-primary mb-4">James Smith</h3>
                                    <blockquote>
                                        <p>
                                            &ldquo;Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind
                                            texts. Separated they live in Bookmarksgrove right at the
                                            coast of the Semantics, a large language ocean.&rdquo;
                                        </p>
                                    </blockquote>
                                    <p className="text-black-50">Designer, Co-founder</p>
                                </div>
                            </div>
        
                            <div className="item">
                                <div className="testimonial">
                                    <img
                                        src="images/person_2-min.jpg"
                                        alt="Image"
                                        className="img-fluid rounded-circle w-25 mb-4"
                                    />
                                    <div className="rate">
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                    </div>
                                    <h3 className="h5 text-primary mb-4">Mike Houston</h3>
                                    <blockquote>
                                        <p>
                                            &ldquo;Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind
                                            texts. Separated they live in Bookmarksgrove right at the
                                            coast of the Semantics, a large language ocean.&rdquo;
                                        </p>
                                    </blockquote>
                                    <p className="text-black-50">Designer, Co-founder</p>
                                </div>
                            </div>
        
                            <div className="item">
                                <div className="testimonial">
                                    <img
                                        src="images/person_3-min.jpg"
                                        alt="Image"
                                        className="img-fluid rounded-circle w-25 mb-4"
                                    />
                                    <div className="rate">
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                    </div>
                                    <h3 className="h5 text-primary mb-4">Cameron Webster</h3>
                                    <blockquote>
                                        <p>
                                            &ldquo;Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind
                                            texts. Separated they live in Bookmarksgrove right at the
                                            coast of the Semantics, a large language ocean.&rdquo;
                                        </p>
                                    </blockquote>
                                    <p className="text-black-50">Designer, Co-founder</p>
                                </div>
                            </div>
        
                            <div className="item">
                                <div className="testimonial">
                                    <img
                                        src="images/person_4-min.jpg"
                                        alt="Image"
                                        className="img-fluid rounded-circle w-25 mb-4"
                                    />
                                    <div className="rate">
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                        <span className="icon-star text-warning"></span>
                                    </div>
                                    <h3 className="h5 text-primary mb-4">Dave Smith</h3>
                                    <blockquote>
                                        <p>
                                            &ldquo;Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind
                                            texts. Separated they live in Bookmarksgrove right at the
                                            coast of the Semantics, a large language ocean.&rdquo;
                                        </p>
                                    </blockquote>
                                    <p className="text-black-50">Designer, Co-founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="section section-4 bg-light">
                <div className="container">
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-lg-5">
                            <h2 className="font-weight-bold heading text-primary mb-4">
                                Busquemos la esencia perfecta para vos
                            </h2>
                            <p className="text-black-50">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                                enim pariatur similique debitis vel nisi qui reprehenderit.
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-between mb-5">
                        <div className="col-lg-7 mb-5 mb-lg-0 order-lg-2">
                            <div className="img-about dots">
                                <img src="images/hero_bg_3.jpg" alt="Image" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex feature-h">
                                <span className="wrap-icon me-3">
                                    <span className="icon-home2"></span>
                                </span>
                                <div className="feature-text">
                                    <h3 className="heading">Tu hogar</h3>
                                    <p className="text-black-50">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nostrum iste.
                                    </p>
                                </div>
                            </div>
        
                            <div className="d-flex feature-h">
                                <span className="wrap-icon me-3">
                                    <span className="icon-person"></span>
                                </span>
                                <div className="feature-text">
                                    <h3 className="heading">Te identifica</h3>
                                    <p className="text-black-50">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nostrum iste.
                                    </p>
                                </div>
                            </div>
        
                            <div className="d-flex feature-h">
                                <span className="wrap-icon me-3">
                                    <span className="icon-sentiment_very_satisfied"></span>
                                </span>
                                <div className="feature-text">
                                    <h3 className="heading">Tu felicidad</h3>
                                    <p className="text-black-50">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nostrum iste.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        
            <div className="section">
                <div className="row justify-content-center footer-cta">
                    <div className="col-lg-7 mx-auto text-center">
                        <h2 className="mb-4">Podes ser parte de nuestra franquicia</h2>
                        <p>
                            <a
                              href="#"
                              target="_blank"
                              className="btn btn-primary text-white py-3 px-4"
                              >
                                Saber Mas
                            </a>
                        </p>
                    </div>
                </div>  
            </div>
        
            <div className="section section-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-lg-6 mb-5">
                            <h2 className="font-weight-bold heading text-primary mb-4">
                                Nuestros Agentes
                            </h2>
                            <p className="text-black-50">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                                enim pariatur similique debitis vel nisi qui reprehenderit totam?
                                Quod maiores.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <div className="h-100 person">
                                <img
                                    src="images/person_1-min.jpg"
                                    alt="Image"
                                    className="img-fluid"
                                />
    
                                <div className="person-contents">
                                    <h2 className="mb-0"><a href="#">James Doe</a></h2>
                                    <span className="meta d-block mb-3">Real Estate Agent</span>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Facere officiis inventore cumque tenetur laboriosam, minus
                                        culpa doloremque odio, neque molestias?
                                    </p>
        
                                    <ul className="social list-unstyled list-inline dark-hover">
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-twitter"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-facebook"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-linkedin"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-instagram"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <div className="h-100 person">
                                <img
                                    src="images/person_2-min.jpg"
                                    alt="Image"
                                    className="img-fluid"
                                />
    
                                <div className="person-contents">
                                    <h2 className="mb-0"><a href="#">Jean Smith</a></h2>
                                    <span className="meta d-block mb-3">Real Estate Agent</span>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Facere officiis inventore cumque tenetur laboriosam, minus
                                        culpa doloremque odio, neque molestias?
                                    </p>
        
                                    <ul className="social list-unstyled list-inline dark-hover">
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-twitter"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-facebook"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-linkedin"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-instagram"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <div className="h-100 person">
                                <img
                                    src="images/person_3-min.jpg"
                                    alt="Image"
                                    className="img-fluid"
                                />
    
                                <div className="person-contents">
                                    <h2 className="mb-0"><a href="#">Alicia Huston</a></h2>
                                    <span className="meta d-block mb-3">Real Estate Agent</span>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Facere officiis inventore cumque tenetur laboriosam, minus
                                        culpa doloremque odio, neque molestias?
                                    </p>
        
                                    <ul className="social list-unstyled list-inline dark-hover">
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-twitter"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-facebook"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-linkedin"></span></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><span className="icon-instagram"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="widget">
                                <h3>Contact</h3>
                                <address>43 Raymouth Rd. Baltemoer, London 3910</address>
                                <ul className="list-unstyled links">
                                    <li>
                                        <a href="tel://11234567890">+1(123)-456-7890</a>
                                    </li>
                                    <li>
                                        <a href="tel://11234567890">+1(123)-456-7890</a>
                                    </li>
                                    <li>
                                        <a href="mailto:info@mydomain.com">info@mydomain.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
        
                        <div className="col-lg-4">
                            <div className="widget">
                                <h3>Sources</h3>
                                <ul className="list-unstyled float-start links">
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Vision</a></li>
                                    <li><a href="#">Mission</a></li>
                                    <li><a href="#">Terms</a></li>
                                    <li><a href="#">Privacy</a></li>
                                </ul>
                                <ul className="list-unstyled float-start links">
                                    <li><a href="#">Partners</a></li>
                                    <li><a href="#">Business</a></li>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Creative</a></li>
                                </ul>
                            </div>
                        </div>
        
                        <div className="col-lg-4">
                            <div className="widget">
                                <h3>Links</h3>
                                <ul className="list-unstyled links">
                                    <li><a href="#">Our Vision</a></li>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Contact us</a></li>
                                </ul>
        
                                <ul className="list-unstyled social">
                                    <li>
                                        <a href="#"><span className="icon-instagram"></span></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="icon-twitter"></span></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="icon-facebook"></span></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="icon-linkedin"></span></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="icon-pinterest"></span></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="icon-dribbble"></span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div id="overlayer"></div>
                <div className="loader">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            
    
        </>
  )
}
