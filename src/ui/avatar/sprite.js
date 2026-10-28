// Small original pixel figure using the existing appearance-v1 identity.
// Parent inheritance and expanded appearance-v2 catalogs belong to Phase C.
export function sprite(state){
 const a=state.appearance,skin=['#edc3a2','#c88f6e','#9b624d','#754737','#e2d3bf'][a.skin],hair=['#322b3e','#704132','#b7a681','#d9dfe7','#1d2439','#af7044'][a.hairColor],eye=['#81c8c5','#c5a04d','#9fb1df','#9563c0','#677b45'][a.eyes];
 const old=state.age>=60,baby=state.age<1,child=state.age<12,cloth=['#4b7a85','#55688d','#7f677f','#60754e'][a.face];
 const pixel=(x,y,w,h,fill)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
 let body=pixel(8,8,16,17,skin)+pixel(6,8,20,5,old?'#c5c2bd':hair)+pixel(6,12,4,a.hair===1?16:8,old?'#c5c2bd':hair)+pixel(23,12,3,a.hair===1?16:6,old?'#c5c2bd':hair);
 for(let i=0;i<4;i++)body+=pixel(8+i*4,6-(a.hair===3&&i%2?3:0),3,5,old?'#c5c2bd':hair);
 body+=pixel(11,16,2,2,eye)+pixel(19,16,2,2,eye)+pixel(14,22,5,1,'#8e5b58');
 if(state.race==='พรายพฤกษา')body+=pixel(3,13,5,3,skin)+pixel(25,13,5,3,skin);
 if(state.race==='สายเลือดดารา')body+=pixel(15,12,2,2,'#d4ddff');
 if(state.race==='ชนศิลา')body+=pixel(9,21,2,2,'#b7aa93');
 body+=baby?pixel(6,25,21,16,'#b8d2c1')+pixel(8,40,17,4,'#72979b'):pixel(8,25,17,12,cloth)+pixel(5,27,3,10,skin)+pixel(25,27,3,10,skin)+pixel(10,37,6,9,'#384452')+pixel(18,37,6,9,'#384452')+pixel(8,45,8,3,'#4c3c34')+pixel(18,45,8,3,'#4c3c34');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 50" shape-rendering="crispEdges" role="img" aria-label="ตัวละคร${baby?'วัยทารก':child?'วัยเด็ก':old?'วัยชรา':'วัยผู้ใหญ่'}" class="pixel-sprite"><ellipse cx="16" cy="48" rx="13" ry="2" fill="#07111d66"/><g transform="${child&&!baby?'translate(3 10) scale(.8)':''}">${body}</g></svg>`;
}
