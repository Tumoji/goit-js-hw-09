const t=document.querySelector("[data-stop]"),e=document.querySelector("[data-start]");let d;function a(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.disabled=!0,e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,d=setInterval(a,1e3)})),t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,clearInterval(d)}));
//# sourceMappingURL=01-color-switcher.d0c2cf63.js.map
