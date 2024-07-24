import React, { useState, useEffect } from "react";
import SimpleBackdrop from "../components/Loader";
import '../styles/NotFound.css';
function NotFound() {
  const [render, setRender] = useState(false);
  const [link, setLink] = useState("http://localhost:3000/")
  useEffect(() => {
    const checkUserType = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) setRender(true);
      else {
        setLink("http://localhost:3000/Dashboard");
        setRender(true);
      }
    };

    checkUserType();
  });

  return (
    <>
      {render ? (
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2">Look like you're lost</h3>

                    <p>the page you are looking for not available!</p>

                    <a href={link} className="link_404">
                      Go to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SimpleBackdrop
          currentOpenState={true}
          handleClose={() => {}}
        ></SimpleBackdrop>
      )}
    </>
  );
}

export default NotFound;