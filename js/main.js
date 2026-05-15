let contact = document.getElementById("contact-button");
let FullName = document.getElementById("FullName");
let PhoneNumber = document.getElementById("PhoneNumber");
let EmailAddress = document.getElementById("EmailAddress");
let Address = document.getElementById("Address");
let cancel = document.getElementById("cancel");
let save = document.getElementById("save");
let saveupdate = document.getElementById("saveupdate");
let Favorites = document.getElementById("Favorites");
let organize = document.getElementById("organize");
let emergency = document.getElementById("emergency");
let toty = document.getElementById("toty");
let favcount = document.getElementById("favcount");
let emrcount = document.getElementById("emrcount");
let Group = document.getElementById("Group");
let Notes = document.getElementById("Notes");
let nofavorites = document.getElementById("nofavorites");
let noemergency = document.getElementById("noemergency");
let noemer = document.getElementById("noemer");
let Nocontacts = document.getElementById("Nocontacts");
let hamoksha = document.getElementById("hamoksha");
let inputcontainer = document.getElementById("input-container");
let overlay = document.getElementById("overlay");
let closey = document.querySelector(".close");
let upd;
// let star = document.getElementById("star");

// let heart = document.getElementById("heart");

// let envestar = document.querySelectorAll(".enve-star");

// let enveheart = document.getElementById("enve-heart");

// let pulse = document.getElementById("pulse");

// let stary = document.getElementById("stary");


contact.onclick = function () {
    if (inputcontainer.classList.contains('d-none')) {
        inputcontainer.classList.remove('d-none');
        inputcontainer.classList.add('d-block');
        overlay.style.opacity = 1;
        overlay.style.pointerEvents = "auto";
    }
}
closey.onclick = function () {
    if (inputcontainer.classList.contains('d-block')) {
        inputcontainer.classList.remove('d-block');
        inputcontainer.classList.add('d-none');
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
    }
    clear();
}
cancel.onclick = function () {
    if (inputcontainer.classList.contains('d-block')) {
        inputcontainer.classList.remove('d-block');
        inputcontainer.classList.add('d-none');
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
    }
    clear();
}
function validate(ele) {
    let reg = {
        FullName: /^[\w\s]{2,50}$/i,
        PhoneNumber: /^01[0-2][0-9]{8}$/g,
        EmailAddress: /^\w+@gmail\.com$/i,
    }

    if (ele.value == '') {
        ele.nextElementSibling.classList.add('d-none');
        ele.addEventListener("blur", function () {
            ele.style.border = "none";
        });
        return false;
    }
    if (reg[ele.id].test(ele.value)) {
        ele.nextElementSibling.classList.add('d-none');
        ele.addEventListener("blur", function () {
            ele.style.border = "none";
        });

        return true;
    } else {
        ele.nextElementSibling.classList.remove('d-none');
        ele.addEventListener("blur", function () {
            ele.style.border = "1px solid red";
        });
        return false;
    }


}
let arr;
if (localStorage.persons == null) {
    arr = [];

} else {
    arr = JSON.parse(localStorage.getItem("persons"));
}

save.onclick = function () {
    numcheck();
    checkname();
    numduplicate(PhoneNumber.value);
    if (validate(FullName) && validate(PhoneNumber) && validate(EmailAddress) && numduplicate(PhoneNumber.value) && numcheck() && checkname()) {

        let obj = {
            FullName: FullName.value,
            PhoneNumber: PhoneNumber.value,
            EmailAddress: EmailAddress.value,
            Address: Address.value,
            Group: Group.value,

            Favorites: Favorites.checked,
            emergency: emergency.checked,
            Notes: Notes.value,
        }
        arr.push(obj);
        localStorage.setItem("persons", JSON.stringify(arr))
        console.log(arr);

        addproduct();
        updateStarsUI();

        updateemrUI();

        favfunc();

        emrfunc();
        gettotal();
        clear()
    }
    if (inputcontainer.classList.contains('d-block')) {
        inputcontainer.classList.remove('d-block');
        inputcontainer.classList.add('d-none');
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
    }
}



let favarr = [];
let emrarr = [];

