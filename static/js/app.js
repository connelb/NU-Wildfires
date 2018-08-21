function myFilter (){


}



function buildMetadata(sample) {

 

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`

  // Use `.html("") to clear any existing metadata

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  // @TODO: Build a Bubble Chart using the sample data

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  //var selector = d3.select("#selDataset");

  //console.log('init was called');

  // Use the list of sample names to populate the select options
  //d3.json("/firedata").then((data) => {

  // var newtry = "/firedata"

  // d3.json(newtry, function(data){

  //  console.log(data);
  // })


  //     d3.queue()
  //     .defer(d3.json, 'map.json')
  //     .defer(d3.json, "https://d3js.org/us-10m.v1.json")
  //     //.defer(d3.json,"/firedata")
  //     //.defer(d3.csv, "unemployment.csv", function(d) { unemployment.set(d.id, +d.rate); })
  //     //.defer(d3.csv, "unemployment.csv", function(d) { unemployment.set(d.id, +d.FIRE_SIZE); })
  //     .await(ready);

  // function ready(error, us) {
  //     console.log('test',us);
  //     //FIRE_YEAR === '2015'
  //   if (error) throw error;
  // }

  //   d3.json('/firedata',data=>{
  //   console.log('the data is', data)

  //   // Use the first sample from the list to build the initial plots
  //   //const firstSample = sampleNames[0];
  //   // buildCharts(firstSample);
  //   // buildMetadata(firstSample);
  // });



  //########################
  // forked from Mike Bostock ///
  //https://www2.census.gov/geo/docs/reference/codes/national_county.txt
  //https://gist.github.com/mbostock/4090846#file-us-state-names-tsv
  //https://gist.github.com/4090846#file-us-county-names-tsv

  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  var unemployment = d3.map();

  var path = d3.geoPath();

  var x = d3.scaleLinear()
    .domain([1, 10])
    .rangeRound([600, 860]);

  var color = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeBlues[9]);

  var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

  g.selectAll("rect")
    .data(color.range().map(function (d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
    .enter().append("rect")
    .attr("height", 8)
    .attr("x", function (d) { return x(d[0]); })
    .attr("width", function (d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function (d) { return color(d[0]); });

  g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Unemployment rate");

  g.call(d3.axisBottom(x)
    .tickSize(13)
    .tickFormat(function (x, i) { return i ? x : x + "%"; })
    .tickValues(color.domain()))
    .select(".domain")
    .remove();

  //.defer(d3.json, "https://d3js.org/us-10m.v1.json")
  d3.queue()
    //.defer(d3.json, "map.json")
    //.defer(d3.json,"/firedata")
    .defer(d3.csv, "unemployment.csv", function(d) { unemployment.set(d.id, +d.rate); })
    //.defer(d3.csv, "unemployment.csv", function(d) { unemployment.set(d.id, +d.FIRE_SIZE); })
    .defer(d3.tsv,'https://gist.github.com/mbostock/4090846#file-us-state-names-tsv')
    .await(ready);

    function ready(error, us) {
      console.log('test',us);
      //FIRE_YEAR === '2015'
    if (error) throw error;

    }

  //var newtry = "/firedata"

  //console.log('does this work??')

  d3.json("/firedata", function (us) {

    console.log('test', us);

    // d3.queue()
    // //.defer(d3.json, "map.json")
    // //.defer(d3.json,"/firedata")
    // .defer(d3.csv, "unemployment.csv", function(d) { unemployment.set(d.id, +d.rate); })
    // //.defer(d3.csv, "unemployment.csv", function(d) { unemployment.set(d.id, +d.FIRE_SIZE); })
    // .defer(d3.tsv,'https://gist.github.com/mbostock/4090846#file-us-state-names-tsv')
    // .await(ready);

    // function ready(error, usData) {
    //   console.log('test',usData);
    //   //FIRE_YEAR === '2015'
    // if (error) throw error;
    
    // }
    //FIRE_YEAR === '2015' size
    //if (error) throw error;

    // svg.append("g")
    // .selectAll('p')
    // .data(us)
    // .enter()
    // .append('p')

    //   svg.append("g")
    //       .attr("class", "counties")
    //     .selectAll("path")
    //     .data(topojson.feature(us, us.objects.counties).features)
    //     .enter().append("path")
    //       .attr("fill", function(d) { return color(d.rate = unemployment.get(d.id)); })
    //       .attr("d", path)
    //     .append("title")
    //       .text(function(d) { return d.rate + "%"; });

    //   svg.append("path")
    //       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    //       .attr("class", "states")
    //       .attr("d", path);


    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("fill", function (d) { return color(d.rate = unemployment.get(d.id)); })
      .attr("d", path);

    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })));
  })
}


// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }


function init2(){
  console.log('hi there')

var newtry = '/firedata'
// d3.json(newtry , function(d){

//   console.log('ddddddd',data);

//   // svg.append("g")
//   //     .attr("class", "states")
//   //     .selectAll("path")
//   //     .data(data)
//   //     .enter().append("path");

//   //filter by

//   // state
//   // year
//   // cause


// })

d3.json(newtry, data=>{

  console.log('length?',data.length);
 
  for (var i = 0; i < data.length; i++) {
    //var location = data[i];
    console.log(data[i]);
  }
 
 });
}

// Initialize the dashboard
//init();
init2();
