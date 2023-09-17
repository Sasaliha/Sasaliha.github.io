
get();

let myData={

}

function get(){
//    document.getElementById("blog").style.display="none";
//    document.getElementById("spinner").style.display="flex";
//    document.getElementById("error").style.display="none";
  
axios.get("http://localhost:5000/api/get")
.then(res=>{
    
    myData = res.data;
    setMyInformation(myData.person);
    setMySkills(myData.skills);
    setMySocialMedias(myData.socialMedias);
    setMyExperiences(myData.experiences);
    setMyEducations(myData.educations);
    setMyProjects(myData.projects);

    
    })


    // setTimeout(() => {
    //     axios.get("http://localhost:5000/api/get")
    //     .then(res=>{
    //         const myData=res.data;
    //         setMyInformation(myData.person);
    //         setMySkills(myData.skills);
    //         setMySocialMedias(myData.socialMedias);
    //         setMyExperiences(myData.experiences);
    //         setMyEducations(myData.educations);
    //         setMyProjects(myData.projects);

    //         document.getElementById("blog").style.display="block";
    //         document.getElementById("spinner").style.display="none";
            
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             document.getElementById("spinner").style.display="none";
    //             document.getElementById("error").style.display="flex";
    //             document.getElementById("blog").style.display="block";

    //         })  
    // },1000);

   
}

function tryAgain(){
    document.location.reload();
}

function setMyInformation(person){
        document.getElementById("name").innerText=person.name;
        document.getElementById("role").innerText=person.role;
        document.getElementById("aboutMe").innerText=person.aboutMe;
        document.getElementById("phone").innerText=person.phone;
        document.getElementById("email").innerText=person.email;
        document.getElementById("address").innerText=person.address;
        document.getElementById("avatar").src=person.avatar;
       

        document.getElementById("mailAddress").innerHTML=`
        <a href="mailto: ${person.email}" id="mailAddress"><i class="fa-regular fa-envelope"></i></a>
        `
        document.getElementById("phoneNumber").innerHTML=` <a href="https://wa.me/+9${person.phone}" target=_blank><i class="fa-solid fa-mobile"></i></a>`

        document.getElementById("infoText").value=person.name;
        document.getElementById("mailText").value=person.email;
        document.getElementById("phoneText").value=person.phone;
        document.getElementById("addressText").value=person.address;
        document.getElementById("aboutText").value=person.aboutMe;
        document.getElementById("role").value=person.role;
        document.getElementById("avatar").value=person.avatar;

 
}

function showForm(){
    const main=document.getElementById("main");
    main.style.justifyContent="left";
    
    const editForm=document.getElementById("editForm");
    editForm.style.display="block";
}

function cancelForm(){
    const result=confirm("Are you sure cancel this changing?")
    if(result){
       clear();
    }
   
}

function clear(){
        const editForm=document.getElementById("editForm");
        editForm.style.display="none";
        main.style.justifyContent="center";
        get();
}    
    


function save(){
    const result=confirm("Are you sure save and close changing?")

    if(result){
    axios.post("http://localhost:5000/api/set",myData)
    .then(res=>{
       
        clear();
    
    });

}

}

function keyupInputAndSetValue(id,event){
   
    document.getElementById(id).innerText=event.target.value;
    myData.person[id]=event.target.value;


}


//skill
let skillEditId = 0;


function createSkillElementForShowField(skills) {
    let text = "";

    for (let skill of skills) {
        text += `
       <li>
            <div class="bar">
                <p>${skill.title}</p>
                <progress value="${skill.rate}" max="100">${skill.rate}%</progress>
            </div>
       </li>
        `;

    }
    document.getElementById("skills").innerHTML = text;
}


