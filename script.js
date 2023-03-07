document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
  // stop the background scrolling when opening the search form
  document.body.scroll = "no";
  document.documentElement.style.overflow = 'hidden';
};

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
  document.body.scroll = "yes";
  document.documentElement.style.overflow = 'scroll';
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

// NASA API
const url = 'https://api.nasa.gov/planetary/apod?api_key=';
const api_key = "bqg3CmMH7VM6hIXBqASvJyS6gg2ha7IsIesHA3AN";
const today = new Date();

//generate random date
function randomDate(date1, date2){
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || '01-01-1970'
  var date2 = date2 || new Date().toLocaleDateString('en-CA')
  date1 = new Date(date1).getTime()
  date2 = new Date(date2).getTime()
  if( date1>date2){
      return new Date(randomValueBetween(date2, date1)).toISOString().slice(0, 10)   
  } else{
      return new Date(randomValueBetween(date1, date2)).toISOString().slice(0, 10)  
  }
}

// Today
const fetchNASADataToday = async () => {
  const mediaSection = document.querySelector("#today_media-section");

  const imageSection =`<a id="today_hdimg" href="" target="-blank">
  <div class="today_image">
  <img id="today_img" src="" alt="image-by-nasa">
  </div>
  </a>`;

  const videoSection=`<div class="video-div"> 
  <iframe id="today_videoLink" src="" frameborder="0">
  </iframe>
  </div>`;

  const response = await fetch(`${url}${api_key}&date=${today.toISOString().slice(0, 10)}`);
  const data = await response.json();
  console.log(data.code);
  console.log(data);

  // checking if NASA haven't updated Today's best photo
  if (data.code == 404){
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    console.log(yesterday)
    const response = await fetch(`${url}${api_key}&date=${yesterday.toISOString().slice(0, 10)}`);
    const data = await response.json();
    if(data.media_type=="video"){
      mediaSection.innerHTML=videoSection;
      document.getElementById("today_videoLink").src=data.url;
    }else{
      mediaSection.innerHTML=imageSection;
      document.getElementById("today_hdimg").href=data.hdurl;
      document.getElementById("today_img").src=data.url;
    }
    document.getElementById("today_title").textContent = data.title;
    document.getElementById("today_date").textContent = data.date;
    document.getElementById("today_explanation").textContent = data.explanation;
  }else {
    if(data.media_type=="video"){
          mediaSection.innerHTML=videoSection;
          document.getElementById("today_videoLink").src=data.url;
        }else{
          mediaSection.innerHTML=imageSection;
          document.getElementById("today_hdimg").href=data.hdurl;
          document.getElementById("today_img").src=data.url;
      }
      document.getElementById("today_title").textContent = data.title;
      document.getElementById("today_date").textContent = data.date;
      document.getElementById("today_explanation").textContent = data.explanation;
  }
  
  
};

fetchNASADataToday();

// Month
const fetchNASADataMonth = async () => {
  const monthMediaList = document.querySelectorAll(".month_media-section");
  const monthImageSection =`<a class="month_hdimg" href="" target="-blank"><div class="month_image"><img class="month_img" src="" alt="image-by-nasa"></div></a>`;
  const monthVideoSection=`<div class="month_video-div"><iframe class="month_videoLink" src="" frameborder="0"></iframe></div>`;


  for (let media of monthMediaList){
    const response = await fetch(`${url}${api_key}&date=${randomDate(today, '1995/06/16')}`);
    const data = await response.json();
    console.log(data);
    if(data.media_type=="video"){
          media.innerHTML=monthVideoSection;
          media.childNodes[0].childNodes[0].src=data.url;
    }else{
        media.innerHTML=monthImageSection;
        media.childNodes[0].href=data.hdurl;
        media.childNodes[0].childNodes[0].childNodes[0].src=data.url;
    }

    // console.log(media.nextSibling.nextSibling.childNodes[1]);
    media.nextSibling.nextSibling.childNodes[1].textContent = data.title;
    media.nextSibling.nextSibling.childNodes[2].textContent = data.date;
    media.previousSibling.previousSibling.textContent = data.explanation;
    
  }
};

fetchNASADataMonth();



// search date

function nasarequested(){
  // const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
  // const apiKey = "bqg3CmMH7VM6hIXBqASvJyS6gg2ha7IsIesHA3AN";
  const dateInput = document.querySelector("#datepicker");
  const title = document.querySelector("#title");
  const copyright = document.querySelector("#copyright");
  const mediaSection = document.querySelector("#media-section");
  const information = document.querySelector("#description");

  const currentDate =new Date().toISOString().slice(0, 10);
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
      fetch(url+api_key+newDate)
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