# RC Checker Backend

This is a simple Express backend deployed on Vercel to provide RC details.

## API Endpoints

### `/api/rc-details`
Fetch RC details based on the vehicle number.

#### Request
- Method: `GET`
- Query Params:
  - `vehicleno` (string): The vehicle number.

#### Example
```bash
curl "https://your-backend.vercel.app/api/rc-details?vehicleno=UP27AY7254"
