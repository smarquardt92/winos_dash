
var titles = [];

d3.csv("https://raw.githubusercontent.com/GreciaWhite/Winos-Across-America/atc_branch/wine1.csv", function(d) {
    return {
        winery : d.winery,
        title : d.title,
        variety : d.variety,
        province : d.province,
        country : d.country,
        points : +d.points,
        price : +d.price,
        description : d.description
    }
}).then(function(data) {
    
    console.log(data[58]);
    var wineData = data;
    var tbody = d3.select("tbody");

    var submit = d3.select("#submit")

    submit.on("click", function() {
        d3.event.preventDefault();
        //getting price input
        var priceElement = d3.select("#price-search-input");
        var priceValue = +priceElement.property("value");

        //getting points input
        var pointElement = d3.select("#point-search-input");
        var pointValue = +pointElement.property("value");


        //getting state input
        var stateElement = d3.select("#state-search-input");
        var stateValue = stateElement.property("value");


        //getting variety input
        var varietyElement = d3.select("#variety-search-input");
        var varietyValue = varietyElement.property("value");

        // console.log(priceValue);
        // console.log(pointValue);
        // console.log(stateValue);
        // console.log(varietyValue)

        var Filter = wineData.filter(encounter => encounter.price <= priceValue)
                             .filter(encounter => encounter.points >= pointValue)
                             .filter(encounter => encounter.variety === varietyValue)
                             .filter(encounter => encounter.province === stateValue)
        console.log(varietyValue)
        if (Filter.length === 0) {
            alert('No results for this query. Please try again')
            };
        

        document.getElementById("search_results").innerHTML="";

        Filter.forEach(function(display) {
            var row = tbody.append("tr");
            Object.entries(display).forEach(function([key, value]) {
            var cell = tbody.append("td");
            cell.text(value);
        })

        Filter.forEach(function(display)    {
            Object.entries(display).forEach(function([key, value]) {
                if(key =="title")
                {
                     titles.push(value)
                }
            }
        )
        });      
    })

    


    painIntheAss(titles);
    });

    function painIntheAss(titles)  {

        var select = d3.select('#wine_names')
        .append('select')
          .attr('class','select')
        .on('change',onchange)
    
        // console.log("titles" + titles)
    var options = select
      .selectAll('option')
        .data(titles).enter()
        .append('option')
            .text(function (d) { return d; });
    
    function onchange() {
        selectValue = d3.select('select').property('value')
        console.log(selectValue)
        d3.select('body')
            .append('p')
            .text(selectValue + ' is the last selected option.')
    };

    }
    // var data = ["Option 1", "Option 2", "Option 3"];
    // var i;
    // for (i = 0; i < 10; i++) { 
    //     data = titles[i];
    // };
    // console.log(data);

     console.log("titles" + titles)
    
  
  });