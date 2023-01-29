const mongoose = require('mongoose')
const schema = mongoose.Schema;
const mobileSchema = new schema({
    mobile_name : String,
    price : String,
    ram: String,
    rom: String,
    type:String,
    coverImage: String,
    camera:String,
    network: String,
    size: String,
    resolution: String,
    tech: String,
    s_t_b : String,
    dimension: String,
    build : String,
    video: String,
    sim : String,
    wlan : String,
    bluetooth: String,
    gps : String,
    rr: String
});

Mobile = mongoose.model('Mobile', mobileSchema);
module.exports = Mobile;