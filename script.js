document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
};

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
};


//like and unlike button
const listenForLikes = () => {
  const likes = document.querySelectorAll(".like_btn");
  likes.forEach(like =>{
    like.addEventListener("click", (event) => {
      if (like.style.color =="red") {
        like.style.color = "white";
    }
    else{
        like.style.color = "red";
    }
    });
  });
};

listenForLikes();



//week
const url = 'https://api.nasa.gov/planetary/apod?api_key=';
const api_key = "bqg3CmMH7VM6hIXBqASvJyS6gg2ha7IsIesHA3AN";

const fetchNASADataWeek = async () => {
  let today = new Date();
  let yesterday = new Date();

  
  console.log(yesterday.toLocaleDateString('en-CA'));
  
  for (let i = 0; i < 7; i++) {
    yesterday.setDate(today.getDate() - i);
    const response = await fetch(`${url}${api_key}&date=${yesterday.toLocaleDateString('en-CA')}`);
    const data = await response.json();
    // console.log('NASA APOD data', data)
    console.log(`week_picture${i}`);
    document.getElementById(`week_picture${i}`).src = data.hdurl;
    document.getElementById(`week_title${i}`).textContent = data.title;
    document.getElementById(`week_date${i}`).textContent = data.date;
    document.getElementById(`week_explanation${i}`).textContent = data.explanation;
  }
};
fetchNASADataWeek();

// gallery
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});


const fetchNASADataRandom = async () => {
  let today = new Date();
  let random_date = new Date();
  
  for (let i = 0; i < 10; i++) {
    random_date.setDate(today.getDate() - Math.floor((Math.random() * 200) + 1));
    const response = await fetch(`${url}${api_key}&date=${random_date.toLocaleDateString('en-CA')}`);
    const data = await response.json();
    // console.log('NASA APOD data', data)
    console.log(`showcase${i}`);
    document.getElementById(`showcase${i}`).src = data.hdurl;
    
  }
};
fetchNASADataRandom();