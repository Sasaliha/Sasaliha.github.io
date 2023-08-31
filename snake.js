 //elementler const ile cagrılar, degistirelemeyeceği için

const canvas  =document.getElementById("game") //idsi game olan elemente ulastım
const ctx=canvas.getContext("2d"); //yılan oyunumuz 2d boyutlu olacak

document.addEventListener("keydown", tusHareketleri);//browser üzerinde bastıgım tusları yakalayabilirim
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

let canvasHeight= canvas.clientHeight;
let canvasWidth=canvas.clientWidth;
let x=10; //hesaplamada daha rahat işlem yapabilmek için verdik
let y=10; //hesaplamada daha rahat işlem yapabilmek için verdik
let hareketX=0;
let hareketY=0;
let konum=20;
let boyut=18;
let elmaX=5; 
let elmaY=5;
let yilanUzunlugu=3; //yılan parcası baslangıcta 3 belirlendi
let yilanParcalari=[] //parcaların x ve y konumlarını arrayda tutacagım
let skor=0;
let hiz=10;
let can=3;
let touchStartX = null;
let touchStartY = null;

const elmaResmi=new Image();
elmaResmi.src='elma.png';

const yilanResmi=new Image();
yilanResmi.src='yilanbasi_sag.png';




class YilanParcasi{
    constructor(x,y){ 
        this.x=x;
        this.y=y;
    }
}



function oyunuCiz(){
    ekraniTemizle();
    yilaniCiz();
    elmayiCiz();
    yilanHareketiniGüncelle();
    elmaninKonumunuGüncelle();
    skoruCiz();
    hiziCiz();
    canCiz();
    
    const sonuc=oyunBittiMi();

    if(sonuc)
    return;// oyun bittiğinde tekrar settimeout u cagırmaması için
    setTimeout(oyunuCiz, 1000/hiz); //100ms de 1 oyunuciz
    handleTouchStart();
    handleTouchMove();
}

function ekraniTemizle(){
    ctx.fillStyle="black" 
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight) //bu rengin elementte nerede verileceğini belirledik, 0'dan basladık. canvasın yükseklik ve genişliğini aldık
}

function yilaniCiz(){
    ctx.fillStyle="rgb(221, 255, 0)"
    for(let i of yilanParcalari){  //in indexleri alır, of degerleri alır
    ctx.fillRect(i.x*konum, i.y*konum,boyut, boyut) 

    }

    yilanParcalari.push(new YilanParcasi(x,y)) //listeye birsey eklemek istenirse push metodu ile eklenir

    if(yilanParcalari.length>yilanUzunlugu){
        yilanParcalari.shift();//son ekleneni siler
    }


    // ctx.fillStyle="white"; //yılanın başını beyaz yaptık
    // ctx.fillRect(x*konum, y*konum, boyut,boyut)

    // Yılan başını döndürerek çizmek
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save(); // Mevcut çizim durumunu kaydetmek
    ctx.translate(x * konum + boyut / 2, y * konum + boyut / 2); // Döndürme merkezini ayarlamak
    ctx.rotate(Math.atan2(hareketY, hareketX)); // Yılan başını yöne göre döndürmek
    ctx.drawImage(yilanResmi, -boyut / 2, -boyut / 2, boyut, boyut); // Döndürülmüş resmi çizmek
    ctx.restore(); // Önceki çizim durumunu geri yüklemek
}

function elmayiCiz(){
    ctx.fillStyle="aquamarine";
    // ctx.fillRect(elmaX*konum, elmaY*konum,boyut,boyut); //elmayı bir artırdıgımda her seferinde konumla carpmıs oalcagız

    ctx.drawImage(elmaResmi, elmaX*konum, elmaY*konum,boyut,boyut)
    
}

