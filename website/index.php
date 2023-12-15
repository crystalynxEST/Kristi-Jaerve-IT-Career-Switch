<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kristi Järve Portfolio</title>

        <link rel="stylesheet" href="resources/bootstrap-4.5.3-dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="resources/bootstrap-4.5.3-dist/css/bootstrap.css">
        <link rel="stylesheet" href="css/fontawesome-free-6.2.0-web/css/all.min.css" />
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link href="./css/fontawesome-free-6.2.0-web/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css" >
        <!-- Fonts -->
        

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,300;1,300&family=Sacramento&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300&display=swap" rel="stylesheet">
    </head>
    <body>
    <div id="preloader">
  <div id="loaderTop"></div>
</div>
        <!-- ------ NAV BAR ------ -->
        <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
            <a class="navbar-brand d-md-none" href="#"><img id="logo" src="images/logo.jpg" alt="Logo"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto d-md-none">
                    <li class="nav-item">
                        <a class="nav-link" href="#Profile">About Me</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Experience">Curriculum Vitae</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#skills">Skills</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#projectsTitle">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Contact">Contact</a>
                    </li>
                </ul>
            </div>
    
            <!-- Circular Nav Links for Desktop -->
            <div class="circle-nav d-none d-md-flex">
                <a href="#Profile" class="nav-link circle" data-text="About Me"><i class="fa-solid fa-user"></i></a>
                <a href="#Experience" class="nav-link circle" data-text="Curriculum Vitae"><i class="fa-solid fa-briefcase"></i></a>
                <a href="#skills" class="nav-link circle" data-text="Skills"><i class="fa-solid fa-lightbulb"></i></a>
                
                <a href="#projectsTitle" class="nav-link circle" data-text="Portfolio"><i class="fa-solid fa-folder-open"></i></a>
                <a href="#Contact" class="nav-link circle" data-text="Contact"><i class="fa-solid fa-envelope"></i></a>

            </div>
        </nav>

        
        <!-- ------ PAGE CONTAINER ------ -->
        <header class="page-header header container-fluid overlay">

                <!-- ANIMATION -->
                <div class="container1">
                    <div class="left-column">
                        <!-- #me Element -->
                            <div id="me-container1">
                                <div id="me">
                                <div id="name"> Kristi Järve </div>
                            </div>
                        </div>
                                
                                <!-- Flip Content -->
                                <div class="flip-container1">
                                    <div id="flip">
                                        <p class="words1">FULL STACK DEVELOPER</p>
                                        
                                    </div>
                                </div>
                            <!-- #intro Paragraph -->
                            <div class="intro-container1"> 
                                <p id="intro">An Estonian in the UK, I'm a driven Full-Stack developer, who enjoys coding that transcends borders, always eager to learn and tackle complex challenges. </p>
                            </div>
                                <!-- Button -->
                                <div class="button-container1" style="display:none;">
                                <div class="button">
                                    <button class="btn btn-outline-secondary btn-lg" onclick="scrollToProfile()">Tell Me More!</button>
                                </div>
                    </div>
                    </div>
                        <div class="right-column">
                            <!-- Place your image here -->
                            <img src="images/mee.jpg" alt="Anime version of the programmer" id="imageMe">
                        </div>
                </div>

    <!-- End of Two-Column Layout -->
</header>

<!-- ------ "About Me" SECTION ------ -->
<section class="about-me" id="Profile">
    <div class="container">
        <div class="row" >
            <div class="col me" >
                <h2>About Me</h2>
                <p id="about-me para">
                Launching my development journey with the IT Career Switch Traineeship, I've honed skills in Python, JavaScript, PHP, and HTML, CSS and have embraced and learning new technologies like Vue.js, Docker, AWS, and PHP Laravel. Outside of coding, my hobbies range from crochet and gaming to nature walks, historical exploration, and true crime mysteries. My relentless curiosity keeps me expanding my expertise in coding, graphic design, and artistic creativity</p>
            </div>
        </div>
    </div>