function getSkillEditFormDivField(skill) {
   if(skill._id===null){ 
    return`
   <div id="skillEditDiv${skillEditId}" data-id="${skill.id}" class="skills-group"><br> 
       <label for="skill">Yetenek Ekle:</label>
       <input onkeyup="keyupInputAndSetSkillInputValue(event,'title','skills')" data-id="${skill.id}" maxlength="500" name="skillAdi" title="yetenek adını giriniz: " type="text" value="${skill.title}" id="skillTitleInput${skillEditId}">
       <button onclick="removeSkillFromEditForm('skillEditDiv${skillEditId}')" type="button" class="deleteSkill">
           <img src="delete.png" title="yeteneği sil">
       </button><br>
       <label for="skill">Yeteneğinizi 100 üzerinden puanlayınız: %</label>
       
       <input onkeyup="keyupInputAndSetSkillInputValue(event,'rate','skills')" data-id="${skill.id}" maxlength="100" name="skillPuan" title="yetenek yüzdesini giriniz: " type="number" value="${skill.rate}" id="skillRateInput${skillEditId}">
   </div>
`
    
   }else{
        return `
            <div id="skillEditDiv${skillEditId}" data-id="${skill._id}" class="skills-group"><br> 
                <label for="skill">Yetenek Ekle:</label>
                <input onkeyup="keyupInputAndSetSkillInputValue(event,'title','skills')" data-id="${skill._id}" maxlength="500" name="skillAdi" title="yetenek adını giriniz: " type="text" value="${skill.title}" id="skillTitleInput${skillEditId}">
                <button onclick="removeSkillFromEditForm('skillEditDiv${skillEditId}')" type="button" class="deleteSkill">
                    <img src="delete.png" title="yeteneği sil">
                </button><br>
                <label for="skill">Yeteneğinizi 100 üzerinden puanlayınız: %</label>
                
                <input onkeyup="keyupInputAndSetSkillInputValue(event,'rate','skills')" data-id="${skill._id}" maxlength="100" name="skillPuan" title="yetenek yüzdesini giriniz: " type="number" value="${skill.rate}" id="skillRateInput${skillEditId}">
            </div>
        `;
    } 

}

function createSkillEditFormDivField() {
    skillEditId++;
    const skill = { _id: null, id: skillEditId, title: "", rate: 0 };

    // Veriyi saklamadan önce mevcut veriyi kopyalayın
    
    myData.skills.push(skill);
    const text = getSkillEditFormDivField(skill);
    document.getElementById("skills-edit").innerHTML += text;
    createSkillElementForShowField(myData.skills);
}


function setMySkills(skills) {
    createSkillElementForShowField(skills);

    let editText = "";

    for (let skill of skills) {
        skillEditId++; // skillEditId'yi mevcut beceri id'siyle güncelleyin
        editText += getSkillEditFormDivField(skill);

        document.getElementById("skills-edit").innerHTML = editText;
    }

   
}



function removeSkillFromEditForm(elementId) {
    const element = document.getElementById(elementId);
    if (element === null) return;

    const id = element.dataset["id"];
    const index = myData.skills.findIndex(p => p.id == id || p._id == id);
    myData.skills.splice(index, 1);
    element.remove();
    createSkillElementForShowField(myData.skills);
}

