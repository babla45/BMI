// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the real-time toggle
    const realtimeToggle = document.getElementById('realtime-toggle');
    const realtimeIndicator = document.getElementById('realtime-indicator');
    const allInputs = document.querySelectorAll('.bmi-input');
    
    realtimeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Enable real-time calculation
            realtimeIndicator.classList.remove('hidden');
            allInputs.forEach(input => {
                input.addEventListener('input', calculateBMI);
            });
        } else {
            // Disable real-time calculation
            realtimeIndicator.classList.add('hidden');
            allInputs.forEach(input => {
                input.removeEventListener('input', calculateBMI);
            });
        }
    });
});

function calculateBMI() {
    // This function extracts the calculation logic from submit_button_click
    // so it can be reused for both button click and real-time calculation
    var intHeight=parseFloat(document.getElementById("intHeight").value);
    var fractionHeight=parseFloat(document.getElementById("fractionHeight").value);
    var intWeight=parseFloat(document.getElementById("intWeight").value);
    var fractionWeight=parseFloat(document.getElementById("fractionWeight").value);
    
    var dropdown=document.getElementById("intHeightMenu");
    var intHeightMenu=dropdown.options[dropdown.selectedIndex].text;

    dropdown=document.getElementById("fractionHeightMenu");
    var fractionHeightMenu=dropdown.options[dropdown.selectedIndex].text;

    dropdown=document.getElementById("intWeightMenu");
    var intWeightMenu=dropdown.options[dropdown.selectedIndex].text;

    dropdown=document.getElementById("fractionWeightMenu");
    var fractionWeightMenu=dropdown.options[dropdown.selectedIndex].text;

    document.getElementById("result").textContent="You are: "+intHeight+" "+intHeightMenu+" "+fractionHeight+" "+fractionHeightMenu+" "+intWeight+" "+intWeightMenu+" and "+fractionWeight+" "+fractionWeightMenu;

    
    if(intHeightMenu=="Feet")      intHeight=intHeight*0.3048;
    if(intHeightMenu=="Inch")      intHeight=intHeight*0.0254;
    if(intHeightMenu=="Centimeter")     intHeight=intHeight*0.01;
    
    if(fractionHeightMenu=="Feet")  {fractionHeight=fractionHeight*0.3048;}
    if(fractionHeightMenu=="Inch")  {fractionHeight=fractionHeight*0.0254;}
    if(fractionHeightMenu=="Centimeter")  {fractionHeight=fractionHeight*0.01;}
    
    if(intWeightMenu=="Gram")           intWeight=intWeight*0.001;
    if(intWeightMenu=="Pound")           intWeight=intWeight*0.453592;
    
    if(fractionWeightMenu=="Gram")    fractionWeight=fractionWeight*0.001;
    if(fractionWeightMenu=="Pound")   fractionWeight=fractionWeight*0.453592;
    
    var weight=intWeight+fractionWeight;
    var height=intHeight+fractionHeight;

    var bmi=weight/(height*height);
    bmi=Math.ceil(bmi*100)/100;

    if(!isNaN(bmi) && height!=0.0){
        document.getElementById("indicator").classList.remove('hidden');
        document.getElementById("indicator").classList.add('block');
        document.getElementById("bmi").textContent="Your BMI is = "+bmi;
        document.getElementById("refresh").classList.remove('hidden');
    }
    else{
        document.getElementById("indicator").classList.add('hidden');
        document.getElementById("result").textContent="Please enter correct values for height and weight";
    }

    // Reset all BMI category styles
    document.getElementById("underweight").className = "p-3 rounded-md text-white bg-black transition-colors";
    document.getElementById("normal").className = "p-3 rounded-md text-white bg-black transition-colors";
    document.getElementById("overweight").className = "p-3 rounded-md text-white bg-black transition-colors";
    document.getElementById("obese").className = "p-3 rounded-md text-white bg-black transition-colors";

    // Highlight the appropriate BMI category
    if(bmi<=18.5)
    {
        document.getElementById("underweight").className = "p-3 rounded-md text-black bg-pink-500 transition-colors";
    }
    else if(bmi<=24.9)
    {
        document.getElementById("normal").className = "p-3 rounded-md text-black bg-pink-500 transition-colors";
    }
    else if(bmi<=29.9)
    {        
        document.getElementById("overweight").className = "p-3 rounded-md text-black bg-pink-500 transition-colors";
    }
    else
    {
        document.getElementById("obese").className = "p-3 rounded-md text-black bg-pink-500 transition-colors";
    }
}

function submit_button_click(){
    // Use the shared calculation function
    calculateBMI();
}

function refreshPage(){
    location.reload();
    document.getElementById("refresh").classList.add('hidden');
}