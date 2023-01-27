const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Киноны нэрийг оруулна уу"],
        unique: [true, "Нэр давхардаж байна."],
        trim: true,
        maxlength: [50, "Киноны нэрний урт‚ дээд тал нь 50 тэмдэгт"],
    },
    description: {
        type: String,
        required: [true, "Киноны тайлбар оруул"],
        maxlength: [100, "Киноны тайлбар 100 аас дээшгүй."],
    },
    id: {
        type: String,
        required: [true, "must have imdb id"],
        unique: true,
    },
});
// const CategorySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Киноны нэрийг оруулна уу"],
//         unique: true,
//         trim: true,
//         maxlength: [50, "Киноны нэрний урт‚ дээд тал нь 50 тэмдэгт"],
//     },
//     description: {
//         type: String,
//         required: [true, "Киноны тайлбарыг заавал оруул."],
//         maxlength: [500, "Киноны тайлбарын урт‚ дээд тал ни 500 тэмдэгт"],
//     },
//     ids: Number,
//     photo: {
//         type: String,
//         default: "no-photo.jpg",
//     },
//     averageRating: {
//         type: Number,
//         min: [1, "Үнэлгээ багадаа 1 байна"],
//         max: [10, "Үнэлгээ ихдээ 10 байна"],
//     },
//     averagePrice: Number,
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

module.exports = mongoose.model("Category", CategorySchema);
