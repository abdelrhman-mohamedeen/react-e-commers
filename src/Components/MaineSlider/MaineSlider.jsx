import Slider from "react-slick";
import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";
var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  swipeToSlide: true,
  arrows: false,
};
export default function maineSlider() {
  return (
    <>
      <div className="container w-2/3 mx-auto">
        <div className=" row  ">
          <div className="w-3/4">
            <Slider {...settings}>
              <img src={img1} className="w-full px-0.5 h-[200px]" />
              <img src={img2} className="w-full px-0.5 h-[200px]" />
              <img src={img3} className="w-full px-0.5 h-[200px]" />
            </Slider>
          </div>
          <div className="w-1/4 pl-4">
            <img src={img2} className="w-full h-[100px]" />
            <img src={img1} className="w-full h-[100px]" />
          </div>
        </div>
      </div>
    </>
  );
}
