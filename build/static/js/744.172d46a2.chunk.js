"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[744],{7744:function(e,t,r){r.r(t),r.d(t,{SupabaseFavorite:function(){return c}});var n=r(4165),i=r(5861),a=r(6213),s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis",u="https://kzylnwqboabfxifjsevi.supabase.co";function c(e){return o.apply(this,arguments)}function o(){return(o=(0,i.Z)((0,n.Z)().mark((function e(t){var r,i,c,o,p;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=(0,a.eI)(u,s),t){e.next=3;break}return e.abrupt("return",!1);case 3:return e.next=5,r.from("Favorite movies").select("movie_id,rating").eq("user_id",t);case 5:if(i=e.sent,c=i.data,o=i.error){e.next=19;break}if(0!==c.length){e.next=13;break}return e.abrupt("return",!1);case 13:return p={},c.map((function(e){p[e.movie_id]=e.rating})),console.log(p),e.abrupt("return",p);case 17:e.next=21;break;case 19:return console.log(o,"cant get user favorites"),e.abrupt("return",!1);case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=744.172d46a2.chunk.js.map