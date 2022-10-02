
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


    document.getElementById("redraw").addEventListener("click", redraw);
    getPopData();

