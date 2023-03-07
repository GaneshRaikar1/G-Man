const fs = require("fs")
const filename = process.argv[2]
const {main}=require('./functions');
    
fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    let inputs = data.toString().split("\n")
    main(inputs)
})
