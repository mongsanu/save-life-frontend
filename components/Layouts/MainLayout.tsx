import React from 'react';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const Layout = ({children, time}: any) => {
    const [darkToggle, setDarkToggle] = React.useState(false);
    React.useEffect(() => {
        if(sessionStorage.getItem("bg") === "dark") {
            setDarkToggle(true);
        } else {
            setDarkToggle(false);
        }
    }, [""]);
    return (
      <React.Fragment>
        <div
          className={`${
            darkToggle && "text-white"
          } sticky top-0 z-[100000] transition-all duration-500 ease-in-out`}
        >
          <Navigation time_change={time} darkToggle={darkToggle} setDarkToggle={setDarkToggle} />
        </div>
        <div className={`${darkToggle && "text-white bg-gray-700"}`}>
          {children}
        </div>
        <div className={`${darkToggle && "text-white bg-gray-700"}`}>
          <Footer />
        </div>
      </React.Fragment>
    );
};

export default Layout;