// CODE STARTS FROM HeRe

console.log("Hey");


//-----------------------------------------------------------------------------------Selecting Elements

// Home Page Section

let Input_URL = document.body.querySelector("#URL_Input");
let Expiry_Value = document.body.querySelector(".Select_Options");
let QR_Generate_Button = document.body.querySelector("#Generate_Btn");

//--------------------------- Pop-up Page Section

// Open/Close Button

let History_Button = document.body.querySelector("#History_Btn");
let Close_Button = document.body.querySelector("#Close_Button");

// Other Pop-Up Elements

let Pop_Up_Page = document.body.querySelector(".Pop-Up_Section");

//---------------------------- QR Code Scetion

let QR_Code = document.body.querySelector(".QrCode");
let QR_Download_Button = document.body.querySelector("#Qr_Download_Button");
let Main_QR_Box = document.body.querySelector(".Main_QR_Box");
let Display_QR_Code_Container = document.body.querySelector(".Display_QR_Code_Container");










//-----------------------------------------------------------------------------------Generating QR Code

QR_Generate_Button.addEventListener("click", function () {

    let URL = Input_URL.value;

    if (!URL) {
        alert("Please Enter Valid URL")
        return;
    }
    QR_Code.innerHTML = "";

    let Dyanmic_QR_Code = new QRCode(QR_Code, {
        text: URL,
        width: 200,
        height: 200,
    });

    function Dyanmic_QR_Code_Downloader() {
        let Canvas = QR_Code.querySelector("canvas")
        if (Canvas) {
            QR_Download_Button.href = Canvas.toDataURL("");
            QR_Download_Button.download = "QR_Code.jpg";
        }
    }
    Dyanmic_QR_Code_Downloader();



    Display_QR_Code_Container.style.display = "flex";
    Main_QR_Box.style.gap = "1.5vh";
    Main_QR_Box.style.height = "95vh";

})










//-----------------------------------------------------------------------------------Event Listener for Pop-Up Page

// Opening Pop-up page

History_Button.addEventListener("click", function () {
    Pop_Up_Page.style.display = "flex";
})

// Closing Pop-up page

Close_Button.addEventListener("click", function () {
    Pop_Up_Page.style.display = "none";
})

