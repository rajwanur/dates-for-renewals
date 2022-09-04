let durations = [30, 60, 90, 120, 240, 365];
let allowEarly = 15;

let startDate = new Date('August 28, 2022');
let targetDate = new Date('January 1, 2023');

let diff = (targetDate.getTime() - startDate.getTime())/(1000 * 3600 * 24);

let elig = durations.filter(function (d, i) {
  return d < diff;
}).sort(function(a, b){return b-a});;

let r = [];

function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

var ca = function(diff, dt, al){

  let durationOrig = [...dt];
  let durationCopy = [...dt];

  if(dt.length == 0) {
    console.log('result not found, should change combination');
    return;
  } 

  // for (var i = c; i >= 0; i--) {
  //   r.push(addDays(startDate, dt2));
  // }

  let dt2 = durationCopy.shift();

  let res = 0;
  for (var k=1; k <= al; k++) {
    let dt3 = dt2-k;

    let c = Math.floor(diff/dt3);
    let m = diff % dt3;

    for (var j = durationCopy.length - 1; j >= 0; j--) {

      console.log(durationCopy[j], al, m);

      if((durationCopy[j] - al) < m) {
        console.log("This is result");
        // console.log(r);
        let res = 1;
        break;
      }    
    }

    if(res)
      break;
  }

  if(!res) {
    // console.log(m,durationCopy,al);

    ca((diff % dt2),durationCopy,al); 
  }
}


ca(diff,elig,allowEarly)