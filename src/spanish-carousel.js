var SpanishCarousel = {
  carousel: null,
  intervalTiming: 4000,
  interval: null,
  progress: 0,
  circleSVG: null,
  circleInterval: null,

  init: function() {
    try {
      this.setCarousel();
      this.buildProgressCircle();
      var thisCarousel = this;
      setTimeout(function() {
        thisCarousel.changeToSlide(1);
        thisCarousel.loop();
        thisCarousel.listenToIndexLinks();
      }, 1000)
    } catch(e) {
      console.log("Spanish carousel could not be initialized");
      console.log(e);
    }
  },

  loop: function() {
    var thisCarousel = this;
    this.interval = setInterval(function() {
      thisCarousel.changeToNextSlide();
    }, this.intervalTiming);
  },

  restartLoop: function() {
    clearInterval(this.interval);
    this.loop();
  },

  setCarousel: function() {
    this.carousel = document.querySelector('[data-spanish-carousel]');
    if (!this.carousel) {
      throw "No carousel found. Check if carousel has data-spanish-carousel attribute.";
    };
    this.carousel.classList.add('spanish-carousel');
  },

  buildProgressCircle: function() {
    var $circleSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $circleSVG.setAttribute("class", "progress-ring");
    $circleSVG.setAttribute("width", "60");
    $circleSVG.setAttribute("height", "60");
    var $circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    $circle.setAttribute("class", "progress-ring__circle");
    $circle.setAttribute("stroke", "white");
    $circle.setAttribute("stroke-width", "4");
    $circle.setAttribute("fill", "transparent");
    $circle.setAttribute("r", "27");
    $circle.setAttribute("cx", "30");
    $circle.setAttribute("cy", "30");
    $circleSVG.appendChild($circle);
    if (this.carousel){
      this.carousel.querySelector('aside').appendChild($circleSVG);
    };
    this.circleSVG = $circleSVG;
    ProgressCircle.init();
  },

  getCurrentSlide: function() {
    return document.querySelector('.spanish-carousel__current-slide');
  },

  getSlide: function(slideIndex) {
    return document.querySelector('[data-spanish-carousel-slide="'+slideIndex+'"]');
  },

  getSlideIndex: function($slide) {
    return parseInt($slide.dataset['spanishCarouselSlide']);
  },

  getCurrentSlideIndex: function() {
    return this.getSlideIndex(this.getCurrentSlide());
  },

  getNextSlide: function() {
    var currentSlideIndex = this.getCurrentSlideIndex();
    var $nextSlide = this.getSlide(currentSlideIndex + 1);
    if (!$nextSlide) {
      $nextSlide = this.getSlide(1);
    }
    return $nextSlide;
  },

  getNextSlideIndex: function() {
    return this.getSlideIndex(this.getNextSlide());
  },

  changeToSlide: function(newSlideIndex) {
    var $currentSlide = this.getCurrentSlide();
    var $nextSlide = this.getSlide(newSlideIndex);
    if ($currentSlide == $nextSlide) {
      return
    } else {
      $nextSlide.classList.add('spanish-carousel__current-slide');
      this.setIndexToSelected(newSlideIndex);
    }
    if ($currentSlide) {
      $currentSlide.classList.add('spanish-carousel__removed-slide');
      setTimeout(function() {
        $currentSlide.classList.remove('spanish-carousel__removed-slide');
        $currentSlide.classList.remove('spanish-carousel__current-slide');
      }, 500);
    }
  },

  changeToNextSlide: function() {
    this.changeToSlide(this.getNextSlideIndex());
  },

  listenToIndexLinks: function() {
    var thisCarousel = this;
    [].forEach.call(this.getIndexes(), function (a) {
      a.addEventListener('click', function () {
        var newSlideIndex = this.dataset['spanishCarouselIndex'];
        thisCarousel.changeToSlide(newSlideIndex);
        thisCarousel.restartLoop();
      }, false);
    });
  },

  getIndexes: function() {
    return document.querySelectorAll('[data-spanish-carousel-index]');
  },

  getIndexElem: function(index) {
    return document.querySelector('[data-spanish-carousel-index="'+ index +'"]');
  },

  setIndexToSelected: function(newIndex) {
    var selectedIndexClass = 'spanish-carousel__selected-index';
    [].forEach.call(this.getIndexes(), function (a) {
      a.classList.remove(selectedIndexClass);
    });
    var $newIndexElem = this.getIndexElem(newIndex);
    $newIndexElem.classList.add(selectedIndexClass);
    this.setCircleToIndex($newIndexElem);
  },

  setCircleToIndex($indexElem) {
    this.resetCircle();
    this.circleSVG.style.top = "calc("+$indexElem.offsetTop+"px - 5px)";
    this.startCircle();
  },

  resetCircle: function() {
    ProgressCircle.reset();
    this.progress = 1;
    ProgressCircle.setProgress(1);
  },

  startCircle: function() {
    var thisCarousel = this;
    var loopFunc = function() {
      thisCarousel.progress = thisCarousel.progress + 1;
      ProgressCircle.setProgress(thisCarousel.progress);
      if (thisCarousel.circleInterval) {
        clearTimeout(thisCarousel.circleInterval);
      }
      thisCarousel.circleInterval = setTimeout(loopFunc, thisCarousel.intervalTiming/100);
    };
    loopFunc();
  }
};

var ProgressCircle = {
  circle: null,
  circumference: null,
  init: function() {
    // Circle
    this.circle = document.querySelector('circle');
    if (this.circle) {
      var radius = this.circle.r.baseVal.value;
      this.circumference = radius * 2 * Math.PI;
      this.circle.style.strokeDasharray  = this.circumference + " " + this.circumference;
      this.circle.style.strokeDashoffset = "" + this.circumference;
    };
  },
  setProgress: function(percent) {
    var offset = this.circumference - percent / 100 * this.circumference;
    this.circle.style.strokeDashoffset = offset;
  },
  reset: function() {
    this.setProgress(0);
  }
}
