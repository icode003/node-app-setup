const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    isSuspended: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: "created",
        updatedAt: "updated",
    },
    id: false,
    toJSON: {
        getters: true,
    },
    toObject: {
        getters: true,
    },
});

module.exports = mongoose.model("Blog", BlogSchema);