function tusHareketleri(e){
    // console.log(e.Keycode) //bastıgım tusların bbrowserda keycodelarını yakaladım

    switch (e.keyCode) {
        case 37: // Sol tuşa basıldı
            if (hareketX === 1) return;
            hareketX = -1;
            hareketY = 0;
            break;
        case 38: // Yukarı tuşa basıldı
            if (hareketY === 1) return;
            hareketY = -1;
            hareketX = 0;
            break;
        case 39: // Sağ tuşa basıldı
            if (hareketX === -1) return;
            hareketX = 1;
            hareketY = 0;
            break;
        case 40: // Aşağı tuşa basıldı
            if (hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;
            break;
   
}
}
function yilanHareketiniGüncelle(){
    let sonucX=x+hareketX;
    let sonucY=y+hareketY;

    //380den büyükse sınırdayım demektir-19*20
    if(sonucY < 0){ //0'dan cıktıysa 19'dan baslat
        sonucY=19
    }else if(sonucY>19){
        sonucY=0
    }

    if(sonucX < 0){ //0'dan cıktıysa 19'dan baslat
        sonucX=19
    }else if(sonucX>19){
        sonucX=0
    }

    x=sonucX;
    y=sonucY;
}

function elmaninKonumunuGüncelle(){
    
    //elmanın ve yılanın konumunun aynı olması lazım  
    //floor rakamı 5ten yukarı ve asagı olmasına göre yuvarlayabiliyor
    //random 0-1 arasında deger üretir-en yüksek 1*20 olur
    if(x===elmaX && y===elmaY){
        elmaX=Math.floor(Math.random()*konum);
        elmaY=Math.floor(Math.random()*konum);

        //yılanın herhangi bir parcası elmanın konumuna denk gelirse
        let elmaKonumuMüsaitMi=false; 
        console.log(!elmaKonumuMüsaitMi)
        while(!elmaKonumuMüsaitMi){ 
            
            elmaKonumuMüsaitMi=true;
            for(let parca of yilanParcalari){
                if(parca.x===elmaX && parca.y===elmaY){
                    elmaX=Math.floor(Math.random()*konum);
                    elmaY=Math.floor(Math.random()*konum);
                    elmaKonumuMüsaitMi=false;
                }
            }
        }
        yilanUzunlugu++;
        skor+=10;

        if(yilanUzunlugu % 3===0){ //3 adet elma yedikten sonra hızı artır
            hiz+=2;
        }

    }
}

function skoruCiz(){
    ctx.fillStyle="white"
    ctx.font= "20px Ink Free"
    ctx.fillText(`Skor: ${skor}`, canvasWidth-80,30) //yukarıdan genişliğinin 80px gerisine yazdırdım, uzunlugu60 olacak
}

function hiziCiz(){
    ctx.fillStyle="white"
    ctx.font= "20px Ink Free"
    ctx.fillText(`Hız: ${hiz-9}X`, canvasWidth-160,30) //yukarıdan genişliğinin 80px gerisine yazdırdım, uzunlugu60 olacak
}

function oyunBittiMi(){
    let oyunBitti=false;
    if(hareketX===0 && hareketY===0) return; 

    for(let index in yilanParcalari){
   
    let parca=yilanParcalari[index]
        if(parca.x === x && parca.y===y){  //parcanın x ve y konumu yılanın konumu ile aynı ise
            can--;
            if(can===0){
                          
                ctx.fillText(`⚡: 0`,canvasWidth-230,30);
           
                    oyunBitti = true;
             break;
            }
            yilanParcalari.splice(0,index);
            yilanUzunlugu=yilanParcalari.length;
            skor=yilanUzunlugu*10;
            hiz-=2;
            // oyunBitti=true;
            break;
        }
    }

    if(oyunBitti){
       
        ctx.fillStyle="white"
        ctx.font="50px Megrim"
        ctx.fillText(`Game Over☹️`, canvasWidth/6.5, 
        canvasHeight/2); 
        
    }
return oyunBitti;
}

function yeniOyun(){
    //ekranın sıfırlanması
    //yılanın küçülmesi ve baslangıc ekranına dönmesi için

    document.location.reload();
}

function canCiz(){
    ctx.fillStyle="white";
    ctx.font="20px Ink Free";
    ctx.fillText(`⚡: ${can}`,canvasWidth-230,30);
}


function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    touchStartX = firstTouch.clientX;
    touchStartY = firstTouch.clientY;
}
function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const touchDiffX = touchStartX - touchEndX;
    const touchDiffY = touchStartY - touchEndY;

    if (Math.abs(touchDiffX) > Math.abs(touchDiffY)) {
        if (touchDiffX > 0) {
            // Sağa kaydırma
            if (hareketX === -1) return;
            hareketX = 1;
            hareketY = 0;
            yilanResmi.src = 'yilanbasi_saga.png';
        } else {
            // Sola kaydırma
            if (hareketX === 1) return;
            hareketX = -1;
            hareketY = 0;
            yilanResmi.src = 'yilanbasi_saga.png';
        }
    } else {
        if (touchDiffY > 0) {
            // Aşağı kaydırma
            if (hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;
        } else {
            // Yukarı kaydırma
            if (hareketY === 1) return;
            hareketY = -1;
            hareketX = 0;
        }
    }

    // Dokunmatik etkinliği işledikten sonra başlangıç koordinatlarını sıfırla
    touchStartX = null;
    touchStartY = null;
}
oyunuCiz();