function keyupInputAndSetSkillInputValue(event, name,objectName) {
    const element = event.target;
    const id=element.dataset["id"];
    const index = myData.skills.findIndex(p => p.id == id || p._id == id);
   
    myData[objectName][index][name]=element.value;

    createSkillElementForShowField(myData.skills);
    
}


            
    let socialMediaEditId = 0;
    

    //SOCİAL MEDİA
        function setMySocialMedias(socialMedias) {
            createSocialMediaElementForShowField(socialMedias);
            let text = "";
            for (let social of socialMedias) {
                socialMediaEditId++;
                text += getSocialMediaEditFormDivField(social);
            }
            document.getElementById("socialMedias-edit").innerHTML = text;
        }
    
        function createSocialMediaEditFormDivField() {
            socialMediaEditId++; // socialMediaEditId'yi artırın
            const socialMedia = { _id: null, id: socialMediaEditId, name: "", link: "", title:"", icon:"" };
        
            // Veriyi saklamadan önce mevcut veriyi kopyalayın
            myData.socialMedias.push(socialMedia);
            const text = getSocialMediaEditFormDivField(socialMedia);
            document.getElementById("socialMedias-edit").innerHTML += text;
        
            // Yeni eklenen alanları görünür yapmak için createSocialMediaElementForShowField'ı çağırın
            createSocialMediaElementForShowField(myData.socialMedias);
        }
        
        
        
        function getSocialMediaEditFormDivField(socialMedia) {
            if (socialMedia._id === null) {
                return `
                <div id="socialMediaEditDiv${socialMediaEditId}" data-id="${socialMedia.id}" class="socialMedia-group"><br> 
                <i class="fa-brands fa-${socialMedia.icon}"></i>
                    <label for="socialMedia">${socialMedia.title}:</label>
                    <input onkeyup="keyupSocialMediaInputAndSetData(event,'name', 'socialMedias')" data-id="${socialMedia.id}" maxlength="100" name="socialMediaPlatform" title="formda görünmesini istediğiniz hesabınızı giriniz" type="text" value="${socialMedia.name}" id="socialMediaPlatformInput${socialMediaEditId}">  
                    
                    <label for="socialMedia">Link:</label>
                
                    <input onkeyup="keyupSocialMediaInputAndSetData(event,'link', 'socialMedias')" data-id="${socialMedia.id}" maxlength="500" name="socialMediaLink" title="sosyal medya linkini giriniz" type="text" value="${socialMedia.link}" id="socialMediaLinkInput${socialMediaEditId}">
                    <button onclick="removeSocialMediaFromEditForm('socialMediaEditDiv${socialMediaEditId}')" type="button" class="deleteSocialMedia">
                    <img src="delete.png" title="sosyal medyayı sil">
                </button>
                </div>
            `;

        }else{
            return`
            <div id="socialMediaEditDiv${socialMediaEditId}" data-id="${socialMedia._id}" class="socialMedia-group"><br> 
            <i class="fa-brands fa-${socialMedia.icon}"></i></a>
                <label for="socialMedia">${socialMedia.title}:</label>
                <input onkeyup="keyupSocialMediaInputAndSetData(event,'name', 'socialMedias')" data-id="${socialMedia._id}" maxlength="100" name="socialMediaPlatform" title="formda görünmesini istediğiniz hesabınızı giriniz" type="text" value="${socialMedia.name}" id="socialMediaPlatformInput${socialMediaEditId}">  
                
                <label for="socialMedia">Link:</label>
                <input onkeyup="keyupSocialMediaInputAndSetData(event,'link', 'socialMedias')" data-id="${socialMedia._id}" maxlength="500" name="socialMediaLink" title="sosyal medya linkini giriniz" type="text" value="${socialMedia.link}" id="socialMediaLinkInput${socialMediaEditId}"><button onclick="removeSocialMediaFromEditForm('socialMediaEditDiv${socialMediaEditId}')" type="button" class="deleteSocialMedia">
                <img src="delete.png" title="sosyal medyayı sil">
            </button>
            </div>
        `;

        }
        }

        
        function createSocialMediaElementForShowField(socialMedias) {
            let text = "";
        
            for (let socialMedia of socialMedias) {
                
                text += `
                    <li title="${socialMedia.title}">
                        <div class="li_wrap">
                        
                                <a href="${socialMedia.link}" target="_blank">
                                <i class="${socialMedia.icon}"></i>
                            ${socialMedia.name}</div></a>
            
                    </li>
                `;
            }
        
            // HTML sayfanızı güncelleyin
            document.getElementById("social-medias").innerHTML = text;
        }

        
        function removeSocialMediaFromEditForm(elementId) {
            const element = document.getElementById(elementId);
            if (element === null) return;
        
            const id = element.dataset["id"];
        
            const index=myData.socialMedias.findIndex(p => p.id == id || p._id == id);
            myData.socialMedias.splice(index,1);

        
            // Elementi kaldırın
            element.remove();
        
            // Mevcut verileri güncelleyin
            createSocialMediaElementForShowField(myData.socialMedias);
        }

    
        
        function keyupSocialMediaInputAndSetData(event, name, objectName) {
            const element = event.target;
            const id = element.dataset["id"];
            const index = myData.socialMedias.findIndex(p => p.id == id || p._id == id);
         
            myData[objectName][index][name] = element.value;
        
            createSocialMediaElementForShowField(myData.socialMedias);
        }
        
        
 
