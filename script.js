// CODE STARTS FROM HeRe

console.log("Hey");











//-----------------------------------------------------------------------------------Selecting Elements

// Home Page Section

let Input_URL = document.body.querySelector("#URL_Input");
let Expiry_Select = document.body.querySelector("#Select_Expiry");
let QR_Generate_Button = document.body.querySelector("#Generate_Btn");

//--------------------------- Pop-up Page Section

// Open/Close Button

let History_Button = document.body.querySelector("#History_Btn");
let Close_Button = document.body.querySelector("#Close_Button");

// Other Pop-Up Elements

let Pop_Up_Page = document.body.querySelector(".Pop-Up_Section");
let QR_Code_History_Names = document.body.querySelector(".QR_History_Codes");

//---------------------------- QR Code Scetion

let QR_Code = document.body.querySelector(".QrCode");
let QR_Download_Button = document.body.querySelector("#Qr_Download_Button");
let Main_QR_Box = document.body.querySelector(".Main_QR_Box");
let Display_QR_Code_Container = document.body.querySelector(".Display_QR_Code_Container");











//-----------------------------------------------------------------------------------Saving QR Data to LocalStorage

//Saving QR Code

function Save_QR_Data_to_LS(url, base64, expiry) {
    let CurrentTime = Date.now();
    let ExpiryTime = "";

    console.log(expiry)

    if (expiry === "lifetime") {
        ExpiryTime = null;
    } else if (expiry === 1) {
        ExpiryTime = CurrentTime + 60000; // 1 minute
    } else if (expiry === 10) {
        ExpiryTime = CurrentTime + 600000; // 10 minutes
    } else if (expiry === 60) {
        ExpiryTime = CurrentTime + 3600000; // 1 hour
    } else if (expiry === 1440) {
        ExpiryTime = CurrentTime + 86400000; // 1 day
    } else if (expiry === 10080) {
        ExpiryTime = CurrentTime + 604800000; // 1 week
    } else {
        alert("Invalid expiry time.");
        console.log("Invalid expiry:" + expiry);
        return;
    }


    let New_Entry = {
        URL: url,
        base64: base64,
        expiry: ExpiryTime,
    };


    let QR_History = JSON.parse(localStorage.getItem("QR_History"));
    if (!QR_History) {
        QR_History = [];
    }

    QR_History.push(New_Entry);
    localStorage.setItem("QR_History", JSON.stringify(QR_History));
}



//Loading QR Code to History

function Load_QR_Data_from_LS() {

    let CurrentTime = Date.now();

    let QR_History = JSON.parse(localStorage.getItem("QR_History"));

    if (!QR_History) {
        QR_History = [];
    }


    let Valid_QR_History = [];

    for (let index = 0; index < QR_History.length; index++) {
        const Entry = QR_History[index];

        if (Entry.expiry === null || Entry.expiry > CurrentTime) {
            Valid_QR_History.push(Entry);
        }

    }

    localStorage.setItem("QR_History", JSON.stringify(Valid_QR_History))
    return Valid_QR_History;

}



//Getting QR Code from History

function Get_QR_Data_from_LS(QR_History) {

    QR_Code_History_Names.innerHTML = "";

    if (QR_History.length === 0) {
        QR_Code_History_Names.innerHTML = "No QR Codes Found";
        QR_Code_History_Names.style.fontFamily="Arial"
        return;
    }

    for (let index = 0; index < QR_History.length; index++) {
        const Entry = QR_History[index];

        let History_QR_Code_A = document.createElement("div");
        History_QR_Code_A.className = "History_QR_Code_A";

        History_QR_Code_A.innerHTML =

            `<div class="QR_Code_List">

            <a download=${Entry.URL}.jpg href=${Entry.base64} style=
                "font-family: Arial;
                font-size: 14px;
                color: rgb(206, 206, 206);
                outiline: none;
                text-decoration:none;
                position: relative;
                left: 10px;
                width: 322px;
                text-overflow: ellipsis;
                overflow: hidden;"
                >${Entry.URL}</a>

            </div>
            
            <div class="QR_Code_Remove_Button">

            <span class="QR_Remove_Btn" data-index="${index}">  

            &times;
            
            </span>

            </div>`;

        QR_Code_History_Names.appendChild(History_QR_Code_A);
    }



}



//Delete QR History Entry Function

function Delete_QR_History_Entry(index) {
    let QR_History = Load_QR_Data_from_LS();
    QR_History.splice(index, 1);
    localStorage.setItem("QR_History", JSON.stringify(QR_History));

    Get_QR_Data_from_LS(Load_QR_Data_from_LS());
}


QR_Code_History_Names.addEventListener("click", function (event) {
    if (event.target.classList.contains("QR_Remove_Btn")) {
        const index = parseInt(event.target.dataset.index, 10);
        Delete_QR_History_Entry(index);
        // Get_QR_Data_from_LS(Load_QR_Data_from_LS());
    }
});











//-----------------------------------------------------------------------------------Generating QR Code

function QR_Code_Generator(url, expiry) {
    QR_Code.innerHTML = "";

    let Dyanmic_QR_Code = new QRCode(QR_Code, {
        text: url,
        width: 200,
        height: 200,
    });

    let Canvas = QR_Code.querySelector("canvas")
    if (Canvas) {
        let base64 = Canvas.toDataURL();
        QR_Download_Button.href = base64;
        // QR_Download_Button.download = "QR_Code.jpg";

        Save_QR_Data_to_LS(url, base64, expiry);
    }

}











//-----------------------------------------------------------------------------------QR Generate Button Event Listener

QR_Generate_Button.addEventListener("click", function () {

    let URL = Input_URL.value;
    let Expiry_Value = Expiry_Select.value;

    let Expiry_in_Minute = "";

    if (!URL) {
        alert("Please Enter Valid URL")
        return;
    }

    if (Expiry_Value === "lifetime") {
        Expiry_in_Minute = "lifetime";
    }
    else {
        Expiry_in_Minute = parseInt(Expiry_Value, 10);
    }

    QR_Code_Generator(URL, Expiry_in_Minute);

    Display_QR_Code_Container.style.display = "flex";
    Main_QR_Box.style.gap = "1.5vh";
    Main_QR_Box.style.height = "95vh";

})











//-----------------------------------------------------------------------------------Event Listener for Pop-Up Page


// Opening Pop-up page

History_Button.addEventListener("click", function () {
    Pop_Up_Page.style.display = "flex";
    let QR_History = Load_QR_Data_from_LS();
    // Get_QR_Data_from_LS(QR_History);
    let CurrentTime = Date.now(); // Get the current time

    // Filter out expired QR codes
    let Valid_QR_History = QR_History.filter(entry =>
        entry.expiry === null || entry.expiry > CurrentTime
    );

    Get_QR_Data_from_LS(Valid_QR_History);
})


// Closing Pop-up page

Close_Button.addEventListener("click", function () {
    Pop_Up_Page.style.display = "none";
})











//----------------------------------------CODE ENDs HERE----------------------------------------