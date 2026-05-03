const crews = require("../models/Crews");
class crwesController {
 
  getallcrwes = async (req ,res)=>{
   const allCrews = await crews.find();
   if(!allCrews){
    return res.status(404).json({
        Message : "No Crews Found",
        data : []
    })
   }
    res.status(200).json({
        success: true,
        data: allCrews
    })
}
getbyid = (req , res)=>{
    const {id} = req.params;
    const crew = crews.find(c => c.id === +id);
      if(!crew){
    return res.status(404).json({
        Message : "No Crews Found",
        data : []
    })
   }
    res.status(200).json({
        success: true,
        data: crew
    })
    
}
addcrew =  async (req , res)=>{
    const { name  , role , active} = req.body;
    const newCrew = await crews.create({name , role , active});
    if(!name || !role || active === undefined){
        return res.status(400).json({
            Message : "No Crews Found",
            data : []
        });}
        return  res.status(200).json({
        success: true,
        data: newCrew
    });
      
    
    }
  updatecrew = (req,res) => {
    const id = req.params.id;
    const { name  , role , active} = req.body;
    const crew = crews.find(c => c.id === +id);
    if(!crew){
        return res.status(404).json({
            Message : "No Crews Found",
            data : []
        });
    }
    const updatedCrew = {id : +id , name , role , active};
    crew = updatedCrew;
    res.status(200).json({
        success: true,
        data: crews
    })

}
deletecrew =  async (req , res)=>{
   const id = req.params.id;
   const crew = await crews.findByIdAndDelete(id);
   const allCrews = await crews.find();
    if(!crew){
        return res.status(404).json({
            Message : "No Crews Found",
            data : []
        });
    }
     res.status(200).json({
        success: true,
        data: allCrews
    })
}
}

module.exports = new crwesController();