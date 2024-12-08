import { IoStar } from "react-icons/io5";
const reviews = [
  {
    text: "I was surprised! With how well the coverage was from the Pro concealer “beautiful bronze” . I was able to conceal my brows perfectly, giving me the desired glow I wanted to achieve.",
    title: "Dee The Truth",
    subtitle: "HD Pro.Conceal",
  },
  {
    text: "Absolutely fantastic palette. Super soft and buttery shadows that blend like a dream!",
    title: "Robin_Lackey",
    subtitle: "4 Play Eye shadow Palette",
  },
  {
    text: "This is my favorite lip oil ever, I use it every day. It smells so good! I want every color and I hope they come out with more.",
    title: "Mads55",
    subtitle: "Lip Oil Nourishing Gloss",
  },
];
function Reviews() {
  return (
    <div className="flex flex-col items-center py-12 md:mx-6">
      <h3 className="lg:text-4xl md:text-2xl font-bold pt-12 text-xl">See what others are saying</h3>
      <div className="reviews flex gap-6 lg:px-48 py-6 sm:flex-col sm:items-center flex-col md:flex-row md:items-stretch items-center">
        {reviews.map((review) => (
          <div
            key={review.title}
            className="flex flex-col justify-between gap-6 sm:w-4/5 shadow-xl lg:p-12 md:p-4 sm:p-4 w-4/5 p-6 text-sm "
          >
          <Rating/>
            <p className=" md:text-lg">{review.text}</p>
            <div>
              <p className="font-semibold text-black md:text-sm">{review.title}</p>
              <p className="text-gray-600 md:text-sm">{review.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews

function Rating() {
  return (
    <div className="flex gap-1 text-primary">
      <IoStar />
      <IoStar />
      <IoStar />
      <IoStar />
      <IoStar />
    </div>
  );
 
}