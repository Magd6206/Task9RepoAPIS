require("dotenv").config();
console.log("Current PORT from ENV:", process.env.PORT);
const express = require("express");
const app = express();
const looger = (req , res , next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const clientIp = req.ip || req.connection.remoteAddress;
    console.log(`[${timestamp}] ${method} ${url} - IP: ${clientIp}`);
    next();
};
app.use(looger);
app.use(express.json());
const {crews , shifts} = require("./data");



//all API crews: 

app.get("/api/v1/crews" , (req ,res)=>{
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
})
app.get("/api/v1/crews/:id" , (req , res)=>{
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
    
});
app.post("/api/v1/crews" , (req , res)=>{
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
      
    
    })
app.put("/api/v1/crews/:id",(req,res) => {
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

})
app.delete("/api/v1/crews/:id" , (req , res)=>{
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
})


// all API shifts:

app.get("/api/v1/shifts" , (req ,res)=>{
    const allShifts = shifts;
    if(!allShifts){
     return res.status(404).json({
         Message : "No Shifts Found",})
     }
        res.status(200).json({
            success: true,
            data: shifts
        })     
});
app.get("/api/v1/shifts/:id" , (req , res)=>{
    const {id} = req.params;
    const shift = shifts.find(s => s.id === +id);
        if(!shift){
        return res.status(404).json({
            Message : "No Shifts Found",})
        }
        res.status(200).json({
            success: true,
            data: shift
        })     
});
app.post("/api/v1/shifts", (req, res) => {
    const { crewId, berth, startsAt, endsAt } = req.body;

    if (!crewId || !berth || !startsAt || !endsAt) {
        return res.status(400).json({
            message: "this item is required : crewId, berth, startsAt, endsAt"
        });
    }

    const crewExists = crews.find(c => c.id === Number(crewId));
    if (!crewExists) {
        return res.status(404).json({
            message: "فشل إنشاء الوردية: الطاقم المختار غير موجود"
        });
    }

    const newShift = {
        id: shifts.length + 1, 
        crewId: Number(crewId),
        berth,
        startsAt,
        endsAt
    };

    shifts.push(newShift);

    res.status(201).json({
        message: "تمت إضافة الوردية بنجاح",
        data: newShift
    });
});
app.put("/api/v1/crews/:id",(req,res) => {
    const id = req.params.id;
    const { crewId,berth ,startsAt,endsAt } = req.body;
    const shift = shifts.find(c => c.id === +id);
    if(!shift){
        return res.status(404).json({
            Message : "No shifts Found",
            data : []
        });
    }
    const updatedShift = {id : +id , crewId, berth, startsAt, endsAt};
    shift = updatedShift;
    res.status(200).json({
        success: true,
        data: shifts
    })
});
app.delete("/api/v1/crews/:id" , (req , res)=>{
   const id = req.params.id;
   const shift = shifts.filter(c => c.id !== +id);
    if(!shift){
        return res.status(404).json({
            Message : "No Crews Found",
            data : []
        });
    }
     res.status(200).json({
        success: true,
        data: shift
    })
})




const PORT = process.env.PORT
app.listen(PORT , () => {
    //http://localhost:3000/
  console.log(`Server is Running AS Port : ${PORT} ${process.env.username }`);
  
});