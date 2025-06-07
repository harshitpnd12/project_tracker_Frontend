import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import IssueDetails from "./Pages/IssueDetails/IssueDetails";
import Navbar from "./Pages/Navbar/Navbar";
import AcceptInvitation from "./Pages/Project/AcceptInvitation";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";
import { getUser } from "./Redux/Auth/Action";
import { fetchProject } from "./Redux/Project/Action";
import UpdateProjectForm from "./Pages/Project/UpdateProjectForm";

function App() {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProject({}));
  }, [auth.jwt]);

  console.log(auth);
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          duration: 1600,
        }}
      />
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
             <Route path="/project/update/:id" element={<UpdateProjectForm />}></Route>
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="accept_invitation" element={<AcceptInvitation />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
