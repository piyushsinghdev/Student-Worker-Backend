const { jobsPost } = require("../utils/db")

const jobsController = async (req,res)=>{
    try{
        return res.status(200).json(jobsPost)
    }
    catch{
       return res.status(501).json("Internal Server Error")
    }
}

module.exports = {jobsController}