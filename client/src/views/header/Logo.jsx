import { Link } from "react-router-dom";
import LazyImage from "../../components/LazyImage";
// import logo from "../../../public/logo.png";
export default function Logo() {
  return (
    <Link className="text-2xl font-bold" to="/">
      <LazyImage
        src="/logo.png"
        alt="logo"
        className="sm:w-32 sm:h-32 w-20 h-20"
      />
    </Link>
  );
}
