import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

//5. Create a Note.jsx component to show a <div> element with a
//<h1> for a title and a <p> for the content.
//6. Make sure that the final website is styled like the example shown here:
//https://w00gz.csb.app/

//HINT: You will need to study the classes in teh styles.css file to appy styling.
