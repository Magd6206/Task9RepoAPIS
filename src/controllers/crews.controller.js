const { crews } = require("../../data");
class crwesController {
 
  getallcrwes = (req ,res)=>{
   const allCrews = crews;
   if(!allCrews){
    return res.status(404).json({
        Message : "No Crews Found",
        data : []
    })
   }
    res.status(200).json({
        success: true,
        data: crews
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
addcrew = (req , res)=>{
    const { name  , role , active} = req.body;
    if(!name || !role || active === undefined){
        return res.status(400).json({
            Message : "No Crews Found",
            data : []
        });}
        const newCrew = {id : crews.length + 1 , name , role , active};
        crews.push(newCrew);
        return  res.status(200).json({
        success: true,
        data: crews
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
deletecrew = (req , res)=>{
   const id = req.params.id;
   const crew = crews.filter(c => c.id !== +id);
    if(!crew){
        return res.status(404).json({
            Message : "No Crews Found",
            data : []
        });
    }
     res.status(200).json({
        success: true,
        data: crews
    })
}
}

module.exports = new crwesController();