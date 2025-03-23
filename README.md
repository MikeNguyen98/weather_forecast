# Weather Forecast App

## Overview

The **Weather Forecast App** is a web application that provides real-time weather updates for any location. It fetches weather data from an external API and displays essential details such as temperature, humidity, and weather conditions.

## Features

- Search weather by city name
- Display current temperature, humidity, and weather conditions
- User-friendly interface with dynamic updates
- Responsive design for mobile and desktop users

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (TypeScript)
- **Backend:** None (fetching data from external API)
- **Build Tools:** Vite (or Webpack if applicable)
- **Testing:** Jest
- **Linting:** ESLint

## Installation

### Prerequisites

Ensure you have **Node.js** installed (version 16+ recommended).

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/weather-forecast.git
   cd weather-forecast
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Configuration

- The app fetches weather data from an external API. Set your API key in an **.env** file:
  ```env
  VITE_WEATHER_API_KEY=your_api_key_here
  ```

## Running Tests

To execute tests, run:

```sh
npm test
```

## Deployment

To build for production:

```sh
npm run build
```

The output will be in the `dist` directory, ready for deployment.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