</section>

    <!-- ------ EXPERIENCE SECTION ------ -->
    <div id="Experience" class="container2">
        <div id="expTitle">
        <h2>Curriculum Vitae</h2>
    </div>
            <div class="left-column1">

                <div class="experience">
                    <p>
                    Blending my background in art and graphic design with programming, I excel in enhancing both the visual appeal and the technical robustness of my Full-Stack development projects.
                    </p>

                    <p class="workTitle" > IT CAREER SWITCH CODING TRAINEESHIP <br>
                    <span class="year">2022 - Present </span></p>
                    
                    <p>
                    Pursuing a career in Full-Stack development. Gained skills in HTML, CSS, JavaScript, Python, PHP and more. Completed two major projects showcasing my development capabilities, which I proudly present below.
                    </p>

                    <p class="workTitle" > Digital marketing assistant <br>
                    <span class="year">March 2023 - Present </span></p>
                    
                    <p>
                    Transitioned to digital marketing, leveraging technical skills. Experienced in Mailchimp, Dot Digital, and social media platforms. Focused on process automation, marketing material design, and collaboration on improvement strategies. Involved in web and CRM development to enhance efficiency and implement new technologies.
                    </p>
                </div>
                </div>
            <div class="right-column1">
                <div class="more">
                    <p class="workTitle" > UK Carline Limited - Customer Support Administrator<br>
                    <span class="year">2017 - 2023 </span></p>
                    <p>
                    Focused on processing financial applications with precision and compliance. Managed workflows, invoicing, and vehicle deliveries. 

                    I also excelled at building strong customer relationships through effective phone and email communication, resolving issues, and ensuring a positive customer experience.
                    </p>

                    <p class="workTitle" > Skipton Building Society - Senior Customer Adviser<br>
                    <span class="year">2015 - 2014 </span>
                    </p>
                    <p>
                    Engaged customers across various channels, providing information on financial products and services. Handled transactions, document processing, and complaints resolution. Supported branch network as complaints champion, mentored new staff, and contributed to process improvements.
                    </p>
                    <div class="img-hover">
                        <a href="./CV-Kristi-Jarve.pdf" target="_blank">
                        <i class="fa-solid fa-link fa-beat-fade fa-lg fa-fw" style="color: #ffffff;"></i>
                        </a>
                        <a href="./CV-Kristi-Jarve.pdf" target="_blank"><h4 class="cv">FULL CV</h4></a>
                    </div>
            </div>
        </div>
    </div>


<!-- ------ SKILLS ------- -->
<section  id="skills">
    <div class="background">
        <div class="col-12 skillsTitle">
            <h2>Skills</h2>
        </div>
        <div class="container skill">
            <div class="row">
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/html copy.png" alt="HTML image">
                        <h4 class="card-title">HTML</h4>
                    </div>
                
                </div>
                
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/css copy.png" alt="CSS image">

                        <h4 class="card-title">CSS</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/javascript.webp" alt="JavaScript image">
                        <h4 class="card-title">JavaScript</h4>
                    </div>
                </div>

                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/phpPNG.png" alt="PHP image">

                        <h4 class="card-title">PHP</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/python.png" alt="Python image">

                        <h4 class="card-title">Python</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">   
                        <img class="card-img-top rounded-circle" src="images/jquery.png" alt="jQuery image"> 
                    <h4 class="card-title">jQuery</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/ajax.png" alt="Ajax image">
                        <h4 class="card-title">Ajax</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/curl.png" alt="cUrl image">
                        <h4 class="card-title">cUrl</h4>
                    </div>
                </div>

                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/React.png" alt="React image">
                        <h4 class="card-title">React</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/reduxPNG.png" alt="Redux image">
                        <h4 class="card-title">Redux</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/xampp PNG.png" alt="XAMPP image">
                        <h4 class="card-title">XAMPP</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/vs.png" alt="Visual Studio image">
                        <h4 class="card-title">Visual Studio</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/bootstrap.png" alt="Bootstrap image">
                        <h4 class="card-title">Bootstrap</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/fasthosts.png" alt="FastHosts image">
                        <h4 class="card-title">FastHosts</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/filezilla.png" alt="Filezilla image">
                        <h4 class="card-title">Filezilla</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/beefree.png" alt="BeeFree image">
                        <h4 class="card-title">BeeFree</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/github.png" alt="Github image">
                        <h4 class="card-title">Github</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/gitWhite.png" alt="Git image">
                        <h4 class="card-title">Git</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/leaflet.png" alt="Leaflet image">
                        <h4 class="card-title">Leaflet</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/Postgresql.png" alt="PostgreSQL image">
                        <h4 class="card-title">PostgreSQL</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/postmanPNG.png" alt="Postman image">
                        <h4 class="card-title">Postman</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/PS.png" alt="Photoshop image">
                        <h4 class="card-title">Photoshop</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/AI.png" alt="Adobe Illustrator image">
                        <h4 class="card-title">Illustrator</h4>
                    </div>
                </div>
                <div class="card col-lg-1 col-md-1 col-sm-1 text-center">
                    <div class="img-hover">
                    <img class="card-img-top rounded-circle" src="images/XD.webp" alt="Adobe XD image">
                        <h4 class="card-title">Adobe XD</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</section>

