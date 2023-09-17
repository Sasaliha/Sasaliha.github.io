
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
    if (skill._id === null) {
        return `
            <div id="skillEditDiv${skillEditId}" data-id="${skill.id}" class="skills-group"><br> 
                <label for="skill">Yetenek Ekle:</label>
                <input onkeyup="keyupInputAndSetSkillInputValue(event,'title','${skillEditId}')" data-id="${skill.id}" maxlength="500" name="skillAdi" title="yetenek adını giriniz: " type="text" value="${skill.title}" id="skillTitleInput${skillEditId}">
                <button onclick="removeSkillFromEditForm('skillEditDiv${skillEditId}')" type="button" class="deleteSkill">
                    <img src="delete.png" title="yeteneği sil">
                </button><br>
                <label for="skill">Yeteneğinizi 100 üzerinden puanlayınız: %</label>
                
                <input onkeyup="keyupInputAndSetSkillInputValue(event,'rate','${skillEditId}')" data-id="${skill.id}" maxlength="100" name="skillPuan" title="yetenek yüzdesini giriniz: " type="number" value="${skill.rate}" id="skillRateInput${skillEditId}">
            </div>
        `;
    } else {
        return `
            <div id="skillEditDiv${skillEditId}" data-id="${skill._id}" class="skills-group"><br> 
                <label for="skill">Yetenek Ekle:</label>
                <input onkeyup="keyupInputAndSetSkillInputValue(event,'title','${skillEditId}')" data-id="${skill._id}" maxlength="500" name="skillAdi" title="yetenek adını giriniz: " type="text" value="${skill.title}" id="skillTitleInput${skillEditId}">
                <button onclick="removeSkillFromEditForm('skillEditDiv${skillEditId}')" type="button" class="deleteSkill">
                    <img src="delete.png" title="yeteneği sil">
                </button><br>
                <label for="skill">Yeteneğinizi 100 üzerinden puanlayınız: %</label>
                
                <input onkeyup="keyupInputAndSetSkillInputValue(event,'rate','${skillEditId}')" data-id="${skill._id}" maxlength="100" name="skillPuan" title="yetenek yüzdesini giriniz: " type="number" value="${skill.rate}" id="skillRateInput${skillEditId}">
            </div>
        `;
    }
}


function createSkillEditFormDivField() {
    skillEditId++; // skillEditId'yi artırmadan önce yeni bir beceri oluşturun
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
    }

    document.getElementById("skills-edit").innerHTML = editText;
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

function keyupInputAndSetSkillInputValue(event, name,id) {
    const element = event.target;
        
   
    const index = myData.skills.findIndex(p => p.id == id || p._id == id);
    if (name === "title") {
        myData.skills[index].title= element.value;
    } else if (name === "rate") {
        myData.skills[index].rate = element.value;
    }

    createSkillElementForShowField(myData.skills);
    
}


            
    let socialMediaEditId = 0;
    let socialData = []; // Önceki verileri saklamak için bir dizi

