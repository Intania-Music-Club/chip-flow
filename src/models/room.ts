import { timeStamp } from "console";
import mongoose, { Schema, model, models } from "mongoose";

const roomSchema = new Schema({
    PIN: {
        type: String,
        unique: true,
        required: [true, 'PIN is required'],
    },

    multiplierFactor: {
        type: Number,
        required: [true, 'multiplierFactor is required'],
    },

    moderatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    startTime: {
        type: Date,
        default: Date.now,
    },

    endTime: {
        type: Date ,
        default: null,
    },

    players: {
        type: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            totalBuyin: {
                type: Number,
                min: [0, 'Buy-in cannot be negative'],
                default: 0,
            },
            remainingChips: {
                type: Number,
                min: [0, 'Remaining chips cannot be negative'],
                default: 0,
            }
        }],
        default: [],
    },

    buyins: {
        type: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
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
        }],
        default: [],
    },

    transactions: {
        type: [{
                transactionId: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    default: () => new mongoose.Types.ObjectId() 
                },
                sellerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                buyerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
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
        }],
        default: [],
    },
})

const Room = models.Room || model('Room', roomSchema);
export default Room;