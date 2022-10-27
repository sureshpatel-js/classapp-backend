const mongoose = require("mongoose");
const { Schema } = mongoose;
const InstituteFinanceSchema = new Schema({
    //Students
    student_installment_amount: {
        type: Number
    },
    student_id: {
        type: Schema.Types.ObjectId,
    },
    //Monthly paid staff
    monthly_paid_amount: {
        type: Number
    },
    monthly_paid_amount_status: {
        type: String   //paid or pending
    },
    //Hourly paid 
    amount_per_hour: {
        type: Number
    },
    work_for_hours: {
        type: Number
    },
    amount_multiply_by_hours: {
        type: Number
    },
    amount_per_hour_paid_ststus: {
        type: String //paid or pending
    },
    //Other amount flow
    
    created_by: {
        type: Schema.Types.ObjectId,
    },
    created_at: {
        type: Date
    },
    amount_flow: {
        type: String//in or out
    }
});
const InstituteFinanceModel = mongoose.model("instituteFinance", InstituteFinanceSchema);
module.exports = InstituteFinanceModel;
