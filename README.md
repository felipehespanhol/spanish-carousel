# Spanish Carousel

### Unobstrusive vanilla javascript carousel with beautiful timer spinning bullets

## Installation

Import spanish-carousel.js and spanish-carousel.scss from src folder to your project.

PS: sorry for uncompiled spanish-carousel.scss. Will be fixed soon with a proper release.

## Using

1 - Copy and paste this html structure:

```html
<div data-spanish-carousel>
  <section>
    <div data-spanish-carousel-slide="1">
      /* html slide 1 code */
    </div>
    <div data-spanish-carousel-slide="2">
      /* html slide 2 code */
    </div>
    <div data-spanish-carousel-slide="3">
      /* html slide 3 code */
    </div>
  </section>
  <aside>
    <a href="javascript:void(0)" data-spanish-carousel-index="1">
      <span>/* slide 1 bullet text */</span>
      <img src="/* slide 1 bullet image source */">
    </a>
    <a href="javascript:void(0)" data-spanish-carousel-index="2">
      <span>/* slide 2 bullet text */</span>
      <img src="/* slide 2 bullet image source */">
    </a>
    <a href="javascript:void(0)" data-spanish-carousel-index="3">
      <span>/* slide 3 bullet text */</span>
      <img src="/* slide 3 bullet image source */">
    </a>
  </aside>
</div>
```

2 - Fill it up with your data;

3 - Inialize spanish carousel javascript with `SpanishCarousel.init()`;

4 - Have fun!

---

Any feedbacks are welcome! :)
