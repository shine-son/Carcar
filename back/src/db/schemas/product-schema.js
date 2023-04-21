const { Schema, model } = require("mongoose");
const shortId = require("../../utils/short-id");

const ProductSchema = new Schema(
    {
        product_id: shortId,
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        maker: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

/**아직 제작중인 내용 */
// ProductSchema.pre("save", async function (next) {
//     const category = this.category;
//     try {
//         const foundCategory = await Category.findById(category);
//         if (!foundCategory) {
//             const newCategory = new Category({ _id: category });
//             await newCategory.save();
//         }
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

const Product = model("products", ProductSchema);

module.exports = { Product };
