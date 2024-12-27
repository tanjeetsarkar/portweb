import {Grid} from "@geist-ui/core";
import "./App.css";
import { Header } from "./components/header/Header";
import { PortfolioBlock } from "./components/portfolioBlock/PortfolioBlock";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PortfolioSection } from "./components/portfolioSection/PortfolioSection";
import Footer from "./components/footer/Footer";

interface PortfolioContextProps {
  selectedSection: string | null;
  setSelectedSection: Dispatch<SetStateAction<string | null>>;
  portfolioSections: Array<{ caption: string; sourceImg: string; photos: string[] }>
}

export const PortfolioContext = createContext<PortfolioContextProps | null>(null);

function App() {

  const [portfolioSections, setPortfolioSections] = useState([
    {
      caption: "Street", sourceImg: "street/_DSC4740.jpg", photos: [
        "street/_DSC4740.jpg",
        "street/_DSC5495.jpg",
        "street/_DSC5560.jpg",
      ]
    },
    {
      caption: "Wild Life", sourceImg: "wild_life/_DSC0091.jpg", photos: [
        "wild_life/_DSC0091.jpg",
        "wild_life/IMG-20230720-WA0017.jpg",
        "wild_life/IMG-20230813-WA0002.jpg",
        "wild_life/signal-2024-06-01-20-49-14-421.jpg",
        "wild_life/signal-2024-06-01-20-49-47-083.jpg",
      ]
    },
    {
      caption: "Product", sourceImg: "products/_DSC0041.jpg", photos: [
        "products/_DSC0041.jpg",
        "products/signal-2024-09-20-17-02-58-118.jpg",
      ]
    },
    {
      caption: "Birds", sourceImg: "birds/_DSC0095.jpg", photos: [
        "birds/_DSC0095.jpg",
        "birds/_DSC0148 (1).jpg",
        "birds/_DSC0324.jpg",
        "birds/IMG-20230720-WA0005.jpg",
        "birds/IMG-20230720-WA0006.jpg",
        "birds/IMG-20231126-WA0038.jpg",
      ]
    },
    {
      caption: "Lights and Shadow", sourceImg: "_DSC4483.jpeg", photos: [
        "_DSC4483.jpeg",
        "_DSC4484.jpeg",
      ]
    },
  ]);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <>
      <PortfolioContext.Provider value={{ selectedSection, setSelectedSection, portfolioSections }}>
        {selectedSection ?
          <PortfolioSection />
          :
          <>
            <Header />
            <Grid.Container gap={4} justify="flex-start" >
              {
                portfolioSections.map((section, index) => (
                  <Grid xs={24} sm={12} md={12} lg={12} key={index}>
                    <PortfolioBlock caption={section.caption} sourceImg={section.sourceImg} />
                  </Grid>
                ))
              }
            </Grid.Container>
          </>}
      </PortfolioContext.Provider>
      <Footer />
    </>
  );
}

export default App;
