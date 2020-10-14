function getPlots(id) {
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'green'},
                type:"bar",
                orientation: "h",
            };
            var data = [trace];
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
        Plotly.newPlot("bar", data, layout);
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
            var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_2); 
        });
    }  

    function getDemoInfo(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            console.log(metadata)
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");
           demographicInfo.html("");
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }

    function init() {
        var dropdown = d3.select("#selDataset");
        d3.json("samples.json").then((data)=> {
            console.log(data)
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    init();
