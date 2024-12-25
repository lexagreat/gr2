$(document).ready(function () {
    
  
    
    var urlParams = new URLSearchParams(window.location.search);
    var status = urlParams.get('status');

    if (status === 'success') {
        $('#responseMessage').html('<p>Form submitted successfully!</p>');
    } else if (status === 'error') {
        $('#responseMessage').html('<p>There was an error submitting the form.</p>');
    } else if (status === 'invalid_request') {
        $('#responseMessage').html('<p>Invalid request method.</p>');
    }




$(".menu-item-has-children").on("click", function (e) {
    
    $(this).find(".sub-menu").slideDown(200);
});
// 	$('.article-form__btn').on('click',function(e){
// 		e.preventDefault();
// 	})
$(document).ready(function() {
$('.article-aside__form.article-form').submit(function(e) {
    e.preventDefault();
    $('.wpcf7-submit').prop('disabled', true);
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(response) {
            // Handle success response
            $('.wpcf7-text').val(" ")
            $(".success_message").text("Спасибо за заявку! Мы отправим вам новости!")
            setTimeout(()=>{
                $(".success_message").text(" ")
                $('.wpcf7-submit').prop('disabled', false);
            },4000)
        },
        error: function(xhr, status, error) {
            // Handle error
        }
    });
});
});


$('#thanksModal').on('click',function(e){
    let name = $(this).parent().find("input[name='consult_name']").val()
    let telephone = $(this).parent().find("input[name='consult_tel']").val()
    if(name && telephone){
        $('.thanks-modal').addClass('open')
        $('.consult-modal').removeClass('open')
    }else{
        e.preventDefault();
    }
    
})

const maskOptions = {
    mask: "+{7} (000) 000-00-00",
};
const phoneInputs = document.querySelectorAll("#phoneInput");
if (phoneInputs.length) {
    phoneInputs.forEach((item) => {
        const mask = IMask(item, maskOptions);
    });
}


$('.hero__content-btn.btn-popup , .development-hero__btn , .btn_blog1 , .btn-zakaz , .service-item-link , .at-social__item a , .blog_autor-position a').on('click',function(e){
    e.preventDefault();
    $('#consultModal').addClass('open')
})

$('#first_modal').on('click',function(e){
    e.preventDefault();
    $('#case-1').addClass('open')
})

$('#second_modal').on('click',function(e){
    e.preventDefault();
    $('#case-2').addClass('open')
})

$('#third_modal').on('click',function(e){
    e.preventDefault();
    $('#case-3').addClass('open')
})

$(".footer__form").submit(function (e) {
    e.preventDefault();
    let ipAddress=$(this).find('.user_ip').val() ;
    var currentURL = window.location.href;
    let phone = $(this).find('#phoneInput').val();
    let name = $(this).find('.footer__form-container input[name="name"]').val();
    let email = $(this).find('.footer__form-container input[name="email"]').val();
    let message = `
    ✅ Заявка с сайта с контактной формы для обсуждения проекта:%0A %0A▪️ Имя: ${name}%0A %0A
        ▪️ Email: ${email}%0A %0A
        ▪️ Телефон: ${phone}%0A %0A
        ▪️ IP-адрес отправителя: ${ipAddress}%0A %0A
        ▪️ Страница с которой была отправка: ${currentURL}%0A
    `;
// 		var formData = $(this).serialize();
    console.log(message)
    $.ajax({
        type: "GET",
        url: `https://api.telegram.org/bot6308163029:AAFHWuK0zh7tO3jIE7x8Vbz4cOtVvHXtC3I/sendMessage?chat_id=-1001921846059&text=${message}&parse_mode=HTML`,
// 			data: formData,
        success: function (response) {
            if (response.status === "success") {
                $(".message-alert").text(
                    "Спасибо за заявку! Мы перезвоним вам в течении десяти минут!"
                );
                $(".message-alert").show();
            } else {
                $(".message-alert").text(
                    "Спасибо за заявку! Мы перезвоним вам в течении десяти минут!"
                );
                $(".message-alert").show();
            }
        },
        error: function () {
            $(".message-alert").text("Спасибо за заявку! Мы перезвоним вам в течении десяти минут!");
            $(".message-alert").show();
        },
    });
});
});

$(document).ready(function () {
$({ countNum: 0 }).animate(
    { countNum: 30 },
    {
        duration: 2000,
        easing: "linear",
        step: function () {
            $(".number").text(Math.floor(this.countNum));
        },
        complete: function () {
            $(".number").text(this.countNum);
        },
    }
);
});


// FAQ

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
const itemToggle = this.getAttribute('aria-expanded');

for (i = 0; i < items.length; i++) {
items[i].setAttribute('aria-expanded', 'false');
}

if (itemToggle == 'false') {
this.setAttribute('aria-expanded', 'true');
}
}

items.forEach(item => item.addEventListener('click', toggleAccordion));

