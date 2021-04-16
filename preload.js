const {contextBridge} = require("electron");
const dbs =require("./main/db/main.js")

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "db", {
        insert: (ds_name, object) => {
            if(dbs.hasOwnProperty(ds_name)){
                if(object!= undefined){
                    if(dbs[ds_name].validator(object)){
                        dbs[ds_name].datastore.insert(object, (err, record)=> {
                            if(err) throw err;
                            console.log(record);
                        })
                    }else{
                        console.error("The object does not have a valid format")
                    }
                }else{
                    console.error("No object was passed")
                }
            }else{
                console.error(`${ds_name} datastore does not exist.`)
            }
        },
        find: (ds_name)=>{
            
        },
        count: (ds_name)=>{
            if(dbs.hasOwnProperty(ds_name)){
                dbs[ds_name].datastore.count({}, function (err, count) {
                    console.log(count)
                });
            }else{
                console.error(`${ds_name} datastore does not exist.`)
            }
        }
    }
);
