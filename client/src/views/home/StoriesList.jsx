import { Link } from "react-router-dom";
import CreateStory from "./CreateStory";

const images = [
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" },
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" },
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" },
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" },
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" },
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" },
  { image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", name: "your story" }
];

export default function StoriesList() {
  return (
    <div className="m-4 bg-white py-8 px-3 rounded-xl">
      <ul className="flex space-x-4 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth snap-x p-2">
        <li className="snap-start">
          <CreateStory />
        </li>
        {images.map((item, index) => (
          <li key={index} className="snap-start">
            <Link to={`/story/${item.name}`} className="flex flex-col items-center">
              <img
                className="w-10 h-10 md:w-20 md:h-20 object-cover transition-transform duration-500 border-blue-600 rounded-full"
                src={item.image}
                alt={item.name}
              />
              <h1 className="font-semibold text-sm md:text-md">{item.name}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
