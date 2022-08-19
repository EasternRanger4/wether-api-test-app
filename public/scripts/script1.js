function setup() {
    noCanvas();
    //window.video = createCapture(VIDEO);
    //video.size(320, 240);
    if ("geolocation" in navigator) {
        console.log("Geolocation Avalible")
        navigator.geolocation.getCurrentPosition(async position => {
            console.log(position);
            const lon =  position.coords.longitude;
            const lat = position.coords.latitude ;
            document.getElementById("lat").innerHTML= position.coords.latitude;
            document.getElementById("lon").innerHTML= position.coords.longitude;
        });
    } else {
        console.log("geolocation not avalibal")
    }
}
function myFunc() {
    const name = document.getElementById("name").value;
    console.log(name)
    if ("geolocation" in navigator) {
        console.log("Geolocation Avalible")
        navigator.geolocation.getCurrentPosition(async position => {
            console.log(position);
            //video.loadPixels();
            //const image64 = video.canvas.toDataURL("image/jpg");
            //console.log(image64);
            const lon =  position.coords.longitude;
            const lat = position.coords.latitude ;
            document.getElementById("lat").textContent= position.coords.latitude;
            document.getElementById("lon").textContent= position.coords.longitude;

            const data = {lat , lon, name}; 
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(data),  
            }
            const response = await fetch("/api", options);
            const responseData = await response.json();
            console.log(responseData)
            const temp = `Curent temperature: ${responseData.CurentTemp}° <br> <br>`
            document.getElementById("temp").innerHTML= temp;
            console.log("Thank you! We have sucsesfly taken your data :)");

        });
    } else {
        console.log("geolocation not avalibal")
    }
}