//priyanka == aapriynk
//[p,r,i,y,a,n,k]
//[1,1,1,1,2,1,1]
function freqFinder(str){
    let arr=str.split("")
    let chars=[],freq=[],freqOne=[]
    
    arr.forEach((ele)=>{
        if(arr.indexOf(ele)==arr.lastIndexOf(ele)){
            freqOne.push(ele)
        }
        else
        {
            if(chars.indexOf(ele)>=0){
                freq[chars.indexOf(ele)]+=1
            }
            else {
                chars.push(ele)
                freq.push(1)
            }
        }
    })
    // console.log(chars,freq,freqOne)
    let results = sortBothArraysAndGetStr(chars,freq)
    return results+=freqOne.join("")
}

function sortBothArraysAndGetStr(chars,freq){
   let resultsStr = ""
   for(let i=0;i<freq.length;i++){
    let highest = Math.max(...freq)
    let highestIndex = freq.indexOf(highest)
    
    for(let k=1;k<=highest;k++){
        resultsStr+=chars[highestIndex]
        freq[highestIndex]=0
    }
        
   }
   return resultsStr
}

console.log(freqFinder("priyyaaankakk"))