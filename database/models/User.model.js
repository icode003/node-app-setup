var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    fullName: {
        type: String,
        required: "Full Name is required.",
    },
    user_type: {
        type: String,
        enum: ["User", "Admin"],
        default: "Admin",
    },
    email: {
        type: String,
        default: "",
    },
    password: { type: String, required: true },
    user_status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
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

module.exports = mongoose.model("User", UsersSchema);