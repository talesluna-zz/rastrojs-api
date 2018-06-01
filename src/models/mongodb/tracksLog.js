import mongoose from 'mongoose';

export default mongoose.model(
    'TracksLog',
    mongoose.Schema(
        {
            trackId: String,
            tracks: [
                {
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
                    hour: {
                        type: String,
                        required: true
                    }
                }
            ]
        },
        {
            collection: 'TracksLog',
            timestamps: true
        }
    )
);