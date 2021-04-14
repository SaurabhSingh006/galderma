// DOMStrings
const form = document.querySelector('.form')
const steps = document.querySelectorAll('.form__step');
const slide = document.querySelectorAll('.form__slide');
const slideArr = Array.prototype.slice.call(slide);
const inputEl = document.querySelectorAll('.form__input');
const inputArr = Array.prototype.slice.call(inputEl);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const general = document.querySelector('.general');
const contact = document.querySelector('.contact');
const family = document.querySelector('.family');
const emergency = document.querySelector('.emergency');
const banking = document.querySelector('.banking');


//FORM JS
let currentSlide = 0;

// Event Handlers
prevBtn.addEventListener('click',prevnext(-1)); 
nextBtn.addEventListener('click',prevnext(1));

//Defining functions
function showSlide(slideNo) {
  slide[slideNo].style.display = 'block';

  //Button hidding
  if (slideNo == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (slideNo == (slide.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Preview";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next"; 
  }

  for(let m = 0; m <=slideNo; m++) {
    steps[m].style.backgroundColor = "var(--green)";
  }
}

function prevnext(n) {
  return (e) => {
    e.preventDefault();
    //Code here....
    // Goes back to top
    form.scrollIntoView();

    if(nextBtn.innerText == 'Submit' && n == 1) {
      form.submit();
      alert('Confirm form submision');
    }

    if(nextBtn.innerText == 'Submit' && n == -1) {
      slideArr.map((el) => {
        el.style.display = null;
      });
      inputArr.map((input) => {
        input.disabled = false;
        input.style.borderBottom = null;
      });

      nextBtn.innerText = 'Next';
    }

    //Validate Form
    console.log(validateForm());
    //if (n == 1 && !validateForm()) return false;

    //Hide the current slide
    slide[currentSlide].style.display = null;
    if(n == -1) {
      steps[currentSlide].style.backgroundColor = "var(--white)";
    }

    currentSlide = currentSlide + n;
    if(currentSlide == slide.length) {
      slideArr.map((el) => {
        el.style.display = 'block';
      });
      inputArr.map((input) => {
        input.disabled = true;
        input.style.borderBottom = 'none';
      });

      nextBtn.innerText = 'Submit';
    }

    showSlide(currentSlide);
  }
}

const validateForm = () => {
  const childInput = slide[currentSlide].querySelectorAll('.form__input');
  const arrayInput = Array.prototype.slice.call(childInput);
  let valid = true;
  arrayInput.map((input) => {
  valid = input.checkValidity();
  });
  return valid;
}

// Initiallization
showSlide(currentSlide); 

