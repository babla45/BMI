
function submit_button_click(){

    
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

    console.log("height="+intHeight+"\n");
    console.log("fh="+fractionHeight);

    var bmi=weight/(height*height);
    bmi=Math.ceil(bmi*100)/100;

    if(!isNaN(bmi) && height!=0.0){
        document.getElementById("result").style.display='block';
        document.getElementById("bmi").textContent="Your BMI = "+bmi;
    }
    else{
        document.getElementById("result").style.display='none';
        document.getElementById("bmi").textContent="Please enter correct values for height and weight";
    }

}