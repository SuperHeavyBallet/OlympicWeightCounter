document.addEventListener("DOMContentLoaded", function() {

    let allDiscs;
    let allDiscsArray;
    GetDiscElements();

    allDiscsArray.forEach((disc) => {
        console.log(disc.value);
        disc.addEventListener(("click"), (e) => 
        {
            console.log("Clicked: " + disc.value);
            AddWeightToBar(disc.value, disc.id);
        })
    });

    let weightDisplay = document.getElementById("weight-display");

    let weightOuput = document.getElementById("weight-output");
    let currentTotalWeight = 0;
    let barWeight = 20;
    let finalTotalWeightKG = 0;
    let finalTotalWeightLBS = 0;

        let barbellWeightColour = document.getElementById("barbell-weight-colour");
    let barbellSelector = document.getElementById("barbell-select");
    barbellSelector.addEventListener("click", (e) =>
    {
        SwitchBarbellType();
    })

    UpdateTotalWeightDisplay();

    function SwitchBarbellType()
    {
        if(barWeight == 20)
        {
            barWeight = 15;
            barbellSelector.textContent = "Bar: Female 15kg"
            barbellWeightColour.classList.remove("yellow");
            barbellWeightColour.classList.remove("blue");
            barbellWeightColour.classList.add("yellow");
        }
        else{
            barWeight = 20;
            barbellSelector.textContent = "Bar: Male 20kg"
            barbellWeightColour.classList.remove("yellow");
            barbellWeightColour.classList.remove("blue");
 
            barbellWeightColour.classList.add("blue");
        }
        
        UpdateTotalWeightDisplay();
    }




    function GetDiscElements()
    {
        allDiscs = document.getElementsByClassName("weight-disc");
        allDiscsArray = Array.from(allDiscs);
    }

    function AddWeightToBar(weightAmount, elementID)
    {
        console.log(elementID);
        let newWeight = document.createElement("div");
        newWeight.value = weightAmount;
        newWeight.classList.add("new-weight");
        let weightClass = toString(weightAmount);
        newWeight.classList.add(weightAmount);
        let weightColourClass = "";

        if(elementID != "collar")
        {
            if(weightAmount == "25" || weightAmount == "2.5")
            {
                weightColourClass = "red";
            }
            else if( weightAmount == "20" || weightAmount == "2")
            {
                weightColourClass = "blue";
            }
            else if (weightAmount == "15" || weightAmount == "1.5")
            {
                weightColourClass = "yellow";
            }
            else if (weightAmount == "10" || weightAmount == "1")
            {
                weightColourClass = "green";
            }
            else if (weightAmount == "5" || weightAmount == "0.5")
            {
                weightColourClass = "white";
            }

          
        }
        else{
            weightColourClass = "collar";
        }
     
        if (weightColourClass) {
            newWeight.classList.add(weightColourClass);
          }

          if(parseFloat(weightAmount) < 5)
          {
              newWeight.classList.add("small");
          }
          else if (parseFloat(weightAmount) == 5)
          {
            newWeight.classList.add("five-kg")
          }
          else{
            newWeight.classList.add("big");
          }
     

       AddRemoveOnClick(newWeight);

        weightDisplay.appendChild(newWeight);

        currentTotalWeight += parseFloat(weightAmount);
        UpdateTotalWeightDisplay();

    }

    function AddRemoveOnClick(element)
    {
        element.addEventListener("click" , (e) =>
        {
            e.target.remove();
            currentTotalWeight -= parseFloat(e.target.value);
            UpdateTotalWeightDisplay();

        })
    }

    function UpdateTotalWeightDisplay()
    {
        finalTotalWeightKG = barWeight + (currentTotalWeight *2);
        finalTotalWeightLBS = ((barWeight + (currentTotalWeight *2)) * 2.2).toFixed(0);

        weightOuput.textContent = finalTotalWeightKG  + " kg / " + finalTotalWeightLBS + " lbs";
        console.log("Total Weight: " + finalTotalWeightLBS  );
    }

});