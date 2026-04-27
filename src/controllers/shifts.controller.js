const { shifts } = require("../../data");
class shiftsController {
  getallShifts = (req ,res)=>{
    const allShifts = shifts;
    if(!allShifts){
     return res.status(404).json({
         Message : "No Shifts Found",})
     }
        res.status(200).json({
            success: true,
            data: shifts
        })     
}
getshiftByID = (req , res)=>{
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
}
addShifts = (req, res) => {
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
}
updateshift = (req,res) => {
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
}
deleteshift = (req , res)=>{
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
}
}
module.exports = new shiftsController();