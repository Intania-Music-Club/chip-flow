import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },

    username: {
        type: String,
        required: [true, 'Username is required!'],
    },

    image: {
        type: String,
    },

    bankroll: {
        type: Number,
        default: 0,
    },

    roomJoining: {
        type: {
            roomId: {
                type: Schema.Types.ObjectId,
                ref: 'Room',
                required: true,
            },
            roomPIN: {
                type: String,
                required: true,
            },
            isModerator: {
                type: Boolean,
                default: false,
            },
        },
        default: null,
    },

    roomJoined: {
        type: [{
            roomId: {
                type: Schema.Types.ObjectId,
                ref: 'Room',
                required: true,
            },
        }],
        default: [],
    },
});

const User = models.User || model("User", userSchema);
export default User;