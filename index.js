import{a as v,S as w,i as a}from"./assets/vendor-D8_O3--j.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function m(i,t=1){return await v("https://pixabay.com/api/",{params:{key:"50825646-7ffda2e7b5c30b92a9f1b68eb",q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}}).then(o=>o.data)}const d=document.querySelector(".gallery"),h=document.querySelector(".loader"),c=document.querySelector(".btn-load-more"),P=new w(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function g(i){const t=i.map(({webformatURL:o,largeImageURL:s,tags:e,likes:r,views:l,comments:q,downloads:C})=>`
        <li class="gallery-list-item">
          <a href="${s}">
            <img src="${o}" alt="${e}"/>
          </a>
          <ul class="list-item">
            <li class="item">
              <h3 class="list-item-title">Likes</h3>
              <p class="list-item-text">${r}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Views</h3>
              <p class="list-item-text">${l}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Comments</h3>
              <p class="list-item-text">${q}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Downloads</h3>
              <p class="list-item-text">${C}</p>
            </li>
          </ul>
        </li>
        `).join("");d.insertAdjacentHTML("beforeend",t),P.refresh()}function x(){d.innerHTML=""}function y(){h.classList.remove("hidden")}function f(){h.classList.add("hidden")}function p(){c.classList.remove("hidden-btn")}function b(){c.classList.add("hidden-btn")}const k=document.querySelector(".form"),L=document.querySelector('input[name="search-text"]'),M=document.querySelector('button[type="submit"]');L.classList.add("input-form");M.classList.add("btn-form");let n=1,S="";const R=15;let u;console.log(u);k.addEventListener("submit",$);async function $(i){i.preventDefault();const t=L.value.toLowerCase().trim();if(H(t),n=1,t===""){a.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}y(),x();try{const o=await m(t,n);if(o.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}u=Math.ceil(o.totalHits/R),n<u?p():(b(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),g(o.hits)}catch{a.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}finally{f()}i.target.reset()}c.addEventListener("click",O);function H(i){S=i}async function O(i){n+=1,c.disabled=!0,y();try{const t=await m(S,n);g(t.hits);const s=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:s*2,left:0,behavior:"smooth"}),c.disabled=!1,n<u?p():(b(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),console.log(t)}catch{a.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight"});return}finally{f()}}
//# sourceMappingURL=index.js.map