//PROJECTS

let projectEditId = 0;

function createProjectElementForShowField(projects) {
    let text = "";
    
    for (let project of projects) {
        text += `
        <li>
            <div class="li_wrap">
                
                <div class="info">
                    <div class="projectName">${project.name}</div>
                    <p class="info_title">Kullanılan Diller ve Teknolojiler:<br>${project.tech}</p> 
                    <p class="info_com">${project.description}</p>  
                    <p class="info_cont"></p>
                </div>
            </div>
        </li>
        `;
    }

    // HTML sayfanızı güncelleyin
    document.getElementById("projects").innerHTML = `<ul>${text}</ul>`;
}



function getProjectEditFormDivField(project) {
   if(project._id===null){

    return `
        <div class="projects"><br> 
       
            <div id="projectEditDiv${projectEditId}" data-id="${project.id}" class="form-group">
            <hr>
                <label for="proje">Proje Adı:</label>
                <input onkeyup="keyupInputAndSetProjectInputValue(event,'name','projects')" id="projectNameInput${project.id}" data-id="${project.id}" value="${project.name}" maxlength="500" name="projeAdi" title="proje adını giriniz: " type="text">
                <button onclick="removeProjectForEditForm('projectEditDiv${projectEditId}')" type="button" class="deleteProject">
                    <img src="delete.png" title="projeyi sil">
                </button>
            <br>
            
                <label for="projeAciklamasi">Proje Açıklaması Giriniz:</label><br>
                <textarea onkeyup="keyupInputAndSetProjectInputValue(event,'description','projects')" id="projectDescriptionInput${projectEditId}" data-id="${project.id}" name="projeAciklamasi" rows="3" cols="50">${project.description}</textarea>
            <br>
            
                <label for="teknolojiler">Kullanılan Teknolojiler</label>
               
                <input onkeyup="keyupInputAndSetProjectInputValue(event,'tech','projects')" id="projectTechInput${projectEditId}" data-id="${project.id}" id="teknolojiEkle" value="${project.tech}" maxlength="200" name="teknolojiler" title="Kullandığınız teknolojileri giriniz" type="text">

            
               
        </div>
    `;
}else{
    
    return `
        <div class="projects"><br> 
       
            <div id="projectEditDiv${projectEditId}" data-id="${project._id}" class="form-group">
            <hr>
                <label for="proje">Proje Adı:</label>
                <input onkeyup="keyupInputAndSetProjectInputValue(event,'name','projects')" id="projectNameInput${project.id}" data-id="${project._id}" value="${project.name}" maxlength="500" name="projeAdi" title="proje adını giriniz: " type="text">
                <button onclick="removeProjectForEditForm('projectEditDiv${projectEditId}')" type="button" class="deleteProject">
                    <img src="delete.png" title="projeyi sil">
                </button>
            <br>
            
                <label for="projeAciklamasi">Proje Açıklaması Giriniz:</label><br>
                <textarea onkeyup="keyupInputAndSetProjectInputValue(event,'description','projects')" id="projectDescriptionInput${projectEditId}" data-id="${project._id}" name="projeAciklamasi" rows="3" cols="50">${project.description}</textarea>
            <br>
            
                <label for="teknolojiler">Kullanılan Teknolojiler</label>
               
                <input onkeyup="keyupInputAndSetProjectInputValue(event,'tech','projects')" id="projectTechInput${projectEditId}" data-id="${project._id}" id="teknolojiEkle" value="${project.tech}" maxlength="200" name="teknolojiler" title="Kullandığınız teknolojileri giriniz" type="text">

            
               
        </div>
    `
}
}


