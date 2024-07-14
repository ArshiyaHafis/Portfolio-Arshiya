/*var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById('test'),
    ctx = canvas.getContext('2d'),
    rate = 60,
    arc = 100,
    time,
    count,
    size = 7,
    speed = 20,
    parts = new Array,
    colors = ['red','#f57900','yellow','#ce5c00','#5c3566'];
var mouse = { x: 0, y: 0 };

canvas.setAttribute('width',w);
canvas.setAttribute('height',h);

function create() {
  time = 0;
  count = 0;

  for(var i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random()*colors.length)],
      size: Math.random() * size
    }
  }
}

function particles() {
  ctx.clearRect(0,0,w,h);
   canvas.addEventListener('mousemove', MouseMove, false);
  for(var i = 0; i < arc; i++) {
    var li = parts[i];
    var distanceFactor = DistanceBetween( mouse, parts[i] );
    var distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
    ctx.beginPath();
    ctx.arc(li.x,li.y,li.size*distanceFactor,0,Math.PI*2,false);
    ctx.fillStyle = li.c;
    ctx.strokeStyle=li.c;
    if(i%2==0)
      ctx.stroke();
    else
      ctx.fill();
    
    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);
    
    if(li.x > w){
       li.x = 0; 
    }
    if(li.y > h) {
       li.y = 0; 
    }
    if(li.x < 0) {
       li.x = w; 
    }
    if(li.y < 0) {
       li.y = h; 
    }
   
     
  }
  if(time < speed) {
    time++;
  }
  setTimeout(particles,1000/rate);
}
function MouseMove(e) {
   mouse.x = e.layerX;
   mouse.y = e.layerY;

   //context.fillRect(e.layerX, e.layerY, 5, 5);
   //Draw( e.layerX, e.layerY );
}
function DistanceBetween(p1,p2) {
   var dx = p2.x-p1.x;
   var dy = p2.y-p1.y;
   return Math.sqrt(dx*dx + dy*dy);
}
create();
particles();*/




const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/static/css/style.css';
document.head.appendChild(link);


const slide = document.querySelector('.slide');
const root = document.querySelector(':root');
let slideIndex = 1;
let isMoving = false;

function processImages(item){
  return `<img src="${item.url}" alt="${item.alt}">`;
}

function moveSlides(){
  slide.style.transform = `translateX(-${slideIndex * 100}%)`;
  const slidesArray = [...slide.querySelectorAll('img')];
  root.style.setProperty('--slide-progress', `${(100 / (slidesArray.length -3)) * (slideIndex -1)}%`);
}

// move when clicked

function moveHandler(direction){
  isMoving = true;
  slide.style.transition = `transform 450ms ease-in-out`;
  direction !== 'right' ? (slideIndex -= 1) : (slideIndex += 1);
  moveSlides();
}

// fetch images
async function fetchImages(){
  await fetch('../static/js/images.json')
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response was not okay');
      }
      return response.json();
    })
    .then((data) => {
      // cloned first and last image
      data.push(data[0]);
      data.unshift(data[data.length - 2]);
      // show slider
      slide.innerHTML = data.map(processImages).join('');
      moveSlides();
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}
fetchImages()

// keyboard arrow handler
window.addEventListener('keyup', e => {
  if(isMoving){
    return;
  }
  switch (e.key){
    case 'ArrowLeft':
      moveHandler()
      break;
    case 'ArrowRight':
      moveHandler('right')
      break;
    default:
      break;
  }
})

// click right btn
document.querySelector('.slider__btn--right').addEventListener('click', () => {
  if(isMoving){
    return;
  }
  moveHandler('right');
})

// click left btn
document.querySelector('.slider__btn--left').addEventListener('click', () => {
  if(isMoving){
    return;
  }
  moveHandler();
})

slide.addEventListener('transitionend', () => {
  isMoving = false;
  const slidesArray = [...slide.querySelectorAll('img')];
  root.style.setProperty('--slide-progress--transition', `${slideIndex === slidesArray.length - 1 ? 'none' : 'all 400ms cubic-bezier(0.82, 0.02, 0.39, 1.01)'}`);
  if(slideIndex === 0){
    slide.style.transition = 'none';
    slideIndex = slidesArray.length - 2;
    moveSlides()
  }
  if(slideIndex === slidesArray.length -1){
    slide.style.transition = 'none';
    slideIndex = 1;
    moveSlides()
  }
})


const slides = document.querySelectorAll('.slide img');
const circlesContainer = document.querySelector('.slider__circles');

// Create circles
slides.forEach((_, index) => {
    const circle = document.createElement('div');
    circle.classList.add('slider__circle');
    circlesContainer.appendChild(circle);

    // Set click event to move to corresponding slide
    circle.addEventListener('click', () => {
        goToSlide(index);
    });
});

let currentSlide = 0;
const goToSlide = (slideIndex) => {
    slides[currentSlide].classList.remove('active');
    circles[currentSlide].classList.remove('active');
    currentSlide = slideIndex;
    slides[currentSlide].classList.add('active');
    circles[currentSlide].classList.add('active');
};

const circles = document.querySelectorAll('.slider__circle');

// Set initial active state
slides[currentSlide].classList.add('active');
circles[currentSlide].classList.add('active');

// Handle next and previous buttons
const nextBtn = document.querySelector('.slider__btn--right');
const prevBtn = document.querySelector('.slider__btn--left');

nextBtn.addEventListener('click', () => {
    const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(nextSlide);
});

prevBtn.addEventListener('click', () => {
    const prevSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevSlide);
});
