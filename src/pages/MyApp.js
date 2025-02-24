import "../styles/globals.css"; 

/**
 * Root component that wraps all pages in the application.
 * 
 * This component is used by Next.js to initialize pages and allows global styles 
 * or layout components to be applied.
 * 
 * @returns {JSX.Element} The rendered page component with its props.
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
