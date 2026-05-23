import { useState, useEffect, useRef } from "react";
import luna_p1 from './images/luna/p1.png';
import luna_p2 from './images/luna/p2.png';
import luna_p3 from './images/luna/p3.png';
import luna_p4 from './images/luna/p4.png';
import luna_p5 from './images/luna/p5.png';
import pergamino from './images/Pergamino.png';


const GRID = 8;
const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

// ── Canvas art per world ──────────────────────────────────────────
function drawLuna(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#03020a");g.addColorStop(0.5,"#0a0818");g.addColorStop(1,"#100d20");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(let i=0;i<120;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.7,Math.random()*1.4,0,Math.PI*2);ctx.fillStyle=`rgba(220,200,255,${0.2+Math.random()*0.7})`;ctx.fill();}
  // Moon
  ctx.shadowColor="#d0c0ff";ctx.shadowBlur=40;
  ctx.fillStyle="#e8deff";ctx.beginPath();ctx.arc(W*0.5,H*0.22,W*0.13,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#0a0818";ctx.beginPath();ctx.arc(W*0.44,H*0.2,W*0.12,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;
  // Bookshelves silhouette
  ctx.fillStyle="rgba(8,4,20,0.95)";
  ctx.fillRect(0,H*0.55,W*0.18,H*0.45);ctx.fillRect(W*0.82,H*0.55,W*0.18,H*0.45);
  for(let i=0;i<6;i++){ctx.fillRect(W*0.02,H*(0.58+i*0.06),W*0.14,H*0.012);}
  for(let i=0;i<6;i++){ctx.fillRect(W*0.84,H*(0.58+i*0.06),W*0.14,H*0.012);}
  ctx.fillStyle="rgba(5,2,15,0.9)";ctx.fillRect(0,H*0.82,W,H*0.18);
  const titles=[["LA BIBLIOTECA","DE LAS LUNAS"],["EL GRIMORIO","LUNAR"],["LAS PÁGINAS","PERDIDAS"],["LA LECTORA","NOCTURNA"],["EL ÚLTIMO","CAPÍTULO"]];
  ctx.fillStyle="#c8b0ff";ctx.font=`bold ${W*0.062}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#9060e0";ctx.shadowBlur=14;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.88);ctx.fillText(titles[v][1],W/2,H*0.95);ctx.shadowBlur=0;
  // Seleene logo tiny
  ctx.fillStyle="rgba(200,176,255,0.35)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawVelas(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#020410");g.addColorStop(1,"#080c24");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Blue candles glow
  const candles=[[W*0.2,H*0.6],[W*0.4,H*0.65],[W*0.6,H*0.62],[W*0.8,H*0.58]];
  candles.forEach(([x,y])=>{
    ctx.shadowColor="#4060ff";ctx.shadowBlur=30;
    ctx.fillStyle="rgba(80,120,255,0.6)";ctx.beginPath();ctx.arc(x,y-H*0.02,W*0.018,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#a0b8ff";ctx.fillRect(x-W*0.012,y,W*0.024,H*0.12);
    ctx.shadowBlur=0;
  });
  for(let i=0;i<80;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.5,Math.random()*1.2,0,Math.PI*2);ctx.fillStyle=`rgba(100,140,255,${0.2+Math.random()*0.6})`;ctx.fill();}
  // Fae silhouette
  ctx.fillStyle="rgba(4,6,20,0.95)";
  ctx.beginPath();ctx.ellipse(W*0.5,H*0.42,W*0.06,H*0.14,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(W*0.5,H*0.26,W*0.038,H*0.052,0,0,Math.PI*2);ctx.fill();
  // Wings
  ctx.fillStyle="rgba(60,80,200,0.25)";
  ctx.beginPath();ctx.moveTo(W*0.5,H*0.32);ctx.lineTo(W*0.1,H*0.15);ctx.lineTo(W*0.35,H*0.42);ctx.fill();
  ctx.beginPath();ctx.moveTo(W*0.5,H*0.32);ctx.lineTo(W*0.9,H*0.15);ctx.lineTo(W*0.65,H*0.42);ctx.fill();
  ctx.fillStyle="rgba(4,6,20,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["EL REINO DE","LAS VELAS AZULES"],["LA CORTE","FAE"],["EL ENEMIGO","AMADO"],["LAS LLAMAS","DEL PACTO"],["LA ÚLTIMA","VELA"]];
  ctx.fillStyle="#8090ff";ctx.font=`bold ${W*0.058}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#4050c0";ctx.shadowBlur=14;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(128,144,255,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawOrden(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#060400");g.addColorStop(1,"#181008");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(let i=0;i<60;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.5,Math.random()*1,0,Math.PI*2);ctx.fillStyle=`rgba(255,220,140,${0.2+Math.random()*0.5})`;ctx.fill();}
  // Academy columns
  ctx.fillStyle="rgba(15,10,4,0.95)";
  [[W*0.1,H*0.3],[W*0.25,H*0.25],[W*0.75,H*0.25],[W*0.9,H*0.3]].forEach(([x,y])=>{
    ctx.fillRect(x-W*0.028,y,W*0.056,H*0.7);
    ctx.fillRect(x-W*0.04,y-H*0.03,W*0.08,H*0.03);
  });
  // Open book
  ctx.fillStyle="rgba(20,14,6,0.95)";ctx.fillRect(W*0.28,H*0.55,W*0.44,H*0.22);
  ctx.strokeStyle="rgba(200,160,60,0.5)";ctx.lineWidth=1;ctx.strokeRect(W*0.28,H*0.55,W*0.44,H*0.22);
  ctx.beginPath();ctx.moveTo(W*0.5,H*0.55);ctx.lineTo(W*0.5,H*0.77);ctx.stroke();
  ctx.fillStyle="rgba(10,7,2,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["LA ORDEN DE LAS","LECTORAS NOCTURNAS"],["EL PRIMER","JURAMENTO"],["LA ACADEMIA","OSCURA"],["EL LIBRO","PROHIBIDO"],["LA ÚLTIMA","INICIADA"]];
  ctx.fillStyle="#d4a840";ctx.font=`bold ${W*0.052}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#a07820";ctx.shadowBlur=12;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(212,168,64,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawArchivo(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#040408");g.addColorStop(1,"#0c0c1a");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Constellation
  const stars=[[0.2,0.15],[0.5,0.08],[0.8,0.18],[0.35,0.28],[0.65,0.25],[0.5,0.38],[0.15,0.4],[0.85,0.35]];
  ctx.strokeStyle="rgba(200,200,255,0.15)";ctx.lineWidth=1;
  for(let i=0;i<stars.length-1;i++){ctx.beginPath();ctx.moveTo(stars[i][0]*W,stars[i][1]*H);ctx.lineTo(stars[i+1][0]*W,stars[i+1][1]*H);ctx.stroke();}
  stars.forEach(([x,y])=>{ctx.beginPath();ctx.arc(x*W,y*H,W*0.008,0,Math.PI*2);ctx.fillStyle="#e0e0ff";ctx.shadowColor="#a0a0ff";ctx.shadowBlur=8;ctx.fill();ctx.shadowBlur=0;});
  for(let i=0;i<100;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*1.2,0,Math.PI*2);ctx.fillStyle=`rgba(180,180,255,${0.15+Math.random()*0.5})`;ctx.fill();}
  // Relic / orb
  ctx.shadowColor="#8080ff";ctx.shadowBlur=30;
  ctx.strokeStyle="rgba(160,160,255,0.6)";ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(W*0.5,H*0.5,W*0.1,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(W*0.5,H*0.5,W*0.06,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle="rgba(140,140,255,0.2)";ctx.beginPath();ctx.arc(W*0.5,H*0.5,W*0.04,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle="rgba(4,4,14,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["EL ARCHIVO","DE SELENE"],["LA PROFECÍA","OLVIDADA"],["LA RELIQUIA","LUNAR"],["EL GUARDIÁN","DEL ARCHIVO"],["EL SELLO","ROTO"]];
  ctx.fillStyle="#b0b0f0";ctx.font=`bold ${W*0.065}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#6060c0";ctx.shadowBlur=14;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(176,176,240,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawJardines(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#020806");g.addColorStop(1,"#041410");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Ink garden
  for(let i=0;i<12;i++){
    const x=Math.random()*W,h=H*(0.1+Math.random()*0.3);
    ctx.strokeStyle=`rgba(${20+Math.random()*40},${80+Math.random()*60},${40+Math.random()*40},0.6)`;
    ctx.lineWidth=2+Math.random()*3;
    ctx.beginPath();ctx.moveTo(x,H*0.75);ctx.bezierCurveTo(x+20,H*0.75-h*0.5,x-20,H*0.75-h*0.7,x+10,H*0.75-h);ctx.stroke();
    // Petals
    for(let p=0;p<4;p++){const a=p/4*Math.PI*2;ctx.fillStyle=`rgba(${60+Math.random()*80},${100+Math.random()*80},${60+Math.random()*40},0.4)`;ctx.beginPath();ctx.ellipse(x+10+Math.cos(a)*W*0.03,H*0.75-h+Math.sin(a)*H*0.02,W*0.025,H*0.012,a,0,Math.PI*2);ctx.fill();}
  }
  // Dragon
  ctx.fillStyle="rgba(4,12,8,0.95)";
  ctx.beginPath();ctx.ellipse(W*0.5,H*0.38,W*0.28,H*0.1,0.1,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.moveTo(W*0.5,H*0.35);ctx.lineTo(W*0.1,H*0.18);ctx.lineTo(W*0.25,H*0.38);ctx.fill();
  ctx.beginPath();ctx.moveTo(W*0.5,H*0.35);ctx.lineTo(W*0.9,H*0.18);ctx.lineTo(W*0.75,H*0.38);ctx.fill();
  ctx.shadowColor="#20c060";ctx.shadowBlur=8;
  ctx.fillStyle="rgba(40,200,100,0.7)";ctx.beginPath();ctx.arc(W*0.62,H*0.36,W*0.008,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle="rgba(2,10,6,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["LA CASA DE LOS","JARDINES DE TINTA"],["EL DRAGÓN","DEL JARDÍN"],["LA MALDICIÓN","DE TINTA"],["EL ROMANCE","PROHIBIDO"],["LA ÚLTIMA","FLOR"]];
  ctx.fillStyle="#70c090";ctx.font=`bold ${W*0.054}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#308050";ctx.shadowBlur=12;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(112,192,144,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawRunas(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#020802");g.addColorStop(1,"#081408");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Ancient forest
  for(let i=0;i<16;i++){
    const x=i*(W/15),tw=W*0.025;
    ctx.fillStyle=`rgba(6,${18+Math.random()*20},6,0.98)`;
    ctx.fillRect(x-tw,H*0.3,tw*2,H*0.7);
    ctx.beginPath();ctx.moveTo(x,H*0.3);ctx.lineTo(x-W*0.05,H*0.5);ctx.lineTo(x+W*0.05,H*0.5);ctx.fill();
  }
  // Runes glowing
  ctx.shadowColor="#40ff80";ctx.shadowBlur=12;
  ctx.strokeStyle="rgba(60,220,100,0.5)";ctx.lineWidth=1.5;
  [[W*0.3,H*0.45],[W*0.5,H*0.4],[W*0.7,H*0.45]].forEach(([x,y])=>{
    ctx.beginPath();ctx.arc(x,y,W*0.04,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x,y-W*0.04);ctx.lineTo(x,y+W*0.04);ctx.moveTo(x-W*0.04,y);ctx.lineTo(x+W*0.04,y);ctx.stroke();
  });
  ctx.shadowBlur=0;
  ctx.fillStyle="rgba(2,10,2,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["EL BOSQUE DE LAS","RUNAS OLVIDADAS"],["LA RUNA","PROHIBIDA"],["EL GUARDIÁN","DEL BOSQUE"],["LA MALDICIÓN","VERDE"],["EL ÚLTIMO","ÁRBOL"]];
  ctx.fillStyle="#60c870";ctx.font=`bold ${W*0.054}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#308040";ctx.shadowBlur=12;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(96,200,112,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawMareas(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#020610");g.addColorStop(1,"#060e20");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Waves
  for(let w=0;w<5;w++){
    ctx.strokeStyle=`rgba(40,${100+w*20},${180+w*10},${0.15+w*0.06})`;ctx.lineWidth=2+w;
    ctx.beginPath();
    for(let x=0;x<=W;x+=4){ctx.lineTo(x,H*(0.45+w*0.06)+Math.sin(x/W*Math.PI*4+w)*H*0.04);}
    ctx.stroke();
  }
  for(let i=0;i<80;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.5,Math.random()*1.3,0,Math.PI*2);ctx.fillStyle=`rgba(100,180,255,${0.2+Math.random()*0.5})`;ctx.fill();}
  // Siren silhouette
  ctx.fillStyle="rgba(2,6,18,0.95)";
  ctx.beginPath();ctx.ellipse(W*0.5,H*0.42,W*0.055,H*0.13,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(W*0.5,H*0.27,W*0.035,H*0.048,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.moveTo(W*0.42,H*0.55);ctx.lineTo(W*0.35,H*0.72);ctx.lineTo(W*0.5,H*0.65);ctx.lineTo(W*0.65,H*0.72);ctx.lineTo(W*0.58,H*0.55);ctx.fill();
  ctx.shadowColor="#40a0ff";ctx.shadowBlur=20;
  ctx.strokeStyle="rgba(80,160,255,0.5)";ctx.lineWidth=1;ctx.beginPath();ctx.arc(W*0.5,H*0.45,W*0.15,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;
  ctx.fillStyle="rgba(2,6,18,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["LA CORTE DE LAS","MAREAS ETERNAS"],["EL MAR","PROHIBIDO"],["LA SIRENA","Y EL REY"],["EL SECRETO","DE LAS AGUAS"],["LA ÚLTIMA","MAREA"]];
  ctx.fillStyle="#60a8e0";ctx.font=`bold ${W*0.054}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#2060a0";ctx.shadowBlur=12;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(96,168,224,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

function drawPalacio(ctx,W,H,v=0){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#080408");g.addColorStop(1,"#140810");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Broken stars falling
  for(let i=0;i<40;i++){
    const x=Math.random()*W,y=Math.random()*H*0.6,s=1+Math.random()*3;
    ctx.fillStyle=`rgba(255,${180+Math.random()*60},${100+Math.random()*60},${0.4+Math.random()*0.5})`;
    ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill();
    if(Math.random()>0.6){ctx.strokeStyle=`rgba(255,200,100,0.2)`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.random()*20-10,y+Math.random()*30);ctx.stroke();}
  }
  // Palace silhouette
  ctx.fillStyle="rgba(10,4,10,0.97)";
  ctx.fillRect(W*0.3,H*0.4,W*0.4,H*0.4);
  ctx.beginPath();ctx.moveTo(W*0.3,H*0.4);ctx.lineTo(W*0.5,H*0.2);ctx.lineTo(W*0.7,H*0.4);ctx.fill();
  [[W*0.35,H*0.38],[W*0.65,H*0.38]].forEach(([x,y])=>{
    ctx.fillRect(x-W*0.04,y-H*0.15,W*0.08,H*0.15);
    ctx.beginPath();ctx.moveTo(x-W*0.04,y-H*0.15);ctx.lineTo(x,y-H*0.22);ctx.lineTo(x+W*0.04,y-H*0.15);ctx.fill();
  });
  // Forbidden love glow
  ctx.shadowColor="#ff6080";ctx.shadowBlur=20;
  ctx.fillStyle="rgba(255,80,100,0.3)";ctx.beginPath();ctx.arc(W*0.5,H*0.5,W*0.06,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle="rgba(10,4,10,0.92)";ctx.fillRect(0,H*0.8,W,H*0.2);
  const titles=[["EL PALACIO DE LAS","ESTRELLAS ROTAS"],["LA PROFECÍA","MALDITA"],["EL AMOR","PROHIBIDO"],["LAS ESTRELLAS","CAÍDAS"],["EL ÚLTIMO","DESEO"]];
  ctx.fillStyle="#e080a0";ctx.font=`bold ${W*0.054}px Georgia`;ctx.textAlign="center";
  ctx.shadowColor="#a04060";ctx.shadowBlur=12;
  ctx.fillText(titles[Math.min(v,4)][0],W/2,H*0.87);ctx.fillText(titles[v][1],W/2,H*0.94);ctx.shadowBlur=0;
  ctx.fillStyle="rgba(224,128,160,0.3)";ctx.font=`${W*0.028}px Georgia`;ctx.fillText("✦ SELEENE CO ✦",W/2,H*0.99);
}

const WORLD_ART=[drawLuna,drawVelas,drawOrden,drawArchivo,drawJardines,drawRunas,drawMareas,drawPalacio];
const WORLD_IMAGES = [
  [luna_p1, luna_p2, luna_p3, luna_p4, luna_p5],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

const WORLDS=[
  { id:"w0", free:true, accent:"#c8b0ff", emoji:"🌙",
    title:{es:"La Biblioteca de las Lunas Perdidas",en:"The Library of Lost Moons"},
    puzzles:{
      es:["La Portada","El Grimorio Lunar","Las Páginas Perdidas","La Lectora Nocturna","El Último Capítulo"],
      en:["The Cover","The Lunar Grimoire","The Lost Pages","The Night Reader","The Last Chapter"]
    }
  },
  { id:"w1", free:false, accent:"#8090ff", emoji:"🕯️",
    title:{es:"El Reino de las Velas Azules",en:"The Kingdom of Blue Candles"},
    puzzles:{
      es:["La Portada","La Corte Fae","El Enemigo Amado","Las Llamas del Pacto","La Última Vela"],
      en:["The Cover","The Fae Court","The Beloved Enemy","The Flames of the Pact","The Last Candle"]
    }
  },
  { id:"w2", free:false, accent:"#d4a840", emoji:"📖",
    title:{es:"La Orden de las Lectoras Nocturnas",en:"The Order of Night Readers"},
    puzzles:{
      es:["La Portada","El Primer Juramento","La Academia Oscura","El Libro Prohibido","La Última Iniciada"],
      en:["The Cover","The First Oath","The Dark Academy","The Forbidden Book","The Last Initiate"]
    }
  },
  { id:"w3", free:false, accent:"#b0b0f0", emoji:"⭐",
    title:{es:"El Archivo de Selene",en:"The Archive of Selene"},
    puzzles:{
      es:["La Portada","La Profecía Olvidada","La Reliquia Lunar","El Guardián del Archivo","El Sello Roto"],
      en:["The Cover","The Forgotten Prophecy","The Lunar Relic","The Archive Guardian","The Broken Seal"]
    }
  },
  { id:"w4", free:false, accent:"#70c090", emoji:"🐉",
    title:{es:"La Casa de los Jardines de Tinta",en:"The House of Ink Gardens"},
    puzzles:{
      es:["La Portada","El Dragón del Jardín","La Maldición de Tinta","El Romance Prohibido","La Última Flor"],
      en:["The Cover","The Garden Dragon","The Ink Curse","The Forbidden Romance","The Last Flower"]
    }
  },
  { id:"w5", free:false, accent:"#60c870", emoji:"🌿",
    title:{es:"El Bosque de las Runas Olvidadas",en:"The Forest of Forgotten Runes"},
    puzzles:{
      es:["La Portada","La Runa Prohibida","El Guardián del Bosque","La Maldición Verde","El Último Árbol"],
      en:["The Cover","The Forbidden Rune","The Forest Guardian","The Green Curse","The Last Tree"]
    }
  },
  { id:"w6", free:false, accent:"#60a8e0", emoji:"🌊",
    title:{es:"La Corte de las Mareas Eternas",en:"The Court of Eternal Tides"},
    puzzles:{
      es:["La Portada","El Mar Prohibido","La Sirena y el Rey","El Secreto de las Aguas","La Última Marea"],
      en:["The Cover","The Forbidden Sea","The Siren and the King","The Secret of the Waters","The Last Tide"]
    }
  },
  { id:"w7", free:false, accent:"#e080a0", emoji:"✨",
    title:{es:"El Palacio de las Estrellas Rotas",en:"The Palace of Broken Stars"},
    puzzles:{
      es:["La Portada","La Profecía Maldita","El Amor Prohibido","Las Estrellas Caídas","El Último Deseo"],
      en:["The Cover","The Cursed Prophecy","The Forbidden Love","The Fallen Stars","The Last Wish"]
    }
  },
];const STORIES = {
  w0: [
    {
      es: { title:"La noche en que la luna desaparece", text:"La primera noche que la luna desapareció, Elara pensó que era una nube.\n\nLuego vio que las estrellas también estaban asustadas.\n\nNo brillaban. Temblaban.\n\nCaminó hasta la plaza vieja, donde apareció una puerta alta y negra tallada con lunas. Sobre el arco, unas letras se encendieron lentamente: Biblioteca de las Lunas Perdidas.\n\nDebajo, una segunda frase apareció.\n\n«Solo entran quienes han olvidado algo que amaban.»\n\n—Yo no he olvidado nada —susurró Elara.\n\nLa puerta se abrió." },
      en: { title:"The Night the Moon Disappeared", text:"The first night the moon disappeared, Elara thought it was a cloud.\n\nThen she saw the stars were frightened too.\n\nThey didn't shine. They trembled.\n\nShe walked to the old square, where a tall black door appeared, carved with crescent moons. Above the arch, letters slowly lit up: Library of Lost Moons.\n\nBelow, a second phrase appeared.\n\n«Only those who have forgotten something they loved may enter.»\n\n—I haven't forgotten anything, she whispered.\n\nThe door opened." }
    },
    {
      es: { title:"El pergamino que escribe el futuro", text:"El interior era imposible. Estanterías infinitas se alzaban hasta un techo lleno de lunas pequeñas suspendidas como lámparas de plata.\n\nUn joven estaba junto a una mesa de mapas celestes. Sus ojos eran grises, casi luminosos.\n\n—Cael. Guardián de esta biblioteca.\n\nSobre la mesa, un pergamino comenzó a desenrollarse solo. Una gota de luz lunar cayó sobre él.\n\nElara Vey encontrará esta noche la historia que le fue robada.\n\n—¿Robada por quién?\n\nCael dio un paso hacia ella.\n\n—No leas más.\n\nPero las palabras ya estaban naciendo.\n\nY conocerá al hombre que la ayudó a olvidar.\n\nElara levantó la mirada hacia él." },
      en: { title:"The Scroll That Writes the Future", text:"The interior was impossible. Endless shelves rose to a ceiling full of small moons suspended like silver lamps.\n\nA young man stood by a table covered in celestial maps. His eyes were gray, almost luminous.\n\n—Cael. Guardian of this library.\n\nOn the table, a scroll began to unroll itself. A drop of moonlight fell upon it.\n\nElara Vey will find tonight the story that was stolen from her.\n\n—Stolen by whom?\n\nCael stepped toward her.\n\n—Don't read any further.\n\nBut the words were already forming.\n\nAnd she will meet the man who helped her forget.\n\nElara looked up at him." }
    },
    {
      es: { title:"El pasillo de los libros prohibidos", text:"—¿Qué me hiciste olvidar?\n\nAntes de que Cael pudiera responder, una campana sonó desde las profundidades. No era un sonido metálico. Era un lamento.\n\nÉl señaló el pasillo más oscuro. Entre dos columnas había una puerta pequeña con una inscripción en plata vieja.\n\n«Historias que no deben despertar.»\n\nElara sintió que algo dentro de ella se quebraba. No era miedo. Era reconocimiento.\n\nAl cruzar, encontraron una sala circular con un solo libro sobre un pedestal de piedra negra. La cubierta era de cuero blanco. No tenía título. Solo su nombre.\n\nElara Vey." },
      en: { title:"The Corridor of Forbidden Books", text:"—What did you make me forget?\n\nBefore Cael could answer, a bell rang from the depths. Not a metallic sound. A lament.\n\nHe pointed to the darkest corridor. Between two columns stood a small door with an inscription in old silver.\n\n«Stories that must not awaken.»\n\nElara felt something break inside her. Not fear. Recognition.\n\nCrossing through, they found a circular room with a single book on a black stone pedestal. The cover was white leather. No title. Only her name.\n\nElara Vey." }
    },
    {
      es: { title:"El baile bajo las lunas falsas", text:"El suelo se transformó en mármol brillante.\n\nEstaban en un enorme salón de baile iluminado por cientos de lunas pequeñas que flotaban bajo un techo de cristal.\n\n—Esto es un recuerdo —dijo Cael.\n\nElara se vio a sí misma con un vestido bordado de constelaciones, tomada del brazo de Cael. Él la miraba como si ella fuera la única luna que le quedaba al mundo.\n\nUna luna cayó y se rompió. Dentro no había luz. Había un recuerdo.\n\n—Haz que lo olvide —decía su antiguo yo—. Si me recuerda, vendrán por él.\n\n—Yo pedí olvidarte —susurró Elara.\n\n—Y yo acepté ser el villano de tu historia, si eso te mantenía viva." },
      en: { title:"The Dance Beneath False Moons", text:"The floor transformed into gleaming marble.\n\nThey stood in a grand ballroom lit by hundreds of small moons floating beneath a crystal ceiling.\n\n—This is a memory, said Cael.\n\nElara saw herself in a dress embroidered with constellations, on Cael's arm. He looked at her as if she were the only moon left in his world.\n\nOne moon fell and shattered. Inside was not light. It was a memory.\n\n—Make him forget me, her former self was saying. If he remembers me, they will come for him.\n\n—I asked to forget you, Elara whispered.\n\n—And I agreed to be the villain of your story, if that kept you alive." }
    },
    {
      es: { title:"La luna que exige un sacrificio", text:"La luna agrietada descendió lentamente hasta flotar entre ambos.\n\nEl libro comenzó a cerrarse. Pero Elara puso la mano sobre la página.\n\n—No.\n\nUna voz antigua llenó la sala.\n\n«Toda memoria recuperada exige un pago. Una historia por una historia.»\n\n—Ya estoy cansada de que otros decidan qué partes de mí merecen sobrevivir.\n\nTomó la pluma y escribió en la última página.\n\n«Entrego mi final, pero no mi memoria.»\n\nTodas las lunas se apagaron. Luego, la verdadera luna regresó al cielo.\n\nElara cerró el libro, tomó la mano de Cael y miró hacia los pasillos infinitos.\n\n—Vamos a robar mi final de vuelta.\n\n—Eso es imposible.\n\nElara sonrió.\n\nAfuera, la luna brillaba completa." },
      en: { title:"The Moon That Demands a Sacrifice", text:"The cracked moon descended slowly until it floated between them.\n\nThe book began to close. But Elara placed her hand on the page.\n\n—No.\n\nAn ancient voice filled the room.\n\n«Every recovered memory demands a price. A story for a story.»\n\n—I am tired of others deciding which parts of me deserve to survive.\n\nShe took the quill and wrote on the last page.\n\n«I surrender my ending, but not my memory.»\n\nAll the moons went dark. Then the true moon returned to the sky.\n\nElara closed the book, took Cael's hand and looked toward the endless corridors.\n\n—We're going to steal my ending back.\n\n—That's impossible.\n\nElara smiled.\n\nOutside, the moon shone whole." }
    }
  ]
};

function shuffle(){const a=Array.from({length:GRID*GRID},(_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

const BG="linear-gradient(160deg,#030108,#0a0614,#050410)";
const A="#d4a8ff",AD="#7050a0",TX="#e8d8f0",MU="#9080a8";
const CA="rgba(255,255,255,0.04)",CB="#302040",TA="rgba(120,60,180,0.18)",TB="#5030a0";
const LINKTREE="https://linktr.ee/seleene.co";
const INSTAGRAM="https://www.instagram.com/seleene.reads";

export default function App(){
const [screen,setScreen]=useState("hub");  
  const [lang,setLang]=useState("es");
const [wIdx,setWIdx]=useState(()=>{
    try{const s=localStorage.getItem("seleene_game");return s?JSON.parse(s).wIdx:0;}
    catch{return 0;}
  });  const [pIdx,setPIdx]=useState(()=>{
    try{const s=localStorage.getItem("seleene_game");return s?JSON.parse(s).pIdx:0;}
    catch{return 0;}
  });
  const [isPremium,setIsPremium]=useState(false);
  const [modal,setModal]=useState(null);
  const [hints,setHints]=useState(3);
  const [notif,setNotif]=useState(null);
const [tiles,setTiles]=useState(()=>{
    try{const s=localStorage.getItem("seleene_tiles");return s?JSON.parse(s):null;}
    catch{return null;}
  });  const [selected,setSelected]=useState(null);
const [moves,setMoves]=useState(()=>{
    try{const s=localStorage.getItem("seleene_game");return s?JSON.parse(s).moves:0;}
    catch{return 0;}
  });  const [solved,setSolved]=useState(false);
  const [timer,setTimer]=useState(0);
  const [hintFlash,setHintFlash]=useState(null);
const [progress,setProgress]=useState(()=>{
    try{const s=localStorage.getItem("seleene_progress");return s?JSON.parse(s):{};}
    catch{return {};}
  });  const [adCount,setAdCount]=useState(5);
  const [storyScreen,setStoryScreen]=useState(false);
const [storyData,setStoryData]=useState(null);
  const [currentImg,setCurrentImg]=useState(null);
const [showRef,setShowRef]=useState(false);
  const tileRefs=useRef({});
  const timerRef=useRef(null);
  const adRef=useRef(null);
  const timerVal=useRef(0);
  const masterCanvas=useRef(null);

  const world=WORLDS[wIdx];
  const artFn=WORLD_ART[wIdx];
  const vw=typeof window!=="undefined"?Math.min(window.innerWidth,500):380;
  const CELL=Math.floor((vw-28)/GRID);
  const SIZE=CELL*GRID;
  const L=lang;

  const notify=msg=>{setNotif(msg);setTimeout(()=>setNotif(null),2200);};
  const doneInWorld=wi=>WORLDS[wi].puzzles.es.filter((_,pi)=>progress[`${WORLDS[wi].id}_${pi}`]?.completed).length;

// eslint-disable-next-line
useEffect(()=>{
    if(screen==="game"&&masterCanvas.current){
      const cvs=masterCanvas.current;
      cvs.width=SIZE;cvs.height=SIZE;
      const ctx=cvs.getContext("2d");
      if(currentImg){
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality="high";
  const iw=currentImg.width,ih=currentImg.height;
  const scale=Math.max(SIZE/iw,SIZE/ih);
  const sw=SIZE/scale,sh=SIZE/scale;
  const sx=(iw-sw)/2,sy=(ih-sh)/2;
  ctx.drawImage(currentImg,sx,sy,sw,sh,0,0,SIZE,SIZE);
}
    }
  },[screen,wIdx,pIdx,SIZE,currentImg]);

  useEffect(()=>{
    if(screen==="game"&&masterCanvas.current&&tiles){
      const src=masterCanvas.current;
      const tw=SIZE/GRID,th=SIZE/GRID;
      setTimeout(()=>{
        tiles.forEach((v,pos)=>{
          const cvs=tileRefs.current[pos];if(!cvs)return;
          const ctx2=cvs.getContext("2d");
          ctx2.clearRect(0,0,CELL,CELL);
          ctx2.drawImage(src,(v%GRID)*tw,Math.floor(v/GRID)*th,tw,th,0,0,CELL,CELL);
        });
      },60);
    }
  },[tiles,screen,SIZE,CELL]);

  useEffect(()=>{
    if(screen==="game"&&!solved){timerRef.current=setInterval(()=>setTimer(t=>{timerVal.current=t+1;return t+1;}),1000);}
    else clearInterval(timerRef.current);
    return()=>clearInterval(timerRef.current);
  },[screen,solved]);

const startGame=(wi,pi)=>{
    const savedGame=localStorage.getItem("seleene_game");
    const savedTiles=localStorage.getItem("seleene_tiles");
    
    // Si hay partida guardada para este mismo puzzle, continuarla
    if(savedGame&&savedTiles){
      const g=JSON.parse(savedGame);
      if(g.wIdx===wi&&g.pIdx===pi){
        const parsedTiles=JSON.parse(savedTiles);
        setWIdx(wi);setPIdx(pi);tileRefs.current={};
        setSelected(null);setMoves(g.moves);
        setTimer(g.timer||0);timerVal.current=g.timer||0;
        setSolved(false);setHintFlash(null);
        setTiles(parsedTiles);
        const imgSrc=WORLD_IMAGES[wi]?.[pi];
        if(imgSrc){
          const image=new Image();
          image.onload=()=>{setCurrentImg(image);setScreen("game");};
          image.src=imgSrc;
        } else {
          setCurrentImg(null);setScreen("game");
        }
        return;
      }
    }
    
    // Si no, iniciar nuevo puzzle
    const newTiles=shuffle();
    setWIdx(wi);setPIdx(pi);tileRefs.current={};
    setSelected(null);setMoves(0);
    setSolved(false);setTimer(0);timerVal.current=0;setHintFlash(null);
    setTiles(newTiles);
    const imgSrc=WORLD_IMAGES[wi]?.[pi];
    if(imgSrc){
      const image=new Image();
      image.onload=()=>{
        setCurrentImg(image);
        localStorage.setItem("seleene_tiles",JSON.stringify(newTiles));
        localStorage.setItem("seleene_game",JSON.stringify({wIdx:wi,pIdx:pi,moves:0,timer:0}));
        setScreen("game");
      };
      image.src=imgSrc;
    } else {
      setCurrentImg(null);
      localStorage.setItem("seleene_tiles",JSON.stringify(newTiles));
      localStorage.setItem("seleene_game",JSON.stringify({wIdx:wi,pIdx:pi,moves:0,timer:0}));
      setScreen("game");
    }
  };
const finish=(nm)=>{
    setSolved(true);clearInterval(timerRef.current);
    const elapsed=timerVal.current,k=`${world.id}_${pIdx}`;
    setProgress(prev=>{
      const next={...prev,[k]:{completed:true,bestTime:(!prev[k]?.completed||elapsed<prev[k].bestTime)?elapsed:prev[k].bestTime,moves:nm}};
      try{localStorage.setItem("seleene_progress",JSON.stringify(next));}catch{}
      return next;
    });
    const storyItem=STORIES?.[world.id]?.[pIdx];
    if(storyItem){
      setTimeout(()=>{setStoryData(storyItem);setStoryScreen(true);},500);
    } else {
      setTimeout(()=>setScreen("win"),500);
    }
  };

const clickTile=pos=>{
    if(solved)return;
    if(selected===null){setSelected(pos);return;}
    if(selected===pos){setSelected(null);return;}
    const nt=[...tiles];
    [nt[selected],nt[pos]]=[nt[pos],nt[selected]];
    const nm=moves+1;
    setTiles(nt);
    setMoves(nm);
    setSelected(null);
    localStorage.setItem("seleene_tiles",JSON.stringify(nt));
    localStorage.setItem("seleene_game",JSON.stringify({wIdx,pIdx,moves:nm,timer}));
    console.log("Guardado ok");
    if(nt.every((v,i)=>v===i))finish(nm);
  };

const doHint=()=>{
    if(hints<=0||solved)return;
    const wrong=tiles.reduce((a,v,i)=>{if(v!==i)a.push(i);return a;},[]);
    if(!wrong.length)return;
    const wp=wrong[Math.floor(Math.random()*wrong.length)],v=tiles[wp];
    const nt=[...tiles];[nt[wp],nt[v]]=[nt[v],nt[wp]];
    const nm=moves+1;setTiles(nt);setHints(h=>h-1);setMoves(nm);
    setHintFlash(v);setTimeout(()=>setHintFlash(null),1000);
    localStorage.setItem("seleene_tiles",JSON.stringify(nt));
    localStorage.setItem("seleene_game",JSON.stringify({wIdx,pIdx,moves:nm,timer}));
    if(nt.every((v2,i)=>v2===i))finish(nm);
  };

  const T={
    hub_title:{es:"Mundos Literarios",en:"Literary Worlds"},
    hub_sub:{es:"Elige tu mundo y arma el puzzle 8×8",en:"Choose your world and build the 8×8 puzzle"},
    hints_label:{es:"pistas",en:"hints"},
    play:{es:"▶ Jugar",en:"▶ Play"},
    replay:{es:"↺",en:"↺"},
    puzzle:{es:"Puzzle",en:"Puzzle"},
    tap_play:{es:"Toca ▶ para jugar",en:"Tap ▶ to play"},
    done:{es:"completos",en:"complete"},
    worlds_btn:{es:"← Mundos",en:"← Worlds"},
    reset:{es:"↺",en:"↺"},
    time:{es:"Tiempo",en:"Time"},
    moves:{es:"Movs",en:"Moves"},
    hint_btn:{es:"Pista",en:"Hint"},
    ad_btn:{es:"📺 Ver anuncio +1",en:"📺 Watch ad +1"},
    complete:{es:"¡Puzzle completo!",en:"Puzzle complete!"},
    next:{es:"Puzzle",en:"Puzzle"},
    my_world:{es:"Mi mundo",en:"My world"},
    premium_unlock:{es:"Desbloquear todos los mundos",en:"Unlock all worlds"},
    shop:{es:"🛍️ Freebies & Tienda",en:"🛍️ Freebies & Shop"},
    ig:{es:"📸 Instagram",en:"📸 Instagram"},
    best:{es:"Mejor",en:"Best"},
    record:{es:"Récord",en:"Record"},
    locked:{es:"Premium",en:"Premium"},
  };
  const t=k=>T[k]?.[L]||T[k]?.es||"";

  const Modal=()=>{
    if(!modal)return null;
    const ov={position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20};
    const bx={background:"#0e0718",border:"1px solid #5030a0",borderRadius:20,padding:"26px 22px",maxWidth:300,width:"100%",textAlign:"center",fontFamily:"Georgia,serif"};
    if(modal==="premium")return(
      <div style={ov} onClick={()=>setModal(null)}>
        <div style={bx} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:28,marginBottom:4}}>✨</div>
          <div style={{fontSize:9,letterSpacing:4,color:AD,textTransform:"uppercase",marginBottom:2}}>Seleene Co</div>
          <div style={{fontSize:20,color:A,fontStyle:"italic",marginBottom:14}}>Premium — 4,99 €</div>
          {(L==="es"?["7 mundos adicionales 🌍","Sin anuncios","Más pistas + recarga","Modo relajado ☁️","Wallpapers · Artbook digital"]:["7 additional worlds 🌍","No ads","More hints + recharge","Relaxed mode ☁️","Wallpapers · Digital artbook"]).map((f,i)=>(
            <div key={i} style={{fontSize:11,color:"#c0a0e0",textAlign:"left",padding:"4px 0",borderBottom:"1px solid #2a1840"}}>✓ {f}</div>
          ))}
          <button onClick={()=>{setIsPremium(true);setHints(h=>h+5);setModal(null);notify(L==="es"?"✨ Premium activado! +5 pistas":"✨ Premium activated! +5 hints");}}
            style={{background:"linear-gradient(135deg,#7030c0,#4020a0)",color:"#f0e0ff",border:"none",borderRadius:12,padding:"12px 0",fontSize:13,cursor:"pointer",fontFamily:"Georgia",width:"100%",marginTop:16}}>
            {L==="es"?"Desbloquear — 4,99 €":"Unlock — €4.99"}
          </button>
          <button onClick={()=>setModal(null)} style={{background:"transparent",color:AD,border:"none",fontSize:10,cursor:"pointer",fontFamily:"Georgia",marginTop:8}}>
            {L==="es"?"Ahora no":"Not now"}
          </button>
        </div>
      </div>
    );
    if(modal==="ad")return(
      <div style={ov}>
        <div style={bx}>
          <div style={{fontSize:26,marginBottom:8}}>📺</div>
          <div style={{fontSize:13,color:"#c0a0e0",marginBottom:16}}>{L==="es"?"+1 pista gratis":"+1 free hint"}</div>
          <div style={{fontSize:38,color:A,fontWeight:"bold",marginBottom:12}}>{adCount}</div>
          <div style={{width:"100%",height:5,background:"#1a0a2e",borderRadius:4,overflow:"hidden"}}>
            <div style={{width:`${((5-adCount)/5)*100}%`,height:"100%",background:"linear-gradient(90deg,#7030c0,#c040ff)",transition:"width 1s"}}/>
          </div>
        </div>
      </div>
    );
    if(modal==="progress")return(
  <div style={ov} onClick={()=>setModal(null)}>
    <div style={bx} onClick={e=>e.stopPropagation()}>
      <div style={{fontSize:10,letterSpacing:4,color:AD,textTransform:"uppercase",marginBottom:14}}>
        {L==="es"?"Mi Progreso":"My Progress"}
      </div>
      {WORLDS.map((w,wi)=>{
        const done=doneInWorld(wi);
        return(
          <div key={w.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,borderBottom:"1px solid #2a1840",paddingBottom:8}}>
            <span style={{fontSize:14}}>{w.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:A}}>{w.title[L].length>28?w.title[L].slice(0,28)+"…":w.title[L]}</div>
              <div style={{display:"flex",gap:3,marginTop:3}}>
                {w.puzzles.es.map((_,i)=>{
                  const k=`${w.id}_${i}`,d=progress[k]?.completed;
                  return <div key={i} style={{width:8,height:8,borderRadius:"50%",background:d?"#7fff80":"rgba(255,255,255,0.1)",border:`1px solid ${d?"#40c060":"rgba(255,255,255,0.2)"}`}}/>;
                })}
              </div>
            </div>
            <div style={{fontSize:11,color:done===5?"#7fff80":AD}}>{done}/5</div>
          </div>
        );
      })}
      <button onClick={()=>setModal(null)} style={{background:TA,color:A,border:`1px solid ${TB}`,borderRadius:10,padding:"8px 0",fontSize:11,cursor:"pointer",fontFamily:"Georgia",width:"100%",marginTop:6}}>
        {L==="es"?"Cerrar":"Close"}
      </button>
    </div>
  </div>
);
    return null;
  };

  const Notif=()=>notif?<div style={{position:"fixed",top:12,left:"50%",transform:"translateX(-50%)",background:"rgba(60,20,100,0.95)",border:"1px solid #7030c0",borderRadius:20,padding:"7px 18px",fontSize:12,color:A,zIndex:300,fontFamily:"Georgia",whiteSpace:"nowrap"}}>{notif}</div>:null;

  const LangBtn=()=>(
    <button onClick={()=>setLang(l=>l==="es"?"en":"es")} style={{background:TA,border:`1px solid ${TB}`,borderRadius:20,padding:"3px 10px",fontSize:10,color:MU,cursor:"pointer",fontFamily:"Georgia",letterSpacing:1}}>
      {lang==="es"?"EN":"ES"}
    </button>
  );

  // ── HUB ──
  if(screen==="hub")return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 12px 32px",color:TX}}>
      <Modal/><Notif/>
      <div style={{textAlign:"center",marginBottom:14}}>
        <div style={{fontSize:9,letterSpacing:6,color:AD,textTransform:"uppercase",marginBottom:2}}>✦ Seleene Co ✦</div>
        <div style={{fontSize:24,color:A,fontStyle:"italic",lineHeight:1.2}}>{t("hub_title")}</div>
        <div style={{fontSize:9,color:MU,marginTop:3,fontStyle:"italic",letterSpacing:1}}>"A moonlit literary puzzle adventure."</div>
        <div style={{width:40,height:1,background:AD,margin:"8px auto"}}/>
       {localStorage.getItem("seleene_game")&&(
  <button onClick={()=>{
    const g=JSON.parse(localStorage.getItem("seleene_game"));
    const savedTiles=localStorage.getItem("seleene_tiles");
    const parsedTiles=savedTiles?JSON.parse(savedTiles):null;
    const imgSrc=WORLD_IMAGES[g.wIdx]?.[g.pIdx];
    setWIdx(g.wIdx);
    setPIdx(g.pIdx);
    setMoves(g.moves);
    setTimer(g.timer||0);
    timerVal.current=g.timer||0;
    if(parsedTiles)setTiles(parsedTiles);
    tileRefs.current={};
    setSelected(null);
    setSolved(false);
    setHintFlash(null);
    if(imgSrc){
      const image=new Image();
      image.onload=()=>{setCurrentImg(image);setScreen("game");};
      image.src=imgSrc;
    } else {
      setCurrentImg(null);
      setScreen("game");
    }
  }} style={{background:"linear-gradient(135deg,#7030c0,#4020a0)",color:"#f0e0ff",border:"none",borderRadius:14,padding:"10px 24px",fontSize:12,cursor:"pointer",fontFamily:"Georgia",marginBottom:12,boxShadow:"0 4px 16px rgba(100,40,180,0.3)"}}>
    💾 {L==="es"?"Continuar partida guardada":"Continue saved game"}
  </button>
)}
        <p style={{fontSize:10,color:MU,maxWidth:260,lineHeight:1.7,margin:"0 auto"}}>{t("hub_sub")}</p>
      </div>
      <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{background:TA,border:`1px solid ${TB}`,borderRadius:20,padding:"4px 12px",fontSize:11,color:A}}>💡 {hints} {t("hints_label")}</div>
        {isPremium?<div style={{background:"rgba(200,160,10,0.1)",border:"1px solid #604820",borderRadius:20,padding:"4px 12px",fontSize:11,color:"#f0c040"}}>✨ Premium</div>
          :<button onClick={()=>setModal("premium")} style={{background:"rgba(200,160,10,0.1)",border:"1px solid #604820",borderRadius:20,padding:"4px 12px",fontSize:11,color:"#f0c040",cursor:"pointer",fontFamily:"Georgia"}}>✨ Premium 4,99€</button>}
        <LangBtn/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,width:"100%",maxWidth:480}}>
        {WORLDS.map((w,wi)=>{
          const locked=!w.free&&!isPremium,done=doneInWorld(wi);
          return(
            <div key={w.id} onClick={()=>{if(locked)setModal("premium");else{setWIdx(wi);setScreen("world");}}}
              style={{border:`1px solid ${locked?"#201030":w.accent+"33"}`,borderRadius:14,minHeight:130,display:"flex",flexDirection:"column",justifyContent:"flex-end",cursor:"pointer",overflow:"hidden",position:"relative"}}>
{WORLD_IMAGES[wi]?.[0]
  ? <img src={WORLD_IMAGES[wi][0]} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
  : <canvas ref={el=>{if(el){const ctx=el.getContext("2d");WORLD_ART[wi](ctx,el.width,el.height,0);}}} width={200} height={130} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
}              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(3,1,8,0.92) 0%,rgba(3,1,8,0.1) 65%,transparent 100%)"}}/>
              {locked&&<div style={{position:"absolute",inset:0,background:"rgba(3,1,10,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,flexDirection:"column",gap:3}}><span style={{fontSize:20}}>🔒</span><span style={{fontSize:9,color:"#f0c040",letterSpacing:1}}>{t("locked")}</span></div>}
              <div style={{position:"relative",zIndex:1,padding:"8px 9px"}}>
                <div style={{fontSize:10,color:w.accent,fontWeight:"bold",lineHeight:1.3,marginBottom:2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{w.emoji} {w.title[L]}</div>
                <div style={{display:"flex",gap:3,alignItems:"center",marginTop:4}}>
                  {w.puzzles.es.map((_,i)=>{const k=`${w.id}_${i}`,d=progress[k]?.completed;return <div key={i} style={{width:7,height:7,borderRadius:"50%",background:d?"#7fff80":"rgba(255,255,255,0.12)",border:`1px solid ${d?"#40c060":"rgba(255,255,255,0.2)"}`}}/>;} )}
                  <span style={{fontSize:8,color:"rgba(255,255,255,0.28)",marginLeft:2}}>{done}/5</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={()=>setModal("progress")} style={{background:TA,border:`1px solid ${TB}`,borderRadius:20,padding:"6px 16px",fontSize:11,color:A,cursor:"pointer",fontFamily:"Georgia",marginBottom:10}}>
  📖 {L==="es"?"Mi progreso":"My progress"}
</button>
      <div style={{marginTop:14,fontSize:9,color:AD,opacity:0.4,letterSpacing:2}}>@seleeneco · seleeneco.com 🌙</div>
    </div>
  );

  // ── WORLD ──
  if(screen==="world")return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 14px 32px",color:TX}}>
      <Modal/><Notif/>
      <div style={{width:"100%",maxWidth:480,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <button onClick={()=>setScreen("hub")} style={{background:"transparent",border:"none",fontSize:13,cursor:"pointer",color:AD}}>← {L==="es"?"Mundos":"Worlds"}</button>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:18}}>{world.emoji}</div>
          <div style={{fontSize:11,color:A,fontStyle:"italic",maxWidth:200,lineHeight:1.3}}>{world.title[L]}</div>
        </div>
        <LangBtn/>
      </div>
      <div style={{display:"flex",gap:5,alignItems:"center",marginBottom:14}}>
        {world.puzzles.es.map((_,i)=>{const k=`${world.id}_${i}`,d=progress[k]?.completed;return <div key={i} style={{width:10,height:10,borderRadius:"50%",background:d?"#7fff80":"rgba(255,255,255,0.12)",border:`1px solid ${d?"#40c060":"rgba(255,255,255,0.2)"}`}}/>;} )}
        <span style={{fontSize:9,color:MU,marginLeft:4}}>{doneInWorld(wIdx)}/5 {t("done")}</span>
      </div>
      <div style={{width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:8}}>
        {world.puzzles[L].map((pName,pi)=>{
          const k=`${world.id}_${pi}`,prog=progress[k];
          return(
<div key={pi} style={{background:CA,border:`1px solid ${prog?.completed?"#1e3828":CB}`,borderRadius:14,padding:"11px 13px",display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:54,height:54,borderRadius:8,flexShrink:0,border:`1px solid ${CB}`,overflow:"hidden"}}>
                {WORLD_IMAGES[wIdx]?.[pi]
                  ? <img src={WORLD_IMAGES[wIdx][pi]} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                  : <canvas ref={el=>{if(el){const ctx=el.getContext("2d");WORLD_ART[wIdx](ctx,54,54,pi);}}} width={54} height={54} style={{display:"block"}}/>
                }
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:9,color:AD,letterSpacing:1,textTransform:"uppercase"}}>{t("puzzle")} {pi+1}</div>
                <div style={{fontSize:12,color:A,fontStyle:"italic",marginBottom:2}}>{pName}</div>
                {prog?.completed
                  ?<div style={{fontSize:9,color:"#60c060"}}>✓ {fmt(prog.bestTime)} · {prog.moves} {L==="es"?"movs":"moves"}</div>
                  :<div style={{fontSize:9,color:MU}}>{t("tap_play")}</div>}
              </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
  <button onClick={()=>startGame(wIdx,pi)} style={{background:"linear-gradient(135deg,#7030c0,#4020a0)",color:"#f0e0ff",border:"none",borderRadius:10,padding:"6px 12px",fontSize:12,cursor:"pointer",fontFamily:"Georgia",fontWeight:"bold"}}>
    {prog?.completed?"↺":"▶"}
  </button>
  {prog?.completed&&STORIES?.[world.id]?.[pi]&&(
    <button onClick={()=>{setStoryData(STORIES[world.id][pi]);setStoryScreen(true);setScreen("story");}} style={{background:TA,color:A,border:`1px solid ${TB}`,borderRadius:10,padding:"5px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia"}}>
      📜
    </button>
  )}
</div>
            </div>
            );
        })}
      </div>
      
      <div style={{marginTop:16,fontSize:9,color:AD,opacity:0.4,letterSpacing:2}}>✦ SELEENE CO ✦ 🌙</div>
    </div>
  );
// ── STORY ──
if((storyScreen&&storyData)||(screen==="story"&&storyData))return(
  <div style={{minHeight:"100vh",background:"#1a0f0a",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"Georgia,serif"}}>
    <div style={{position:"relative",width:"100%",maxWidth:420}}>
      <img src={pergamino} style={{width:"100%",display:"block",borderRadius:8}}/>
      <div style={{position:"absolute",top:"20%",left:"15%",right:"15%",bottom:"18%",overflowY:"auto",scrollbarWidth:"none",msOverflowStyle:"none",display:"flex",flexDirection:"column"}}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
<div style={{fontSize:12,fontWeight:"bold",color:"#5a2e00",textAlign:"center",marginBottom:14,letterSpacing:2,textTransform:"uppercase",fontFamily:"Georgia,serif"}}>
  {storyData[L]?.title}
</div>
<div style={{fontSize:11.5,color:"#4a2800",lineHeight:2,whiteSpace:"pre-line",flex:1,fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",fontStyle:"italic"}}>
  {storyData[L]?.text}
</div>
        <button onClick={()=>{setStoryScreen(false);setStoryData(null);setScreen("win");}}
          style={{marginTop:14,background:"rgba(58,30,0,0.15)",border:"1px solid rgba(58,30,0,0.3)",borderRadius:10,padding:"8px 0",fontSize:11,color:"#3a1e00",cursor:"pointer",fontFamily:"Georgia",letterSpacing:1,width:"100%"}}>
          {L==="es"?"Continuar →":"Continue →"}
        </button>
      </div>
    </div>
  </div>
);
  // ── WIN ──
  if(screen==="win"){
    const prog=progress[`${world.id}_${pIdx}`];
    const nextPi=pIdx<4?pIdx+1:null;
    return(
      <div style={{minHeight:"100vh",background:BG,fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,color:TX,textAlign:"center"}}>
        <Notif/>
        <div style={{fontSize:42,marginBottom:8}}>✨</div>
        <div style={{fontSize:9,letterSpacing:4,color:AD,textTransform:"uppercase",marginBottom:4}}>{t("complete")}</div>
        <div style={{fontSize:13,color:A,fontStyle:"italic",marginBottom:8}}>{world.emoji} {world.puzzles[L][pIdx]}</div>
<div style={{width:130,height:130,borderRadius:12,border:`2px solid ${AD}`,marginBottom:16,overflow:"hidden",boxShadow:"0 4px 24px rgba(100,40,180,0.3)"}}>
  {WORLD_IMAGES[wIdx]?.[pIdx]
    ? <img src={WORLD_IMAGES[wIdx][pIdx]} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
    : <canvas ref={el=>{if(el){const ctx=el.getContext("2d");WORLD_ART[wIdx](ctx,130,130,pIdx);}}} width={130} height={130} style={{display:"block"}}/>
  }
</div>        <div style={{background:CA,border:`1px solid ${CB}`,borderRadius:16,padding:"14px 28px",maxWidth:260,marginBottom:14,width:"100%"}}>
          <div style={{display:"flex",gap:24,justifyContent:"center"}}>
            <div><div style={{fontSize:22,color:A,fontWeight:"bold"}}>{fmt(timerVal.current)}</div><div style={{fontSize:8,color:MU,textTransform:"uppercase",letterSpacing:1}}>{t("time")}</div></div>
            <div><div style={{fontSize:22,color:A,fontWeight:"bold"}}>{moves}</div><div style={{fontSize:8,color:MU,textTransform:"uppercase",letterSpacing:1}}>{t("moves")}</div></div>
          </div>
          {prog?.bestTime!==undefined&&<div style={{fontSize:9,color:AD,marginTop:8}}>🏆 {t("best")}: {fmt(prog.bestTime)}</div>}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
          {nextPi!==null&&<button onClick={()=>startGame(wIdx,nextPi)} style={{background:"linear-gradient(135deg,#7030c0,#4020a0)",color:"#f0e0ff",border:"none",borderRadius:12,padding:"9px 16px",fontSize:11,cursor:"pointer",fontFamily:"Georgia"}}>{t("next")} {nextPi+1} →</button>}
          <button onClick={()=>setScreen("world")} style={{background:TA,color:A,border:`1px solid ${TB}`,borderRadius:12,padding:"9px 14px",fontSize:11,cursor:"pointer",fontFamily:"Georgia"}}>← {world.emoji}</button>
          <button onClick={()=>{tileRefs.current={};setTiles(shuffle());setSelected(null);setMoves(0);setSolved(false);setTimer(0);timerVal.current=0;setScreen("game");}} style={{background:"transparent",color:MU,border:`1px solid ${CB}`,borderRadius:12,padding:"9px 12px",fontSize:14,cursor:"pointer"}}>↺</button>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
          <button onClick={()=>window.open(LINKTREE,"_blank")} style={{background:"linear-gradient(135deg,#7030c0,#4020a0)",color:"#f0e0ff",border:"none",borderRadius:12,padding:"8px 16px",fontSize:11,cursor:"pointer",fontFamily:"Georgia"}}>{t("shop")}</button>
          <button onClick={()=>window.open(INSTAGRAM,"_blank")} style={{background:"transparent",color:"#c090e0",border:"1px solid #402060",borderRadius:12,padding:"8px 14px",fontSize:11,cursor:"pointer",fontFamily:"Georgia"}}>{t("ig")}</button>
          {!isPremium&&<button onClick={()=>setModal("premium")} style={{background:"transparent",color:"#f0c040",border:"1px solid #604820",borderRadius:12,padding:"8px 14px",fontSize:10,cursor:"pointer",fontFamily:"Georgia"}}>✨ Premium 4,99€</button>}
        </div>
        <div style={{fontSize:9,color:AD,opacity:0.4,letterSpacing:2}}>✦ SELEENE CO ✦ 🌙</div>
      </div>
    );
  }

  // ── GAME ──
  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 8px 24px",color:TX}}>
      <Modal/><Notif/>
{WORLD_IMAGES[wIdx]?.[pIdx]&&(
  <>
    <div style={{position:"fixed",right:4,top:"45%",transform:"translateY(-50%)",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
      <div style={{fontSize:8,color:AD,letterSpacing:1}}>{L==="es"?"Ref":"Ref"}</div>
      <img 
        alt="referencia" 
        src={WORLD_IMAGES[wIdx][pIdx]} 
        onClick={()=>setShowRef(r=>!r)}
        style={{width:60,height:60,objectFit:"cover",borderRadius:8,border:`1px solid ${TB}`,cursor:"pointer",opacity:0.8}}
      />
      <div style={{fontSize:8,color:AD}}>🔍</div>
    </div>
    {showRef&&(
      <div onClick={()=>setShowRef(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img alt="referencia ampliada" src={WORLD_IMAGES[wIdx][pIdx]} style={{maxWidth:"90vw",maxHeight:"90vh",objectFit:"contain",borderRadius:12,border:`2px solid ${AD}`}}/>
        <div style={{position:"absolute",top:20,right:20,fontSize:22,color:"white",cursor:"pointer"}}>✕</div>
      </div>
    )}
  </>
)}
<canvas ref={masterCanvas} style={{display:"none"}} width={SIZE} height={SIZE}/>
      <div style={{width:"100%",maxWidth:520,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
        <button onClick={()=>setScreen("world")} style={{background:"transparent",border:"none",fontSize:13,cursor:"pointer",color:AD}}>← {world.emoji}</button>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:8,letterSpacing:3,color:AD,textTransform:"uppercase",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>✦ SELEENE CO ✦</div>
          <div style={{fontSize:10,color:MU,fontStyle:"italic"}}>{world.puzzles[L][pIdx]}</div>
        </div>
        <button onClick={()=>{tileRefs.current={};setTiles(shuffle());setSelected(null);setMoves(0);setSolved(false);setTimer(0);timerVal.current=0;setHintFlash(null);}} style={{background:"transparent",border:`1px solid ${TB}`,borderRadius:8,padding:"3px 8px",fontSize:9,color:AD,cursor:"pointer",fontFamily:"Georgia"}}>↺</button>
      </div>
      <div style={{display:"flex",gap:0,marginBottom:8,background:CA,border:`1px solid ${CB}`,borderRadius:20,overflow:"hidden",width:"100%",maxWidth:360}}>
        {[[fmt(timer),t("time")],[moves,t("moves")],[hints,t("hint_btn")]].map(([val,lab],i)=>(
          <div key={i} style={{flex:1,textAlign:"center",padding:"7px 0",borderLeft:i?`1px solid ${CB}`:"none"}}>
            <div style={{fontSize:15,color:lab===t("hint_btn")&&hints<=0?"#e07070":A,fontWeight:"bold",fontVariantNumeric:"tabular-nums"}}>{val}</div>
            <div style={{fontSize:7,color:MU,textTransform:"uppercase",letterSpacing:1}}>{lab}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${GRID},${CELL}px)`,gridTemplateRows:`repeat(${GRID},${CELL}px)`,gap:2,background:"rgba(40,10,80,0.22)",padding:3,borderRadius:10,border:"1px solid #28184a",boxShadow:"0 4px 28px rgba(60,10,140,0.25)"}}>
        {tiles&&tiles.map((v,pos)=>{
          const isSel=selected===pos,isFlash=hintFlash===pos;
          return(
            <div key={pos} onClick={()=>clickTile(pos)} style={{width:CELL,height:CELL,cursor:"pointer",borderRadius:2,border:isFlash?"2px solid #7fff80":isSel?"2px solid #d4a8ff":"1px solid rgba(80,40,120,0.35)",boxSizing:"border-box",transform:isSel?"scale(1.05)":isFlash?"scale(1.04)":"scale(1)",transition:"transform 0.12s,border 0.12s",overflow:"hidden",position:"relative",boxShadow:isSel?"0 0 8px #d4a8ff":isFlash?"0 0 10px #7fff80":"none"}}>
              <canvas ref={el=>{tileRefs.current[pos]=el;}} width={CELL} height={CELL} style={{display:"block"}}/>
              {isSel&&<div style={{position:"absolute",inset:0,background:"rgba(200,160,255,0.13)",pointerEvents:"none"}}/>}
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:7,marginTop:10,flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={doHint} disabled={hints<=0||solved} style={{background:hints>0?TA:"rgba(60,20,20,0.3)",color:hints>0?A:"#e07070",border:`1px solid ${hints>0?TB:"#502020"}`,borderRadius:20,padding:"6px 14px",fontSize:11,cursor:hints>0?"pointer":"not-allowed",fontFamily:"Georgia"}}>
          💡 {t("hint_btn")} ({hints})
        </button>
        {hints<=0&&<button onClick={()=>{setAdCount(5);setModal("ad");adRef.current=setInterval(()=>setAdCount(c=>{if(c<=1){clearInterval(adRef.current);setModal(null);setHints(h=>h+1);notify(L==="es"?"💡 +1 pista":"💡 +1 hint");return 5;}return c-1;}),1000);}} style={{background:"rgba(30,20,50,0.5)",color:"#c090e0",border:"1px solid #402060",borderRadius:20,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"Georgia"}}>{t("ad_btn")}</button>}
        {!isPremium&&<button onClick={()=>setModal("premium")} style={{background:"rgba(100,70,5,0.2)",border:"1px solid #604820",borderRadius:20,padding:"6px 12px",fontSize:10,color:"#f0c040",cursor:"pointer",fontFamily:"Georgia"}}>✨ Premium</button>}
      </div><button onClick={()=>{
  localStorage.setItem("seleene_tiles",JSON.stringify(tiles));
  localStorage.setItem("seleene_game",JSON.stringify({wIdx,pIdx,moves,timer}));
  notify(L==="es"?"💾 Progreso guardado":"💾 Progress saved");
}} style={{background:TA,color:A,border:`1px solid ${TB}`,borderRadius:20,padding:"6px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia"}}>
  💾 {L==="es"?"Guardar":"Save"}
</button>
      <div style={{marginTop:10,fontSize:9,color:AD,opacity:0.38,letterSpacing:2}}>✦ SELEENE CO ✦ 🌙</div>
    </div>
  );
}