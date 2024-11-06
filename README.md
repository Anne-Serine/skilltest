
# Kunderegister (Customer Management Web Application)

Live site: <https://kunderegister.netlify.app/>

This is a frontend-focused web application that allows users to search for potential customers and save them to a list. The app fetches information from the Brønnøysundregisteret API and provides additional functionalities, including notes, deletion, and detailed info for each customer.

## Key Technologies

- **Vite**
- **React**
- **Tailwind CSS**
- **Zustand - State management**

## Features

- Search for companies using Brønnøysundregisteret API
- Save customers to a list
- Add and view notes for each customer
- Delete customers from the list
- View detailed information for each customer from the API

## Installation and Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/Anne-Serine/skilltest
    ```
    ```
    cd <your-project-folder>
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Set up invironment variables**

    Create a `.env` file in the root of the project and add the API url-key for the Brønnøysundregisteret API:
    ```bash
    VITE_BASE_URL="base-url-key"
    ```
4. **Run the application**

    ```bash
    npm run dev
    ```
The app should now be running locally on `http://localhost:3000`

## Project Structure

| Directory/File          | Description                                               |
|-------------------------|-----------------------------------------------------------|
| `src/components/`       | Contains UI components: `Buttons`, `CustomerList`, `Modal`, `SavedCustomer`, and `Search` |
| `src/hooks/store.jsx`   | Manages API calls and global state with Zustand           |
| `src/styles/index.css`  | Additional custom styles                                       |
| `src/App.jsx`           | Main application component                                |
| `src/main.jsx`          | Entry point for rendering the application                 |

## Additional Information

- **API Integration:** The app integrates with the Brønnøysundregisteret API to provide real-time company information.

- **State Management:** Zustand is used to handle global state, including the customer list and notes.

## Contact

For any inquiries, you can contact me through:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anne-serine-johannessen-587b4024a/)