let variable = 0;

// Initilized the check box json and paramiter what to do on click -------> 
document.getElementById('paramiterdiv1').style.display = "none";
document.getElementById('paramiterdiv2').style.display = "none";
document.getElementById('plus').style.display = "none";

let json = document.getElementById('json').addEventListener('click', () => {
    document.getElementById('jsondiv1').style.display = "block";
    document.getElementById('jsondiv2').style.display = "block";
    document.getElementById('paramiterdiv1').style.display = "none";
    document.getElementById('plus').style.display = "none";
    document.getElementById('paramiterdiv2').style.display = "none";
})

let params = document.getElementById('params').addEventListener('click', () => {
    document.getElementById('paramiterdiv1').style.display = "block";
    document.getElementById('paramiterdiv2').style.display = "block";
    document.getElementById('jsondiv1').style.display = "none";
    document.getElementById('jsondiv2').style.display = "none";
    document.getElementById('plus').style.display = "block";
})

// making the function for string 
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild;
}

// What happen when user click on the plus btn 
let plus = document.getElementById('plus').addEventListener('click', () => {
    let main = document.getElementById('main');
    let string = `<div class="mb-3 row paramitem"  >
                        <label for="inputPassword" class="col-sm-2 col-form-label" id="paramiterdiv${variable + 2}">paramiter${variable + 2}</label>
                        <div class="col-sm-10" id="paramiterdiv2">
                            <div class="row g-3 my-" >
                                <div class="col" >
                                    <input type="text" class="form-control" id="parameterKey${variable + 2}"placeholder=" Enter paramiter key ${variable + 2} ">
                                </div>
                                <div class="col" >
                                    <input type="text" class="form-control" id="parameterValue${variable + 2}" placeholder="Enter paramiter vlaue ${variable + 2}">
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary  deleteparam"   >-</button>
                                </div>             
                            </div>
                        </div>
                    </div>`
    
    // Append Child
    let element = getElementFromString(string);
    main.appendChild(element); 

    // delete child Element from dom 
    let deleteparam = document.getElementsByClassName('deleteparam'); for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
    })}
    variable++
})

// what to do on clicking the btn ---------->
let btn = document.getElementById('btn').addEventListener('click', () => {

    // geting the element from dom 
    let data = document.getElementById('jesontext').value;
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    let finaldiv = document.getElementById('finaldiv');

    // If user has used params option instead of json, collect all the parameters in an object 
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jesontext').value;
    }

    //statements of request get and post  
    if (requestType == "GET") {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                finaldiv.innerHTML = text;
            });
    }
    else {
        fetch(url, {
            body: data,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.text())
            .then((text) => {
                finaldiv.innerHTML = text;
            });
    }
})