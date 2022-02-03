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

//search date

function nasarequested(){
  const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
  const apiKey = "bqg3CmMH7VM6hIXBqASvJyS6gg2ha7IsIesHA3AN";
  const dateInput = document.querySelector("#datepicker");
  const title = document.querySelector("#title");
  const copyright = document.querySelector("#copyright");
  const mediaSection = document.querySelector("#media-section");
  const information = document.querySelector("#description");

  const currentDate =new Date().toLocaleDateString('en-CA');
  console.log(currentDate);

  const imageSection =`<a id="hdimg" href="" target="-blank">
  <div class="image-div">
  <img id="image_of_the_day" src="" alt="image-by-nasa">
  </div>
  </a>`

  const videoSection=`<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`

  let newDate = "&date="+dateInput.value+"&";


  function fetchData(){
    try{
      fetch(baseUrl+apiKey+newDate)
      .then(response=> response.json())
      .then(json=>{
      console.log(json);
      diplaydata(json);
    });
    }catch(error){
      console.log(error);
    }
  }

 function diplaydata(data){

  title.innerHTML=data.title;

  if(data.hasOwnProperty("copyright")){
    copyright.innerHTML=data.copyright;
  } else{
    copyright.innerHTML=""
  } 

  date.innerHTML=data.date;
  dateInput.max=currentDate;
  dateInput.min="1995-06-16";

  if(data.media_type=="video"){
    mediaSection.innerHTML=videoSection;
    document.getElementById("videoLink").src=data.url;
  }else{
    mediaSection.innerHTML=imageSection;
    document.getElementById("hdimg").href=data.hdurl;
    document.getElementById("image_of_the_day").src=data.url;
  }
  
  information.innerHTML=data.explanation;
 }

 fetchData();
}

const dateInput = document.querySelector("#datepicker");
  
dateInput.addEventListener('change',(e)=>{
  e.preventDefault();
  nasarequested();
});

nasarequested().onload;