function createProjectEditFormDivField() {
    projectEditId++; // projectEditId'yi artırın
    const project = { _id: null, id: projectEditId, name: "", tech: "", description: "" };

    // Veriyi saklamadan önce mevcut veriyi kopyalayın
    myData.projects.push(project);

    // Düzenleme formunu oluşturun ve sayfaya ekleyin
    const text = getProjectEditFormDivField(project);
    document.getElementById("projects-edit").innerHTML += text;

    // Projeyi gösterme alanını güncelleyin
    createProjectElementForShowField(myData.projects);
}


function setMyProjects(projects) {
    createProjectElementForShowField(projects);

    let projectText = "";

    for (let project of projects) {
        projectEditId++; 
        projectText += getProjectEditFormDivField(project);
    }

    document.getElementById("projects-edit").innerHTML = projectText;
}

function removeProjectForEditForm(elementId) {
    const element = document.getElementById(elementId);
    if (element === null) return;

    const id = element.dataset["id"];

    // myData.projects dizisinde projeyi bul
    const index = myData.projects.findIndex(p => p.id === id || p._id === id);

  
        myData.projects.splice(index, 1);
        element.remove();
        createProjectElementForShowField(myData.projects);
 
}

function keyupInputAndSetProjectInputValue(event, name, objectName) {
    const element = event.target;
    const id=element.dataset["id"];
    const index = myData.projects.findIndex(p => p.id == id|| p._id == id);
    
    myData[objectName][index][name] = element.value;

    createProjectElementForShowField(myData.projects);
    
}




//proje etiketleri için 



//EDUCATİONS
let educationEditId = 0;

function createEducationElementForShowField(educations) {
    let text = "";
    
    for (let education of educations) {
        text += `
        <li>
            <div class="li_wrap">
                <div class="date">${education.date}</div>
                <div class="info">
                    <p class="info_title">${education.section}</p> 
                    <p class="info_com">${education.organisation}</p>  
                    <p class="info_cont"></p>
                </div>
            </div>
        </li>
        `;
    }

    // HTML sayfanızı güncelleyin
    document.getElementById("educations").innerHTML = `<ul>${text}</ul>`;
}



function getEducationEditFormDivField(education) {
   if(education._id===null){
    return `
        <div class="educations"><br> 
       
            <div id="educationEditDiv${educationEditId}" data-id="${education.id}" class="form-group">
            <hr>
                <label for="egitim">Kurum Adı:</label>
                <input onkeyup="keyupInputAndSetEducationInputValue(event,'organisation','educations')" id="educationNameInput${educationEditId}" data-id="${education.id}" value="${education.organisation}" maxlength="500" name="kurumAdi" title="kurum adını giriniz: " type="text">
                <button onclick="removeEducationForEditForm('educationEditDiv${educationEditId}')" type="button" class="deleteEducation">
                    <img src="delete.png" title="kurumu sil">
                </button>
            <br>
            
                <label for="educationAciklamasi">Bölüm:</label>
                <input type="text" onkeyup="keyupInputAndSetEducationInputValue(event,'section','educations')" id="educationSectionInput${educationEditId}" data-id="${education.id}" value="${education.section}" name="bolumAciklamasi" rows="3" cols="50" >
            <br>
                <label for="startDate">Başlangıç-Bitiş Tarihi: </label>          
                <input onkeyup="keyupInputAndSetEducationInputValue(event,'date','educations')"  id="educationStartDateInput${educationEditId}" data-id="${education.id}" value="${education.date}" id="startDate"  maxlength="200" name="startDate" title="(Örnek Format: MM.yyyy-MM.yyyy)" type="text">    
                
             
               
        </div>
    `;
    }else{
        return `
        <div class="educations"><br> 
       
            <div id="educationEditDiv${educationEditId}" data-id="${education._id}" class="form-group">
            <hr>
                <label for="egitim">Kurum Adı:</label>
                <input onkeyup="keyupInputAndSetEducationInputValue(event,'organisation','educations')" id="educationNameInput${educationEditId}" data-id="${education._id}" value="${education.organisation}" maxlength="500" name="kurumAdi" title="kurum adını giriniz: " type="text">
                <button onclick="removeEducationForEditForm('educationEditDiv${educationEditId}')" type="button" class="deleteEducation">
                    <img src="delete.png" title="kurumu sil">
                </button>
            <br>
            
                <label for="educationAciklamasi">Bölüm:</label>
                <input type="text" onkeyup="keyupInputAndSetEducationInputValue(event,'section','educations')" id="educationSectionInput${educationEditId}" data-id="${education._id}" value="${education.section}" name="bolumAciklamasi" rows="3" cols="50" >
            <br>
                <label for="startDate">Başlangıç-Bitiş Tarihi: </label>          
                <input onkeyup="keyupInputAndSetEducationInputValue(event,'date','educations')"  id="educationStartDateInput${educationEditId}" data-id="${education._id}" value="${education.date}" id="startDate"  maxlength="200" name="startDate" title="(Örnek Format: MM.yyyy-MM.yyyy)" type="text">    
                
             
               
        </div>
    `;
    }

}

