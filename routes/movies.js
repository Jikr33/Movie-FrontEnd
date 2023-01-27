const express = require("express");

const {
    getFavorites,
    getMovie,
    createFavorite,
    deleteFavorite,
    getMovieDetails,
} = require("../controller/movies");
const router = express.Router();

router.route("/fave").get(getFavorites).post(createFavorite);
router.route("/get/:id").get(getMovieDetails);
router.route("/:id").get(getMovie).delete(deleteFavorite);

// router.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: "All Favorites",
//     });
// });
// router.get("/:id", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: `Shows category with  ${req.params.id} ID`,
//     });
// });
// router.post("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: "Create new category.",
//     });
// });
// //    /:id   ====> id is a variable
// router.put("/:id", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: `change category with  ${req.params.id} ID`,
//     });
// });
// router.delete("/:id", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: `delete category with  ${req.params.id} ID`,
//     });
// });

module.exports = router;