<!-- ------ PORTFOLIO ------- -->
<div id="projectsTitle">
        <h2>Projects</h2>
    </div>
<div class="carousel">
    <div class="carousel__nav">
        <span id="moveLeft" class="carousel__arrow">
            <svg class="carousel__icon" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
            </svg>
        </span>
            <span id="moveRight" class="carousel__arrow" >
                <svg class="carousel__icon"  width="24" height="24" viewBox="0 0 24 24">
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                </svg>    
        </span>
    </div>

<div class="carousel-item carousel-item--1">
    <div class="carousel-item__image"></div>
        <div class="carousel-item__info ">
            <div class="carousel-item__container">
                <h2 class="carousel-item__subtitle">IT Career Switch - Project 1  </h2>
                <h1 class="carousel-item__title">Gazetteer</h1>
                <p class="carousel-item__description">This web application features an interactive world map that seamlessly integrates location services. Users have the option to grant access to their location, triggering the highlighting of their current country on the map.  On the left panel, user-friendly EasyButtons provide quick access to various features, including checking demographics, Wikipedia details, top country news, weather information, and currency exchange rates. Additionally, marked locations are displayed directly on the map for easy reference.</p>
                <h6 class="built-with-title">Technologies Used:</h6>
                <p class="carousel-item__description"><strong> Frontend:</strong> HTML, CSS, JavaScript, Leaflet, Bootstrap, jQuery and Font Awesome.</p>
                <p class="carousel-item__description"><strong> Backend:</strong> PHP, JSON, Ajax, Open Location Code with different external APIs.</p>
                <div class="carousel-item__links">
                    <a href="https://github.com/crystalynxEST/Kristi-Jaerve-IT-Career-Switch/tree/main/project1" target="_blank" title="Link to GitHub">
                        <i class="fa-brands fa-github fa-beat-fade fa-lg fa-fw"></i>
                    </a>
                    <a href="https://kristijaerve.co.uk/project1/" target="_blank" title="Live application">
                        <i class="fa-solid fa-pager fa-beat-fade fa-lg fa-fw"></i>
                    </a>
                </div>
            </div>
        </div>
</div>

