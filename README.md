# Patient Data Dashboard

A responsive React application for displaying and managing patient data with real-time updates.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Initial Data Fetching**: Retrieves patient data from an API.
- **Real-Time Updates**: Incorporates WebSocket for live data updates.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Data Display**: Shows data in a dynamic, virtualized table.
- **Data Summary**: Provides aggregated statistics about patients.
- **Sorting and Filtering**: Users can sort and filter data based on various criteria.
- **User Preferences Persistence**: Remembers user settings using local storage.
- **Performance Optimizations**: Implements lazy loading, memoization, and efficient rendering.
- **Advanced State Management**: Uses Redux and React Query.
- **Build-Time Enhancements**: Utilizes Vite plugins for file generation and QR code display.

## Demo

[Live Demo Link](#) (If available)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JonaLGarza/patient-dashboard.git
   cd patient-data-dashboard


2. ## Install dependencies

```bash
npm install
# or
yarn install
```
3. **Install Websocket Server Deps as well**

```bash
cd websocket-server install
# and
yarn install
# or 
npm install
```

## Start the WebSocket server

```bash
cd websocket-server
node index
```

## Start the development server

```bash
npm run dev
# or
yarn dev
```

## Usage

- Access the application at [http://localhost:5173/](http://localhost:5173/).
- Use the sorting and filtering options to customize the data view.
- Click on a patient row to see detailed information.
- The application will receive real-time updates automatically.

## Technologies Used

- **React** with **TypeScript**
- **Redux** for state management
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Vite** as the build tool
- **WebSocket** for real-time updates
- **react-virtuoso** for list virtualization
- **Testing Library** and **Jest** for unit testing
- **vite-plugin-generate-file** and **vite-plugin-qrcode** for build-time enhancements

## Project Structure

```
├── src
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   ├── hooks
│   ├── redux
│   │   ├── slices
│   │   └── store.ts
│   ├── App.tsx
│   ├── index.tsx
├── public
├── websocket-server
│   └── server.js
├── tests
├── package.json
├── vite.config.ts
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
