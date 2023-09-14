//backend i calıstıracak node js 
const express=require("express");
const app=express(); //kullanmak için bir applicatina esitledim
//cors politikasını kurduk
const cors=require("cors");

app.use(express.json()); //tüm isteklerin json formatında olacagını belirttim
app.use(cors());


let person={
    name:"Saliha AÇIKGÖZ",
    role:"Full-Stack Developer",
    phone:"05347992257",
    email:"saliha-acikgoz@hotmail.com",
    address:"Sancaktepe/İstanbul",
    avatar:"saliha.png",
    aboutMe: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste non voluptatibus, dolorem at perferendis quasi ipsam dignissimos quibusdam eveniet temporibus.`
}

let skills=[
    {
        id:0,
        title:"C#",
        rate: 80
    },
    {
        id:1,
        title:"HTML",
        rate: 90
    },
    {
        id:2,
        title:"JS",
        rate: 60
    },
    {
        id:3,
        title:"CSS",
        rate: 70
    },
]



let socialMedias=[
    {
        id:0,
        title:"linkedin",
        link:"https://www.linkedin.com/in/saliha-a%C3%A7%C4%B1kg%C3%B6z-89b35313a/",
        icon:"fa-brands fa-linkedin",
        name: "saliha-açıkgöz-89b35313a/"
    },
    {
        id:1,
        title:"medium",
        link:"https://medium.com/@salihaacikgoz",
        icon:"fa-brands fa-medium",
        name:"medium.com/@salihaacikgoz"
    },
    {
        id:2,
        title:"github",
        link:"https:\\github.com/Sasaliha",
        icon:"fa-brands fa-github",
        name:"https://github.com/Sasaliha"

    },
    {
        id:3,
        title:"twitter",
        link:"https://twitter.com/SalihaAcikgoz",
        icon:"fa-brands fa-twitter",
        name:"SalihaAcikgoz"
    },
    {
        id:4,
        title:"Instagram",
        link:"https://www.instagram.com/salihaacikgoz18/",
        icon:"fa-brands fa-instagram",
        name:"salihaacikgoz18"
    }
]

let experiences=[
    {
        id:0,
        title:"Finans ve Mali İşler Müdürü",
        company:"Asist Bilgi Teknolojileri",
        date:"2018.08-Present"
        

    },
    {
        id:1,
        title:"Finans ve Proje Sorumlusu",
        company:"Asist Bilgi Teknolojileri",
        date:"2016.07-2018.04"

    },
    {
        id:2,
        title:"Gişe Memuru",
        company:"Vakıf Katılım Bankası",
        date:"2018.04-2018.08"

    }
]

let educations=[
    {
        id:0,
        section:"Yönetim Bilişim Sistemleri",
        organisation:"İstanbul Üniversitesi",
        date:"2019.09-Present"
    },
    {
        id:1,
        section:"Sermaye Piyasası",
        organisation:"Marmara Üniversitesi",
        date:"2012.09-2016.09"
    },
    {
        id:2,
        section:"Bilişim Tek./Veri Tabanı Prog",
        organisation:"Sabiha Gökçen Anadolu Teknik Lisesi",
        date:"2008.04-2012.09"
    }

   
]

let projects=[
    {
        id:0,
        name:"Snake Game",
        tech:"HTML,CSS,JavaScript",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia odit consequuntur consequatur fugiat quibusdam dolores nemo accusamus reiciendis possimus enim?"
    },
    {
        id:1,
        name:"Store App",
        tech:"C#",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia odit consequuntur consequatur fugiat quibusdam dolores nemo accusamus reiciendis possimus enim?"
    },
    {
        id:2,
        name:"Cv Resume App",
        tech:"HTML,CSS,JavaScript,Express.Js",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia odit consequuntur consequatur fugiat quibusdam dolores nemo accusamus reiciendis possimus enim?"
    }
]

app.get("", (req,res)=>{
    res.json({message: "Api Calışıyor"})
});


app.get("/api/get", (req,res)=>{
    const MyInformation={
        person: person,
        skills: skills,
        socialMedias:socialMedias,
        experiences:experiences,
        educations:educations,
        projects:projects

    }
  
    res.json(MyInformation);
});

app.post("/api/set", (req,res)=>{
   const body= req.body;
   person=body.person;
   skills=body.skills;
   socialMedias=body.socialMedias;
   experiences=body.experiences;
   educations=body.educations;
   projects=body.projects;


   res.json({message: " Update is Succesfull"})

})

//mevcut apimizin hangi portta calısacgını belirttik
app.listen(5000,()=> console.log("Uygulama http://localhost:5000 üzerinden ayakta"));  //()=> eger uygulamam calısıyorsa


