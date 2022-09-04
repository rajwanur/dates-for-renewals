import './index.css';

var durations, allowEarly, startDate, targetDate, diff, elig,r,e; 

//For now, durations and allowed early days are not customizable
 durations = [30, 60, 90, 120, 240, 365];
 allowEarly = 15;

//Get dates from input fields
document.getElementById("date1").addEventListener("change", function(){
    startDate = new Date(this.value);
});
document.getElementById("date2").addEventListener("change", function(){
    targetDate = new Date(this.value);
});

let calculateBtn = document.getElementById('calculate');
var result = document.getElementById('result');

calculateBtn.addEventListener('click', function () {
    //Check if both dates are available, otherwise throw error
    if(!isValidDate(startDate) || !isValidDate(targetDate)) {
        alert('Please select dates in both fields.');
        return;
    }

    result.innerText = '';
    diff = (targetDate.getTime() - startDate.getTime())/(1000 * 3600 * 24);
    elig = durations.filter(function (d) {
                return d < diff;
            }).sort(function(a, b){return a-b});

    if (diff < 0) {
        alert('Target date cannot be earlier than last update date.');
        return;
    }

    if (elig.length === 0 || typeof elig === 'undefined') {
        alert('Too short duration');
        return;
    }

    let p = document.createElement("p");
    p.classList = 'font-sm text-blue-700';
    p.innerHTML = 'Difference is ' + diff + ' days. </br> '
    result.appendChild(p);

    calculate(); 
    // result.innerText = elig.length;
    
        
});


function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
// function addDays(date, days) {
//   const copy = new Date(Number(date))
//   copy.setDate(date.getDate() + days)
//   return copy
// }


function calculate() {
    // ca(diff,elig,allowEarly);

    let n = Math.floor(diff / elig[0]);
    e = [];
    r = [];

    for (let j = 0; j < n; j++) {
        e.push(elig[0]);
    };
    console.log(e,n,elig[0]);

    check(e);

    for (let index = 0; index < r.length; index++) {
        const element = r[index];
        const items = element.split(',');
        items.reverse();
        const d2 = [];
        let dt0 = new Date(Number(startDate));
        for (let k = 0; k < items.length; k++) {

            console.log(items[k], startDate);
            const days = +items[k];
            dt0.setDate(dt0.getDate() + days);
            d2.push(dt0.toDateString());
        }
        
        let pTag = document.createElement("p");
        pTag.classList = 'font-sm font-bold text-red-400';
        pTag.innerText = d2.join(',  ');
        result.appendChild(pTag);
    }
}

var ca = function(diff, dt, al){

  let durationOrig = [...dt];
  let durationCopy = [...dt];

  if(dt.length == 0) {
    alert('Result not found, please adjust dates slightly');
    return;
  } 

  let dt2 = durationCopy.shift();

  var res = 0;
  for (var k=1; k <= al; k++) {
    let dt3 = dt2-k;

    let c = Math.floor(diff/dt3);
    let m = diff % dt3;

    for (var j = durationCopy.length - 1; j >= 0; j--) {
      console.log(durationCopy[j], al, m);

      if((durationCopy[j] - al) < m) {
        console.log("This is result");
        result.innerHTML += "This is result";
        // result.innerHTML += '<p class="text-sm">' + durationCopy[j]+', '+al + '</p>'; 
        var res = 1;
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





function check(arr2chk) {
    if (typeof arr2chk !== 'object') {
        return;
    }

    // console.log('Loop start for check');
    console.log('List of elements are ' + arr2chk);
    // console.log('existing results is '+r);
    // console.log(r)
    let s = arr2chk.reduce((a,b)=>a+b,0);
    console.log('Current sum is '+s);
    console.log('Allowed length is '+diff + ' - ' + (diff + allowEarly));
    

    if (diff <= s && s <= (diff + allowEarly) ) {

        console.log('This should be a result as sum of elements are ' + s);
        //Push an result
        r.push([...arr2chk].join(','));
        console.log('After adding results to array ' + r.join(' # '));
        

        // locate result and increase last element
        let inc = inclst(arr2chk,elig);
        if (typeof inc === 'number') {
            return;
        } else {
            arr2chk = inc; 
            check(arr2chk);
        }
    } else if ( s > (diff + allowEarly)) {
        console.log('No results found, remove first element');
        //Remove first element       
        if (arr2chk.length === 1) {
            console.log('No more elements to remove');
            return;
        } else {

            check(removeFirst(arr2chk));
        }
    } else {
        console.log('No results found, increase last element');
        // increase last element
        let inc = inclst(arr2chk,elig);
        if (typeof inc === 'number') {
            return;
        } else {
            arr2chk = inc; 
            check(arr2chk);
        } 
    }
}

// Check if there is no space to increase last element, then exit the loop
// otherwise go to the begining with increasing last element


/**
 * This function will replace the last element with an increased value from the list 
 * List is expected to be sorted in ascending order
 * 
 * @param {array} target Source array for element modification
 * @param {array} list List of elements to choose from
 * @returns undefined | array 
 */
function inclst(target,list) {
    let t2 = [...target];
    let l = target[target.length-1];
    let i = list.indexOf(l);
    if (i === -1) {
        return i;
    } else if (i === list.length-1) {
        return 0;
    } else {
        t2[t2.length - 1] = list[i+1];
        return t2;
    }
}

function removeFirst(target) {
    let t2 = [...target];
    t2.shift();
    return t2;
}
