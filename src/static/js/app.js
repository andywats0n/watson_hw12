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
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

let themes = document.querySelectorAll('.dropdown-item')
themes.forEach(t => t.addEventListener('click', toggleTheme))

// dark theme
function toggleTheme(e) {
  let text = e.target.innerText;
  if (text.toLowerCase() === 'light') {
    d3.select('body').style('background-color', '#fff');
    d3.select('body').style('color', 'black')
    d3.select('.jumbotron').style('background-color', '#e9ecef');
    d3.selectAll('.card').style('background-color', 'white');
    d3.selectAll('option').style('background-color', 'white');
    let toggleText = document.querySelector('.dropdown-toggle')
    toggleText.innerText = `${text}  `;
  } else {
    d3.select('body').style('background-color', '#3e3e3e');
    d3.select('body').style('color', 'white')
    d3.select('.jumbotron').style('background-color', '#2e2e2e');
    d3.selectAll('.card').style('background-color', '#2e2e2e');
    d3.selectAll('option').style('background-color', '#2e2e2e');
    let toggleText = document.querySelector('.dropdown-toggle')
    toggleText.innerText = `${text}   `;
  }
}

// Initialize the dashboard
init();
