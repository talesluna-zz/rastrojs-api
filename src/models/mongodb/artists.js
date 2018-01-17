import mongoose from 'mongoose';

export default mongoose.model(
    'ReadObjectsLog',
    mongoose.Schema(
        {
            name: {
                objectId: String,
                data: {
                    status: {
                        type: String,
                        required: true,
                        lowercase: true
                    },
                    unit: {
                        type: String,
                        required: true,
                        uppercase: true
                    },
                    date: {
                        type: String,
                        required: true
                    },
                    date: {
                        type: String,
                        required: true
                    },
                    hour: {
                        type: String,
                        required: true
                    }
                }
            }
        },
        {
            collection: 'ReadObjectsLog',
            timestamps: true
        }
    )
);