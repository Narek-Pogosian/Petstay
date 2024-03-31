"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselComponent } from "react-responsive-carousel";
import Image from "next/image";

function Carousel({ images }: { images: string[] }) {
  return (
    <div className="rounded overflow-hidden">
      <CarouselComponent infiniteLoop showThumbs={false}>
        {images.map((image, i) => (
          <div key={i} className="relative aspect-video">
            <Image
              src={image}
              fill
              alt=""
              loading="lazy"
              sizes="(max-width: 1024px): 100vw, 50vw"
            />
          </div>
        ))}
      </CarouselComponent>
    </div>
  );
}

export default Carousel;