function addproduct() {
    favarr = [];
    emrarr = [];
    let eggcontainer = '';
    for (let i = 0; i < arr.length; i++) {

        eggcontainer += `

            <div class="col-xl-6 col-sm-12">
                <div class="bg-white container-contact rounded-4 overflow-hidden ">
                <div class="emerg">
                    <div class="px-4 py-4">
                        <div class="d-flex align-items-center  justify-content-between pulsecontact">
                            <div class="m">${arr[i].FullName[0].toUpperCase()}

                                <div id="pulse" class="emry pulse d-none"><i class="fa-solid fa-heart-pulse "></i></div>
                                <div id="stary" class="stary d-none"><i class="fa-solid fa-star "></i></div>
                            </div>
                            <div>
                                <span>${arr[i].FullName}</span>
                                <div class=" d-flex align-items-center">
                                    <span class="phone"><i class="fa-solid fa-phone" style="color: #155DFC;"></i></span>
                                    <span>${arr[i].PhoneNumber}     

                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <span class="envelope me-2">
                                <i class="fa-solid fa-envelope"></i>
                            </span>
                            <span class="" style="color: #6A7282;">
${arr[i].EmailAddress}     
                       </span>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <span class="location me-2">
                                <i class="fa-solid fa-location-dot"></i>
                            </span>
                            <span class="" style="color: #6A7282;">
                                ${arr[i].Address}     

                            </span>
                        </div>
                        <div class="mt-3  mb-0">
                            <span
                                style="color: #2A9764;background-color: #DBFCE7;border-radius: 10px; width: fit-content; padding:3px 10px;"> ${arr[i].Group}     
</span>
                            <span id="Emergency" class="d-none Emergency"
                                style="color: #EC003F;background-color: #FFF1F2;border-radius: 10px; width: fit-content; padding:3px 10px;"><i
                                    class="fa-solid fa-heart-pulse "></i> Emergency</span>
                        </div>
                    </div>
                    <div class="icons px-4 mt-0">
                        <div class=" py-3 d-flex justify-content-between align-items-center">
                            <div class="icins1 d-flex">
                                <a href="tel:${arr[i].PhoneNumber}">
                                    <span class="location me-2" style="padding: 18px;">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                </a>
                                <a href="mailto:${arr[i].EmailAddress}">
                                    <span class="envelope me-2" style="padding: 18px;">
                                        <i class="fa-solid fa-envelope"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="d-flex">
                                <button  class="envelope1 env1 enve-star me-2"
                                    style="padding: 18px;border: none;">
                                    <i onclick=mahmoud(this,${i}) class="fa-regular fa-star starenve"></i>
                                </button>
                                <button id="enve-heart" class="envelope1 env1 enve-heart me-2"
                                    style="padding: 18px;border: none;">
                                    <i  onclick=jho(this,${i}) class="fa-regular fa-heart emrenve"></i>
                                </button>
                                <button onclick=edit(${i}) class="envelope1 enve-pen env2 me-2" style="padding: 18px;border: none;">

                                    <i class="fa-solid fa-pen"></i>

                                </button>
                                <button onclick="dele(${i})" class="envelope1 enve-trash env2 me-2" style="padding: 18px;border: none;">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
            
        </div>
        </div>

        `
        favarr.push(arr[i]);
        emrarr.push(arr[i]);


    }
    Nocontacts.innerHTML = eggcontainer;

}
addproduct();
updateStarsUI();
updateemrUI()
let l;
let k;
function favfunc() {
    l = 0;

    let smsm = '';
    let countfav = '';
    for (let j = 0; j < favarr.length; j++) {

        if (favarr[j].Favorites == true) {


            smsm += `
                       <div class="p-1 ">
                                                <div class="p-2 rounded-3  d-flex align-items-center justify-content-between felfel"
                                                    style="background-color: #F8FAFC;">
                                                    <div class=" d-flex align-items-center">
                                                        <div class="msmall me-2">${favarr[j].FullName[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span class="d-block " style="font-size: 14px;">${favarr[j].FullName}</span>
                                                            <span class="d-block" style="font-size: 14px;">${favarr[j].PhoneNumber} 
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <a href="tel:${arr[i].PhoneNumber}">
                                                        <span class="location swsw me-2" style="padding: 18px;">
                                                            <i class="fa-solid fa-phone"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                    `
            l++;
            countfav = `
            <span class="fw-bold fs-4">${l}</span>
            `
        }


        nofavorites.innerHTML = smsm;
        favcount.innerHTML = countfav;
        if (smsm == '') {
            nofavorites.innerHTML = `
          <p class="text-center py-4 bg-white">No favorites yet</p>
            `;
            favcount.innerHTML = `
            <span class="fw-bold fs-4">0</span>
            `;

        }
    }
}
favfunc();
console.log(l)
function emrfunc() {
    k = 0;

    let smsm2 = '';
    let countemr = '';
    for (let u = 0; u < emrarr.length; u++) {

        if (emrarr[u].emergency == true) {


            smsm2 += `
                       <div class="p-1">
                                                <div class="p-2 rounded-3  d-flex align-items-center justify-content-between felfel2"
                                                    style="background-color: #F8FAFC;">
                                                    <div class=" d-flex align-items-center">
                                                        <div class="msmall me-2">${emrarr[u].FullName[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span class="d-block " style="font-size: 14px;">${emrarr[u].FullName}</span>
                                                            <span class="d-block" style="font-size: 14px;">${emrarr[u].PhoneNumber} 
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <a href="tel:${arr[i].PhoneNumber}">
                                                        <span class="location swsw2 me-2" style="padding: 18px;">
                                                            <i class="fa-solid fa-phone"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                    `
            k++;
            countemr = `
            <span class="fw-bold fs-4">${k}</span>
            `
        }


        noemer.innerHTML = smsm2;
        emrcount.innerHTML = countemr;
        if (smsm2 == '') {
            noemer.innerHTML = `
          <p class="text-center py-4 bg-white">No favorites yet</p>
            `;
            emrcount.innerHTML = `
            <span class="fw-bold fs-4">0</span>
            `;
        }
    }
}
emrfunc();
// console.log(l)
function updateStarsUI() {
    let stars = document.querySelectorAll(".starenve");
    let stary = document.querySelectorAll(".stary");
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].Favorites) {
            stars[i].classList.remove("fa-regular");
            stars[i].classList.add("fa-solid");
            stars[i].style.color = "#FFB900";
            stars[i].parentElement.style.backgroundColor = "#FFFBEB";
            stary[i].classList.remove("d-none");

        } else {
            stars[i].classList.remove("fa-solid");
            stars[i].classList.add("fa-regular");
            stars[i].style.color = "";
            stars[i].parentElement.style.backgroundColor = "";
            stary[i].classList.add("d-none");
        }
    }
}
function updateemrUI() {
    let emrs = document.querySelectorAll(".emrenve");
    let emry = document.querySelectorAll(".emry");
    let Emergency = document.querySelectorAll(".Emergency");
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].emergency) {
            emrs[i].classList.remove("fa-regular");
            emrs[i].classList.add("fa-solid", "fa-heart-pulse");
            emrs[i].style.color = "#FF2056";
            emrs[i].parentElement.style.backgroundColor = "#FFE4E6";
            emry[i].classList.remove("d-none");
            Emergency[i].classList.remove("d-none");

        } else {
            emrs[i].classList.remove("fa-solid", "fa-heart-pulse");
            emrs[i].classList.add("fa-regular", "fa-heart");
            emrs[i].style.color = "";
            emrs[i].parentElement.style.backgroundColor = "";
            emry[i].classList.add("d-none");
            Emergency[i].classList.add("d-none");

        }
    }
}
function mahmoud(kkk, i) {
    let stary = kkk
        .closest(".container-contact")
        .querySelector(".stary");
    if (kkk.classList.contains("fa-regular")) {
        kkk.classList.remove("fa-regular");
        kkk.classList.add("fa-solid");
        kkk.style.color = "#FFB900";
        kkk.parentElement.style.backgroundColor = "#FFFBEB";

        stary.classList.remove("d-none");
        // j = i;
        arr[i].Favorites = true;

        l++;
        console.log(l);
    } else {
        kkk.classList.remove("fa-solid");
        // envestar.classList.remove("yuyu");

        kkk.classList.add("fa-regular");
        kkk.parentElement.style.backgroundColor = "";
        kkk.style.color = "";
        stary.classList.add("d-none");
        arr[i].Favorites = false;
        l--;
        console.log(l)
    }
    localStorage.setItem("persons", JSON.stringify(arr));

    favfunc();
    gettotal();
}

