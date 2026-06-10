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
            // Calculate initially if checked by default
            calculateBMI();
        } else {
            // Disable real-time calculation
            realtimeIndicator.classList.add('hidden');
            allInputs.forEach(input => {
                input.removeEventListener('input', calculateBMI);
            });
        }
    });

    // Initialize state based on the default checked property
    if (realtimeToggle.checked) {
        // Trigger the change event to setup listeners
        realtimeToggle.dispatchEvent(new Event('change'));
    }
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

    if(!isNaN(bmi) && height>0.0){
        document.getElementById("indicator").classList.remove('hidden');
        document.getElementById("indicator").classList.add('block');
        document.getElementById("bmi").textContent="Your BMI is = "+bmi;
        document.getElementById("refresh").classList.remove('hidden');
        
        // Calculate weight ranges in kg
        var formatW = (kgValue) => {
            return (kgValue).toFixed(1) + " kg (" + (kgValue * 2.20462).toFixed(1) + " lbs)";
        };
        
        document.getElementById("range-underweight").textContent = "< " + formatW(18.5 * height * height);
        document.getElementById("range-normal").textContent = formatW(18.5 * height * height) + " - " + formatW(25.0 * height * height);
        document.getElementById("range-overweight").textContent = formatW(25.0 * height * height) + " - " + formatW(30.0 * height * height);
        document.getElementById("range-obese").textContent = "≥ " + formatW(30.0 * height * height);
        
    }
    else{
        document.getElementById("indicator").classList.remove('block');
        document.getElementById("indicator").classList.add('hidden');
        document.getElementById("result").textContent="Please enter correct values for height and weight";
        return; // exit early since height is invalid
    }

    var baseClass = "p-3 roundedmd transition-colors flex justify-between items-center sm:flex-row flex-col";
    
    // Reset all BMI category styles
    document.getElementById("underweight").className = baseClass + " text-white bg-black";
    document.getElementById("normal").className = baseClass + " text-white bg-black";
    document.getElementById("overweight").className = baseClass + " text-white bg-black";
    document.getElementById("obese").className = baseClass + " text-white bg-black";

    var tipsText = "";

    // Highlight the appropriate BMI category and set tips
    if(bmi<18.5)
    {
        document.getElementById("underweight").className = baseClass + " text-red-200 bg-green-600 text-lg font-bold";
        tipsText = "You are underweight. Consider eating more nutrient-dense foods, increasing your intake of healthy fats, proteins, and complex carbohydrates. Consult a doctor or a nutritionist for a healthy weight gain plan.";
    }
    else if(bmi<=24.9)
    {
        document.getElementById("normal").className = baseClass + " text-red-200 bg-green-600 text-lg font-bold";
        tipsText = "Great job! You have a healthy weight. Maintain your lifestyle with a balanced diet and regular physical activity to keep your BMI in the normal range.";
    }
    else if(bmi<=29.9)
    {        
        document.getElementById("overweight").className = baseClass + " text-red-200 bg-green-600 text-lg font-bold";
        tipsText = "You are slightly overweight. Incorporating more physical activity, like walking or jogging, along with portion control and a diet rich in vegetables, fruits, and lean proteins can help you achieve a normal weight.";
    }
    else
    {
        document.getElementById("obese").className = baseClass + " text-red-200 bg-green-600 text-lg font-bold";
        tipsText = "Your BMI indicates obesity. It's highly recommended to consult with a healthcare provider or a dietitian to create a sustainable and personalized weight loss plan involving diet and regular exercise.";
    }
    
    document.getElementById("tips").textContent = tipsText;
}

function submit_button_click(){
    // Use the shared calculation function
    calculateBMI();
}

function refreshPage(){
    location.reload();
    document.getElementById("refresh").classList.add('hidden');
}