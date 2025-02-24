
/**
 * Footer Component
 *
 * This component displays the footer section of the application, 
 * providing contact information for different global offices of the Contact Center.
 * It includes contact details for Colombia, the United States, and Germany.
 */
const Footer = () => {
    return (
      <footer className="bg-blue-800 text-white py-6 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Contact Center - Global Offices</h2>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {/* Colombia */}
            <div>
              <h3 className="font-semibold">🇨🇴 Colombia</h3>
              <p>Bogotá, Cra 10 #20-30</p>
              <p>+57 1 234 5678</p>
              <p>contacto.co@contactcenter.com</p>
            </div>
  
            {/* Estados Unidos */}
            <div>
              <h3 className="font-semibold">🇺🇸 United States</h3>
              <p>New York, 5th Avenue #100</p>
              <p>+1 (212) 555-6789</p>
              <p>contact.us@contactcenter.com</p>
            </div>
  
            {/* Alemania */}
            <div>
              <h3 className="font-semibold">🇩🇪 Germany</h3>
              <p>Berlin, Friedrichstr. 50</p>
              <p>+49 30 123456</p>
              <p>kontakt.de@contactcenter.com</p>
            </div>
          </div>
  
          <p className="mt-6 text-xs">&copy; {new Date().getFullYear()} Contact Center. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  