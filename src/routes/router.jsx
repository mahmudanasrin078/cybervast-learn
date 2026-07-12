import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import LessonPlayer from "../pages/LessonPlayer";
import Quiz from "../pages/Quiz";
import Dashboard from "../pages/Dashboard";
import Certificate from "../pages/Certificate";
import NotFound from "../pages/NotFound";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,

    children: [
      {
        index: true,
        element: <Home/>,
      },

      {
        path: "courses",
        element: <Courses/>,
      },

      {
        path: "courses/:slug",
        element: <CourseDetails />,
      },

      {
        path: "courses/:slug/lessons/:lessonId",
        element: <LessonPlayer/>,
      },

      {
        path: "courses/:slug/quiz/:moduleId",
        element: <Quiz/>,
      },

      {
        path: "dashboard",
        element: <Dashboard/>,
      },

      {
        path: "certificate/:slug",
        element: <Certificate/>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound/>,
  },
]);

export default router;
