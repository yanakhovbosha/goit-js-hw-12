import{a as C,S as v,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();async function m(r,t=1){return await C("https://pixabay.com/api/",{params:{key:"50825646-7ffda2e7b5c30b92a9f1b68eb",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}}).then(i=>i.data)}const d=document.querySelector(".gallery"),h=document.querySelector(".loader"),n=document.querySelector(".btn-load-more");let c=1,f="";const w=15,P=new v(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function g(r){const t=r.map(({webformatURL:i,largeImageURL:s,tags:e,likes:o,views:a,comments:S,downloads:q})=>`
        <li class="gallery-list-item">
          <a href="${s}">
            <img src="${i}" alt="${e}"/>
          </a>
          <ul class="list-item">
            <li class="item">
              <h3 class="list-item-title">Likes</h3>
              <p class="list-item-text">${o}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Views</h3>
              <p class="list-item-text">${a}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Comments</h3>
              <p class="list-item-text">${S}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Downloads</h3>
              <p class="list-item-text">${q}</p>
            </li>
          </ul>
        </li>
        `).join("");d.insertAdjacentHTML("beforeend",t),P.refresh()}function x(){d.innerHTML=""}function p(){h.classList.remove("hidden")}function y(){h.classList.add("hidden")}function b(){n.classList.remove("hidden-btn")}function $(){n.classList.add("hidden-btn")}n.addEventListener("click",H);function M(r){f=r}async function H(r){c+=1,n.disabled=!0,p();try{const t=await m(f,c);g(t.hits);const s=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:s*2,left:100,behavior:"smooth"}),n.disabled=!1;const e=Math.ceil(t.totalHits/w);console.log(e),c<e?b():($(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),console.log(t)}catch{l.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}finally{y()}}const O=document.querySelector(".form"),L=document.querySelector('input[name="search-text"]'),k=document.querySelector('button[type="submit"]');L.classList.add("input-form");k.classList.add("btn-form");let u=1;O.addEventListener("submit",B);async function B(r){r.preventDefault();const t=L.value.toLowerCase().trim();if(M(t),u=1,t===""){l.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}p(),x(),m(t,u).then(i=>{if(console.log(i),i.hits.length===0||t===""){l.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}g(i.hits),b()}).catch(i=>{console.log(i)}).finally(()=>{y()}),r.target.reset()}
//# sourceMappingURL=index.js.map