function createEducationEditFormDivField() {
    educationEditId++; 
    const education = { _id: null, id: educationEditId, organisation: "", section: "", date: "" };

    // Veriyi saklamadan önce mevcut veriyi kopyalayın
    myData.educations.push(education);

    // Düzenleme formunu oluşturun ve sayfaya ekleyin
    const text = getEducationEditFormDivField(education);
    document.getElementById("educations-edit").innerHTML += text;

  
    createEducationElementForShowField(myData.educations);
}


function setMyEducations(educations) {
    createEducationElementForShowField(educations);

    let educationText = "";

    for (let education of educations) {
        educationEditId++; 
        educationText += getEducationEditFormDivField(education);
        document.getElementById("educations-edit").innerHTML = educationText;
    }
  
}

function removeEducationForEditForm(elementId) {
    const element = document.getElementById(elementId);
    if (element === null) return;

    const id = element.dataset["id"];

    
    const index = myData.educations.findIndex(p => p.id === id || p._id === id);

    myData.educations.splice(index, 1);
    element.remove();
    createEducationElementForShowField(myData.educations);
    
}

function keyupInputAndSetEducationInputValue(event, name,objectName) {
    const element = event.target;
    const id=element.dataset["id"];
    const index = myData.educations.findIndex(p => p.id == id || p._id == id);
    
    myData[objectName][index][name]=element.value;
    createEducationElementForShowField(myData.educations);

}


//EXPERIENCES

let experienceEditId = 0;


function createExperienceElementForShowField(experiences) {
    let text = "";

    for (let experience of experiences) {
        text += `
        <li>
        <div class="li_wrap">
        <div class="date">${experience.date}</div>
        <div class="info">
    <p class="info_title">${experience.title}</p> 
    <p class="info_com">${experience.company}</p>  
    <p class="info_cont">      
    </p>
        </div>
        </div>
    </li>
        `;
    }

    // HTML sayfanızı güncelleyin
    document.getElementById("experiences").innerHTML = text;
}



