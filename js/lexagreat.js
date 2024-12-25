document.addEventListener("DOMContentLoaded", () => {
   calculatorWork();
   initTarifsSlider();
   whatWork();
   stepsTabs();
   initCasesSlider();
   animations();
   openHeroPopup();
});
gsap.registerPlugin(ScrollTrigger);
function calculatorWork() {
   if (!document.querySelector(".seo-calculator")) return;
   let swiper = new Swiper(".seo-calculator .swiper", {
      pagination: {
         el: ".seo-calculator .swiper-pagination",
      },
      slidesPerView: 1,
      cssMode: true,
   });
   const next = document.querySelector(".seo-calculator__next");
   next.addEventListener("click", () => {
      swiper.slideNext();
      if (swiper.activeIndex == 2) {
         next.classList.add("hidden");
      }
   });
   const parent = document.querySelector(".calc-input__autocomplete");
   const sublist = parent.querySelector(".calc-input__sublist");
   parent.querySelector("input").addEventListener("input", (e) => {
      if (e.target.value) {
         sublist.classList.add("active");
      } else {
         sublist.classList.remove("active");
      }
   });
   sublist.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", (e) => {
         parent.querySelector("input").value = e.target.innerHTML;
         sublist.classList.remove("active");
      });
   });

   const sendBtn = document.querySelector(".seo-calculator__send");
   sendBtn.addEventListener("click", () => {
      document.querySelector(".seo-calculator__result").classList.add("show");
      document
         .querySelector(".seo-calculator__subtitle")
         .classList.add("hidden");
      document.querySelector(".seo-calculator__slider").classList.add("hidden");
   });
}
function initTarifsSlider() {
   if (!document.querySelector(".seo-tarifs .swiper")) return;
   let swiper = new Swiper(".seo-tarifs .swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      navigation: {
         prevEl: ".seo-tarifs .swiper-button-prev",
         nextEl: ".seo-tarifs .swiper-button-next",
      },
      breakpoints: {
         569: {
            spaceBetween: 24,
         },
      },
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
   });
}
function initCasesSlider() {
   if (!document.querySelector(".seo-cases .swiper")) return;

   let swiper = new Swiper(".seo-cases .swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      navigation: {
         prevEl: ".seo-cases .swiper-button-prev",
         nextEl: ".seo-cases .swiper-button-next",
      },
      breakpoints: {
         569: {
            spaceBetween: 24,
         },
      },
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
   });
}

function whatWork() {
   const btn = document.querySelector(".seo-what .seo-calculator__send");
   if (!btn) return;
   const res = document.querySelector(".seo-what .seo-calculator__result");
   btn.onclick = () => {
      res.classList.add("show");
      document
         .querySelector(".seo-what .seo-calculator__subtitle")
         .classList.add("hidden");
      document.querySelector(".seo-what__form").classList.add("hidden");
   };
}
function stepsTabs() {
   const main = document.querySelector(".seo-steps__output");
   const outputs = document.querySelectorAll(".seo-steps__sublist li");
   const inputs = document.querySelectorAll(".seo-steps__list li");
   if (!outputs) return;
   if (window.innerWidth > 568) {
      main.style.minHeight = outputs[0].clientHeight + 64 + "px";
      inputs.forEach((input, index) => {
         input.onclick = () => {
            inputs.forEach((item, i) => {
               if (index !== i) {
                  item.classList.remove("active");
               }
            });
            outputs.forEach((item, i) => {
               if (index !== i) {
                  item.classList.remove("active");
               }
            });
            input.classList.add("active");
            outputs[index].classList.add("active");
            main.style.minHeight = outputs[index].clientHeight + 64 + "px";
         };
      });
   } else {
      accordion(".seo-step__header", ".seo-step__spoiler");
      document.querySelectorAll(".seo-step").forEach((item) => {
         item.classList.remove("active");
      });
   }
}
const maskOptions = {
   mask: "+{7} 000 000 00 00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}
function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function animations() {
   animateHeroTriangles();
   function animateHeroTriangles() {
      const poligon1 = document.querySelector(".seo-poligon1");
      const poligon2 = document.querySelector(".seo-poligon2");
      const poligon3 = document.querySelector(".seo-poligon3");
      const poligon4 = document.querySelector(".seo-poligon4");
      if (!poligon1) return;
      gsap.from(poligon1, {
         x: -100,
         y: 20,
         duration: 1,
         rotate: 45,
         ease: "power2.out",
         onComplete: function () {
            // Зацикленная анимация: движение вправо-влево
            gsap.to(poligon1, {
               x: "+=10",
               duration: 2,
               yoyo: true,
               repeat: -1,
               ease: "power1.inOut",
            });
         },
      });
      gsap.from(poligon2, {
         x: 100,
         y: -20,
         duration: 0.5,
         rotate: -45,
         onComplete: function () {
            // Зацикленная анимация: движение вправо-влево
            gsap.to(poligon2, {
               x: "+=10",
               y: "+=5",
               duration: 2,
               yoyo: true,
               repeat: -1,
               ease: "power1.inOut",
            });
         },
      });
      gsap.from(poligon3, {
         x: 50,
         y: -10,
         duration: 0.1,
         onComplete: function () {
            // Зацикленная анимация: движение вправо-влево
            gsap.to(poligon3, {
               x: "+=30",
               y: "+=25",
               duration: 2,
               yoyo: true,
               repeat: -1,
               ease: "power1.inOut",
            });
         },
      });
      gsap.from(poligon4, {
         x: -50,
         y: 10,
         duration: 0.3,
         onComplete: function () {
            // Зацикленная анимация: движение вправо-влево
            gsap.to(poligon4, {
               x: "+=25",
               y: "+=20",
               duration: 2,
               yoyo: true,
               repeat: -1,
               ease: "power1.inOut",
            });
         },
      });

      gsap.to(poligon1, {
         yPercent: 350, // Элемент будет двигаться на 50% его высоты
         ease: "none",
         scrollTrigger: {
            trigger: poligon1,
            start: "top center", // Когда элемент попадает в центр экрана
            scrub: true, // Плавное изменение значения во время прокрутки
         },
      });
      gsap.to(poligon2, {
         yPercent: 350, // Элемент будет двигаться на 50% его высоты
         ease: "none",
         scrollTrigger: {
            trigger: poligon2,
            start: "top center", // Когда элемент попадает в центр экрана
            scrub: true, // Плавное изменение значения во время прокрутки
         },
      });
      gsap.to(poligon3, {
         yPercent: 100, // Элемент будет двигаться на 50% его высоты
         ease: "none",
         scrollTrigger: {
            trigger: poligon3,
            start: "top center", // Когда элемент попадает в центр экрана
            scrub: true, // Плавное изменение значения во время прокрутки
         },
      });
      gsap.to(poligon4, {
         yPercent: 100, // Элемент будет двигаться на 50% его высоты
         ease: "none",
         scrollTrigger: {
            trigger: poligon4,
            start: "top center", // Когда элемент попадает в центр экрана
            scrub: true, // Плавное изменение значения во время прокрутки
         },
      });
   }
}
function openHeroPopup() {
   const btn = document.querySelector(".seo-hero__btn.to-popup");
   if (!btn) return;
   btn.addEventListener("click", () => {
      const modal = document.querySelector("#auditModal");
      popupOpen(modal);
   });
}
