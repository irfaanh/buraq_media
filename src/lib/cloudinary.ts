import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
// Priority: CLOUDINARY_URL > individual env vars
function configureCloudinary() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (cloudinaryUrl) {
    // Parse CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
    const urlMatch = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
    if (urlMatch) {
      const [, apiKey, apiSecret, cloudName] = urlMatch;
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      return;
    }
  }
  
  // Fallback to individual environment variables
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  } else {
    console.error('Cloudinary configuration missing. Please set CLOUDINARY_URL or individual env vars.');
  }
}

// Configure on module load
configureCloudinary();

/**
 * Upload image to Cloudinary
 * @param file - File object or base64 string
 * @param folder - Optional folder name in Cloudinary
 * @returns Promise with uploaded image URL
 */
export async function uploadImageToCloudinary(
  file: File | string,
  folder: string = 'buraq_media/news'
): Promise<string> {
  try {
    // Ensure Cloudinary is configured before upload
    const config = cloudinary.config();
    if (!config.cloud_name) {
      configureCloudinary();
      // Verify configuration after reconfiguring
      const newConfig = cloudinary.config();
      if (!newConfig.cloud_name) {
        throw new Error('Cloudinary configuration failed. Please check your CLOUDINARY_URL environment variable.');
      }
    }
    
    let uploadResult;

    if (typeof file === 'string') {
      // Base64 string
      uploadResult = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto' },
          { format: 'auto' },
        ],
      });
    } else {
      // File object - convert to base64
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;

      uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto' },
          { format: 'auto' },
        ],
      });
    }

    return uploadResult.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete image from Cloudinary
 * @param imageUrl - Full URL or public_id of the image
 */
export async function deleteImageFromCloudinary(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from URL
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];
    const folder = urlParts.slice(-2, -1)[0]; // Get folder name
    
    const fullPublicId = folder ? `${folder}/${publicId}` : publicId;
    
    await cloudinary.uploader.destroy(fullPublicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    // Don't throw error, just log it
  }
}

export { cloudinary };
