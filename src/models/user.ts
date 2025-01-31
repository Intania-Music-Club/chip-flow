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
            },
            roomPIN: {
                type: String,
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
            },
        }],
        default: [],
    },
});

const User = models.User || model("User", userSchema);
export default User;