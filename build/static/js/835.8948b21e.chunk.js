"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[835],{7835:function(e,s,a){a.r(s),a.d(s,{default:function(){return o}});var i=a(9439),t=a(2791),l=a(1087),r=a(184),n=function(e){var s=e.search,a=(e.setMovies,(0,t.useState)(1)),l=(0,i.Z)(a,2),n=l[0],c=l[1];return(0,r.jsxs)("div",{className:"result-pager",children:[(0,r.jsx)("div",{className:"arrow-container",onClick:function(){n>1&&(s(n-1),console.log(n-1,n),c(n-1))},children:(0,r.jsx)("span",{className:"arrow-l"})}),(0,r.jsxs)("div",{className:"result-count",children:[n," / ",69]}),(0,r.jsx)("div",{className:"arrow-container",onClick:function(){n<69&&(s(n+1),console.log(n+1,n),c(n+1))},children:(0,r.jsx)("span",{className:"arrow-r"})})]})},c=a(9685);var o=function(){var e=(0,t.useState)(localStorage.getItem("name")),s=(0,i.Z)(e,2),a=s[0],o=(s[1],(0,t.useState)([])),d=(0,i.Z)(o,2),u=d[0],h=d[1];(0,t.useEffect)((function(){(0,c.Z)(a,h)}),[a]);var m=function(e){return null===e?"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.IlGzaN0i9-JDL6dQSj_bUQAAAA%26pid%3DApi&f=1&ipt=b522a5f77745c417bc2f0a78baab3df4fa0648355c7e8a1754c5fa594fa4256f&ipo=images":"https://image.tmdb.org/t/p/original".concat(e)};return(0,r.jsxs)("div",{id:"contResult",className:"relative bg-cover bg-center bg-no-repeat bg-orange-200 h-screen w-screen",children:[(0,r.jsxs)("div",{id:"resultTitle",children:[(0,r.jsx)("div",{children:(0,r.jsx)(l.rU,{to:"/",children:"<-"})}),(0,r.jsx)(n,{search:c.Z,setMovies:h}),(0,r.jsxs)("h1",{children:['Search results for "',a,'"']})]}),(0,r.jsx)("div",{id:"itemsResult",className:"scrollbar",children:u.length>0&&(0,r.jsx)("ul",{children:u.map((function(e){return!(e.release_date&&e.adult^"ja"===e.original_language)||(console.log(e.adult!==e.original_language),e.id?(0,r.jsxs)(l.rU,{to:"/movie",state:{id:e.id},className:"items",children:[(0,r.jsxs)("div",{className:"resultPosters",children:[(0,r.jsx)("img",{src:m(e.poster_path),className:"resultPoster",alt:""}),(0,r.jsx)("h1",{className:"item",children:e.original_title})]}),(0,r.jsx)("div",{className:"item",children:e.release_date})]},e.id):(0,r.jsxs)("div",{className:"items",onClick:alert("This movie does not have proper ID"),children:[(0,r.jsxs)("div",{className:"resultPosters",children:[(0,r.jsx)("img",{src:m(e.poster_path),className:"resultPoster",alt:""}),(0,r.jsx)("h1",{className:"item",children:e.original_title})]}),(0,r.jsxs)("div",{className:"item",children:["! ",e.release_date]})]}))}))})}),(0,r.jsxs)("div",{id:"warning",className:"absolute top-60 h-44 flex flex-col justify-evenly items-center rounded-lg",children:[(0,r.jsxs)("h1",{className:"py-3",children:['No movies were found with name: "',a,'"']}),(0,r.jsx)(l.rU,{id:"warningLink",className:"p-2 rounded-lg",to:"/",children:"Go Back To Search"})]})]})}}}]);
//# sourceMappingURL=835.8948b21e.chunk.js.map