import styles from "./style";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  CTA,
  Footer,
  Navbar,
  Stats,
  Testimonials,
  Hero,
  UserLogin,
  UserSignup,
  Admin
} from "./components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useGetSession from "../hooks/use-get-session";
import GlobalToaster from "./components/GlobalToaster";


const App = () => {

  const {data: session, isLoading, isError} = useGetSession();

  if(session?.session){
    console.log("res in app: ", session?.session)
    localStorage.setItem("session", session)
  }

  return (
    <>
      {!isLoading && <Router>
        <GlobalToaster/>
        <div className="bg-primary w-full overflow-hidden">
          <div className={`${styles.paddingX}  ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar session={session} />
            </div>
          </div>
        </div>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="bg-primary w-full overflow-hidden">
                  <div className={`bg-primary ${styles.flexStart}`}>
                    <div className={`${styles.boxWidth}`}>
                      <Hero />
                      <Footer/>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/login" element={<UserLogin session={session} />} />

            <Route path="/signup" element={<UserSignup session={session} />} />

            <Route
              path="/features"
              element={
                <div
                  className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}
                >
                  <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Business />
                    <Footer/>
                  </div>
                </div>
              }
            />
            <Route
              path="/product"
              element={
                <div
                  className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}
                >
                  <div className={`${styles.boxWidth}`}>
                    <Billing />
                    <CardDeal />
                    <Footer/>
                  </div>
                </div>
              }
            />
            <Route
              path="/clients"
              element={
                <div
                  className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}
                >
                  <div className={`${styles.boxWidth}`}>
                    <Clients />
                    <CTA />
                    <Footer/>
                  </div>
                </div>
              }
            />
            <Route path="/dashboard" element={<Admin session={session} />} />
          </Routes>
        </div>
      </Router>}
    </>
  );
};

export default App;
