import { Image, Page, Text } from "@geist-ui/core";
import "./portfolioBlock.css";
import { useContext, useState } from "react";
import { PortfolioContext } from "../../App";

interface PortfolioBlockProps {
  caption: string;
  sourceImg: string;
}

export const PortfolioBlock = ({ caption, sourceImg }: PortfolioBlockProps) => {

  const context = useContext(PortfolioContext)
  const [isLoaded, setIsLoaded] = useState(false);
  const showPortfolioSection = () => {
    if (context) {
      const { setSelectedSection } = context;
      setSelectedSection(caption)
    }
  }

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const smallImg = sourceImg.replace(/(\.jpe?g)$/, "-small$1");

  return (
    <div className="portfolio-block"
      onClick={showPortfolioSection}
      style={{
        backgroundImage: `url(${smallImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Image
        loading="lazy"
        width={"100%"}
        src={sourceImg}
        className="hoverable-image"
        onLoad={handleImageLoad}
        style={{ opacity: isLoaded ? 1 : 0, objectFit: "cover" }}
      />
      <div className="overlay">
        <Text h2 className="overlay-text">{caption.replace(/_/g, " ")}</Text>
      </div>
    </div>
  );
};