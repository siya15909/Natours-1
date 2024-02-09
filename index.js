const fs = require('fs'); //to include File System module to the program
const http = require('http');//to include http functions
const url = require('url');//to include url functions
const replaceTemplate = require('./modules/replaceTemplate');//that module is imported here 
const slugify  = require('slugify');//to include dependency slugify
//const hello = `Hello World!!`;
//console.log(hello);

//Blocking , synchronous way 
// const textIn = fs.readFileSync(`./txt/input.txt`,`utf-8`);
// console.log(textIn);
// const textOut = `U have done with avocado ${textIn}.\n and completed the tasks for today ${Date.now()}`;
// fs.writeFileSync(`./txt/output.txt`,textOut);
// console.log(`File written`);
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const DataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');


//Non - blocking Asynchronous way 
// fs.readFile('./txt/startt.txt','utf-8',(err,data1)=>{ //startt.txt file doesn't exists . Hence the err returns .
//     if (err) return console.log("ERROR BABYYYYYYY");
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);  //callback function is used instead of printing it directly
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile(`./txt/final.txt`,`${data2}.\n${data3}`,'utf-8',err=>{
//                 console.log('Your file has been written in final.txt file!');
//             });
//         });
//     });
// });
/**The code starts by reading the contents of the file named 'start.txt'. The readFile method is used for this, and it takes three arguments:

The file path ('./txt/start.txt')
The encoding ('utf-8' for Unicode text encoding)
A callback function to handle the result
// The callback function (err, data1) => {...} is executed once the file reading is complete. If there is an error, the err parameter will contain information about the error. Otherwise, data1 will contain the contents of 'start.txt'. 
Inside the callback for the first readFile call, the code constructs the file path for the second file based on the content of 'start.txt'. which is stored in data1.data1 contains 'read-this' statement and calling data1.txt will read another file named read-this.txt 
Inside the callback for the second readFile call, the code logs the contents of the second file to the console using console.log(data2).*/

//console.log("File is here guys....."); //This statement will be at first in output because node will perform the first statement at the background and start execeuting this statement simultaneously

console.log(slugify('Fresh-Avacados',{lower:true}));
const slugs = DataObj.map(ele=>slugify(ele.productName,{lower:true})).join(' \n');
console.log(slugs);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////                SERVER
const server = http.createServer((req,res)=>{
    //console.log(req);//shows all the requests there
    //res.end('Hello from the server!');
    //console.log(req.url); to print the request
    //console.log(url.parse(req.url,true)); to parse the requests into query format
    const { query , pathname} = url.parse(req.url , true);//This will create 2 constants named query and pathname and saves the data in the yrl into corresponding constants
    const pathName= req.url;

    //Overview
    if(pathname === '/' || pathname ==='/overview'){
        res.writeHead(200,{
            'Content-type':'text/html',
        });
        const cardsHtml = DataObj.map(el => replaceTemplate(tempCard,el)).join(''); //an array is formed and to convert it into a string use .join() 
        const output = tempOverview.replace('{%PRODUCT-CARDS%}',cardsHtml);
        // console.log(cardsHtml);
        res.end(output);
    }
    
    //Product
    else if(pathname ==='/product'){
        //console.log(query);
        res.writeHead(200,{
            'Content-type':'text/html' //if we put /text/html instead of this , then it will lead us to download the text file when we open the server
        });
        const product = DataObj[query.id];//creates an array of products with their respective ids.
        // res.end('This is the products');
        if (product) {
            const output = replaceTemplate(tempProduct, product);
            res.end(output);
        } else {
            res.end('Product not found');
        }
        //res.end(tempProduct);
    }
    
    //API
    else if(pathname =='/api'){
        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{   //dirname is a variable which stores the current location and not the place where we run the code.
        //     const ProductData = JSON.parse(data); //JSON.parse fn is used to convert json file into javascript code.
        //     //console.log(ProductData);  
            res.writeHead(200,{
                 'Content-type':'application/json'
             });
            res.end(data); //if we want to show the json file in the server then ,
        // });Instead of this we can do this in synchronous way . it will decrease the number of file readings .
        //res.end('API');
    }

    //NOT FOUND
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'Hello WOrld'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8001,'127.0.0.1',()=>{ //127.0.0.1 is the local host which is our computer itself on port number 8001
    console.log('Listening to request on port 8001');
});

///////////////////////////////////////////////
///// NPM
/**
 * NPM is a software that we basically use to manage  third party open source packages that we use in our project.
 * command => npm init 
 * this will create a json file which is a kind of configuration file of our project where all kinds of data of our project is stored.
 * We can add more details to the json file if needed.
 */