console.log('starting plotting...');
    
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init(){
    // code that runs once (only on page load or refresh)
    const dataFromURL = d3.json(url);
    console.log("Promised Data From URL: ", dataFromURL);
    let dropdown = document.getElementById('selDataset');

    // this checks that our initial function runs.
    console.log("The Init() function ran")

    // create dropdown/select fields
    d3.json(url).then(function(data){
        console.log(data)
        for (let v = 0; v < data.names.length; v++) {
            option = document.createElement('option');
            option.text = data.names[v];
            dropdown.appendChild(option);
          }
    })

}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json(url).then(function(data){
        let demos = " ";
        let summary = document.getElementById("sample-metadata")
        idType = Number(id)
        for(let v = 0; v < data.metadata.length; v++){
            let Data3 = data.metadata[v]
            if(idType === Data3.id){
                for(let [key,value] of Object.entries(Data3)){
                    demos += key + " : " + value + " <br> "
                }
            }
        };
        summary.innerHTML = demos;
    });
    // checking to see if function is running
    console.log(`This function generates summary of ${id} `)
}

function createScatter(id){
    // code that makes scatter plot at id='bubble'
    let otuCols = [];
    let otuLbls = [];
    let sampleVals = [];
    let otu_IDs =[];
    d3.json(url).then(function(data){
        for (let v = 0; v < data.samples.length; v++){
            if(id === data.samples[v].id){
                for(let a =0; a < data.samples[v].sample_values.length; a++){
                    otu_IDs.push(data.samples[v].otu_ids[a])
                    otuCols.push(data.samples[v].otu_ids[a])
                    sampleVals.push(data.samples[v].sample_values[a])
                    otuLbls.push(data.samples[v].otu_labels[a])
                }
            }
        }

        let Data1 = [
            {
            x:otu_IDs,
            y:sampleVals,
            mode:'markers',
            marker: {size:sampleVals, color:otuCols},
            text:otuLbls
            }
        ];
        let layout = {title: "Bellybutton Bubble Chart"};
        Plotly.newPlot("bubble", Data1, layout)
        })

    // checking to see if function is running
    console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
    // code that makes bar chart at id='bar'
    let x = [];
    let y = [];
    let hoverText = [];
    d3.json(url).then(function(data){
    for(let v = 0; v < data.samples.length; v++){
        if(id === data.samples[v].id){
            for(let a = 0; a < 10; a++){
                y.push(data.samples[v].otu_ids[a]);
                x.push(data.samples[v].sample_values[a]);
                hoverText.push(data.samples[v].otu_labels[a]);
            }
        }
    }
    for(let v = 0; v < y.length; v++){
        y[v] = "OTU-"+y[v] 
    }
 
    let Data2 = [
        {
        x:x,
        y:y,
        mode:'markers',
        marker: {size:15},
        text:hoverText,
        type: 'bar',
        orientation: 'h'
        }
    ];
    let layout = {title: "Bellybutton Bar Chart"};
    Plotly.newPlot("bar", Data2, layout)
    })
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)
}

function createGauge(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json(url).then(function(data){
        let demos = "";
        let summary = document.getElementById("sample-metadata")
        idType = Number(id)
        for(let v = 0; v < data.metadata.length; v++){
            let Data3 = data.metadata[v]
            if(idType === Data3.id){
                for(let [key,value] of Object.entries(Data3)){
                    demos += key + ":" + value + "<br>"
                }
            }
        };
        summary.innerHTML = demos;
    });
// checking to see if function is running
console.log(`This function generates gauge chart of ${id} `)
}

    // run functions to generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')


// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    createScatter(newID)
    createBar(newID)
    createSummary(newID)

   
}

// function called, runs init instructions
// runs only on load and refresh of browser page
init()

console.log('done plotting...');