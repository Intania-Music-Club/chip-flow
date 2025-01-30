import mongoose, { Schema, model, models } from "mongoose";

const roomSchema = new Schema({
    PIN: {
        type: String,
        required: [true, 'PIN is required'],
    },

    multiplierFactor: {
        type: Number,
        required: [true, 'multiplierFactor is required'],
    },

    moderator: {
        moderatorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },

    startTime: {
        type: Date,
        default: Date.now,
    },

    endTime: {
        type: Date,
    },

    players: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            buyin: {
                type: Number,
                min: [0, 'Buy-in cannot be negative'],
            },
            remainingChips: {
                type: Number,
                min: [0, 'Remaining chips cannot be negative'],
            }
        }
    ],

    transaction: [
        {
            transactionId: { 
                type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() 
            },
            seller: {
                type: String,
                required: true,
            },
            buyer: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            timeStamp: {
                type: Date,
                default: Date.now,
            }
        }
    ],
})

const Room = models.Room || model('Room', roomSchema);
export default Room;