
let popsByYear=[];

function getPopData() {
    // simulate ten years of data for all 50 states + DC
    for (let i = 0; i < 10; i ++) {
        let statePop = [];
        for (let j = 0; j < 51; j ++) {
            let randomPop = Math.floor(Math.random() * 5000 + 1000);
            statePop.push({stateNum: j, population: randomPop});
        }
        popsByYear.push({"year": 2000+i, "stateList": statePop});
    }
    return popsByYear;
};


//    document.getElementById("redraw").addEventListener("click", redraw);
    getPopData();

let data_map = d3.map();

d3.queue()
    .defer(d3.json, "data/gz_2010_us_050_00_5m.json")
    .defer(d3.csv, "data/PovertyEstimates.csv", function(d){
        // Convert to number
        d['PCTPOVALL_2014'] = +d['PCTPOVALL_2014'];

        // Use the county's FIPS countyode to access that county's data
        return data_map.set(d['FIPStxt'], d);
    })
    .await(function(error, map_json, data_csv) {
        // How does the data look like?
        // console.log(data_csv);

        // Unpack the GeoJSON features
        var counties = map_json['features'];

        //----------------------------------------
        // SVG setup
        var width = 1200,
            height = 600;

        var svg = d3.select('#map').append('svg')
            .attr('width', width)
            .attr('height', height);

        //----------------------------------------
        // Geography setup
        var proj = d3.geoAlbersUsa()
            .scale(1300)
            .translate([width/2, height/2]);
        var path_gen = d3.geoPath(proj);

        //----------------------------------------
        // Scale setup
        var colors = ['#f7fbff','#deebf7','#c6dbef','#9ecae1',
            '#6baed6','#4292c6','#2171b5','#084594'];
        var all_values = data_map.values().map( function(d){
            return d['PCTPOVALL_2014'];
        });

        // Quantile scale
        var color_scale = d3.scaleQuantile()
            .domain(all_values)
            .range(colors);

        // Linear scale
        // var max = d3.max(all_values),
        //     min = d3.min(all_values);
        // var color_scale = d3.scaleLinear()
        //                     .domain([min, max])
        //                     .range([colors[0], colors[colors.length-1]]);

        // Power scale
        // var max = d3.max(all_values),
        //     min = d3.min(all_values);
        // var color_scale = d3.scalePow()
        //                     .domain([min, max])
        //                     .range([colors[0], colors[colors.length-1]])
        //                     .exponent(3);

        // Check out the color scale
        console.log( color_scale(21) );

        //----------------------------------------
        // The map, finally!
        svg.selectAll('path')
            .data(counties)
            .enter()
            .append('path')
            .attr('d', path_gen)
            .style('fill', function(d) {
                fips_code = d['properties']['STATE'] + d['properties']['COUNTY'];

                // Color only if the data exists for the FIPS code
                if (data_map.has(fips_code)) {
                    // Get the entire row of poverty data for each FIPS code
                    poverty_data = data_map.get(fips_code);

                    // Get the specific feature
                    data = poverty_data['PCTPOVALL_2014'];

                    return color_scale(data);
                };
            })
            .style('opacity', 0.8)
            .style('stroke', '#a0a0a0')
            .style('stroke-width', 0.8)
            .style('stroke-opacity', 0.1)
            .on('mouseover', function(d) {
                // Make the county color darker
                d3.select(this)
                    .style('opacity', 1);

                // Unload data
                fips_code = d['properties']['STATE'] + d['properties']['COUNTY'];
                if (data_map.has(fips_code)) {
                    poverty_data = data_map.get(fips_code);
                    name = poverty_data['Area_Name'];
                    poverty_rate = poverty_data['PCTPOVALL_2014'];
                };

                // Show the tooltip
                d3.select('.tooltip')
                    .style('visibility','visible')
                    .style('top', d3.event.pageY+10 + 'px')
                    .style('left', d3.event.pageX+10 + 'px')
                    .html('<strong>' + name + '</strong><br />Poverty rate: ' + poverty_rate + '%');
            })
            .on('mouseout', function(d) {
                // Make the county usual opacity again
                d3.select(this)
                    .style('opacity', 0.8);

                // Hide the tooltip
                d3.select('.tooltip')
                    .style('visibility','hidden');
            });
    });