//If we want to extract some functions from another module we can do this using modules.export();
//There is no need to name the function here
module.exports=(temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g , product.productName);  // /...../ is a regular expression in js which are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}