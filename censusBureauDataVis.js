
let data_map = d3.map();

d3.queue()
    .defer(d3.json, "data/gz_2010_us_040_00_5m.json")
    .defer(d3.csv,
        "data/popsByState2015-2019.csv",
        function (d) {
            // Convert population data to numbers
            d['pop2015'] = Number(d["pop2015"]);
            d['pop2016'] = Number(d["pop2016"]);
            d['pop2017'] = Number(d["pop2017"]);
            d['pop2018'] = Number(d["pop2018"]);
            d['pop2019'] = Number(d["pop2019"]);
            // Use the state's FIPS code to access that county's data
            return data_map.set(d['FIPS'], d);
        })
    .await(function(error, map_json, data_csv) {
        // How does the data look like?
        console.log(data_csv);

        // Unpack the GeoJSON features
        let states = map_json['features'];

        //----------------------------------------
        // SVG setup
        let width = 1200,
            height = 600;

        let svg = d3.select('#map').append('svg')
            .attr('width', width)
            .attr('height', height);

        //----------------------------------------
        // Geography setup
        let proj = d3.geoAlbersUsa()
            .scale(1000)
            .translate([width/2, height/2]);
        let path_gen = d3.geoPath(proj);

        //----------------------------------------
        // Scale setup
        let colors = ['rgb(188, 233, 99)','rgb(138, 210, 106)','rgb(100, 188, 111)','rgb(73, 164, 114)',
            'rgb(54, 139, 112)','rgb(45, 117, 107)','rgb(40, 95, 97)','rgb(36,74,85)'];
        let all_values = data_map.values().map( function(d){
            return d['pop2015'];
        });

        // Quantile scale
        let color_scale = d3.scaleQuantile()
            .domain(all_values)
            .range(colors);

        // Linear scale
        // let max = d3.max(all_values),
        //     min = d3.min(all_values);
        // let color_scale = d3.scaleLinear()
        //                     .domain([min, max])
        //                     .range([colors[0], colors[colors.length-1]]);

        // Power scale
        // let max = d3.max(all_values),
        //     min = d3.min(all_values);
        // let color_scale = d3.scalePow()
        //                     .domain([min, max])
        //                     .range([colors[0], colors[colors.length-1]])
        //                     .exponent(3);

        // Check out the color scale
        console.log( color_scale(21) );

        //----------------------------------------
        // The map, finally!
        svg.selectAll('path')
            .data(states)
            .enter()
            .append('path')
            .attr('d', path_gen)
            .style('fill', function(d) {
                fips_code = d['properties']['STATE'];
                // Color only if the data exists for the FIPS code
                if (data_map.has(fips_code)) {
                    // Get the entire row of poverty data for each FIPS code
                    pop_data = data_map.get(fips_code);
                    // Get the specific feature
                    data = pop_data['pop2015'];
                    return color_scale(data);
                };
            })
            .style('opacity', 0.8)
            .style('stroke', '#a0a0a0')
            .style('stroke-width', 0.8)
            .style('stroke-opacity', 0.3)
            .on('mouseover', function(d) {
                // Make the state color darker
                d3.select(this)
                    .style('opacity', 1);

                // Unload data
                fips_code = d['properties']['STATE'];
                if (data_map.has(fips_code)) {
                    pop_data = data_map.get(fips_code);
                    name = pop_data['Name'];
                    data = pop_data['pop2015'];
                };

                // Show the tooltip
                d3.select('.tooltip')
                    .style('visibility','visible')
                    .style('top', d3.event.pageY+10 + 'px')
                    .style('left', d3.event.pageX+10 + 'px')
                    .html('<strong>' + name + '</strong><br />Population: ' + data);
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