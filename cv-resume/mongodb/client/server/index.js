//backend i calıstıracak node js 
const express=require("express");
const app=express(); //kullanmak için bir applicatina esitledim
//cors politikasını kurduk
const cors=require("cors");
const {v4:uuidv4, stringify}=require("uuid");

const Personal=require("./models/personal") //personel.js deki oluşturdugum semayı dahil ettim
const Skill=require("./models/skill");
const SocialMedia=require("./models/socialmedia");
const Experience=require("./models/experience") ;
const Education=require("./models/education");
const Project=require("./models/project");
const connect=require("./connect")

connect();


app.use(express.json()); //tüm isteklerin json formatında olacagını belirttim
app.use(cors());


let person={
    
    name:"Saliha AÇIKGÖZ",
    role:"Full-Stack Developer",
    phone:"05347992257",
    email:"saliha-acikgoz@hotmail.com",
    address:"Sancaktepe/İstanbul",
    avatar:"profile.png",
    aboutMe: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste non voluptatibus, dolorem at perferendis quasi ipsam dignissimos quibusdam eveniet temporibus.`

}

let skills=[
    {
       
        title:"C#",
        rate: 80
    },
    {
       
        title:"HTML",
        rate: 90
    },
    {
        
        title:"JS",
        rate: 60
    },
    {
       
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

//mongo db de create işlemi yapmak için api isteği olusturduk
app.get("/api/createFirstDefaultValue", async (req,res)=>{
    let personalModel=await Personal.findOne();
    if(personalModel===null){
        personalModel= new Personal(person)  //persondaki bilgileri Personala set eder
        personalModel._id=uuidv4();
        await personalModel.save();
    }

    for (let s of skills){
        let skill=await Skill.findOne({title:s.title});
        if(skill===null){
            skill=new Skill(s);
            skill._id=uuidv4();
            await skill.save();
        }
    }

    for(let sm of socialMedias){
        let socialMedia=await SocialMedia.findOne({link:sm.link});
        if(socialMedia===null){
            socialMedia=new SocialMedia(sm);
            socialMedia._id=uuidv4();
            await socialMedia.save();
        }
    }

    for(let exp of experiences){
        let experience=await Experience.findOne({title:exp.title, company:exp.company, date: exp.date});
        if(experience===null){
            experience=new Experience(exp);
            experience._id=uuidv4();
            await experience.save();
        }
    }

    for (let edu of educations){
        let education=await Education.findOne({section:edu.section, date:edu.date});
        if(education===null){
            education=new Education(edu);
            education._id=uuidv4();
            await education.save();
        }
    }

    for(let p of projects){
        let project = await Project.findOne({name:p.name});
        if(project===null){
            project=new Project(p);
            project._id=uuidv4();
            await project.save();
        }
    }

    res.json({message: "create is successfull"});
} )  


app.get("", (req,res)=>{
    res.json({message: "Api Calışıyor"})
});


app.get("/api/get", async (req,res)=>{
    const MyInformation={
        person: await Personal.findOne(),
        skills: await Skill.find(),
        socialMedias: await SocialMedia.find(),
        experiences: await Experience.find(),
        educations: await Education.find(),
        projects:await Project.find(),
    }
    res.json(MyInformation);
});



app.post("/api/set", async (req,res)=>{ //await kullanabilmem için async kullanmamız lazım
   const body= req.body;
   //person update
   person=await Personal.findOne(); //eski kayıt
   const newPerson=new Personal(body.person); //yeni kayıt
   newPerson._id=person._id;
   await Personal.findByIdAndUpdate(person._id, newPerson);

   skills=body.skills;

   const currentSkills=await Skill.find();
   for(let c of currentSkills){
    const result=skills.findIndex(p=>p._id === c.id);
    if(result ===-1){
        await Skill.findByIdAndRemove(c._id);
    }
   }

   
   for(let s of skills){
    if(s._id===null){
        const skill = new Skill();
        skill._id=uuidv4();
        skill.title=s.title;
        skill.rate=s.rate;
        await skill.save();
    }else{
        const skill= new Skill();
        skill._id=s._id
        skill.title=s.title;
        skill.rate=s.rate;
        await Skill.findByIdAndUpdate(s._id,skill)
;    }
   }


   socialMedias=await SocialMedia.findOne(); //eski kayıt
   const newSocialMedia=new SocialMedia(body.socialMedia); //yeni kayıt
   newSocialMedia._id=socialMedias._id;
   await SocialMedia.findByIdAndUpdate(socialMedias._id, newSocialMedia);   

   socialMedias=body.socialMedias;

   const currentSocialMedias=await SocialMedia.find();
   for(let c of currentSocialMedias){
    const result=socialMedias.findIndex(p=>p._id === c.id);
    if(result ===-1){
        await SocialMedia.findByIdAndRemove(c._id);
    }
   }


   for(let s of socialMedias){
    if(s._id===null){
        const socialMedia = new SocialMedia();
        socialMedia._id=uuidv4();
        socialMedia.title=s.title;
        socialMedia.link=s.link;
        socialMedia.icon=s.icon;
        socialMedia.name=s.name;
        await socialMedia.save();
    }else{
        const socialMedia= new SocialMedia();
        socialMedia._id=s._id
        socialMedia.title=s.title;
        socialMedia.link=s.link;
        socialMedia.icon=s.icon;
        socialMedia.name=s.name;

        await SocialMedia.findByIdAndUpdate(s._id,socialMedia)
;    }
   }


   
   experiences=await Experience.findOne(); //eski kayıt
   const newExperience=new Experience(body.experience); //yeni kayıt
   newExperience._id=experiences._id;
   await Experience.findByIdAndUpdate(experiences._id, newExperience);   

   experiences=body.experiences;


   const currentExperiences=await Experience.find();
   for(let c of currentExperiences){
    const result=experiences.findIndex(p=>p._id === c.id);
    if(result ===-1){
        await Experience.findByIdAndRemove(c._id);
    }
   }


   for(let e of experiences){
    if(e._id===null){
        const experience = new Experience();
        experience._id=uuidv4();
        experience.company=e.company;
        experience.title=e.title;
        experience.date=e.date;
     
        await experience.save();
    }else{
        const experience= new Experience();
        experience._id=e._id
        experience.company=e.company;
        experience.title=e.title;
        experience.date=e.date;
     

        await Experience.findByIdAndUpdate(e._id,experience)
;    }
   }

   educations=await Education.findOne(); //eski kayıt
   const newEducation=new Education(body.education); //yeni kayıt
   newEducation._id=educations._id;
   await Experience.findByIdAndUpdate(educations._id, newEducation);   

   educations=body.educations;


   const currentEducations=await Education.find();
   for(let c of currentEducations){
    const result=educations.findIndex(p=>p._id === c.id);
    if(result ===-1){
        await Education.findByIdAndRemove(c._id);
    }
   }


   for(let e of educations){
    if(e._id===null){
        const education = new Education();
        education._id=uuidv4();
        education.organisation=e.organisation;
        education.section=e.section;
        education.date=e.date;
     
        await education.save();
    }else{
        const education= new Education();
        education._id=e._id
        education.organisation=e.organisation;
        education.section=e.section;
        education.date=e.date;
     

        await Education.findByIdAndUpdate(e._id,education)
;    }
   }


   projects=await Project.findOne(); //eski kayıt
   const newProject=new Project(body.project); //yeni kayıt
   newProject._id=projects._id;
   await Project.findByIdAndUpdate(projects._id, newProject);   

   projects=body.projects;

   const currentProjects=await Project.find();
   for(let c of currentProjects){
    const result=projects.findIndex(p=>p._id === c.id);
    if(result ===-1){
        await Project.findByIdAndRemove(c._id);
    }
   }


   for(let p of projects){
    if(p._id===null){
        const project = new Project();
        project._id=uuidv4();
        project.name=e.name;
        project.tech=e.tech;
        project.description=e.description;
     
        await project.save();
    }else{
        const project= new Project();
        project._id=p._id
        project.name=p.name;
        project.tech=p.tech;
        project.description=p.description;
     

        await Project.findByIdAndUpdate(p._id,project)
;    }
   }


   
   


   res.json({message: " Update is Succesfull"})

})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("Uygulama http://localhost:5000 üzerinden ayakta"))

//mevcut apimizin hangi portta calısacgını belirttik



