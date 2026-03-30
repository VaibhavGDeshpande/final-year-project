import axios from 'axios';
import { MLAdapter } from './mlAdapter.js';

export class PythonServiceAdapter extends MLAdapter {
  async predict(data) {
    try {
      const mlUrl = process.env.ML_SERVICE_URL.replace('localhost', '127.0.0.1');
      const res = await axios.post(
        mlUrl,
        {
          latitude: data.latitude,
          longitude: data.longitude,
          category: data.category || 'retail',
          features: data.features || {} 
        }
      );

      return res.data;
    } catch (error) {
      console.error('Python Service Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async predictBatch(locations) {
    try {
      // The ML service expects { locations: [...] }
      const batchUrl = process.env.ML_SERVICE_URL.replace('localhost', '127.0.0.1').replace('/predict', '/predict-batch');
      const res = await axios.post(
        batchUrl,
        {
          locations: locations.map(loc => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
            category: loc.category || 'retail',
            features: loc.features || {}
          }))
        }
      );
      
      return res.data.predictions;
    } catch (error) {
       console.error('Python Service Batch Error:', error.response?.data || error.message);
       throw error;
    }
  }
}