function jho(uuu, i) {
    let card = uuu.closest(".container-contact");

    let pulse = card.querySelector(".pulse");
    let emergency = card.querySelector("#Emergency");

    if (uuu.classList.contains("fa-regular")) {
        uuu.classList.remove("fa-regular");
        uuu.classList.add("fa-solid", "fa-heart-pulse");
        uuu.style.color = "#FF2056";
        uuu.parentElement.style.backgroundColor = "#FFE4E6";

        pulse.classList.remove("d-none");
        emergency.classList.remove("d-none");
        arr[i].emergency = true;
        k++;
    } else {
        uuu.classList.remove("fa-solid", "fa-heart-pulse");
        uuu.classList.add("fa-regular", "fa-heart");
        uuu.style.color = "";
        uuu.parentElement.style.backgroundColor = "";
        arr[i].emergency = false;

        pulse.classList.add("d-none");
        emergency.classList.add("d-none");
        k--;
    }
    localStorage.setItem("persons", JSON.stringify(arr));

    emrfunc();
    gettotal();
}
function edit(i) {
    FullName.value = arr[i].FullName;
    PhoneNumber.value = arr[i].PhoneNumber;
    EmailAddress.value = arr[i].EmailAddress;
    Address.value = arr[i].Address;
    Group.value = arr[i].Group;
    Favorites.checked = arr[i].Favorites;
    emergency.checked = arr[i].emergency;
    if (inputcontainer.classList.contains('d-none')) {
        inputcontainer.classList.remove('d-none');
        inputcontainer.classList.add('d-block');
        overlay.style.opacity = 1;
    }
    saveupdate.classList.remove('d-none');
    save.classList.add('d-none');
    upd = i;

}
function update() {
    if (
        !validate(FullName) ||
        !validate(PhoneNumber) ||
        !validate(EmailAddress) ||
        !numcheck() ||
        !numduplicate(PhoneNumber.value, upd) ||
        !checkname()
    ) {
        numduplicate(PhoneNumber.value)
        numcheck();
        checkname();
        return;
    }
    arr[upd]["FullName"] = FullName.value;
    arr[upd]["PhoneNumber"] = PhoneNumber.value;
    arr[upd]["EmailAddress"] = EmailAddress.value;
    arr[upd]["Address"] = Address.value;
    arr[upd]["Group"] = Group.value;
    arr[upd]["Favorites"] = Favorites.checked;
    arr[upd]["emergency"] = emergency.checked;
    arr[upd]["Notes"] = Notes.value;
    addproduct();
    updateStarsUI();
    updateemrUI();
    favfunc();
    emrfunc();
    gettotal();
    localStorage.setItem("persons", JSON.stringify(arr))

    saveupdate.classList.add('d-none');
    save.classList.remove('d-none');
    if (inputcontainer.classList.contains('d-block')) {
        inputcontainer.classList.remove('d-block');
        inputcontainer.classList.add('d-none');
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
    }

    clear();
}
function dele(i) {

    localStorage.setItem("persons", JSON.stringify(arr));
    Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete ew? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C62222",
        cancelButtonColor: "#606773",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {

            arr.splice(i, 1);

            addproduct();
            updateStarsUI();
            updateemrUI();
            favfunc();
            emrfunc();
            gettotal();

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });
}
function search(value) {
    let eggcontainer = '';
    for (let i = 0; i < arr.length; i++) {
        if (
            arr[i]["FullName"].toLowerCase().includes(value.toLowerCase()) ||
            arr[i]["EmailAddress"].toLowerCase().includes(value.toLowerCase()) ||
            arr[i]["PhoneNumber"].includes(value) ||
            arr[i]["Address"].toLowerCase().includes(value.toLowerCase())
        ) {
            eggcontainer += `

            <div class="col-xl-6">
                <div class="bg-white container-contact rounded-4 overflow-hidden ">
                <div class="emerg">
                    <div class="px-4 py-4">
                        <div class="d-flex align-items-center  justify-content-between pulsecontact">
                            <div class="m">M

                                <div id="pulse" class="pulse d-none"><i class="fa-solid fa-heart-pulse "></i></div>
                                <div id="stary" class="stary d-none"><i class="fa-solid fa-star "></i></div>
                            </div>
                            <div>
                                <span>${arr[i].FullName}</span>
                                <div class=" d-flex align-items-center">
                                    <span class="phone"><i class="fa-solid fa-phone" style="color: #155DFC;"></i></span>
                                    <span>${arr[i].PhoneNumber}     

                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <span class="envelope me-2">
                                <i class="fa-solid fa-envelope"></i>
                            </span>
                            <span class="" style="color: #6A7282;">
${arr[i].EmailAddress}     
                       </span>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <span class="location me-2">
                                <i class="fa-solid fa-location-dot"></i>
                            </span>
                            <span class="" style="color: #6A7282;">
                                ${arr[i].Address}     

                            </span>
                        </div>
                        <div class="mt-3  mb-0">
                            <span
                                style="color: #2A9764;background-color: #DBFCE7;border-radius: 10px; width: fit-content; padding:3px 10px;"> ${arr[i].Group}     
</span>
                            <span id="Emergency" class="d-none"
                                style="color: #EC003F;background-color: #FFF1F2;border-radius: 10px; width: fit-content; padding:3px 10px;"><i
                                    class="fa-solid fa-heart-pulse "></i> Emergency</span>
                        </div>
                    </div>
                    <div class="icons px-4 mt-0">
                        <div class=" py-3 d-flex justify-content-between align-items-center">
                            <div class="icins1 d-flex">
                                <a href="tel:${arr[i].PhoneNumber}">
                                    <span class="location me-2" style="padding: 18px;">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                </a>
                                <a href="">
                                    <span class="envelope me-2" style="padding: 18px;">
                                        <i class="fa-solid fa-envelope"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="d-flex">
                                <button id="enve-star" class="envelope1 env1 enve-star me-2"
                                    style="padding: 18px;border: none;">
                                    <i onclick=mahmoud(this) class="fa-regular fa-star "></i>
                                </button>
                                <button id="enve-heart" class="envelope1 env1 enve-heart me-2"
                                    style="padding: 18px;border: none;">
                                    <i  onclick=jho(this) class="fa-regular fa-heart "></i>
                                </button>
                                <button onclick=edit(${i}) class="envelope1 enve-pen env2 me-2" style="padding: 18px;border: none;">

                                    <i class="fa-solid fa-pen"></i>

                                </button>
                                <button onclick="dele(${i})" class="envelope1 enve-trash env2 me-2" style="padding: 18px;border: none;">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
            
        </div>
        </div>

        `
        }


    }
    if (eggcontainer == '') {
        Nocontacts.innerHTML = `  <div class="py-20 text-center " id="hamoksha">
                                    <div>
                                        <div class="align-items-center justify-content-center d-flex">
                                            <div class="book ">
                                                <i class="fa-solid fa-address-book fs-2" style="color: #D1D5DC;"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="d-block fs-5" style="color: #6A7282;">No contacts found</span>
                                            <span style="color: #9FA7B4;font-size: 14px;">Click "Add Contact" to get
                                                started</span>
                                        </div>
                                    </div>
                                </div>`;
    } else {

        Nocontacts.innerHTML = eggcontainer;
    }
}
function gettotal() {
    let eltot = '';
    let organizes = '';
    eltot = `<span class="fw-bold fs-4">${arr.length}</span>`
    organizes = `<span class="fs-6 mt-0" style="color: #7D7292;">Manage and organize
                                    your ${arr.length} contacts</span>`
    toty.innerHTML = eltot;
    organize.innerHTML = organizes;
    if (k == 0 && l == 0) {

        toty.innerHTML = `<span class="fw-bold fs-4">0</span>`;
        organize.innerHTML = `<span class="fs-6 mt-0" style="color: #7D7292;">Manage and organize
                                    your 0 contacts</span>`;

    }
}
gettotal();
function clear() {
    FullName.value = "";
    PhoneNumber.value = "";
    EmailAddress.value = "";
    Address.value = "";
    Group.value = "";
    Favorites.checked = "";
    emergency.checked = "";
    Notes.value = "";
}
function numcheck() {
    if (PhoneNumber.value == "") {
        Swal.fire({
            icon: "warning",
            title: "Missing Phone",
            text: "Please enter a phone number!"
        });
        return false;
    }
    return true;

}
function numduplicate(value, currentIndex = -1) {
    for (let i = 0; i < arr.length; i++) {

        if (i === currentIndex) {
            continue;
        }

        if (arr[i].PhoneNumber === value) {
            Swal.fire({
                icon: "warning",
                title: "Duplicate Phone Number",
                text: `A contact with this phone number already exists: ${arr[i].FullName}`
            });

            return false;
        }
    }

    return true;
}
function checkname() {
    if (FullName.value == "") {
        Swal.fire({
            icon: "warning",
            title: "Missing Name",
            text: "Please enter a name for the contact!"
        });
        return false;
    }
    return true;
}