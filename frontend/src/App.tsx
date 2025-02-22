import {Grid} from "@geist-ui/core";
import "./App.css";
import { Header } from "./components/header/Header";
import { PortfolioBlock } from "./components/portfolioBlock/PortfolioBlock";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PortfolioSection } from "./components/portfolioSection/PortfolioSection";
import Footer from "./components/footer/Footer";
import processedData from "./data/processed_struct.json";
import { MasonrySection } from "./components/masonrySection/MasonrySection";


interface PortfolioContextProps {
  selectedSection: string | null;
  setSelectedSection: Dispatch<SetStateAction<string | null>>;
  portfolioSections: Array<{ caption: string; sourceImg: string; photos: string[] }>
}

export const PortfolioContext = createContext<PortfolioContextProps | null>(null);

function App() {

  const [portfolioSections, setPortfolioSections] = useState(processedData);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <>
      <PortfolioContext.Provider value={{ selectedSection, setSelectedSection, portfolioSections }}>
        {selectedSection ?
          <MasonrySection />
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
