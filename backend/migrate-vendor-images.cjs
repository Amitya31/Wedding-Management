const mongoose = require('mongoose');
require('dotenv').config();

// Import VendorModel
const VendorModel = require('./models/vendor.model.js');

const updateVendorImages = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/wedding-management');
        console.log('Connected to database');

        // Get all vendors
        const vendors = await VendorModel.find({});
        console.log(`Found ${vendors.length} vendors`);

        // Update each vendor with local placeholder images
        for (const vendor of vendors) {
            const placeholderImages = [
                '/uploads/vendors/placeholder-1.jpg',
                '/uploads/vendors/placeholder-2.jpg',
                '/uploads/vendors/placeholder-3.jpg'
            ];

            vendor.images = placeholderImages;
            await vendor.save();
            console.log(`Updated vendor: ${vendor.name} (${vendor._id})`);
        }

        console.log('All vendors updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating vendors:', error);
        process.exit(1);
    }
};

updateVendorImages();
