# QA Test Case API Integration Notes

## Current Status

The QA Test Case app is configured to call the real API endpoint but falls back to mock data when CORS/network issues occur.

## API Endpoint

- **URL**: `http://35.241.31.6:80/api/qa/generate`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**:
  - `prompt`: String - The test case generation prompt
  - `files`: File[] - Uploaded files for processing

## CORS Issue Resolution

### Option 1: Backend CORS Configuration (Recommended)

Add CORS headers to the API server:

```javascript
// Express.js example
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-domain.com"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

### Option 2: Development Proxy (Vite)

Add proxy configuration to `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://35.241.31.6:80",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### Option 3: Browser Extension (Development Only)

Use a CORS browser extension to disable CORS checks during development.

## Mock Data Fallback

When the real API is unavailable, the app automatically:

1. Shows a warning toast notification
2. Generates sample test cases based on the user's prompt
3. Displays a "Mock Data Notice" above the results
4. Prefixes downloaded CSV files with "mock-"

## Response Format

The API should return:

````json
{
  "success": true,
  "data": "```csv\nTest Case ID,User Story,Source Document,...\nTC_001,Login Feature,doc.txt,...\n```"
}
````

## Error Handling

- Network/CORS errors → Fallback to mock data
- HTTP errors → Show error message to user
- Invalid response format → Show error message to user