// FadeInUp

document.addEventListener('DOMContentLoaded', function() {
var elements = document.querySelectorAll('.fadeInUp');

function checkVisible() {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var positionFromTop = element.getBoundingClientRect().top;

        if (positionFromTop - window.innerHeight <= 0) {
            element.classList.add('show');
        } else {
            element.classList.remove('show'); // Убираем класс, если элемент не виден
        }
    }
}

window.addEventListener('scroll', checkVisible);
checkVisible(); // Проверяем видимость элементов при загрузке страницы
});

// case index

$(document).ready(function() {
        // Set the first tab and content active initially
        $('.portfolio_btn').first().addClass('active');
        $('.porfolio_tabs_content').first().addClass('active');

        // Add click event for portfolio buttons
        $('.portfolio_btn').click(function() {
            // Remove active class from all buttons and add to the clicked button
            $('.portfolio_btn').removeClass('active');
            $(this).addClass('active');

            // Hide all portfolio content blocks
            $('.porfolio_tabs_content').removeClass('active');

            // Show the target content block
            const target = $(this).data('target');
            $('.porfolio_tabs_content').eq(target).addClass('active');
        });
    });
    
    
    
// tags
/* CHECK FOR PREFERED REDUCED MOTION
AND IF SO, DO NOT RUN ANY OF THE SCRIPTS
SPLITTING THE LIST ELEMENT INTO MULTIPLE
LISTS OR APPLYING THE SCROLL ANIMATION
*/
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
if (mediaQuery && !mediaQuery.matches) {
$(document).ready(function() {
const tagScroller = $(".tag-scroller");
const allTags = tagScroller.find("li");

function createElement(tagName, className = "") {
const elem = $("<" + tagName + "></" + tagName + ">").addClass(className);
return elem;
}

function scrollersFrom(elements, numColumns = 2) {
const fragment = $(document.createDocumentFragment());
elements.each((i, element) => {
  const column = i % numColumns;
  const children = fragment.children();
  if (!children[column]) fragment.append(createElement("ul", "tag-list"));
  $(children[column]).append(element);
});
return fragment;
}

/* SPLIT THE LIST ELEMENT INTO TWO LISTS
AND CALL THE ANIMATION
*/
const scrollers = scrollersFrom(allTags, 2);
tagScroller.empty().append(scrollers);
addScrolling();

/* ADD scrolling CLASS TO THE WRAPPER ELEMENT,
CLONE EACH LIST ITEM TO MAKE THE LIST LONG ENOUGH
FOR INFINITE SCROLL AND THEN CALCULATE THE DURATION
BASED ON WIDTH OF EACH SCROLLER TO MAKE THEM
MOVE AT THE SAME RATE OF SPEED
*/
function addScrolling() {
tagScroller.addClass("scrolling");
$(".tag-list").each((index, tagList) => {
  const scrollContent = $(tagList).children();
  scrollContent.each((index, listItem) => {
    const clonedItem = $(listItem).clone().attr("aria-hidden", true);
    $(tagList).append(clonedItem);
  });
  $(tagList).css("--duration", ($(tagList).width() / 100) + "s");
});
}
});
}


// header scroll


window.addEventListener('scroll', function() {
var header = document.querySelector('.header');
var headerWrapper = document.querySelector('.header__wrapper');

if (window.scrollY > 0) {
  header.classList.add('scrolled');
  headerWrapper.classList.add('scrolled');
} else {
  header.classList.remove('scrolled');
  headerWrapper.classList.remove('scrolled');
}
});


// animate css


document.addEventListener('DOMContentLoaded', function() {

// Функция, которая добавляет класс 'animated' к любому элементу с классом 'animatable', который находится в области видимости
var doAnimations = function() {
  
    // Вычисляем текущую позицию прокрутки и получаем все анимируемые элементы
    var offset = window.scrollY + window.innerHeight;
    var animatables = document.querySelectorAll('.animatable');
  
    // Если нет анимируемых элементов, убираем обработчик события прокрутки
    if (animatables.length === 0) {
        window.removeEventListener('scroll', doAnimations);
    }
  
    // Проверяем все анимируемые элементы и анимируем их, если это необходимо
    animatables.forEach(function(animatable) {
        if ((animatable.getBoundingClientRect().top + animatable.offsetHeight - 20) < offset) {
            animatable.classList.remove('animatable');
            animatable.classList.add('animated');
        }
    });
};

// Привязываем doAnimations к событию прокрутки и вызываем его сразу
window.addEventListener('scroll', doAnimations);
doAnimations();
});



// slider swiper dev

$(document).ready(function() {
    $('.tinkoff_link').on('click', function(e) {
        e.preventDefault();
        $('.finance_modal').fadeIn(300).css('display', 'flex');
    });

    $('.finance_modal__close').on('click', function() {
        $('.finance_modal').fadeOut(300);
    });
});