<div class="carousel-item carousel-item--2">
    <div class="carousel-item__image"></div>
        <div class="carousel-item__info">
            <div class="carousel-item__container">
                <h2 class="carousel-item__subtitle">IT Career Switch - Project 2 </h2>
                <h1 class="carousel-item__title">Company Directory</h1>
                <p class="carousel-item__description">This project focuses on reviving and completing a "Company Directory" system that was initiated 18 months ago but was left incomplete due to the departure of the original developer. The main goal is to resume development, ensuring that the system's functionality aligns with the approved design specifications. The existing codebase includes essential features like modal-triggering buttons, responsive design elements, modal show events, form handling, and extensive database interactions. The project's challenge lies in adding missing functionalities, maintaining a mobile-first responsive design, and implementing comprehensive database table maintenance features, while ensuring data integrity and accommodating the constraint of one location per department.</p>
                <h6 class="built-with-title">Technologies Used:</h6>
                <p class="carousel-item__description"><strong>Frontend:</strong> HTML, CSS, JavaScript, enhanced by Bootstrap for its responsive design. It also integrates Font Awesome for iconography and utilizes jQuery for additional interactivity and user experience improvements.</p>
                <p class="carousel-item__description"><strong>Backend</strong>: PHP is used for server-side scripting, with JSON and Ajax facilitating efficient data exchange. The project leverages a MySQL database for robust data storage and retrieval, supporting multiple users and diverse data management functionalities.</p>
                <div class="carousel-item__links">
                    <a href="https://github.com/crystalynxEST/Kristi-Jaerve-IT-Career-Switch/tree/main/project2" target="_blank" title="Link to GitHub">
                        <i class="fa-brands fa-github fa-beat-fade fa-lg fa-fw"></i>
                    </a>
                    <a href="https://kristijaerve.co.uk/project2/" target="_blank" title="Live application">
                        <i class="fa-solid fa-pager fa-beat-fade fa-lg fa-fw"></i>
                    </a>
                </div>
            </div>
        </div>
</div>

    <div class="carousel-item carousel-item--3">
        <div class="carousel-item__image"></div>
            <div class="carousel-item__info">
                <div class="carousel-item__container">
                    <h2 class="carousel-item__subtitle">Company Project </h2>
                    <h1 class="carousel-item__title">Finance Calculator</h1>
                    <p class="carousel-item__description">I was tasked by the company to develope a versatile finance calculator designed to seamlessly integrate into various company websites utilizing WYSIWYG coding, and as a standalone application. The primary objective was to provide users with tailored options to create calculations that accurately depict their monthly loan payments. This required accommodating variables such as vehicle price, loan amount, loan duration in months, and dynamic interest rates based on user selections, ensuring a comprehensive and user-friendly financial tool.</p>
                    <p class="carousel-item__description"><strong>Frontend:</strong> HTML, CSS, JavaScript inside WYSIWYG.</p>
                    <div class="carousel-item__links">
    <!-- <a href="https://github.com/crystalynxEST/Kristi-Jaerve-IT-Career-Switch/tree/main/project1" target="_blank" title="Link to GitHub">
                    <i class="fa-brands fa-github fa-beat-fade  fa-lg fa-fw"></i>
                </a> -->
                        <a href="https://vertuleasecars.co.uk/specialist-vehicles/plant-and-go-tool-hire-lease" target="_blank" title="Live application">
                            <i class="fa-solid fa-pager fa-beat-fade fa-lg fa-fw"></i>
                        </a>
                    </div>
                </div>
            </div>
    </div>
</div>

<!-- ------ CONTACT ME ------- -->
        <section id="Contact" >
            <div class="background">
                <div class="container">
                    <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8 col-sm-10">
            <h2 id="status-message"><?php if (isset($response)) {echo $response['message'];}?></h2>
                <h3 class="contact-title">Get in Touch</h3>
                <div id="loader" class="loader"></div>
                    <div class="form-group">

                        <form method="POST" action="php/app.php" id="contact-form">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Name" name="name" required autocomplete="Full Name">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Email Address" name="email" required autocomplete="off">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Telephone number" name="phone" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="message" placeholder="Write your message here..." rows="4" required></textarea>
                        </div>
                            <input type="submit" class="btn btn-secondary btn-block" value="Send">
                        </form>
                    </div>
        </section>

        <!-- ------ FOOTER ------- -->
        <footer class="page-footer">
            <div class="container">
                <div class="footer-copyright text-center">
                    © 2023 Copyright: Kristi Järve, <a href="https://websitesetup.org/bootstrap-tutorial-for-beginners/" target="_blank">WebsiteSetup and <a href="https://fontawesome.com/" target="_blank">FontAwesome</a>
                </div>
            </div>
        </footer>
    </div>
</body>
        <script src="javascript/jquery-3.7.1.min.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        
        <script src="javascript/main.js"></script>
        <script src="resources/bootstrap-4.5.3-dist/js/bootstrap.bundle.min.js"></script>
        <script src="resources/bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
        
</html>