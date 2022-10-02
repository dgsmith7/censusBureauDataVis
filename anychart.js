// (function () {
//     anychart.onDocumentLoad(function () {
//
//         let popsByYear=[];
//
//         function drawMap() {
//             let popData = getPopData();
//             console.log(popData);
//             console.log({popData});
//             console.table(popData);
//             console.trace(popData);
//             console.log(popData[1].stateList[0].population);
//             let map = anychart.map();
//             let dataSet = anychart.data.set(
//                 [{"id": "US.MA", "value": popData[1].stateList[0].population},
//                     {"id": "US.MN", "value": popData[1].stateList[1].population},
//                     {"id": "US.MT", "value": popData[1].stateList[2].population},
//                     {"id": "US.ND", "value": popData[1].stateList[3].population},
//                     {"id": "US.HI", "value": popData[1].stateList[4].population},
//                     {"id": "US.ID", "value": popData[1].stateList[5].population},
//                     {"id": "US.WA", "value": popData[1].stateList[6].population},
//                     {"id": "US.AZ", "value": popData[1].stateList[7].population},
//                     {"id": "US.CA", "value": popData[1].stateList[8].population},
//                     {"id": "US.CO", "value": popData[1].stateList[9].population},
//                     {"id": "US.NV", "value": popData[1].stateList[10].population},
//                     {"id": "US.NM", "value": popData[1].stateList[11].population},
//                     {"id": "US.OR", "value": popData[1].stateList[12].population},
//                     {"id": "US.UT", "value": popData[1].stateList[13].population},
//                     {"id": "US.WY", "value": popData[1].stateList[14].population},
//                     {"id": "US.AR", "value": popData[1].stateList[15].population},
//                     {"id": "US.IA", "value": popData[1].stateList[16].population},
//                     {"id": "US.KS", "value": popData[1].stateList[17].population},
//                     {"id": "US.MO", "value": popData[1].stateList[18].population},
//                     {"id": "US.NE", "value": popData[1].stateList[19].population},
//                     {"id": "US.OK", "value": popData[1].stateList[20].population},
//                     {"id": "US.SD", "value": popData[1].stateList[21].population},
//                     {"id": "US.LA", "value": popData[1].stateList[22].population},
//                     {"id": "US.TX", "value": popData[1].stateList[23].population},
//                     {"id": "US.CT", "value": popData[1].stateList[24].population},
//                     {"id": "US.NH", "value": popData[1].stateList[25].population},
//                     {"id": "US.RI", "value": popData[1].stateList[26].population},
//                     {"id": "US.VT", "value": popData[1].stateList[27].population},
//                     {"id": "US.AL", "value": popData[1].stateList[28].population},
//                     {"id": "US.FL", "value": popData[1].stateList[29].population},
//                     {"id": "US.GA", "value": popData[1].stateList[30].population},
//                     {"id": "US.MS", "value": popData[1].stateList[31].population},
//                     {"id": "US.SC", "value": popData[1].stateList[32].population},
//                     {"id": "US.IL", "value": popData[1].stateList[33].population},
//                     {"id": "US.IN", "value": popData[1].stateList[34].population},
//                     {"id": "US.KY", "value": popData[1].stateList[35].population},
//                     {"id": "US.NC", "value": popData[1].stateList[36].population},
//                     {"id": "US.OH", "value": popData[1].stateList[37].population},
//                     {"id": "US.TN", "value": popData[1].stateList[38].population},
//                     {"id": "US.VA", "value": popData[1].stateList[39].population},
//                     {"id": "US.WI", "value": popData[1].stateList[40].population},
//                     {"id": "US.WV", "value": popData[1].stateList[41].population},
//                     {"id": "US.DE", "value": popData[1].stateList[42].population},
//                     {"id": "US.MD", "value": popData[1].stateList[43].population},
//                     {"id": "US.NJ", "value": popData[1].stateList[44].population},
//                     {"id": "US.NY", "value": popData[1].stateList[45].population},
//                     {"id": "US.PA", "value": popData[1].stateList[46].population},
//                     {"id": "US.ME", "value": popData[1].stateList[47].population},
//                     {"id": "US.MI", "value": popData[1].stateList[48].population},
//                     {"id": "US.AK", "value": popData[1].stateList[49].population},
//                     {"id": "US.DC", "value": popData[1].stateList[50].population}]
//             );
//             let // create choropleth series
//                 series = map.choropleth(dataSet);
//
//             // set geoIdField to 'id', this field contains in geo data meta properties
//             series.geoIdField('id');
//
//             // set map color settings
//             series.colorScale(anychart.scales.linearColor('#deebf7', '#3182bd'));
//             series.hovered().fill('#addd8e');
//
//             // set geo data, you can find this map in our geo maps collection
//             // https://cdn.anychart.com/#maps-collection
//             map.geoData(anychart.maps['united_states_of_america']);
//
//             //set map container id (div)
//             map.container('container');
//
//             //initiate map drawing
//             map.draw();
//         }
//
//         function getPopData() {
//             // simulate ten years of data for all 50 states + DC
//             for (let i = 0; i < 10; i ++) {
//                 let statePop = [];
//                 for (let j = 0; j < 51; j ++) {
//                     let randomPop = Math.floor(Math.random() * 5000 + 1000);
//                     statePop.push({stateNum: j, population: randomPop});
//                 }
//                 popsByYear.push({"year": 2000+i, "stateList": statePop});
//             }
//             return popsByYear;
//         };
//
//         function redraw() {
//             document.getElementById("container").innerHTML = "";
//             popsByYear = [];
//             getPopData();
//
//             drawMap();
//
//         }
//
//         document.getElementById("redraw").addEventListener("click", redraw);
//         getPopData();
//         drawMap();
//
//     });
// }());