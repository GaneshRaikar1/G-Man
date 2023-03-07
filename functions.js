let source
let destination
let direction
let power
let range=[0,1,2,3,4,5,6]
let facing=['E','S','W','N']

const setSource = (x,y,dir) => { 
    source=[]
    direction=''
    if( !range.includes(x) || !range.includes(y) || !facing.includes(...dir) ){
        console.log(`Invalid Source ${x} ${y} ${dir}`);
        return
    }
    source=[x,y]
    direction=dir
 }

const setDestination = (x,y) => {
    destination=[]
    if( !range.includes(x) || !range.includes(y) ){
        console.log(`Invalid Destination ${x} ${y}`);
        return
     }
    destination=[x,y]
 }

const calculatePower = () => { 
    let directions=[]
    power=200
    let length=2
    let emptyString=''
  if( source.length===length && destination.length===length && direction!==emptyString ){
    for(i = 0; i < source.length; i++){
        let distance=source[i]-destination[i]
        power = power - Math.abs(distance)*10
        if(distance!==0){
            if(i===0){ distance>=0 ? directions.push("W") : directions.push("E") }
                 else{ distance>=0 ? directions.push("S") : directions.push("N") }           
        }
    }
    if(directions.length===1){
        if(direction!==directions[0]){
            if(direction==="E" && directions[0]==="W" || direction==="W" && directions[0]==="E" || 
               direction==="N" && directions[0]==="S" || direction==="S" && directions[0]==="N" ){
                power-=10
            }else{
                power-=5
            }
        }
    }else if(directions.length===2){
        directions.includes(...direction)?power-=5:power-=10
    }
    console.log("POWER "+power);
  }
 }

const main = (commands) => {  
    for (i = 0; i < commands.length; i++) {
        if (commands) {
            let params = commands[i].split(' ')
            switch (params[0]) {
                case 'SOURCE': setSource( parseInt(params[1]), parseInt(params[2]), params[3] );
                break;
                case 'DESTINATION': setDestination( parseInt(params[1]), parseInt(params[2]) );
                break;
                case 'PRINT_POWER': calculatePower();
                break;
                default:console.log("INVALID_COMMAND");return;
               }
           }
       }  
   }

const data = () => { return {source,direction,destination,power} }

module.exports={main,setSource,setDestination,calculatePower,data}