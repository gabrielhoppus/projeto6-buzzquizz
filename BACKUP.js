
function test(x, y, z, a){
    if ((x > 20 && x < 65) && 
    y >= 3 &&
    z >= 2 &&
    a === true)
    {
    return true
}else{
    return false
}
}


console.log(test(19, 3, 2, true))