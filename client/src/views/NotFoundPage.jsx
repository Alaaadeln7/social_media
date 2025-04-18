import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import notFoundImage from '../assets/not-found-page.png'
export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-5">
        <LazyImage src={notFoundImage} alt={"not found image"}/>
        <h1 className="text-4xl font-bold text-black">** 404 **</h1>
        <h2 className="text-2xl font-semibold text-black">not found page</h2>
        <Link className="btn btn-primary text-white" to="/">go to home page</Link>
      </div>
    </div>
  )
}
