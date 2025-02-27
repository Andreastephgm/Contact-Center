import Customer from "../Components/Customer";
import Agent from "../Components/Agent";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../styles/globals.css";
/**
 * Home page component that displays the main structure of the application.
 * 
 * This page includes:
 * - A `Header` component for navigation or branding.
 * - A section displaying `Customer` and `Agent` components.
 * - A `Footer` component for additional information or links.
 *
 * @returns {JSX.Element} The main page structure.
 */

export default function Index() {
  return (
    <div className="min-h-screen bg-blue-100 text-white p-6">
      <h1 className="text-blue-800 font-bold text-[50px] text-center mt-8 mb-8">
        <Header/>
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Customer />
        <Agent />
      </div>
      <Footer/>
    </div>
    
  );
}