//SOCİAL MEDİA
    function setMySocialMedias(socialMedias) {
        createSocialMediaElementForShowField(socialMedias);
        let text = "";
        for (let social of socialMedias) {
            socialMediaEditId=social.id;
            text += getSocialMediaEditFormDivField(social);
        }
        document.getElementById("socialMedias-edit").innerHTML = text;
    }
  
    function createSocialMediaEditFormDivField() {
        socialMediaEditId++; // socialMediaEditId'yi artırın
        const socialMedia= { _id: null, id: socialMediaEditId, name: "", link: "", title:"", icon:"" };
    
        socialData=[...myData.socialMedias];
        myData.socialMedias.push(socialMedia); // Veriyi myData.socialMedias dizisine ekleyin
        const text = getSocialMediaEditFormDivField(socialMedia);
        document.getElementById("socialMedias-edit").innerHTML += text;
    
        // Mevcut verileri güncelleyin
        createSocialMediaElementForShowField(myData.socialMedias);
    }

       
    function getSocialMediaEditFormDivField(socialMedia) {
        if (socialMedia._id === null) {
            return `
            <div id="socialMediaEditDiv${socialMediaEditId}" data-id="${socialMedia.id}" class="socialMedia-group"><br> 
            <i class="fa-brands fa-${socialMedia.icon}"></i>
                <label for="socialMedia">${socialMedia.title}:</label>
                <input onkeyup="keyupSocialMediaInputAndSetData(event,'name', '${socialMediaEditId}')" data-id="${socialMedia.id}" maxlength="100" name="socialMediaPlatform" title="formda görünmesini istediğiniz hesabınızı giriniz" type="text" value="${socialMedia.name}" id="socialMediaPlatformInput${socialMediaEditId}">  
                
                <label for="socialMedia">Link:</label>
               
                <input onkeyup="keyupSocialMediaInputAndSetData(event,'link', '${socialMediaEditId}')" data-id="${socialMedia.id}" maxlength="500" name="socialMediaLink" title="sosyal medya linkini giriniz" type="text" value="${socialMedia.link}" id="socialMediaLinkInput${socialMediaEditId}">
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
            <input onkeyup="keyupSocialMediaInputAndSetData(event,'name', '${socialMediaEditId}')" data-id="${socialMedia._id}" maxlength="100" name="socialMediaPlatform" title="formda görünmesini istediğiniz hesabınızı giriniz" type="text" value="${socialMedia.name}" id="socialMediaPlatformInput${socialMediaEditId}">  
            
            <label for="socialMedia">Link:</label>
            <input onkeyup="keyupSocialMediaInputAndSetData(event,'link', '${socialMediaEditId}')" data-id="${socialMedia._id}" maxlength="500" name="socialMediaLink" title="sosyal medya linkini giriniz" type="text" value="${socialMedia.link}" id="socialMediaLinkInput${socialMediaEditId}"><button onclick="removeSocialMediaFromEditForm('socialMediaEditDiv${socialMediaEditId}')" type="button" class="deleteSocialMedia">
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

  
    
    function keyupSocialMediaInputAndSetData(event, name, id) {
        const element = event.target;
        
        // Veriyi myData.socialMedias dizisinde güncelleyin
        const index = myData.socialMedias.findIndex(p => p.id == id || p._id == id);
        if (name === "name") {
            myData.socialMedias[index].name = element.value;
        } else if (name === "link") {
            myData.socialMedias[index].link = element.value;
        }
    
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
                <div class="date">${project.name}</div>
                <div class="info">
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

function assignProjectId(project) {
    project._id = Date.now(); // Örneğin, tarih ve saat kullanarak benzersiz bir kimlik oluşturabilirsiniz.
    return project;
}


function getProjectEditFormDivField(project) {
    project = assignProjectId(project); // Her projeye kimlik atayın

    return `
        <div class="projects"><br> 
       
            <div id="projectEditDiv${project._id}" data-id="${project._id}" class="form-group">
            <hr>
                <label for="proje">Proje Adı:</label>
                <input onkeyup="keyupInputAndSetProjectInputValue(event,'name','${project._id}')" id="projectNameInput${project._id}" data-id="${project._id}" value="${project.name}" maxlength="500" name="projeAdi" title="proje adını giriniz: " type="text">
                <button onclick="removeProjectForEditForm('projectEditDiv${project._id}')" type="button" class="deleteProject">
                    <img src="delete.png" title="projeyi sil">
                </button>
            <br>
            
                <label for="projeAciklamasi">Proje Açıklaması Giriniz:</label><br>
                <textarea onkeyup="keyupInputAndSetProjectInputValue(event,'description','${project._id}')" id="projectDescriptionInput${project._id}" data-id="${project._id}" name="projeAciklamasi" rows="3" cols="50">${project.description}</textarea>
            <br>
            
                <label for="teknolojiler">Kullanılan Teknolojiler</label>
               
                <input onkeyup="keyupInputAndSetProjectInputValue(event,'tech','${project._id}')" id="projectTechInput${project._id}" data-id="${project._id}" id="teknolojiEkle" value="${project.tech}" maxlength="200" name="teknolojiler" title="Kullandığınız teknolojileri giriniz" type="text">

            
               
        </div>
    `;
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

    // projectText değişkenini tanımladığınızdan emin olun
    projectText = projectText || "";

    document.getElementById("projects-edit").innerHTML = projectText;
}

function removeProjectForEditForm(elementId) {
    const element = document.getElementById(elementId);
    if (element === null) return;

    const projectId = element.dataset["id"];

    // Proje kimliğini sayı olarak alın
    const projectIdNumber = parseInt(projectId);

    // myData.projects dizisinde projeyi bulun
    const index = myData.projects.findIndex(p => p.id === projectIdNumber || p._id === projectIdNumber);

    if (index !== -1) {
        // Proje bulundu, şimdi silin
        myData.projects.splice(index, 1);
        element.remove();
        createProjectElementForShowField(myData.projects);
    }
}

function keyupInputAndSetProjectInputValue(event, name, projectId) {
    const element = event.target;
    
    const index = myData.projects.findIndex(p => p.id == projectId || p._id == projectId);
    
    if (index !== -1) {
        if (name === "name") {
            myData.projects[index].name = element.value;
        } else if (name === "tech") {
            myData.projects[index].tech = element.value;
        } else if (name === "description") {
            myData.projects[index].description = element.value;
        }

        createProjectElementForShowField(myData.projects);
    }
}


function updateProjectElements() {
    const projectElements = document.querySelectorAll('.projects-edit .project'); // projeleri seçin

    projectElements.forEach(element => {
        const id = element.dataset.id;
        const project = myData.projects.find(p => p.id == id || p._id == id);

        if (project) {
            const nameInput = element.querySelector('[name="projeAdi"]');
            const descriptionInput = element.querySelector('[name="projeAciklamasi"]');
            const techInput = element.querySelector('[name="teknolojiler"]');

            if (nameInput) {
                nameInput.value = project.name;
            }

            if (descriptionInput) {
                descriptionInput.value = project.description;
            }

            if (techInput) {
                techInput.value = project.tech;
            }
        }
    });
}

//proje etiketleri için 

function ekleEtiket() {
        // Metin kutusundan teknolojiyi al
        var teknoloji = document.getElementById("teknolojiEkle").value;
    
        // Boşlukları ve başındaki ve sonundaki boşlukları kaldır
        teknoloji = teknoloji.trim();
    
        // Teknoloji boş değilse etiket olarak ekleyin
        if (teknoloji !== "") {
            var etiketlerDiv = document.getElementById("etiketler");
            
            // Yeni etiketi oluşturun
            var yeniEtiket = document.createElement("span");
            yeniEtiket.innerHTML = `<span>${teknoloji}</span> <button onclick="cikarEtiket(this)">x</button>`;
    
            // Oluşturulan etiketi etiketlerDiv'e ekleyin
            etiketlerDiv.appendChild(yeniEtiket);
    
            // Metin kutusunu temizle
            document.getElementById("teknolojiEkle").value = "";
    
            // Eklenen teknolojiyi metin kutusuna ekleyin
            var secilenTeknolojiler = document.getElementById("secilenTeknolojiler");
            secilenTeknolojiler.value += teknoloji + "\n";
        }
    }
    

    function cikarEtiket(button) {
        var etiketlerDiv = document.getElementById("etiketler");
        var etiket = button.parentNode;
        var teknoloji = etiket.firstChild.innerText;
    
        // Eklenen teknolojiyi metin kutusundan çıkar
        var secilenTeknolojiler = document.getElementById("secilenTeknolojiler");
        secilenTeknolojiler.value = secilenTeknolojiler.value.replace(teknoloji + "\n", "");
    
        // Etiketi etiketlerDiv'den kaldır
        etiketlerDiv.removeChild(etiket);
    }

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

function assignEducationId(education) {
    education._id = Date.now(); // Örneğin, tarih ve saat kullanarak benzersiz bir kimlik oluşturabilirsiniz.
    return education;
}


function getEducationEditFormDivField(education) {
    education = assignEducationId(education); 
    return `
        <div class="educations"><br> 
       
            <div id="educationEditDiv${education._id}" data-id="${education._id}" class="form-group">
            <hr>
                <label for="egitim">Kurum Adı:</label>
                <input onkeyup="keyupInputAndSetEducationInputValue(event,'organisation','${education._id}')" id="educationNameInput${education._id}" data-id="${education._id}" value="${education.organisation}" maxlength="500" name="kurumAdi" title="kurum adını giriniz: " type="text">
                <button onclick="removeEducationForEditForm('educationEditDiv${education._id}')" type="button" class="deleteEducation">
                    <img src="delete.png" title="kurumu sil">
                </button>
            <br>
            
                <label for="educationAciklamasi">Bölüm:</label>
                <input type="text" onkeyup="keyupInputAndSetEducationInputValue(event,'section','${education._id}')" id="educationSectionInput${education._id}" data-id="${education._id}" value="${education.section}" name="bolumAciklamasi" rows="3" cols="50" >
            <br>
                <label for="startDate">Başlangıç-Bitiş Tarihi: </label>          
                <input onkeyup="keyupInputAndSetEducationInputValue(event,'date','${education._id}')"  id="educationStartDateInput${education._id}" data-id="${education._id}" value="${education.date}" id="startDate"  maxlength="200" name="startDate" title="(Örnek Format: MM.yyyy-MM.yyyy)" type="text">    
                
             
               
        </div>
    `;
    }



function createEducationEditFormDivField() {
    educationEditId++; 
    const education = { _id: null, id: educationEditId, name: "", tech: "", description: "" };

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
    }

  
    educationText = educationText || "";

    document.getElementById("educations-edit").innerHTML = educationText;
}

function removeEducationForEditForm(elementId) {
    const element = document.getElementById(elementId);
    if (element === null) return;

    const educationId = element.dataset["id"];

    
    const educationIdNumber = parseInt(educationId);

    const index = myData.educations.findIndex(p => p.id === educationIdNumber || p._id === educationIdNumber);

    if (index !== -1) {
       
        myData.educations.splice(index, 1);
        element.remove();
        createEducationElementForShowField(myData.educations);
    }
}

function keyupInputAndSetEducationInputValue(event, name,educationId) {
    const element = event.target;
    
    const index = myData.educations.findIndex(p => p.id == educationId || p._id == educationId);
    
    if (index !== -1) {
        if (name === "section") {
            myData.educations[index].section = element.value;
        } else if (name === "organisation") {
            myData.educations[index].organisation = element.value;
        } else if (name === "date") {
            myData.educations[index].date = element.value;
        }

        createEducationElementForShowField(myData.educations);
    }
}


function updateEducationElements() {
    const educationElements = document.querySelectorAll('.educations-edit .education'); 
        educationElements.forEach(element => {
        const id = element.dataset.id;
        const education = myData.educations.find(p => p.id == id || p._id == id);

        if (education) {
            const organisationInput = element.querySelector('[name="kurumAdi"]');
            const sectionInput = element.querySelector('[name="bolumAciklamasi"]');
            const dateInput = element.querySelector('[name="endDate"]');

            if (dateInput) {
                dateInput.value = education.date;
            }

            if (sectionInput) {
                sectionInput.value = education.section;
            }

            if (organisationInput) {
                organisationInput.value = education.organisation;
            }
        }
    });
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


function assignExperienceId(experience) {
    experience._id = Date.now(); // Örneğin, tarih ve saat kullanarak benzersiz bir kimlik oluşturabilirsiniz.
    return experience;
}


function getExperienceEditFormDivField(experience) {
    experience = assignExperienceId(experience); 

    return `
        <div class="experiences"><br> 
       
            <div id="experienceEditDiv${experience._id}" data-id="${experience._id}" class="form-group">
            <hr>
                <label for="company">Firma Adı:</label>
                <input onkeyup="keyupInputAndSetExperienceInputValue(event, 'company', '${experience._id}')" id="experienceCompanyInput${experience._id}" data-id="${experience._id}" value="${experience.company}" maxlength="500" name="firmaAdi" title="firma adını giriniz: " type="text">

                <button onclick="removeExperienceForEditForm('experienceEditDiv${experience._id}')" type="button" class="deleteExperience">
                    <img src="delete.png" title="firmayı sil">
                </button>
            <br>
            
                <label for="unvanAciklamasi">Unvan:</label>
                <input onkeyup="keyupInputAndSetExperienceInputValue(event,'title','${experience._id}')" id="experienceTitleInput${experience._id}" data-id="${experience._id}" name="unvanAciklamasi" rows="3" cols="50" value="${experience.title}">
            <br>
            
            <label for="startDate">Firma Başlangıç-Bitiş Tarihi: </label>          
                <input onkeyup="keyupInputAndSetExperienceInputValue(event,'date','${experience._id}')"  id="experienceStartDateInput${experience._id}" data-id="${experience._id}" value="${experience.date}" id="startDate"  maxlength="200" name="startDate" title="(Örnek Format: MM.yyyy-MM.yyyy)" type="text">    
                
               
        </div>
    `;
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
        experience._id = Date.now();
        experienceText += getExperienceEditFormDivField(experience);
    }

    experienceText = experienceText || "";

    document.getElementById("experiences-edit").innerHTML = experienceText;
}


function removeExperienceForEditForm(elementId) {
    const element = document.getElementById(elementId);
    if (element === null) return;

    const experienceId = element.dataset["id"];
  
    const experienceIdNumber = parseInt(experienceId);

    const index = myData.experiences.findIndex(p => p._id === experienceIdNumber);

    if (index !== -1) {
        myData.experiences.splice(index, 1);
        element.remove();
        createExperienceElementForShowField(myData.experiences);
    }
}

function keyupInputAndSetExperienceInputValue(event, name, experienceId) {
    const element = event.target;
    
    const index = myData.experiences.findIndex(p => p.id == experienceId || p._id == experienceId);
    
    if (index !== -1) {
        if (name === "company") {
            myData.experiences[index].company = element.value;
        } else if (name === "title") {
            myData.experiences[index].title = element.value;
        } else if (name === "date") {
            myData.experiences[index].date = element.value;
        }

        createExperienceElementForShowField(myData.experiences);
    }
}



function updateExperienceElements() {
    const experienceElements = document.querySelectorAll('.experiences-edit .experience');

    experienceElements.forEach(element => {
        const id = element.dataset.id;
        const experience = myData.experiences.find(p => p.id == id || p._id == id);

        if (experience) {
            const companyInput = element.querySelector('[name="firmaAdi"]');
            const titleInput = element.querySelector('[name="unvanAciklamasi"]');
            const dateInput = element.querySelector('[name="startDate"]');

            if (companyInput) {
                companyInput.value = experience.company;
            }

            if (titleInput) {
                titleInput.value = experience.title;
            }

            if (dateInput) {
                dateInput.value = experience.date;
            }
        }
    });
}

function toggleEndDateInput(checkbox, inputId) {
    const endDateInput = document.getElementById(inputId);
    if (endDateInput) {
        endDateInput.disabled = checkbox.checked;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const checkBoxes = document.querySelectorAll(".firmaDevam");
    const endDateInputId = "firmaBitis"; // Bitiş yılı input'unun ID'si

    // Sayfa yüklendiğinde mevcut duruma göre input durumunu ayarla
    checkBoxes.forEach(function (checkBox) {
        toggleEndDateInput(checkBox, endDateInputId);
    });

    // Checkbox durum değiştiğinde input durumunu güncelle
    checkBoxes.forEach(function (checkBox) {
        checkBox.addEventListener("change", function () {
            toggleEndDateInput(checkBox, endDateInputId);
        });
    });
});


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