function getExperienceEditFormDivField(experience) {
    if (experience._id === null) {

    return `
        <div class="experiences"><br> 
       
            <div id="experience${experienceEditId}" data-id="${experience.id}" class="form-group">
            <hr>
                <label for="company">Firma Adı:</label>
                <input onkeyup="keyupInputAndSetExperienceInputValue(event, 'company', 'experiences')" id="experienceInput${experienceEditId}" data-id="${experience.id}" value="${experience.company}" maxlength="500" name="firmaAdi" title="firma adını giriniz: " type="text">

                <button onclick="removeExperienceForEditForm('experienceInput${experienceEditId}')" type="button" class="deleteExperience">
                    <img src="delete.png" title="firmayı sil">
                </button>
            <br>
            
                <label for="unvanAciklamasi">Unvan:</label>
                <input onkeyup="keyupInputAndSetExperienceInputValue(event,'title','experiences')" id="experienceInput${experienceEditId}" data-id="${experience.id}" name="unvanAciklamasi" rows="3" cols="50" value="${experience.title}">
            <br>
            
            <label for="startDate">Firma Başlangıç-Bitiş Tarihi: </label>          
                <input onkeyup="keyupInputAndSetExperienceInputValue(event,'date','experiences')"  id="experienceInput${experienceEditId}" data-id="${experience.id}" value="${experience.date}" id="startDate"  maxlength="200" name="startDate" title="(Örnek Format: MM.yyyy-MM.yyyy)" type="text">    
                
               
        </div>
    `;
}else{
    return `
    <div class="experiences"><br> 
       
    <div id="experience${experienceEditId}" data-id="${experience._id}" class="form-group">
    <hr>
        <label for="company">Firma Adı:</label>
        <input onkeyup="keyupInputAndSetExperienceInputValue(event, 'company', 'experiences')" id="experienceInput${experienceEditId}" data-id="${experience._id}" value="${experience.company}" maxlength="500" name="firmaAdi" title="firma adını giriniz: " type="text">

        <button onclick="removeExperienceForEditForm('experienceInput${experienceEditId}')" type="button" class="deleteExperience">
            <img src="delete.png" title="firmayı sil">
        </button>
    <br>
    
        <label for="unvanAciklamasi">Unvan:</label>
        <input onkeyup="keyupInputAndSetExperienceInputValue(event,'title','experiences')" id="experienceInput${experienceEditId}" data-id="${experience._id}" name="unvanAciklamasi" rows="3" cols="50" value="${experience.title}">
    <br>
    
    <label for="startDate">Firma Başlangıç-Bitiş Tarihi: </label>          
        <input onkeyup="keyupInputAndSetExperienceInputValue(event,'date','experiences')"  id="experienceInput${experienceEditId}" data-id="${experience._id}" value="${experience.date}" id="startDate"  maxlength="200" name="startDate" title="(Örnek Format: MM.yyyy-MM.yyyy)" type="text">    
        
       
</div>
    `;

}

}

function createExperienceEditFormDivField() {
    experienceEditId++; 
    const experience = { _id: null, id: experienceEditId, company: "", title: "", date: "" };

   
    myData.experiences.push(experience);

   
    const text = getExperienceEditFormDivField(experience);
    document.getElementById("experiences-edit").innerHTML += text;

    
    createExperienceElementForShowField(myData.experiences);
}


function setMyExperiences(experiences) {
    createExperienceElementForShowField(experiences);

    let experienceText = "";

    for (let experience of experiences) {
        experienceEditId++;
        experienceText += getExperienceEditFormDivField(experience);
        document.getElementById("experiences-edit").innerHTML = experienceText;

    }
    

}


function removeExperienceForEditForm(elementId) {
const element = document.getElementById(elementId);
            if (element === null) return;
        
            const id = element.dataset["id"];
        
            const index=myData.experiences.findIndex(p => p.id == id || p._id == id);
            myData.experiences.splice(index,1);

        
            // Elementi kaldırın
            element.remove();
        
            // Mevcut verileri güncelleyin
            createExperienceElementForShowField(myData.experiences);
}



function keyupInputAndSetExperienceInputValue(event, name, objectName) {
    const element = event.target;
    const id = element.dataset["id"];

    const index = myData.experiences.findIndex(p => p.id == id || p._id == id);
    
    myData[objectName][index][name] = element.value;


    createExperienceElementForShowField(myData.experiences);
    
}

function toggleEndDateInput(checkbox, inputId) {
    const endDateInput = document.getElementById(inputId);
    if (endDateInput) {
        endDateInput.disabled = checkbox.checked;
    }
}


function showAvatarPreview(inputId, event) {
    const avatarImage = document.getElementById('avatar');
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            avatarImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}


